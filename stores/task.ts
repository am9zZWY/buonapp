import { defineStore } from 'pinia'
import type { Task } from '~/types/task'
import useLTf from '~/composables/ltf/useLtf'

const localStorage = import.meta.server ? null : window.localStorage

export const useTaskStore = defineStore('task', () => {
  const tasks = useState('tasks', () => [] as Task[])
  const nonDeletedTasks = computed(() => tasks.value.filter((task) => !task.deleted))

  const getFromLocalStorage = () => {
    // Load todos from localStorage
    const tasksFromStorageStr = localStorage?.getItem('todos')
    if (tasksFromStorageStr) {
      const newTasks = [] as Task[]
      const tasksFromStorage = JSON.parse(tasksFromStorageStr) as Task[]
      for (const task of tasksFromStorage) {
        task.taskId = task.taskId ?? ''
        task.title = task.title ?? ''
        task.deleted = task.deleted ?? false
        task.completed = task.completed ?? false
        task.dueDate = task.dueDate ? new Date(task.dueDate) : undefined
        task.createdDate = new Date(task.createdDate)
        task.priority = task.priority ?? 'medium'

        newTasks.push(task)
      }
      tasks.value = newTasks
    }
  }

  const updateLocalStorage = () => {
    localStorage?.setItem('todos', JSON.stringify(tasks.value))
  }

  type ApiCall = 'update' | 'fetch'
  const apiCall = async (route: ApiCall = 'fetch') => {
    const session = useSessionStore()
    if (!session.isVerified) {
      console.error('User is not verified')
      return
    }
    const token = session.getToken()
    const deviceId = session.deviceId

    const body = {
      deviceId,
      token,
      tasks: tasks.value
    }
    console.log('Sending request to /api/task/' + route, body)

    // Call the API to update the tasks
    return await $fetch(`/api/task/${route}`,
      {
        method: 'POST',
        body: body
      })
      .then((response) => {
        console.log('API response:', response)
        return response
      })
      .then((response) => {
        if (route === 'fetch') {
          if (!response.tasks) {
            console.error('Tasks not found')
            return
          }
          return mergeTasks(response.tasks)
        } else {
          console.log('Tasks updated successfully')
        }
      })
  }

  const getFromApi = async () => {
    apiCall('fetch')
  }

  const add = (title: string, dueDate: Date, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const createdDate = new Date()
    const randomId = Math.random().toString(36).substring(7)

    const newTask: Task = {
      taskId: randomId,
      title: title,
      deleted: false,
      completed: false,
      createdDate: createdDate,
      dueDate: dueDate,
      priority: priority
    }
    tasks.value = [newTask, ...tasks.value]

    // Call the API to update the tasks on the server
    apiCall('update')

    return randomId
  }

  const addFromTitle = (title: string) => add(title, new Date())

  /**
   * Merge new tasks with existing tasks
   * based on the taskId
   * @param newTasks
   */
  const mergeTasks = (newTasks: Task[]) => {
    // Convert dates to Date objects
    newTasks = newTasks
      .map((task) => {
        task.createdDate = new Date(task.createdDate)
        task.dueDate = task.dueDate ? new Date(task.dueDate) : undefined
        return task
      })
    const mergedTasks = tasks.value
    for (const newTask of newTasks) {
      const taskIndex = mergedTasks.findIndex((task) => task.taskId === newTask.taskId)
      if (taskIndex === -1) {
        mergedTasks.push(newTask)
      } else {
        mergedTasks[taskIndex] = newTask
      }
    }
    tasks.value = mergedTasks
  }

  const remove = (id: string) => {
    tasks.value = tasks.value.map((task) => {
      if (task.taskId === id) {
        task.deleted = true
      }
      return task
    })
    console.log('todos.value', tasks.value)
  }

  const complete = (id: string, completed = true) => {
    const todoIndex = tasks.value.findIndex(todo => todo.taskId === id)
    if (todoIndex === -1) {
      console.error('Task not found')
      return
    }

    tasks.value[todoIndex].completed = completed
  }

  const sort = () => {
    tasks.value = tasks.value
      .toSorted((a, b) => a.priority === b.priority ? 0 : a.priority === 'high' ? -1 : 1)
      .toSorted((a, b) => a.dueDate?.getTime() - b.dueDate?.getTime())
      .toSorted((a, b) => a.createdDate.getDate() - b.createdDate.getDate())
      .toSorted((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1)
  }

  const rankBy = (query: string) => {
    if (query.trim() === '') {
      console.error('Query is empty')
      return
    }

    const ltfRanker = useLTf('rank')
    ltfRanker.ondatacallback.value = function(data: unknown) {
      tasks.value = tasks.value.toSorted((a: unknown, b: unknown) => {
        if (!Array.isArray(data)) {
          console.error('Data is not an array')
          return 0
        }

        const aRank = data.find((d: unknown) => (d as { text: string }).text === (a as Task).title)?.score ?? 0
        const bRank = data.find((d: unknown) => (d as { text: string }).text === (b as Task).title)?.score ?? 0
        console.log('aRank', aRank, 'bRank', bRank)
        return bRank - aRank
      })
    }
    ltfRanker.startTask({
      query: query,
      documents: tasks.value.map((todo) => todo.title)
    })

    return ltfRanker.downloadProgress
  }

  // Load todos from localStorage
  getFromLocalStorage()
  apiCall('fetch')
    .then(() => {
      watch(tasks, async () => {
        updateLocalStorage()
        apiCall('update')
      }, { deep: true })
    })

  return {
    tasks, nonDeletedTasks,
    rankBy,
    add,
    getFromApi,
    addFromTitle,
    sort
  }
})

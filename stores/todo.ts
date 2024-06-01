import { defineStore } from 'pinia'
import type { Todo } from '~/types/todo'
import type { LTfDocumentRanking } from '~/utils/ltf/getLTfDocumentRanking'

const localStorage = import.meta.server ? null : window.localStorage

export const useTodoStore = defineStore('todo', () => {
  const todos = useState('todos', () => [] as Todo[])

  // Load todos from localStorage
  const todosFromStorageStr = localStorage?.getItem('todos')
  if (todosFromStorageStr) {
    const newTodos = [] as Todo[]
    const todosFromStorage = JSON.parse(todosFromStorageStr) as Todo[]
    for (const todo of todosFromStorage) {
      todo.id = todo.id ?? Math.random().toString(36).substring(7)
      todo.title = todo.title ?? ''
      todo.priority = todo.priority ?? 'medium'
      todo.completed = todo.completed ?? false
      todo.dueDate = todo.dueDate ? new Date(todo.dueDate) : undefined
      todo.createdDate = new Date(todo.createdDate)

      newTodos.push(todo)
    }
    todos.value = newTodos
  }

  const updateLocalStorage = () => {
    localStorage?.setItem('todos', JSON.stringify(todos.value))
  }

  const addTodo = (title: string, dueDate: Date, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const createdDate = new Date()
    const randomId = Math.random().toString(36).substring(7)

    const newTodo: Todo = {
      id: randomId,
      title: title,
      completed: false,
      createdDate: createdDate,
      dueDate: dueDate,
      priority: priority
    }
    todos.value.push(newTodo)
    return randomId
  }

  const addTodoFromTitle = (title: string) => addTodo(title, new Date())

  const removeTodo = (id: string) => {
    todos.value = todos.value.filter(todo => todo.id !== id)
    console.log('todos.value', todos.value)
  }

  const completeTodo = (id: string, completed = true) => {
    const todoIndex = todos.value.findIndex(todo => todo.id === id)
    if (todoIndex === -1) {
      console.error('Todo not found')
      return
    }

    todos.value[todoIndex].completed = completed
  }

  const sort = () => {
    todos.value = todos.value
      .toSorted((a, b) => a.createdDate.getDate() - b.createdDate.getDate())
      .toSorted((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1)
  }

  const rankBy = (query: string) => {
    if (query.trim() === '') {
      console.error('Query is empty')
      return
    }

    const ltfRanker = useLTf('rank')
    ltfRanker.ondatacallback.value = (data: LTfDocumentRanking[]) => {
      todos.value = todos.value.toSorted((a: Todo, b: Todo) => {
        const aRank = data.find((d) => d.text === a.title)?.score ?? 0
        const bRank = data.find((d) => d.text === b.title)?.score ?? 0
        console.log('aRank', aRank, 'bRank', bRank)
        return bRank - aRank
      })
    }
    ltfRanker.startTask({
      query: query,
      documents: todos.value.map((todo) => todo.title)
    })
  }

  watch(todos, updateLocalStorage, { deep: true })

  return { todos, rankBy, addTodo, addTodoFromTitle, completeTodo, removeTodo, sort }
})

import { defineStore } from 'pinia'
import type { Todo } from '~/types/todo'
import pino from 'pino'

const logger = pino(
  {
    levelComparison: 'DESC',
    msgPrefix: '[todo] '
  }
)

const localStorage = import.meta.server ? null : window.localStorage

export const useTodoStore = defineStore('todo', () => {
  const todosMap = useState('todosMap', () => new Map<string, Todo>())

  // Load todos from localStorage
  const todosFromStorage = localStorage?.getItem('todos')
  if (todosFromStorage) {
    const todos = JSON.parse(todosFromStorage) as Todo[]
    for (const todo of todos) {
      todo.title = todo.title ?? ''
      todo.priority = todo.priority ?? 'medium'
      todo.completed = todo.completed ?? false
      todo.dueDate = todo.dueDate ? new Date(todo.dueDate) : undefined
      todo.createdDate = new Date(todo.createdDate)

      const id = todo.createdDate.getTime().toString()
      todosMap.value.set(id, todo)
    }
    logger.info('Loaded todos from localStorage:', todosMap.value)
  }

  const todosList = computed(() => Array.from(todosMap.value.values()))

  const saveTodos = () => {
    localStorage?.setItem('todos', JSON.stringify(todosList.value))
  }

  const addTodo = (title: string, dueDate: Date, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const createdDate = new Date()
    const id = createdDate.getTime().toString()

    todosMap.value.set(id, {
      title: title,
      completed: false,
      createdDate: createdDate,
      dueDate: dueDate,
      priority: priority
    } as Todo)

    // Save to localStorage
    saveTodos()

    return id
  }

  const addTodoFromTitle = (title: string) => addTodo(title, new Date())

  const removeTodo = (id: string): boolean => {
    return todosMap.value.delete(id)
  }

  const completeTodo = (id: string, completed = true) => {
    const todo = todosMap.value.get(id)
    if (!todo) {
      return
    }

    todo.completed = completed

    // Save to localStorage
    saveTodos()
  }

  return { todosMap, addTodo, addTodoFromTitle, completeTodo, removeTodo }
})

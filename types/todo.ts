export type Todo = {
  id: string
  description: string
  dueDate?: string
  priority: number
  done: boolean
  children: Todo[]
}

export const defaultTodo: Todo = {
  description: 'Clean up room',
  priority: 1,
  done: false,
  children: [],
  id: '0',
}

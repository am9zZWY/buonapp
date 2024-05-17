export type Todo = {
  description: string
  dueDate: string
  priority: number
  children: Todo[]
}

export const defaultTodo: Todo = {
  description: 'Clean up room',
  dueDate: 'today',
  priority: 1,
  children: []
}

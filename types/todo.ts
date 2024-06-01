export type Todo = {
  id: string
  title: string
  completed: boolean
  createdDate: Date
  dueDate?: Date | undefined
  priority: 'low' | 'medium' | 'high'
}

export const defaultTodo: Todo = {
  id: '0',
  title: 'Clean up room',
  completed: false,
  createdDate: new Date(),
  priority: 'medium',
}

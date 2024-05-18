export type Todo = {
  title: string
  completed: boolean
  createdDate: Date
  dueDate?: Date | undefined
  priority: 'low' | 'medium' | 'high'
}

export const defaultTodo: Todo = {
  title: 'Clean up room',
  completed: false,
  createdDate: new Date(),
  priority: 'medium',
}

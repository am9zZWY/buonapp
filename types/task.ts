export type Task = {
  taskId: string
  title: string
  completed: boolean
  createdDate: Date
  dueDate?: Date | undefined
  priority: 'low' | 'medium' | 'high'
}

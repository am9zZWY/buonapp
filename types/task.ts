export type Task = {
  taskId: string
  title: string
  deleted?: boolean
  completed: boolean
  createdDate: Date
  dueDate?: Date
  priority: 'low' | 'medium' | 'high'
}

import { defineEventHandler } from 'h3'
import { Task } from '~/models/task'
import { randomBytes } from 'node:crypto'
import { z } from 'zod'

const UpdateTaskSchema = z.object({
  deviceId: z.string(),
  token: z.string(),
  tasks: z.array(z.object({
    title: z.string(),
    dueDate: z.string().datetime(),
    priority: z.enum(['low', 'medium', 'high'])
  }))
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => UpdateTaskSchema.parse(body))

  const { deviceId, token, tasks } = body

  // Send request to /api/session/verify to verify the session
  const verificationBody = {
    deviceId,
    token
  }
  const verifySessionResponse = await $fetch('/api/session/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: verificationBody
  })
  if (verifySessionResponse.status !== 'success') {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const userId = verifySessionResponse.userId

  const newTasks = tasks.map(task => ({
    userId,
    id: randomBytes(16).toString('hex'),
    title: task.title,
    completed: false,
    createdDate: new Date(),
    dueDate: task.dueDate,
    priority: task.priority
  }))

  await Task.insertMany(newTasks)

  return { message: 'Task added successfully', tasks: newTasks }
})

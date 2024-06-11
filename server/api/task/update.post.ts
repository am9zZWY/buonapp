import { defineEventHandler } from 'h3'
import { z } from 'zod'
import useMongo from '~/composables/db/useMongo'

const UpdateTaskSchema = z.object({
  deviceId: z.string(),
  token: z.string(),
  tasks: z.array(z.object({
    taskId: z.string(),
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
  const randomId = Math.random().toString(36).substring(7)

  const newTasks = tasks.map(task => ({
    taskId: task.taskId || randomId,
    userId,
    title: task.title,
    completed: false,
    createdDate: new Date(),
    dueDate: new Date(task.dueDate),
    priority: task.priority
  }))

  const bulkOps = newTasks.map(task => ({
    updateOne: {
      filter: { taskId: task.taskId },
      update: { $set: task },
      upsert: true
    }
  }))

  const db = await useMongo('buonapp')
  const result = await db.collection('tasks').bulkWrite(bulkOps)

  return { message: 'Task added successfully', tasks: newTasks }
})

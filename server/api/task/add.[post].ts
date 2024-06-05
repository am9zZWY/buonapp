import { defineEventHandler } from 'h3'
import { Task } from '~/models/task'
import { randomBytes } from 'node:crypto'
import { z } from 'zod'

const addTaskSchema = z.object({
  userId: z.string(),
  token: z.string(),
  title: z.string(),
  dueDate: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high'])
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => addTaskSchema.parse(body))

  const { userId, title, dueDate, priority, token } = body

  // Send request to /api/session/verify to verify the session
  const verifySessionResponse = await $fetch('/api/session/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, token })
  })
  if (verifySessionResponse.message !== 'Session verified') {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const newTask = {
    id: randomBytes(16).toString('hex'),
    title,
    completed: false,
    createdDate: new Date(),
    dueDate,
    priority
  }

  await Task.updateOne(
    { userId },
    { $push: { tasks: newTask } },
    { upsert: true }
  )

  return { message: 'Task added successfully', task: newTask }
})

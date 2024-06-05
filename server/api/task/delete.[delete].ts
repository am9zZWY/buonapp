import { defineEventHandler } from 'h3'
import { Task } from '~/models/task'
import { z } from 'zod'

const deleteTaskSchema = z.object({
  userId: z.string(),
  token: z.string(),
  taskId: z.string()
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => deleteTaskSchema.parse(body))

  const { userId, token, taskId } = body

  // Send request to /api/session/verify to verify the session
  const verifySessionResponse = await fetch('/api/session/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, token })
  })
  if (verifySessionResponse.status !== 200) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const result = await Task.updateOne(
    { userId },
    { $pull: { tasks: { id: taskId } } }
  )

  if (result.modifiedCount === 0) {
    throw createError({ statusCode: 404, message: 'Task not found' })
  }

  return { message: 'Task deleted successfully' }
})

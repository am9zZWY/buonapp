import { defineEventHandler } from 'h3'
import { Task } from '~/models/task'
import { z } from 'zod'

const getTasksSchema = z.object({
  userId: z.string()
})

export default defineEventHandler(async (event) => {
  // Get cookie from request headers
  const token = getCookie(event, 'token')
  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  // Get user ID from request query
  const query = await getValidatedQuery(event, (query) => getTasksSchema.parse(query))
  const { userId } = query

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

  const userTasks = await Task.findOne({ userId })

  if (!userTasks) {
    return { tasks: [] }
  }

  return { tasks: userTasks.tasks }
})

import { defineEventHandler } from 'h3'
import { Task } from '~/models/task'
import { z } from 'zod'

const FetchTaskSchema = z.object({
  deviceId: z.string(),
  token: z.string()
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => FetchTaskSchema.parse(body))

  const { deviceId, token } = body

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

  const userTasks = await Task.find({ userId })

  if (!userTasks) {
    return { tasks: [] }
  }

  return { tasks: userTasks }
})

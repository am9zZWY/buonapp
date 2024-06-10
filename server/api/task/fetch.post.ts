import { defineEventHandler } from 'h3'
import { z } from 'zod'
import useMongo from '~/composables/db/useMongo'

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
  const db = await useMongo('buonapp')
  const userTasks = await db.collection('tasks').find({ userId }).toArray()

  if (!userTasks.length) {
    return { tasks: [] }
  }

  return { tasks: userTasks }
})

import { Session } from '~/models/session'
import { z } from 'zod'

const sessionSchema = z.object({
  token: z.string(),
  deviceId: z.string()
})

// Verify a new device
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, body => sessionSchema.parse(body))
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body'
    })
  }

  const { token, deviceId } = body

  const session = await Session.findOne({ token })

  if (session) {
    // Assume user accepts the new device via another device session
    session.devices.push(deviceId)
    await session.save()
    return {
      message: 'Device verified'
    }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Session not found'
    })
  }
})

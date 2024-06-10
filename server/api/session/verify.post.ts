import { Session } from '~/models/session'
import { z } from 'zod'
import useMongoose from '~/composables/db/useMongoose'

const sessionSchema = z.object({
  token: z.string(),
  deviceId: z.string()
})

// Verify a new device
export default defineEventHandler(async (event) => {
  await useMongoose()

  const body = await readValidatedBody(event, body => sessionSchema.parse(body))
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body'
    })
  }

  const { token, deviceId } = body

  const session = await Session
    .findOne({ token })

  if (session) {
    // Set cookie with the session token and device ID
    setCookie(event, 'token', session.token)
    setCookie(event, 'deviceId', deviceId)

    // Check if the device is already verified
    if (session.devices.includes(deviceId)) {
      return {
        status: 'success',
        message: 'Device already verified',
        userId: session.userId
      }
    }

    // TODO: Add the device to the to-be-verified devices
    session.devices.push(deviceId)

    await session.save()
    return {
      status: 'success',
      message: 'Device verified',
      userId: session.userId
    }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Session not found'
    })
  }
})

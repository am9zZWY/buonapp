import { z } from 'zod'
import useMongo from '~/composables/db/useMongo'

const sessionSchema = z.object({
  token: z.string(),
  deviceId: z.string()
})

// Verify a new device
export default defineEventHandler(async (event) => {
  const db = await useMongo('buonapp')

  const body = await readValidatedBody(event, (body) => sessionSchema.parse(body))
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request body'
    })
  }

  const { token, deviceId } = body

  const session = await db.collection('sessions').findOne({ token })

  if (session) {
    // Set cookie with the session token and device ID
    setCookie(event, 'token', session.token)
    setCookie(event, 'deviceId', deviceId)

    // Check if the device is already verified
    if (session.devices.includes(deviceId)) {
      return {
        status: 'success',
        message: 'Device already verified',
        userId: (session.userId || '') as string
      }
    }

    // Add the device to the verified devices
    await db.collection('sessions')
      .updateOne(
        { token },
        { $push: { devices: deviceId } }
      )

    return {
      status: 'success',
      message: 'Device verified',
      userId: (session.userId || '') as string
    }
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Session not found'
    })
  }
})

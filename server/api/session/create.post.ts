import { z } from 'zod'
import { Session } from '~/models/session'
import { randomBytes } from 'node:crypto'
import useMongoose from '~/composables/db/useMongoose'


const sessionSchema = z.object({
  userId: z.string().optional(),
  deviceId: z.string().optional()
})


// Create a new session for the user
export default defineEventHandler(async (event) => {
  await useMongoose({ immediate: true })

  console.log('Creating a new session')
  const body = await readValidatedBody(event, (body) => sessionSchema.parse(body))

  const { userId, deviceId } = body ?? { userId: undefined, deviceId: undefined }
  console.log('User ID:', userId)

  // Generate a new device ID if not provided
  const newDeviceId = deviceId || randomBytes(32).toString('hex')

  // Check if the user ID is provided
  if (userId && newDeviceId) {
    // ... and if the user already has a session
    const existingSession = await Session
      .findOne({ userId })
      .populate('devices')

    // Add the new device to the user's session
    if (existingSession) {
      existingSession.devices.push(newDeviceId)
      await existingSession.save()

      // Set cookie with the session token
      setCookie(event, 'token', existingSession.token)

      return {
        message: 'Session updated',
        token: existingSession.token,
        userId,
        deviceId: newDeviceId
      }
    }
  }

  // Generate a new user ID if not provided
  const newUserId = userId || randomBytes(32).toString('hex')

  // Generate a new session token
  const token = randomBytes(256).toString('hex')

  const session = new Session({ userId: newUserId, token, devices: [newDeviceId] })
  await session.save()

  // Set cookie with the session token
  setCookie(event, 'token', token)

  return {
    message: 'Session created',
    token,
    userId: newUserId,
    deviceId: newDeviceId
  }
})

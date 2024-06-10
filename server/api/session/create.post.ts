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
  await useMongoose()

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

    console.log('Existing session:', existingSession)

    // Add the new device to the user's session
    if (existingSession) {
      existingSession.devices.push(newDeviceId)
      await existingSession.save()

      // Set cookie with the session token and device ID
      setCookie(event, 'deviceId', newDeviceId)
      setCookie(event, 'token', existingSession.token)

      return {
        status: 'success',
        message: 'Session updated',
        userId,
        newDeviceId,
        allDevices: existingSession.devices
      }
    }
  }

  // Generate a new user ID if not provided
  const newUserId = userId || randomBytes(32).toString('hex')

  // Generate a new session token
  const newToken = randomBytes(256).toString('hex')

  const newSession = new Session({ userId: newUserId, token: newToken, devices: [newDeviceId] })
  await newSession.save()

  // Set cookie with the session token
  setCookie(event, 'token', newToken)
  setCookie(event, 'deviceId', newDeviceId)

  return {
    status: 'success',
    message: 'Session created',
    userId: newUserId,
    newDeviceId,
    allDevices: [newDeviceId]
  }
})

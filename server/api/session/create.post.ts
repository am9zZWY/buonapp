import { z } from 'zod'
import useMongo from '~/composables/db/useMongo'
import type { Db } from 'mongodb'
import { randomBytes } from 'node:crypto'


const sessionSchema = z.object({
  userId: z.string().optional(),
  deviceId: z.string().optional()
})

const createSession = async (db: Db, deviceId: string, userId?: string) => {
  const randomId = randomBytes(32).toString('hex')
  const newUserId = userId ?? randomId
  const newToken = randomBytes(32).toString('hex')
  const newSession = {
    userId: newUserId,
    token: newToken,
    devices: [deviceId]
  }
  await db.collection('sessions').insertOne(newSession)
  return newSession
}

export default defineEventHandler(async (event) => {
  console.log('Creating a new session ...')

  // Connect to the MongoDB cluster
  const db = await useMongo('buonapp')

  // Parse the request body
  const body = await readValidatedBody(event, (body) => sessionSchema.parse(body))
  const { userId, deviceId } = body ?? { userId: undefined, deviceId: undefined }
  console.debug('[create.post]: user ID:' + userId + ', device ID:' + deviceId)

  const newDeviceId = deviceId ?? randomBytes(32).toString('hex')

  if (userId && newDeviceId) {
    const existingSession = await db.collection('sessions').findOne({ userId })

    console.debug('[create.post]: There is an existing session for user ID: ' + userId)

    if (existingSession) {
      await db.collection('sessions').updateOne(
        { userId },
        { $push: { devices: newDeviceId } }
      )

      setCookie(event, 'deviceId', newDeviceId)
      setCookie(event, 'token', existingSession.token)

      return {
        status: 'success',
        message: 'Session updated',
        userId,
        newDeviceId,
        allDevices: existingSession.devices.concat(newDeviceId)
      }
    } else {
      console.error('[create.post]: There is no existing session for user ID: ' + userId)
      return {
        status: 'error',
        message: 'User ID provided but no existing session found'
      }
    }
  }

  const newSession = await createSession(db, newDeviceId, userId)

  setCookie(event, 'token', newSession.token)
  setCookie(event, 'deviceId', newDeviceId)

  return {
    status: 'success',
    message: 'Session created',
    userId: newSession.userId,
    newDeviceId: newDeviceId,
    allDevices: newSession.devices
  }
})

import { z } from 'zod'
import useMongo from '~/composables/db/useMongo'
import type { Db } from 'mongodb'

const sessionSchema = z.object({
  userId: z.string().optional(),
  deviceId: z.string().optional()
})

const createSession = async (db: Db, userId: string, deviceId: string) => {
  const newUserId = userId || Math.random().toString(36).substring(7)
  const newToken = Math.random().toString(36).substring(7)
  const newSession = {
    userId: newUserId,
    token: newToken,
    devices: [deviceId]
  }
  await db.collection('sessions').insertOne(newSession)
  return newSession
}

export default defineEventHandler(async (event) => {
  const db = await useMongo('buonapp')

  console.log('Creating a new session')
  const body = await readValidatedBody(event, (body) => sessionSchema.parse(body))

  const { userId, deviceId } = body ?? { userId: undefined, deviceId: undefined }
  console.log('User ID:', userId)

  const newDeviceId = deviceId || randomBytes(32).toString('hex')

  if (userId && newDeviceId) {
    const existingSession = await db.collection('sessions').findOne({ userId })

    console.log('Existing session:', existingSession)

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
    }
  }

  const newSession = await createSession(db, userId, newDeviceId)

  setCookie(event, 'token', newSession.token)
  setCookie(event, 'deviceId', newDeviceId)

  return {
    status: 'success',
    message: 'Session created',
    userId: newSession.userId,
    newDeviceId,
    allDevices: newSession.devices
  }
})

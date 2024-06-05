import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const token = useState('token', () => '')
  const id = useState('id', () => '')
  const devices = useState<string[]>('devices', () => [])
  const isVerified = useState('isVerified', () => false)
  const isCreated = useState('isCreated', () => false)

  async function createSession(userId?: string, deviceId?: string) {
    const response = await $fetch('/api/session/create', {
      method: 'POST',
      body: JSON.stringify({ userId, deviceId })
    })

    if (response.token) {
      token.value = response.token
      id.value = response.userId
      devices.value = [response.deviceId]
    }

    if (response.message === 'Session created') {
      isCreated.value = true
    }

    return isCreated.value
  }

  async function verifyDevice(token: string, deviceId: string) {
    const response = await $fetch('/api/session/verify', {
      method: 'POST',
      body: JSON.stringify({ token, deviceId })
    })

    if (response.message === 'Device verified') {
      return true
    }
  }

  return {
    isCreated,
    isVerified,
    createSession,
    verifyDevice
  }
})

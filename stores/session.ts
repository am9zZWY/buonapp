import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', () => {
  const buonappId = useState('id', () => '')
  const deviceId = useState('deviceId', () => '')
  const isVerified = useState('isVerified', () => false)
  const isCreated = useState('isCreated', () => false)

  async function createSession(userId?: string) {
    const response = await $fetch('/api/session/create', {
      method: 'POST',
      body: JSON.stringify({ userId })
    })

    if (response.status === 'success') {
      buonappId.value = response.userId
      isCreated.value = true
      isVerified.value = true
      deviceId.value = response.newDeviceId

      return true
    }

    return false
  }

  async function verifySession() {
    // Read the token from the cookie
    const cookieToken = getToken()
    console.log('Cookie token:', cookieToken)
    if (!cookieToken) {
      console.log('No token provided. Please create a session first.')
      return false
    }

    // Read the device ID from cookie
    const cookieDeviceId = useCookie('deviceId').value || deviceId.value || ''
    console.log('Cookie device ID:', cookieDeviceId)
    if (!cookieDeviceId) {
      console.log('No device ID provided. Please create a session first.')
      return false
    }


    const response = await $fetch('/api/session/verify', {
      method: 'POST',
      body: JSON.stringify({ token: cookieToken, deviceId: cookieDeviceId })
    })
    console.log('Response:', response)

    if (response.status === 'success') {
      console.log('Device verified')
      isVerified.value = true
      buonappId.value = response.userId
      deviceId.value = cookieDeviceId
      return true
    }
  }

  /**
   * Get the token from the cookie
   */
  const getToken = () => {
    return useCookie('token').value || ''
  }

  verifySession().catch((error) => {
    console.error('Error verifying session:', error)
  })

  return {
    buonappId,
    deviceId,
    isCreated,
    isVerified,
    getToken,
    createSession,
    verifySession
  }
})

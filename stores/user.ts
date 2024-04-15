import type { User } from '~/types/user'

export const useUserStore = defineStore('user', () => {
  const user: User = reactive({
    name: 'Guest',
    email: '',
    loggedIn: false
  })

  const login = async (name: string) => {
    user.name = name
    user.loggedIn = true

    $fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ name })
    })
  }

  const logout = () => {
    user.name = 'Guest'
    user.loggedIn = false
  }

  const createAccount = async (name: string, email: string) => {
    user.name = name

    $fetch('/api/user/create', {
      method: 'POST',
      body: JSON.stringify({ name, email })
    })
  }

  return { user, login }
})

import { defineStore } from 'pinia'

interface Ability {
  action: string
  subject: string
}

interface User {
  id: string | number
  userName: string
  nameUser?: string
  email: string
  rol?: string
  status?: string
  changePass?: boolean
  createdAt?: string
  updatedAt?: string
  token?: string
  abilities: Ability[]
}

export const useAuthStore = defineStore('auth', () => {
  const user = useCookie<User | null>('user_data', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })
  const accessToken = useCookie('access_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })

  const isLoggedIn = computed(() => {
    return !!accessToken.value
  })

  function setAccessToken(token: string) {
    accessToken.value = token
  }

  function setUser(userData: User | null) {
    user.value = userData
    
    // Update CASL ability
    const { $ability } = useNuxtApp()
    if ($ability && userData?.abilities) {
      $ability.update(userData.abilities)
    } else if ($ability) {
      $ability.update([])
    }
  }

  async function logout() {
    const { post } = useApi()
    const { projectConfig } = await import('~/project.config')
    
    try {
      if (!projectConfig.auth.useMock) {
        // Use skipInterceptor to prevent infinite loops if the session is already invalid
        await post('/users/logout', {}, { skipInterceptor: true })
      }
    } catch (error) {
      console.error('Logout API failed:', error)
    } finally {
      // Always clear local state regardless of API success
      accessToken.value = null
      user.value = null
      navigateTo('/login')
    }
  }

  return {
    user,
    accessToken,
    isLoggedIn,
    setAccessToken,
    setUser,
    logout
  }
})

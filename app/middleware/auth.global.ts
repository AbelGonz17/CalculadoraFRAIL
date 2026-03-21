import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Use a direct cookie check as fallback for the middleware
  const token = useCookie('access_token')
  const isActuallyLoggedIn = !!token.value || authStore.isLoggedIn

  // If user is not logged in and tries to access a restricted page
  if (!isActuallyLoggedIn && to.path !== '/login') {
    return navigateTo('/login')
  }

  // If user is logged in and tries to access login page
  if (isActuallyLoggedIn && to.path === '/login') {
    return navigateTo('/')
  }
})

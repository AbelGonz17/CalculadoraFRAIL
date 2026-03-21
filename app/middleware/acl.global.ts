export default defineNuxtRouteMiddleware((to) => {
  const { $ability } = useNuxtApp()

  // Get required permission from page meta
  const action = to.meta.action as string
  const subject = to.meta.subject as string

  // If no permission is required, let it through
  if (!action || !subject) {
    return
  }

  // Check if user has permission
  if (!$ability.can(action, subject)) {
    console.warn(`Access denied to ${to.path}. Required: ${action} ${subject}`)
    
    // Redirect to home or a specific unauthorized page
    return navigateTo('/')
  }
})

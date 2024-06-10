export default defineNuxtRouteMiddleware((to) => {
  // If the user wants to authenticate
  const session = useSessionStore()

  // ... but is already authenticated
  console.log(session.isCreated)
  if (session.isCreated) {
    return navigateTo('/')
  }

  if (to.path !== '/') {
    return navigateTo('/')
  }
})

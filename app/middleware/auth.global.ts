export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/admin')) return

  const cookie = useCookie('admin_auth')
  if (cookie.value !== 'true') {
    return navigateTo('/login')
  }
})

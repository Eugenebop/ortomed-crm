export default defineNuxtConfig({
  compatibilityDate: '2026-05-26',
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
  supabase: {
    redirect: false
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/icon.png' }
      ]
    }
  }
})
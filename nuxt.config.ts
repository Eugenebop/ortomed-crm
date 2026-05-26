export default defineNuxtConfig({
  compatibilityDate: '2026-05-26',
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
  supabase: {
    redirect: false
  }
})
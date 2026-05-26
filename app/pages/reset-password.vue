<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <h1 class="text-xl font-bold text-gray-900 mb-6">Новый пароль</h1>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Введите новый пароль</label>
        <input v-model="password" type="password" placeholder="минимум 6 символов" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>
      <p v-if="success" class="text-green-500 text-sm mb-4">Пароль изменён! Перенаправляем...</p>
      <button @click="updatePassword" :disabled="success" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50">
        Сохранить пароль
      </button>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const password = ref('')
const error = ref('')
const success = ref(false)

onMounted(async () => {
  const hash = window.location.hash
  const params = new URLSearchParams(hash.slice(1))
  const access_token = params.get('access_token')
  const refresh_token = params.get('refresh_token')

  if (access_token && refresh_token) {
    await supabase.auth.setSession({ access_token, refresh_token })
  }
})

const updatePassword = async () => {
  error.value = ''
  const { error: err } = await supabase.auth.updateUser({ password: password.value })
  if (err) {
    error.value = err.message
    return
  }
  success.value = true
  await supabase.auth.signOut()
  setTimeout(() => window.location.href = '/login', 2000)
}
</script>

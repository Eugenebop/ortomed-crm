<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <h1 class="text-xl font-bold text-gray-900 mb-2">Личный кабинет</h1>
      <p class="text-sm text-gray-500 mb-6">Ortomed</p>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input v-model="email" type="email" placeholder="your@email.com" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
        <input v-model="password" type="password" placeholder="••••••" @keyup.enter="login" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>
      <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>
      <button @click="login" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors">
        Войти
      </button>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  error.value = ''
  const { error: err } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (err) {
    error.value = 'Неверный email или пароль'
    return
  }
  window.location.href = '/lk'
}
</script>

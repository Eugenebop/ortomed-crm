<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <h1 class="text-xl font-bold text-gray-900 mb-6">Вход в систему</h1>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
        <input
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            @keyup.enter="login"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <p v-if="error" class="text-red-500 text-sm mb-4">Неверный пароль</p>
      <button
          @click="login"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors"
      >
        Войти
      </button>
    </div>
  </div>
</template>

<script setup>
const password = ref('')
const error = ref(false)

const login = async () => {
  const { data } = await useFetch('/api/login', {
    method: 'POST',
    body: { password: password.value }
  })
  if (data.value?.ok) {
    await navigateTo('/admin')
  } else {
    error.value = true
  }
}
</script>
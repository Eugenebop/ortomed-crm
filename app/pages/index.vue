<template>
  <div class="min-h-screen bg-white">

    <nav class="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">О</div>
        <span class="font-semibold text-gray-900">Ortomed</span>
      </div>

      <a v-if="!patient" href="/login" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
        Войти
      </a>

      <div v-else class="relative">
        <button @click="menuOpen = !menuOpen" class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
          <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {{ patient.name[0] }}
          </div>
          <span class="text-sm font-medium text-gray-900">{{ patient.name }}</span>
          <span class="text-gray-400 text-xs">▾</span>
        </button>

        <div v-if="menuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
          <a href="/lk" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            👤 Личный кабинет
          </a>
          <button @click="logout" class="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-gray-50">
            Выйти
          </button>
        </div>
      </div>
    </nav>

    <div class="max-w-5xl mx-auto px-6 py-20 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Ортопедическая клиника<br>для детей и взрослых</h1>
      <p class="text-lg text-gray-500 mb-8 max-w-xl mx-auto">Профессиональная помощь ортопеда и реабилитолога. Индивидуальный подход к каждому пациенту.</p>
      <a v-if="!patient" href="/login" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-colors text-lg">
        Личный кабинет
      </a>
    </div>

    <div class="max-w-5xl mx-auto px-6 py-12">
      <h2 class="text-2xl font-bold text-gray-900 text-center mb-10">Наши услуги</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="bg-blue-50 rounded-2xl p-6">
          <div class="text-3xl mb-3">🦴</div>
          <h3 class="font-semibold text-gray-900 mb-2">Ортопедия</h3>
          <p class="text-sm text-gray-500">Диагностика и лечение нарушений опорно-двигательного аппарата у детей и взрослых.</p>
        </div>
        <div class="bg-green-50 rounded-2xl p-6">
          <div class="text-3xl mb-3">💪</div>
          <h3 class="font-semibold text-gray-900 mb-2">Реабилитация</h3>
          <p class="text-sm text-gray-500">Индивидуальные программы восстановления после травм и операций.</p>
        </div>
        <div class="bg-purple-50 rounded-2xl p-6">
          <div class="text-3xl mb-3">👶</div>
          <h3 class="font-semibold text-gray-900 mb-2">Детская ортопедия</h3>
          <p class="text-sm text-gray-500">Специализированная помощь детям с нарушениями осанки и развития.</p>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 mt-12 py-12">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Контакты</h2>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <div class="bg-white rounded-xl p-6 flex-1 max-w-xs mx-auto">
            <div class="text-2xl mb-2">📍</div>
            <p class="font-medium text-gray-900">Адрес</p>
            <p class="text-sm text-gray-500 mt-1">ул. Примерная, 123, Батуми</p>
          </div>
          <div class="bg-white rounded-xl p-6 flex-1 max-w-xs mx-auto">
            <div class="text-2xl mb-2">📞</div>
            <p class="font-medium text-gray-900">Телефон</p>
            <p class="text-sm text-gray-500 mt-1">+995 555 000 000</p>
          </div>
          <div class="bg-white rounded-xl p-6 flex-1 max-w-xs mx-auto">
            <div class="text-2xl mb-2">🕐</div>
            <p class="font-medium text-gray-900">Часы работы</p>
            <p class="text-sm text-gray-500 mt-1">Пн-Пт: 9:00 — 18:00</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const patient = ref(null)
const menuOpen = ref(false)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data } = await supabase.from('patients').select('name').eq('user_id', user.id).single()
  patient.value = data
})

const logout = async () => {
  await supabase.auth.signOut()
  patient.value = null
  menuOpen.value = false
}
</script>

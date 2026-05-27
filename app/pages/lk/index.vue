<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div v-if="patient" class="w-full max-w-sm">

      <div class="bg-white rounded-2xl shadow-lg p-6 mb-4">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
              {{ patient.name[0] }}
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">{{ patient.name }}</h1>
              <p class="text-sm text-gray-500">{{ patient.parent_names }}</p>
            </div>
          </div>
          <div class="flex flex-col items-end gap-1">
            <a href="/" class="text-xs text-blue-500 hover:text-blue-700">На сайт</a>
            <button @click="logout" class="text-xs text-gray-400 hover:text-gray-600">Выйти</button>
          </div>
        </div>
        <a :href="`https://wa.me/${patient.phone}`" class="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-colors">
          📞 Связаться с администратором
        </a>
      </div>

      <!-- Абонемент -->
      <div v-if="subscription" class="bg-white rounded-2xl shadow-lg p-6 mb-4">
        <h2 class="text-base font-semibold text-gray-800 mb-4">Абонемент</h2>
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">План</span>
            <span class="font-medium text-gray-900">{{ subscription.plan }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Период</span>
            <span class="font-medium text-gray-900">{{ formatDateShort(subscription.starts_at) }} — {{ formatDateShort(subscription.ends_at) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Цена</span>
            <span class="font-medium text-gray-900">{{ subscription.price }} ₾</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-green-50 rounded-xl p-3 text-center">
            <p class="text-2xl font-bold text-green-600">{{ stats.visited }}</p>
            <p class="text-xs text-gray-500 mt-1">Посещено</p>
          </div>
          <div class="bg-blue-50 rounded-xl p-3 text-center">
            <p class="text-2xl font-bold text-blue-600">{{ stats.remaining }}</p>
            <p class="text-xs text-gray-500 mt-1">Осталось</p>
          </div>
          <div class="bg-red-50 rounded-xl p-3 text-center">
            <p class="text-2xl font-bold text-red-500">{{ stats.cancelled }}</p>
            <p class="text-xs text-gray-500 mt-1">Отменено</p>
          </div>
          <div class="bg-yellow-50 rounded-xl p-3 text-center">
            <p class="text-2xl font-bold text-yellow-500">{{ stats.pending }}</p>
            <p class="text-xs text-gray-500 mt-1">Ожидает</p>
          </div>
        </div>
      </div>

      <!-- Занятия -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-base font-semibold text-gray-800 mb-4">Занятия</h2>
        <div v-if="appointments.length > 0" class="space-y-3">
          <div v-for="appt in appointments" :key="appt.id" class="border border-gray-100 rounded-xl p-4">
            <p class="font-semibold text-gray-900">{{ formatDate(appt.scheduled_at) }}</p>
            <span class="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium"
              :class="{
                'bg-green-100 text-green-700': appt.status === 'confirmed',
                'bg-yellow-100 text-yellow-700': appt.status === 'pending',
                'bg-red-100 text-red-700': appt.status === 'cancelled',
              }">
              {{ statusLabel(appt.status) }}
            </span>
          </div>
        </div>
        <div v-else class="text-gray-400 text-sm">Занятий не запланировано</div>
      </div>
    </div>

    <div v-else-if="inactive" class="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm w-full">
      <div class="text-4xl mb-4">🔒</div>
      <h2 class="text-lg font-semibold text-gray-800 mb-2">Доступ закрыт</h2>
      <p class="text-sm text-gray-500">Обратитесь к администратору</p>
      <a href="/" class="mt-4 inline-block text-sm text-blue-500 hover:text-blue-700">← На главную</a>
    </div>

    <div v-else-if="loading" class="text-gray-400">Загрузка...</div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const patient = ref(null)
const appointments = ref([])
const subscription = ref(null)
const loading = ref(true)
const inactive = ref(false)

const stats = computed(() => {
  const total = subscription.value?.total_sessions || 0
  const visited = appointments.value.filter(a => a.status === 'confirmed' && new Date(a.scheduled_at) < new Date()).length
  const cancelled = appointments.value.filter(a => a.status === 'cancelled').length
  const pending = appointments.value.filter(a => a.status === 'pending').length
  const remaining = Math.max(0, total - visited)
  return { visited, cancelled, pending, remaining }
})

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { window.location.href = '/login'; return }

  const { data: p } = await supabase.from('patients').select('*').eq('user_id', user.id).single()
  if (!p) { window.location.href = '/login'; return }

  if (p.active === false) { inactive.value = true; loading.value = false; return }

  patient.value = p
  loading.value = false

  const { data: sub } = await supabase.from('subscriptions').select('*').eq('patient_id', p.id).order('created_at', { ascending: false }).limit(1).single()
  subscription.value = sub || null

  const { data: appts } = await supabase.from('appointments').select('*').eq('patient_id', p.id).gte('scheduled_at', new Date().toISOString()).order('scheduled_at', { ascending: true })
  appointments.value = appts || []
})

const logout = async () => {
  await supabase.auth.signOut()
  window.location.href = '/'
}

const formatDate = (dt) => new Date(dt).toLocaleString('ru-RU', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' })
const formatDateShort = (d) => new Date(d).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
const statusLabel = (s) => ({ pending: 'Ожидает', confirmed: 'Подтверждено', cancelled: 'Отменено' }[s] || s)
</script>

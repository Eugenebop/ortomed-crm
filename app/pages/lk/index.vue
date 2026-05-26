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
const loading = ref(true)
const inactive = ref(false)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    window.location.href = '/login'
    return
  }
  const { data } = await supabase.from('patients').select('*').eq('user_id', user.id).single()
  if (!data) {
    window.location.href = '/login'
    return
  }
  if (data.active === false) {
    inactive.value = true
    loading.value = false
    return
  }
  patient.value = data
  loading.value = false
  const { data: appts } = await supabase
    .from('appointments')
    .select('*')
    .eq('patient_id', data.id)
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
  appointments.value = appts || []
})

const logout = async () => {
  await supabase.auth.signOut()
  window.location.href = '/'
}

const formatDate = (dt) => new Date(dt).toLocaleString('ru-RU', {
  day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'
})

const statusLabel = (s) => ({ pending: 'Ожидает', confirmed: 'Подтверждено', cancelled: 'Отменено' }[s] || s)
</script>

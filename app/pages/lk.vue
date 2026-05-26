<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div v-if="patient" class="w-full max-w-sm">
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-4">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
            {{ patient.name[0] }}
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">{{ patient.name }}</h1>
            <p class="text-sm text-gray-500">{{ patient.parent_names }}</p>
          </div>
        </div>
        <a :href="`https://wa.me/${patient.phone}`" class="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-colors">
          📞 Связаться с администратором
        </a>
      </div>
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-base font-semibold text-gray-800 mb-4">Ближайшее занятие</h2>
        <div v-if="nextAppointment">
          <p class="text-2xl font-bold text-gray-900">{{ formatDate(nextAppointment.scheduled_at) }}</p>
          <span class="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium" :class="{'bg-green-100 text-green-700': nextAppointment.status === 'confirmed', 'bg-yellow-100 text-yellow-700': nextAppointment.status === 'pending', 'bg-red-100 text-red-700': nextAppointment.status === 'cancelled'}">
            {{ statusLabel(nextAppointment.status) }}
          </span>
        </div>
        <div v-else class="text-gray-400 text-sm">Занятий не запланировано</div>
      </div>
    </div>
    <div v-else class="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm w-full">
      <div class="text-4xl mb-4">🔒</div>
      <h2 class="text-lg font-semibold text-gray-800 mb-2">Ссылка недействительна</h2>
      <p class="text-sm text-gray-500">Попросите администратора выслать новую ссылку</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseClient()
const patient = ref(null)
const nextAppointment = ref(null)

onMounted(async () => {
  const token = route.query.token
  if (!token) return
  const { data: link } = await supabase
    .from('magic_links')
    .select('*, patients(*)')
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .single()
  if (!link) return
  patient.value = link.patients
  const { data: appt } = await supabase
    .from('appointments')
    .select('*')
    .eq('patient_id', link.patient_id)
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(1)
    .single()
  nextAppointment.value = appt
})

const formatDate = (dt) => new Date(dt).toLocaleString('ru-RU', {
  day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'
})

const statusLabel = (s) => ({ pending: 'Ожидает', confirmed: 'Подтверждено', cancelled: 'Отменено' }[s] || s)
</script>

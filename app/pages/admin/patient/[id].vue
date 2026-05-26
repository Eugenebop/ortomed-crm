<template>
  <div class="min-h-screen bg-gray-50" v-if="authorized">
    <div class="max-w-3xl mx-auto px-4 py-8">

      <div class="flex items-center gap-3 mb-6">
        <a href="/admin" class="text-gray-400 hover:text-gray-600 text-sm">← Назад</a>
      </div>

      <!-- Инфо о пациенте -->
      <div v-if="patient" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
              {{ patient.name[0] }}
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">{{ patient.name }}</h1>
              <p class="text-sm text-gray-500">{{ patient.parent_names }}</p>
              <p class="text-sm text-gray-500">{{ patient.phone }}</p>
            </div>
          </div>
          <div class="flex flex-col items-end gap-2">
            <span :class="patient.active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-3 py-1 rounded-full text-xs font-medium">
              {{ patient.active !== false ? 'Активен' : 'Неактивен' }}
            </span>
            <button @click="toggleActive" :class="patient.active !== false ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'" class="text-xs font-medium">
              {{ patient.active !== false ? 'Деактивировать' : 'Активировать' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Занятия -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 class="text-base font-semibold text-gray-800">Занятия</h2>
          <button @click="showApptForm = !showApptForm" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
            + Добавить
          </button>
        </div>

        <!-- Форма добавления занятия -->
        <div v-if="showApptForm" class="px-6 py-4 border-b border-gray-100 bg-blue-50">
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Дата и время</label>
              <input v-model="apptForm.scheduled_at" type="datetime-local" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Статус</label>
              <select v-model="apptForm.status" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="pending">Ожидает</option>
                <option value="confirmed">Подтверждено</option>
                <option value="cancelled">Отменено</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Заметка</label>
              <input v-model="apptForm.notes" placeholder="Необязательно" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>
          <div class="flex gap-2 mt-3">
            <button @click="addAppointment" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">Сохранить</button>
            <button @click="showApptForm = false" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">Отмена</button>
          </div>
        </div>

        <!-- Список занятий -->
        <div v-if="appointments.length > 0">
          <div v-for="appt in appointments" :key="appt.id" class="px-6 py-4 border-b border-gray-50 last:border-0">
            <div v-if="editingAppt?.id === appt.id" class="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <input v-model="editingAppt.scheduled_at_local" type="datetime-local" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <select v-model="editingAppt.status" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="pending">Ожидает</option>
                  <option value="confirmed">Подтверждено</option>
                  <option value="cancelled">Отменено</option>
                </select>
              </div>
              <div class="flex gap-2">
                <button @click="saveAppt" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium">Сохранить</button>
                <button @click="editingAppt = null" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium">Отмена</button>
              </div>
            </div>
            <div v-else class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900 text-sm">{{ formatDate(appt.scheduled_at) }}</p>
                <p v-if="appt.notes" class="text-xs text-gray-400 mt-0.5">{{ appt.notes }}</p>
              </div>
              <div class="flex items-center gap-3">
                <span :class="{
                  'bg-green-100 text-green-700': appt.status === 'confirmed',
                  'bg-yellow-100 text-yellow-700': appt.status === 'pending',
                  'bg-red-100 text-red-700': appt.status === 'cancelled',
                }" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ statusLabel(appt.status) }}
                </span>
                <button @click="startEdit(appt)" class="text-xs text-blue-500 hover:text-blue-700">Изменить</button>
                <button @click="deleteAppt(appt.id)" class="text-xs text-red-400 hover:text-red-600">Удалить</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="px-6 py-8 text-center text-gray-400 text-sm">Занятий нет</div>
      </div>

      <div v-if="toast" class="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg">{{ toast }}</div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseClient()
const patient = ref(null)
const appointments = ref([])
const showApptForm = ref(false)
const editingAppt = ref(null)
const toast = ref('')
const authorized = ref(false)
const apptForm = ref({ scheduled_at: '', status: 'confirmed', notes: '' })

onMounted(async () => {
  const hasAuth = document.cookie.includes('admin_auth=true')
  if (!hasAuth) {
    window.location.href = '/admin/login'
    return
  }
  authorized.value = true

  const { data: p } = await supabase.from('patients').select('*').eq('id', route.params.id).single()
  patient.value = p

  await loadAppointments()
})

const loadAppointments = async () => {
  const { data } = await supabase
    .from('appointments')
    .select('*')
    .eq('patient_id', route.params.id)
    .order('scheduled_at', { ascending: true })
  appointments.value = data || []
}

const addAppointment = async () => {
  if (!apptForm.value.scheduled_at) return
  await supabase.from('appointments').insert({
    patient_id: route.params.id,
    scheduled_at: new Date(apptForm.value.scheduled_at).toISOString(),
    status: apptForm.value.status,
    notes: apptForm.value.notes
  })
  apptForm.value = { scheduled_at: '', status: 'confirmed', notes: '' }
  showApptForm.value = false
  await loadAppointments()
  showToast('Занятие добавлено')
}

const startEdit = (appt) => {
  const d = new Date(appt.scheduled_at)
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
  editingAppt.value = { ...appt, scheduled_at_local: local }
}

const saveAppt = async () => {
  await supabase.from('appointments').update({
    scheduled_at: new Date(editingAppt.value.scheduled_at_local).toISOString(),
    status: editingAppt.value.status
  }).eq('id', editingAppt.value.id)
  editingAppt.value = null
  await loadAppointments()
  showToast('Занятие обновлено')
}

const deleteAppt = async (id) => {
  if (!confirm('Удалить занятие?')) return
  await supabase.from('appointments').delete().eq('id', id)
  await loadAppointments()
  showToast('Занятие удалено')
}

const toggleActive = async () => {
  const newVal = patient.value.active === false ? true : false
  await supabase.from('patients').update({ active: newVal }).eq('id', patient.value.id)
  patient.value.active = newVal
  showToast(newVal ? 'Пациент активирован' : 'Пациент деактивирован')
}

const formatDate = (dt) => new Date(dt).toLocaleString('ru-RU', {
  day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
})

const statusLabel = (s) => ({ pending: 'Ожидает', confirmed: 'Подтверждено', cancelled: 'Отменено' }[s] || s)

const showToast = (msg) => {
  toast.value = msg
  setTimeout(() => toast.value = '', 3000)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50" v-if="authorized">
    <div class="max-w-3xl mx-auto px-4 py-8">

      <a href="/admin" class="text-gray-400 hover:text-gray-600 text-sm mb-6 inline-block">← Назад</a>

      <!-- Инфо о пациенте -->
      <div v-if="patient" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-start justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-800">Информация о пациенте</h2>
          <div class="flex items-center gap-3">
            <span :class="patient.active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-3 py-1 rounded-full text-xs font-medium">
              {{ patient.active !== false ? 'Активен' : 'Неактивен' }}
            </span>
            <button @click="toggleActive" :class="patient.active !== false ? 'text-red-500 border-red-200' : 'text-green-500 border-green-200'" class="text-xs font-medium border rounded-lg px-3 py-1.5">
              {{ patient.active !== false ? 'Деактивировать' : 'Активировать' }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Имя пациента</label>
            <input v-model="editForm.name" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Родители</label>
            <input v-model="editForm.parent_names" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Телефон</label>
            <input v-model="editForm.phone" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Email</label>
            <input v-model="editForm.email" type="email" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>

        <div class="flex gap-3 mt-4">
          <button @click="savePatient" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Сохранить</button>
          <button @click="resetPassword" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Сбросить пароль</button>
        </div>
      </div>

      <!-- Абонемент -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-base font-semibold text-gray-800">Абонемент</h2>
          <button @click="showSubForm = !showSubForm" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
            {{ subscription ? 'Обновить' : '+ Добавить' }}
          </button>
        </div>

        <div v-if="showSubForm" class="bg-blue-50 rounded-xl p-4 mb-4">
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Название плана</label>
              <input v-model="subForm.plan" placeholder="SUB1, Базовый..." class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Цена</label>
              <input v-model="subForm.price" type="number" placeholder="180" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Начало</label>
              <input v-model="subForm.starts_at" type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Конец</label>
              <input v-model="subForm.ends_at" type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Всего занятий</label>
              <input v-model="subForm.total_sessions" type="number" placeholder="8" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>
          <div class="flex gap-2 mt-3">
            <button @click="saveSub" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium">Сохранить</button>
            <button @click="showSubForm = false" class="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-medium">Отмена</button>
          </div>
        </div>

        <div v-if="subscription" class="space-y-2">
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
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Всего занятий</span>
            <span class="font-medium text-gray-900">{{ subscription.total_sessions }}</span>
          </div>
        </div>
        <div v-else class="text-gray-400 text-sm">Абонемент не добавлен</div>

        <!-- Статистика -->
        <div v-if="subscription" class="mt-4 grid grid-cols-2 gap-3">
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
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 class="text-base font-semibold text-gray-800">Занятия</h2>
          <button @click="showApptForm = !showApptForm" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">+ Добавить</button>
        </div>

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
            <button @click="addAppointment" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium">Сохранить</button>
            <button @click="showApptForm = false" class="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-medium">Отмена</button>
          </div>
        </div>

        <div v-if="appointments.length > 0">
          <div v-for="appt in appointments" :key="appt.id" class="px-6 py-4 border-b border-gray-50 last:border-0">
            <div v-if="editingAppt?.id === appt.id" class="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input v-model="editingAppt.scheduled_at_local" type="datetime-local" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <select v-model="editingAppt.status" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="pending">Ожидает</option>
                <option value="confirmed">Подтверждено</option>
                <option value="cancelled">Отменено</option>
              </select>
              <div class="flex gap-2">
                <button @click="saveAppt" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium">Сохранить</button>
                <button @click="editingAppt = null" class="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium">Отмена</button>
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
                }" class="px-2 py-1 rounded-full text-xs font-medium">{{ statusLabel(appt.status) }}</span>
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
const subscription = ref(null)
const showApptForm = ref(false)
const showSubForm = ref(false)
const editingAppt = ref(null)
const toast = ref('')
const authorized = ref(false)
const editForm = ref({ name: '', parent_names: '', phone: '', email: '' })
const apptForm = ref({ scheduled_at: '', status: 'confirmed', notes: '' })
const subForm = ref({ plan: '', price: '', starts_at: '', ends_at: '', total_sessions: 8 })

const stats = computed(() => {
  const total = subscription.value?.total_sessions || 0
  const visited = appointments.value.filter(a => a.status === 'confirmed' && new Date(a.scheduled_at) < new Date()).length
  const cancelled = appointments.value.filter(a => a.status === 'cancelled').length
  const pending = appointments.value.filter(a => a.status === 'pending').length
  const remaining = Math.max(0, total - visited)
  return { visited, cancelled, pending, remaining }
})

onMounted(async () => {
  const hasAuth = document.cookie.includes('admin_auth=true')
  if (!hasAuth) {
    window.location.href = '/admin/login'
    return
  }
  authorized.value = true

  const { data: p } = await supabase.from('patients').select('*').eq('id', route.params.id).single()
  patient.value = p

  let email = ''
  if (p.user_id) {
    const res = await $fetch('/api/get-user-email', { method: 'POST', body: { user_id: p.user_id } })
    email = res.email || ''
  }

  editForm.value = { name: p.name, parent_names: p.parent_names, phone: p.phone, email }

  const { data: sub } = await supabase.from('subscriptions').select('*').eq('patient_id', route.params.id).order('created_at', { ascending: false }).limit(1).single()
  if (sub) {
    subscription.value = sub
    subForm.value = { plan: sub.plan, price: sub.price, starts_at: sub.starts_at, ends_at: sub.ends_at, total_sessions: sub.total_sessions }
  }

  await loadAppointments()
})

const loadAppointments = async () => {
  const { data } = await supabase.from('appointments').select('*').eq('patient_id', route.params.id).order('scheduled_at', { ascending: true })
  appointments.value = data || []
}

const savePatient = async () => {
  await supabase.from('patients').update({ name: editForm.value.name, parent_names: editForm.value.parent_names, phone: editForm.value.phone }).eq('id', patient.value.id)
  patient.value = { ...patient.value, ...editForm.value }
  showToast('Данные сохранены')
}

const resetPassword = async () => {
  const email = editForm.value.email
  if (!email) { showToast('Email не указан'); return }
  await $fetch('/api/reset-password', { method: 'POST', body: { email } })
  showToast('Письмо отправлено')
}

const toggleActive = async () => {
  const newVal = patient.value.active === false ? true : false
  await supabase.from('patients').update({ active: newVal }).eq('id', patient.value.id)
  patient.value.active = newVal
  showToast(newVal ? 'Пациент активирован' : 'Пациент деактивирован')
}

const saveSub = async () => {
  if (subscription.value) {
    await supabase.from('subscriptions').update(subForm.value).eq('id', subscription.value.id)
  } else {
    const { data } = await supabase.from('subscriptions').insert({ ...subForm.value, patient_id: route.params.id }).select().single()
    subscription.value = data
  }
  const { data: sub } = await supabase.from('subscriptions').select('*').eq('patient_id', route.params.id).order('created_at', { ascending: false }).limit(1).single()
  subscription.value = sub
  showSubForm.value = false
  showToast('Абонемент сохранён')
}

const addAppointment = async () => {
  if (!apptForm.value.scheduled_at) return
  await supabase.from('appointments').insert({ patient_id: route.params.id, scheduled_at: new Date(apptForm.value.scheduled_at).toISOString(), status: apptForm.value.status, notes: apptForm.value.notes })
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
  await supabase.from('appointments').update({ scheduled_at: new Date(editingAppt.value.scheduled_at_local).toISOString(), status: editingAppt.value.status }).eq('id', editingAppt.value.id)
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

const formatDate = (dt) => new Date(dt).toLocaleString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
const formatDateShort = (d) => new Date(d).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
const statusLabel = (s) => ({ pending: 'Ожидает', confirmed: 'Подтверждено', cancelled: 'Отменено' }[s] || s)
const showToast = (msg) => { toast.value = msg; setTimeout(() => toast.value = '', 3000) }
</script>

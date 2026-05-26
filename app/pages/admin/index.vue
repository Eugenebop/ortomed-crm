<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="authorized" class="max-w-4xl mx-auto px-4 py-8">

      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Пациенты</h1>
          <p class="text-sm text-gray-500 mt-1">Ortomed CRM</p>
        </div>
        <button @click="showForm = !showForm" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Добавить пациента
        </button>
      </div>

      <div v-if="showForm" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Новый пациент</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Имя пациента</label>
            <input v-model="form.name" placeholder="Олег" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Родители</label>
            <input v-model="form.parent_names" placeholder="Наталья и Евгений" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
            <input v-model="form.phone" placeholder="+375 29 123 45 67" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email (для входа)</label>
            <input v-model="form.email" placeholder="parent@email.com" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Пароль (для входа)</label>
            <input v-model="form.password" type="password" placeholder="минимум 6 символов" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
        <p v-if="formError" class="text-red-500 text-sm mt-3">{{ formError }}</p>
        <div class="flex gap-3 mt-4">
          <button @click="addPatient" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Сохранить</button>
          <button @click="showForm = false" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Отмена</button>
        </div>
      </div>

      <div v-if="selectedPatient" class="bg-white rounded-xl shadow-sm border border-blue-200 p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Занятие для <span class="text-blue-600">{{ selectedPatient.name }}</span></h2>
          <button @click="selectedPatient = null" class="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Дата и время</label>
            <input v-model="apptForm.scheduled_at" type="datetime-local" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Статус</label>
            <select v-model="apptForm.status" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="pending">Ожидает</option>
              <option value="confirmed">Подтверждено</option>
              <option value="cancelled">Отменено</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Заметка</label>
            <input v-model="apptForm.notes" placeholder="Необязательно" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
        <div class="flex gap-3 mt-4">
          <button @click="addAppointment" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Назначить</button>
          <button @click="selectedPatient = null" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Отмена</button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Пациент</th>
              <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
              <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="p in patients" :key="p.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900">{{ p.name }}</div>
                <div class="text-gray-500 text-xs mt-0.5">{{ p.parent_names }}</div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ p.phone }}</td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button @click="selectPatient(p)" class="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 hover:border-blue-400 rounded-lg px-3 py-1.5 transition-colors">+ Занятие</button>
                </div>
              </td>
            </tr>
            <tr v-if="patients.length === 0">
              <td colspan="3" class="px-6 py-12 text-center text-gray-400">Пациентов пока нет</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="toast" class="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg">{{ toast }}</div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const patients = ref([])
const showForm = ref(false)
const selectedPatient = ref(null)
const toast = ref('')
const formError = ref('')
const authorized = ref(false)
const form = ref({ name: '', parent_names: '', phone: '', email: '', password: '' })
const apptForm = ref({ scheduled_at: '', status: 'confirmed', notes: '' })

onMounted(async () => {
  const hasAuth = document.cookie.includes('admin_auth=true')
  if (!hasAuth) {
    window.location.href = '/login'
    return
  }
  authorized.value = true
  const { data } = await supabase.from('patients').select('*').order('created_at', { ascending: false })
  patients.value = data || []
})

const addPatient = async () => {
  formError.value = ''
  if (!form.value.email || !form.value.password) {
    formError.value = 'Email и пароль обязательны'
    return
  }
  const data = await $fetch('/api/create-patient', {
    method: 'POST',
    body: form.value
  })
  if (!data.ok) {
    formError.value = data.error || 'Ошибка'
    return
  }
  patients.value.unshift(data.patient)
  form.value = { name: '', parent_names: '', phone: '', email: '', password: '' }
  showForm.value = false
  showToast('Пациент добавлен')
}

const selectPatient = (p) => {
  selectedPatient.value = p
  apptForm.value = { scheduled_at: '', status: 'confirmed', notes: '' }
}

const addAppointment = async () => {
  if (!apptForm.value.scheduled_at) return
  await supabase.from('appointments').insert({
    patient_id: selectedPatient.value.id,
    scheduled_at: new Date(apptForm.value.scheduled_at).toISOString(),
    status: apptForm.value.status,
    notes: apptForm.value.notes
  })
  selectedPatient.value = null
  showToast('Занятие назначено')
}

const showToast = (msg) => {
  toast.value = msg
  setTimeout(() => toast.value = '', 3000)
}
</script>

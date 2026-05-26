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
            <input v-model="form.phone" placeholder="+995 555 000 000" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="form.email" placeholder="parent@email.com" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input v-model="form.password" type="password" placeholder="минимум 6 символов" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>
        <p v-if="formError" class="text-red-500 text-sm mt-3">{{ formError }}</p>
        <div class="flex gap-3 mt-4">
          <button @click="addPatient" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Сохранить</button>
          <button @click="showForm = false" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Отмена</button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="flex border-b border-gray-200">
          <button @click="filter = 'active'" :class="filter === 'active' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'" class="px-6 py-3 text-sm font-medium">Активные</button>
          <button @click="filter = 'inactive'" :class="filter === 'inactive' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'" class="px-6 py-3 text-sm font-medium">Неактивные</button>
        </div>
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Пациент</th>
              <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
              <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
              <th class="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="p in filteredPatients" :key="p.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <a :href="`/admin/patient/${p.id}`" class="font-medium text-gray-900 hover:text-blue-600">{{ p.name }}</a>
                <div class="text-gray-500 text-xs mt-0.5">{{ p.parent_names }}</div>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ p.phone }}</td>
              <td class="px-6 py-4">
                <span :class="p.active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ p.active !== false ? 'Активен' : 'Неактивен' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <a :href="`/admin/patient/${p.id}`" class="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 hover:border-blue-400 rounded-lg px-3 py-1.5 transition-colors">
                  Открыть
                </a>
              </td>
            </tr>
            <tr v-if="filteredPatients.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-400">Пациентов нет</td>
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
const toast = ref('')
const formError = ref('')
const authorized = ref(false)
const filter = ref('active')
const form = ref({ name: '', parent_names: '', phone: '', email: '', password: '' })

const filteredPatients = computed(() =>
  patients.value.filter(p => filter.value === 'active' ? p.active !== false : p.active === false)
)

onMounted(async () => {
  const hasAuth = document.cookie.includes('admin_auth=true')
  if (!hasAuth) {
    window.location.href = '/admin/login'
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

const showToast = (msg) => {
  toast.value = msg
  setTimeout(() => toast.value = '', 3000)
}
</script>

import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.NUXT_SUPABASE_SECRET_KEY!
  )

  // Создаём пользователя в Auth
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: body.email,
    password: body.password,
    email_confirm: true
  })

  if (authError) {
    return { ok: false, error: authError.message }
  }

  // Создаём пациента с привязкой к user_id
  const { data: patient, error: patientError } = await supabase
    .from('patients')
    .insert({
      name: body.name,
      parent_names: body.parent_names,
      phone: body.phone,
      user_id: authUser.user.id
    })
    .select()
    .single()

  if (patientError) {
    return { ok: false, error: patientError.message }
  }

  return { ok: true, patient }
})

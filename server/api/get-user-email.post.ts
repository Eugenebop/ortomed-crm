import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )

  const { data, error } = await supabase.auth.admin.getUserById(body.user_id)
  if (error) return { ok: false }
  return { ok: true, email: data.user.email }
})

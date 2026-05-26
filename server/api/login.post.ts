export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const correct = process.env.NUXT_ADMIN_PASSWORD || 'ortomed2026'

    if (body.password === correct) {
        setCookie(event, 'admin_auth', 'true', {
            maxAge: 60 * 60 * 24 * 30,
            sameSite: 'strict'
        })
        return { ok: true }
    }

    return { ok: false }
})
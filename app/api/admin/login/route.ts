import { NextResponse } from 'next/server'
import { adminCookieOptions, createAdminSession, isAdminAuthConfigured, verifyAdminCredentials } from '@/lib/server/admin-auth'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const username = typeof body?.username === 'string' ? body.username.trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!isAdminAuthConfigured()) {
    return NextResponse.json({ error: 'Admin username/password is not configured.' }, { status: 503 })
  }

  if (!username || !password || !(await verifyAdminCredentials(username, password))) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    ...adminCookieOptions(),
    value: createAdminSession(username),
  })

  return response
}

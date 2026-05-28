import { NextResponse } from 'next/server'
import { adminCookieOptions } from '@/lib/server/admin-auth'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    ...adminCookieOptions(),
    value: '',
    maxAge: 0,
  })

  return response
}

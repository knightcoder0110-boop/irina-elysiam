import { NextResponse } from 'next/server'
import { assertAdmin } from '@/lib/server/admin-auth'
import { getSiteSettings, saveSiteSettings } from '@/lib/server/intake-service'
import { mergeSiteSettings } from '@/lib/settings'

export async function GET(request: Request) {
  const adminError = assertAdmin(request)
  if (adminError) return adminError

  return NextResponse.json({ settings: await getSiteSettings() })
}

export async function PATCH(request: Request) {
  const adminError = assertAdmin(request)
  if (adminError) return adminError

  const body = await request.json().catch(() => null)
  const settings = mergeSiteSettings(body?.settings)

  try {
    return NextResponse.json({ settings: await saveSiteSettings(settings) })
  } catch (error) {
    console.error('Admin settings update failed', error)
    return NextResponse.json(
      { error: 'Could not save settings. Make sure the site_settings table exists in Supabase.' },
      { status: 503 }
    )
  }
}

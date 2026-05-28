import { NextResponse } from 'next/server'
import { getSiteSettings } from '@/lib/server/intake-service'

export async function GET() {
  const settings = await getSiteSettings()
  return NextResponse.json({ social: settings.social })
}

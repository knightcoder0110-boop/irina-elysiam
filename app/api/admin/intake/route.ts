import { NextResponse } from 'next/server'
import { intakeStatuses, type IntakeStatus } from '@/lib/intake'
import { assertAdmin, listIntakeRecords, updateIntakeStatus } from '@/lib/server/intake-service'

export async function GET(request: Request) {
  const adminError = assertAdmin(request)
  if (adminError) return adminError

  try {
    return NextResponse.json({ records: await listIntakeRecords() })
  } catch (error) {
    console.error('Admin intake list failed', error)
    return NextResponse.json(
      { error: 'Admin inbox is not connected yet. Configure Supabase to view requests.' },
      { status: 503 }
    )
  }
}

export async function PATCH(request: Request) {
  const adminError = assertAdmin(request)
  if (adminError) return adminError

  const body = await request.json().catch(() => null)
  const id = typeof body?.id === 'string' ? body.id : ''
  const kind = body?.kind === 'booking' || body?.kind === 'contact' ? body.kind : ''
  const rawStatus = typeof body?.status === 'string' ? body.status : ''

  if (!id || !kind || !intakeStatuses.includes(rawStatus as IntakeStatus)) {
    return NextResponse.json({ error: 'Invalid admin update.' }, { status: 400 })
  }

  const status = rawStatus as IntakeStatus

  try {
    return NextResponse.json({ record: await updateIntakeStatus(kind, id, status) })
  } catch (error) {
    console.error('Admin intake update failed', error)
    return NextResponse.json({ error: 'Could not update this request.' }, { status: 500 })
  }
}

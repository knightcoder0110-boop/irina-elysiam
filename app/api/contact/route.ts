import { NextResponse } from 'next/server'
import { cleanText, isEmail, normalizePhone, type ContactMessage } from '@/lib/intake'
import { hasIntakeDelivery, saveContactMessage, sendContactEmails } from '@/lib/server/intake-service'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Please complete the contact form.' }, { status: 400 })
  }

  const message: ContactMessage = {
    kind: 'contact',
    status: 'new',
    name: cleanText(body.name, 120),
    phone: normalizePhone(body.phone),
    email: cleanText(body.email, 180).toLowerCase(),
    message: cleanText(body.message, 1500),
    source: cleanText(body.source, 80) || 'website-contact',
  }

  if (!message.name || !message.message || !isEmail(message.email)) {
    return NextResponse.json({ error: 'Please add a valid name, email, and message.' }, { status: 400 })
  }

  if (!hasIntakeDelivery()) {
    return NextResponse.json(
      { error: 'Contact intake is not configured yet. Please add Supabase or Resend environment variables.' },
      { status: 503 }
    )
  }

  try {
    const stored = await saveContactMessage(message)

    try {
      await sendContactEmails(message)
    } catch (emailError) {
      if (!stored) {
        throw emailError
      }

      console.error('Contact email delivery failed after saving message', emailError)
    }

    return NextResponse.json({
      ok: true,
      id: stored?.id ?? null,
      message: 'Your message was received. We will reply soon.',
    })
  } catch (error) {
    console.error('Contact intake failed', error)
    return NextResponse.json(
      { error: 'We could not send this message right now. Please call the salon or try again shortly.' },
      { status: 500 }
    )
  }
}

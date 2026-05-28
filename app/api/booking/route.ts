import { NextResponse } from 'next/server'
import { cleanText, formatBookingDate, isEmail, normalizePhone, type BookingRequest } from '@/lib/intake'
import { hasIntakeDelivery, saveBookingRequest, sendBookingEmails } from '@/lib/server/intake-service'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Please complete the booking form.' }, { status: 400 })
  }

  const booking: BookingRequest = {
    kind: 'booking',
    status: 'new',
    service: cleanText(body.service, 80),
    stylist: cleanText(body.stylist, 80),
    date: cleanText(body.date, 40),
    time: cleanText(body.time, 40),
    name: cleanText(body.name, 120),
    phone: normalizePhone(body.phone),
    email: cleanText(body.email, 180).toLowerCase(),
    notes: cleanText(body.notes, 1000),
    source: cleanText(body.source, 80) || 'website-booking',
  }

  const missing = [
    ['service', booking.service],
    ['stylist', booking.stylist],
    ['date', booking.date],
    ['time', booking.time],
    ['name', booking.name],
    ['phone', booking.phone],
    ['email', booking.email],
  ].filter(([, value]) => !value)

  if (missing.length > 0 || !isEmail(booking.email) || booking.phone.length < 7) {
    return NextResponse.json({ error: 'Please add a valid name, phone, email, service, date, and time.' }, { status: 400 })
  }

  if (!hasIntakeDelivery()) {
    return NextResponse.json(
      { error: 'Booking intake is not configured yet. Please add Supabase or Resend environment variables.' },
      { status: 503 }
    )
  }

  try {
    const displayBooking = {
      ...booking,
      date: formatBookingDate(booking.date),
    }

    const stored = await saveBookingRequest(booking)

    try {
      await sendBookingEmails(displayBooking)
    } catch (emailError) {
      if (!stored) {
        throw emailError
      }

      console.error('Booking email delivery failed after saving request', emailError)
    }

    return NextResponse.json({
      ok: true,
      id: stored?.id ?? null,
      message: 'Your request was received. We will confirm your appointment directly.',
    })
  } catch (error) {
    console.error('Booking intake failed', error)
    return NextResponse.json(
      { error: 'We could not send this request right now. Please call the salon or try again shortly.' },
      { status: 500 }
    )
  }
}

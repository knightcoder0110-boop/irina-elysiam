import 'server-only'

import { businessInfo } from '@/lib/data'
import type { BookingRequest, ContactMessage, IntakeRecord, IntakeStatus } from '@/lib/intake'

const bookingTable = 'booking_requests'
const contactTable = 'contact_messages'

type SupabaseConfig = {
  url: string
  serviceRoleKey: string
}

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '')
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) return null
  return { url, serviceRoleKey }
}

export function hasIntakeDelivery() {
  return Boolean(getSupabaseConfig() || process.env.RESEND_API_KEY)
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const config = getSupabaseConfig()
  if (!config) {
    throw new Error('Supabase is not configured')
  }

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    const message = data?.message || data?.error || 'Supabase request failed'
    throw new Error(message)
  }

  return data
}

export async function saveBookingRequest(booking: BookingRequest) {
  if (!getSupabaseConfig()) return null

  const rows = await supabaseFetch(bookingTable, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      kind: booking.kind,
      status: booking.status ?? 'new',
      service: booking.service,
      stylist: booking.stylist,
      date: booking.date,
      time: booking.time,
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      notes: booking.notes || null,
      source: booking.source || 'website',
    }),
  })

  return Array.isArray(rows) ? rows[0] : rows
}

export async function saveContactMessage(message: ContactMessage) {
  if (!getSupabaseConfig()) return null

  const rows = await supabaseFetch(contactTable, {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      kind: message.kind,
      status: message.status ?? 'new',
      name: message.name,
      phone: message.phone || null,
      email: message.email,
      message: message.message,
      source: message.source || 'website',
    }),
  })

  return Array.isArray(rows) ? rows[0] : rows
}

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null

  const salonEmails = (process.env.SALON_INTAKE_EMAIL || businessInfo.email)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)

  return {
    apiKey,
    from: process.env.RESEND_FROM || `${businessInfo.name} <onboarding@resend.dev>`,
    salonEmails,
  }
}

async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}) {
  const config = getEmailConfig()
  if (!config) return null

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.from,
      to,
      subject,
      html,
      reply_to: replyTo,
    }),
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(data?.message || 'Email delivery failed')
  }

  return data
}

function cardHtml(title: string, rows: { label: string; value?: string | null }[]) {
  return `
    <div style="font-family:Arial,sans-serif;background:#FAF8F3;padding:28px;color:#1A1A1A">
      <div style="max-width:620px;margin:auto;background:#fff;border:1px solid #eadfbf;border-radius:16px;overflow:hidden">
        <div style="background:#0A3D2E;padding:22px 26px">
          <p style="margin:0;color:#C9A227;font-size:12px;letter-spacing:2px;text-transform:uppercase">${businessInfo.name}</p>
          <h1 style="margin:8px 0 0;color:#F5F1E8;font-size:24px;font-family:Georgia,serif">${title}</h1>
        </div>
        <div style="padding:22px 26px">
          ${rows
            .map(
              (row) => `
                <div style="padding:12px 0;border-bottom:1px solid #f0e6c8">
                  <p style="margin:0 0 4px;color:#8B6914;font-size:11px;letter-spacing:1.5px;text-transform:uppercase">${row.label}</p>
                  <p style="margin:0;color:#1A1A1A;font-size:15px;line-height:1.6">${row.value || '-'}</p>
                </div>
              `
            )
            .join('')}
        </div>
      </div>
    </div>
  `
}

export async function sendBookingEmails(booking: BookingRequest) {
  const config = getEmailConfig()
  if (!config) return null

  const rows = [
    { label: 'Service', value: booking.service },
    { label: 'Stylist', value: booking.stylist },
    { label: 'Preferred Date', value: booking.date },
    { label: 'Preferred Time', value: booking.time },
    { label: 'Client', value: booking.name },
    { label: 'Phone', value: booking.phone },
    { label: 'Email', value: booking.email },
    { label: 'Notes', value: booking.notes },
  ]

  const salonEmail = await sendEmail({
    to: config.salonEmails,
    replyTo: booking.email,
    subject: `New appointment request: ${booking.name}`,
    html: cardHtml('New Appointment Request', rows),
  })

  const clientEmail = await sendEmail({
    to: booking.email,
    subject: `We received your ${businessInfo.name} appointment request`,
    html: cardHtml('Appointment Request Received', [
      { label: 'What happens next', value: 'We will review your preferred time and confirm directly. Your appointment is not finalized until we contact you.' },
      { label: 'Service', value: booking.service },
      { label: 'Preferred Date', value: booking.date },
      { label: 'Preferred Time', value: booking.time },
      { label: 'Salon Phone', value: businessInfo.phone },
    ]),
  })

  return { salonEmail, clientEmail }
}

export async function sendContactEmails(message: ContactMessage) {
  const config = getEmailConfig()
  if (!config) return null

  const salonEmail = await sendEmail({
    to: config.salonEmails,
    replyTo: message.email,
    subject: `New website message: ${message.name}`,
    html: cardHtml('New Website Message', [
      { label: 'Client', value: message.name },
      { label: 'Phone', value: message.phone },
      { label: 'Email', value: message.email },
      { label: 'Message', value: message.message },
    ]),
  })

  const clientEmail = await sendEmail({
    to: message.email,
    subject: `We received your message for ${businessInfo.name}`,
    html: cardHtml('Message Received', [
      { label: 'What happens next', value: 'Thank you for reaching out. We will reply as soon as possible.' },
      { label: 'Salon Phone', value: businessInfo.phone },
      { label: 'Salon Email', value: businessInfo.email },
    ]),
  })

  return { salonEmail, clientEmail }
}

export async function listIntakeRecords(): Promise<IntakeRecord[]> {
  const bookings = await supabaseFetch(`${bookingTable}?select=*&order=created_at.desc&limit=100`)
  const contacts = await supabaseFetch(`${contactTable}?select=*&order=created_at.desc&limit=100`)

  return [...(bookings || []), ...(contacts || [])].sort((a, b) => {
    const aTime = new Date(a.created_at || '').getTime()
    const bTime = new Date(b.created_at || '').getTime()
    return bTime - aTime
  })
}

export async function updateIntakeStatus(kind: 'booking' | 'contact', id: string, status: IntakeStatus) {
  const table = kind === 'booking' ? bookingTable : contactTable
  const rows = await supabaseFetch(`${table}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ status }),
  })

  return Array.isArray(rows) ? rows[0] : rows
}

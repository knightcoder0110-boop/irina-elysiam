export type IntakeKind = 'booking' | 'contact'

export type IntakeStatus = 'new' | 'contacted' | 'confirmed' | 'cancelled'

export type BookingRequest = {
  id?: string
  kind: 'booking'
  status?: IntakeStatus
  created_at?: string
  service: string
  stylist: string
  date: string
  time: string
  name: string
  phone: string
  email: string
  notes?: string
  source?: string
}

export type ContactMessage = {
  id?: string
  kind: 'contact'
  status?: IntakeStatus
  created_at?: string
  name: string
  phone?: string
  email: string
  message: string
  source?: string
}

export type IntakeRecord = BookingRequest | ContactMessage

export const intakeStatuses: IntakeStatus[] = ['new', 'contacted', 'confirmed', 'cancelled']

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function cleanText(value: unknown, maxLength = 500) {
  if (typeof value !== 'string') return ''
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

export function normalizePhone(value: unknown) {
  return cleanText(value, 40)
}

export function formatBookingDate(date: string) {
  if (!date) return ''
  const parsed = new Date(`${date}T12:00:00`)
  if (Number.isNaN(parsed.getTime())) return date

  return parsed.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

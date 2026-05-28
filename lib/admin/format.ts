import type { IntakeStatus } from '@/lib/intake'

export function formatDateTime(value?: string) {
  if (!value) return 'Just now'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function statusLabel(status?: string) {
  if (!status) return 'New'
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function statusClass(status?: string) {
  if (status === 'confirmed') return 'bg-emerald-pale text-emerald-deep'
  if (status === 'completed') return 'bg-gold-champagne text-gold-deep'
  if (status === 'cancelled') return 'bg-red-50 text-red-900'
  if (status === 'archived') return 'bg-neutral-mist/50 text-neutral-stone'
  if (status === 'contacted') return 'bg-neutral-pearl text-emerald-rich'
  return 'bg-gold-primary text-emerald-deep'
}

export function getRecordTime(record: { created_at?: string }) {
  return new Date(record.created_at || '').getTime() || 0
}

export const bookingStatusFlow: IntakeStatus[] = ['new', 'contacted', 'confirmed', 'completed']
export const messageStatusFlow: IntakeStatus[] = ['new', 'contacted', 'completed']
export const secondaryStatuses: IntakeStatus[] = ['cancelled', 'archived']

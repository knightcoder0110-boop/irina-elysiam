import type { IntakeKind, IntakeRecord } from '@/lib/intake'
import { getRecordTime } from '@/lib/admin/format'

export function recordId(record: IntakeRecord) {
  return `${record.kind}-${record.id}`
}

export function findRecord(records: IntakeRecord[], kind: IntakeKind, id: string) {
  return records.find((r) => r.kind === kind && r.id === id)
}

export function recordSearchHaystack(record: IntakeRecord) {
  return [
    record.name,
    record.email,
    record.phone,
    record.kind === 'booking' ? record.service : record.message,
    record.kind === 'booking' ? record.stylist : undefined,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export function filterBySearch(records: IntakeRecord[], query: string) {
  const searchable = query.trim().toLowerCase()
  if (!searchable) return records
  return records.filter((record) => recordSearchHaystack(record).includes(searchable))
}

export function sortByNewest(records: IntakeRecord[]) {
  return [...records].sort((a, b) => getRecordTime(b) - getRecordTime(a))
}

export function isNeedsAttention(record: IntakeRecord) {
  return ['new', 'contacted', undefined].includes(record.status)
}

export function bookingSummary(record: Extract<IntakeRecord, { kind: 'booking' }>) {
  return [
    record.name,
    record.service,
    `${record.date} at ${record.time}`,
    record.phone,
    record.email,
    record.notes ? `Notes: ${record.notes}` : undefined,
  ]
    .filter(Boolean)
    .join('\n')
}

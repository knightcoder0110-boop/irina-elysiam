import type { IntakeRecord } from '@/lib/intake'
import { getRecordTime } from '@/lib/admin/format'

export type CustomerProfile = {
  key: string
  name: string
  email: string
  phone?: string
  count: number
  lastAt: number
  records: IntakeRecord[]
  newCount: number
}

export function customerKey(record: IntakeRecord) {
  return (record.email || record.phone || record.name).toLowerCase()
}

export function customerPathKey(key: string) {
  return encodeURIComponent(key)
}

export function decodeCustomerPathKey(encoded: string) {
  return decodeURIComponent(encoded)
}

export function aggregateCustomers(records: IntakeRecord[]): CustomerProfile[] {
  const map = new Map<string, CustomerProfile>()

  records.forEach((record) => {
    const key = customerKey(record)
    const lastAt = getRecordTime(record)
    const existing = map.get(key)

    if (existing) {
      existing.count += 1
      existing.lastAt = Math.max(existing.lastAt, lastAt)
      existing.records.push(record)
      if ((record.status || 'new') === 'new') existing.newCount += 1
    } else {
      map.set(key, {
        key,
        name: record.name,
        email: record.email,
        phone: record.phone,
        count: 1,
        lastAt,
        records: [record],
        newCount: (record.status || 'new') === 'new' ? 1 : 0,
      })
    }
  })

  return Array.from(map.values()).sort((a, b) => b.lastAt - a.lastAt)
}

export function findCustomer(records: IntakeRecord[], key: string) {
  const decoded = decodeCustomerPathKey(key)
  return aggregateCustomers(records).find((c) => c.key === decoded)
}

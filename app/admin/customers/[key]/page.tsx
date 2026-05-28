'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAdmin } from '@/components/admin/AdminProvider'
import { findCustomer } from '@/lib/admin/customers'
import { formatDateTime, getRecordTime } from '@/lib/admin/format'
import { adminRoutes } from '@/lib/admin/routes'
import StatusBadge from '@/components/admin/StatusBadge'
import { useState } from 'react'

type TimelineFilter = 'all' | 'booking' | 'contact'

export default function AdminCustomerDetailPage() {
  const { key: encodedKey } = useParams<{ key: string }>()
  const router = useRouter()
  const { records } = useAdmin()
  const [filter, setFilter] = useState<TimelineFilter>('all')

  const customer = useMemo(() => findCustomer(records, encodedKey), [records, encodedKey])

  const timeline = useMemo(() => {
    if (!customer) return []
    let list = [...customer.records].sort((a, b) => getRecordTime(b) - getRecordTime(a))
    if (filter === 'booking') list = list.filter((r) => r.kind === 'booking')
    if (filter === 'contact') list = list.filter((r) => r.kind === 'contact')
    return list
  }, [customer, filter])

  if (!customer) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-heading text-2xl text-emerald-deep">Customer not found</p>
        <Link href={adminRoutes.customers} className="btn-primary mt-6 inline-block">
          Back to customers
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-4 font-accent text-[10px] uppercase tracking-wide text-gold-primary hover:text-emerald-deep"
      >
        ← Back
      </button>

      <article className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-6 shadow-card-sm">
        <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">Customer</p>
        <h1 className="mt-1 font-display text-3xl text-emerald-deep">{customer.name}</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-neutral-cream px-3 py-1 font-accent text-[10px] uppercase text-emerald-deep">
            {customer.records.filter((r) => r.kind === 'booking').length} bookings
          </span>
          <span className="rounded-full bg-neutral-cream px-3 py-1 font-accent text-[10px] uppercase text-emerald-deep">
            {customer.records.filter((r) => r.kind === 'contact').length} messages
          </span>
          {customer.newCount > 0 && (
            <span className="rounded-full bg-gold-champagne px-3 py-1 font-accent text-[10px] uppercase text-emerald-deep">
              {customer.newCount} new
            </span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {customer.phone && (
            <a
              href={`tel:${customer.phone}`}
              className="rounded-full bg-emerald-deep px-4 py-3 text-center font-accent text-[11px] font-semibold uppercase tracking-wide-2 text-gold-light"
            >
              Call
            </a>
          )}
          <a
            href={`mailto:${customer.email}`}
            className="rounded-full border border-emerald-deep/20 px-4 py-3 text-center font-accent text-[11px] font-semibold uppercase tracking-wide-2 text-emerald-deep"
          >
            Email
          </a>
        </div>

        <div className="mt-4 font-body text-sm text-neutral-slate">
          <p>{customer.email}</p>
          {customer.phone && <p>{customer.phone}</p>}
        </div>
      </article>

      <section className="mt-8">
        <h2 className="font-heading text-2xl text-emerald-deep">Activity timeline</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {(['all', 'booking', 'contact'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-3 py-1.5 font-accent text-[10px] font-semibold uppercase tracking-wide ${
                filter === value
                  ? 'bg-emerald-deep text-gold-light'
                  : 'border border-emerald-deep/15 text-emerald-deep'
              }`}
            >
              {value === 'all' ? 'All' : value === 'booking' ? 'Bookings' : 'Messages'}
            </button>
          ))}
        </div>

        <ul className="mt-4 space-y-3">
          {timeline.map((record) => (
            <li key={`${record.kind}-${record.id}`}>
              <Link
                href={record.kind === 'booking' ? adminRoutes.booking(record.id!) : adminRoutes.message(record.id!)}
                className="flex flex-col gap-2 rounded-2xl border border-emerald-deep/10 bg-neutral-white p-4 shadow-card-sm transition-colors hover:border-gold-primary/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">
                    {record.kind === 'booking' ? 'Booking' : 'Message'}
                  </p>
                  <p className="mt-1 font-body text-sm text-neutral-charcoal">
                    {record.kind === 'booking'
                      ? `${record.service} · ${record.date} · ${record.time}`
                      : record.message.slice(0, 120)}
                  </p>
                  <p className="mt-1 font-body text-xs text-neutral-stone">{formatDateTime(record.created_at)}</p>
                </div>
                <StatusBadge status={record.status} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

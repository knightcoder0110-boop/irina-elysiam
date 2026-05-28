'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/components/admin/AdminProvider'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import SearchInput from '@/components/admin/SearchInput'
import EmptyState from '@/components/admin/EmptyState'
import { aggregateCustomers } from '@/lib/admin/customers'
import { formatDateTime } from '@/lib/admin/format'
import { adminRoutes } from '@/lib/admin/routes'
import StatusBadge from '@/components/admin/StatusBadge'

export default function AdminCustomersPage() {
  const { records } = useAdmin()
  const [query, setQuery] = useState('')

  const customers = useMemo(() => {
    const list = aggregateCustomers(records)
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone || '').toLowerCase().includes(q),
    )
  }, [records, query])

  return (
    <div className="mx-auto max-w-6xl">
      <AdminPageHeader
        label="Customers"
        title="Client directory"
        description="Everyone who has booked or sent a message, grouped by contact info."
      />

      <SearchInput value={query} onChange={setQuery} placeholder="Search customers…" />

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customers.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3">
            <EmptyState title="No customers yet" description="Clients appear when someone submits a booking or contact form." />
          </div>
        ) : (
          customers.map((customer) => (
            <Link
              key={customer.key}
              href={adminRoutes.customer(customer.key)}
              className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm transition-all hover:border-gold-primary/50 hover:shadow-card"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-heading text-xl text-emerald-deep">{customer.name}</h2>
                {customer.newCount > 0 && <StatusBadge status="new" />}
              </div>
              <p className="mt-1 font-body text-sm text-neutral-stone">
                {customer.count} request{customer.count === 1 ? '' : 's'}
              </p>
              <div className="mt-4 space-y-1 font-body text-sm text-neutral-slate">
                <p className="truncate">{customer.email}</p>
                {customer.phone && <p>{customer.phone}</p>}
                <p className="text-xs text-neutral-stone">Last activity {formatDateTime(new Date(customer.lastAt).toISOString())}</p>
              </div>
              <span className="mt-4 inline-block font-accent text-[10px] uppercase tracking-wide-2 text-emerald-deep">
                View profile →
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

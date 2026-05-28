'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useAdmin } from '@/components/admin/AdminProvider'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import StatCard from '@/components/admin/StatCard'
import RecordListItem from '@/components/admin/RecordListItem'
import EmptyState from '@/components/admin/EmptyState'
import { adminRoutes } from '@/lib/admin/routes'
import { isNeedsAttention } from '@/lib/admin/records'
import { sortByNewest } from '@/lib/admin/records'

export default function AdminDashboardPage() {
  const { records, counts, isLoading } = useAdmin()

  const needsAttention = useMemo(
    () => sortByNewest(records.filter((r) => r.status !== 'archived' && isNeedsAttention(r))).slice(0, 10),
    [records],
  )

  return (
    <div className="mx-auto max-w-6xl">
      <AdminPageHeader
        label="Dashboard"
        title="Good morning"
        description="Review new requests and follow up with clients."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="New" value={counts.new} href={adminRoutes.bookings} />
        <StatCard label="Bookings" value={counts.bookings} href={adminRoutes.bookings} />
        <StatCard label="Messages" value={counts.messages} href={adminRoutes.messages} />
        <StatCard label="Confirmed" value={counts.confirmed} href={adminRoutes.bookings} />
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-2xl text-emerald-deep">Needs attention</h2>
          <Link href={adminRoutes.bookings} className="font-accent text-[10px] uppercase tracking-wide text-gold-primary hover:text-emerald-deep">
            View all →
          </Link>
        </div>

        {isLoading && needsAttention.length === 0 ? (
          <p className="font-body text-sm text-neutral-stone">Loading requests…</p>
        ) : needsAttention.length === 0 ? (
          <EmptyState
            title="You're caught up"
            description="No new or in-progress requests right now."
            href={adminRoutes.bookings}
            hrefLabel="View bookings"
          />
        ) : (
          <div className="space-y-3">
            {needsAttention.map((record) => (
              <RecordListItem key={`${record.kind}-${record.id}`} record={record} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

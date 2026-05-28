'use client'

import { useMemo, useState } from 'react'
import type { IntakeStatus } from '@/lib/intake'
import { useAdmin } from '@/components/admin/AdminProvider'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import SearchInput from '@/components/admin/SearchInput'
import FilterChips from '@/components/admin/FilterChips'
import RecordListItem from '@/components/admin/RecordListItem'
import EmptyState from '@/components/admin/EmptyState'
import { filterBySearch, sortByNewest } from '@/lib/admin/records'
import { intakeStatuses } from '@/lib/intake'

export default function AdminBookingsPage() {
  const { records } = useAdmin()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<IntakeStatus | 'all'>('all')

  const visible = useMemo(() => {
    let list = records.filter((r) => r.kind === 'booking' && r.status !== 'archived')
    if (statusFilter !== 'all') {
      list = list.filter((r) => (r.status || 'new') === statusFilter)
    }
    return sortByNewest(filterBySearch(list, query))
  }, [records, query, statusFilter])

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        label="Bookings"
        title="Appointment requests"
        description="All booking form submissions from the website."
      />

      <div className="space-y-4">
        <SearchInput value={query} onChange={setQuery} placeholder="Search name, phone, email, service…" />
        <FilterChips
          options={intakeStatuses.filter((s) => s !== 'archived')}
          selected={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      <div className="mt-6 space-y-3">
        {visible.length === 0 ? (
          <EmptyState title="No bookings" description="Booking requests will appear here when customers submit the form." />
        ) : (
          visible.map((record) => <RecordListItem key={`${record.kind}-${record.id}`} record={record} />)
        )}
      </div>
    </div>
  )
}

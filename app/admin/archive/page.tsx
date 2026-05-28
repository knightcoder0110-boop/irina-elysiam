'use client'

import { useMemo, useState } from 'react'
import { useAdmin } from '@/components/admin/AdminProvider'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import SearchInput from '@/components/admin/SearchInput'
import RecordListItem from '@/components/admin/RecordListItem'
import EmptyState from '@/components/admin/EmptyState'
import { filterBySearch, sortByNewest } from '@/lib/admin/records'

export default function AdminArchivePage() {
  const { records } = useAdmin()
  const [query, setQuery] = useState('')

  const archived = useMemo(
    () => sortByNewest(filterBySearch(records.filter((r) => r.status === 'archived'), query)),
    [records, query],
  )

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        label="Archive"
        title="Archived requests"
        description="Items you archived are stored here. Open any record to change its status and restore it."
      />

      <SearchInput value={query} onChange={setQuery} />

      <div className="mt-6 space-y-3">
        {archived.length === 0 ? (
          <EmptyState title="Archive is empty" description="When you archive a booking or message, it will appear here." />
        ) : (
          archived.map((record) => <RecordListItem key={`${record.kind}-${record.id}`} record={record} />)
        )}
      </div>
    </div>
  )
}

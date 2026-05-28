'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAdmin } from '@/components/admin/AdminProvider'
import RecordDetailView from '@/components/admin/RecordDetailView'
import { findRecord } from '@/lib/admin/records'
import { customerKey } from '@/lib/admin/customers'
import { adminRoutes } from '@/lib/admin/routes'

export default function AdminBookingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { records } = useAdmin()

  const record = useMemo(() => findRecord(records, 'booking', id), [records, id])

  const related = useMemo(() => {
    if (!record) return []
    const key = customerKey(record)
    return records.filter((r) => customerKey(r) === key)
  }, [records, record])

  if (!record) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-heading text-2xl text-emerald-deep">Booking not found</p>
        <Link href={adminRoutes.bookings} className="btn-primary mt-6 inline-block">
          Back to bookings
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-4 font-accent text-[10px] uppercase tracking-wide text-gold-primary hover:text-emerald-deep"
      >
        ← Back
      </button>
      <RecordDetailView record={record} relatedRecords={related} />
    </div>
  )
}

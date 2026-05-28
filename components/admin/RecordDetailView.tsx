'use client'

import Link from 'next/link'
import type { IntakeRecord } from '@/lib/intake'
import { formatBookingDate } from '@/lib/intake'
import { formatDateTime } from '@/lib/admin/format'
import { customerKey } from '@/lib/admin/customers'
import { adminRoutes } from '@/lib/admin/routes'
import StatusBadge from '@/components/admin/StatusBadge'
import DetailRow from '@/components/admin/DetailRow'
import ActionBar from '@/components/admin/ActionBar'
import StatusPipeline from '@/components/admin/StatusPipeline'
import { useAdmin } from '@/components/admin/AdminProvider'

export default function RecordDetailView({
  record,
  relatedRecords,
}: {
  record: IntakeRecord
  relatedRecords?: IntakeRecord[]
}) {
  const { updateStatus } = useAdmin()
  const customerLink = adminRoutes.customer(customerKey(record))

  return (
    <article className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">
            {record.kind === 'booking' ? 'Appointment request' : 'Website message'}
          </p>
          <h2 className="mt-1 font-display text-3xl text-emerald-deep">{record.name}</h2>
          <p className="mt-1 font-body text-xs text-neutral-stone">{formatDateTime(record.created_at)}</p>
          <Link href={customerLink} className="mt-2 inline-block font-accent text-[10px] uppercase tracking-wide text-gold-primary hover:text-emerald-deep">
            View customer profile →
          </Link>
        </div>
        <StatusBadge status={record.status} />
      </div>

      <div className="mt-5">
        <ActionBar record={record} />
      </div>

      <div className="mt-5 grid gap-3">
        <DetailRow label="Email" value={record.email} href={`mailto:${record.email}`} />
        <DetailRow label="Phone" value={record.phone} href={record.phone ? `tel:${record.phone}` : undefined} />
        {record.kind === 'booking' ? (
          <>
            <DetailRow label="Service" value={record.service} />
            <DetailRow label="Stylist" value={record.stylist} />
            <DetailRow label="Preferred date" value={formatBookingDate(record.date)} />
            <DetailRow label="Preferred time" value={record.time} />
            <DetailRow label="Client notes" value={record.notes} />
          </>
        ) : (
          <DetailRow label="Message" value={record.message} />
        )}
        {record.source && <DetailRow label="Source" value={record.source} />}
      </div>

      <div className="mt-6">
        <StatusPipeline record={record} onStatus={(status) => updateStatus(record, status)} />
      </div>

      {relatedRecords && relatedRecords.length > 1 && (
        <div className="mt-6 border-t border-emerald-deep/10 pt-6">
          <p className="form-label mb-3">Other activity from this client</p>
          <ul className="space-y-2">
            {relatedRecords
              .filter((r) => r.id !== record.id || r.kind !== record.kind)
              .slice(0, 5)
              .map((r) => (
                <li key={`${r.kind}-${r.id}`}>
                  <Link
                    href={r.kind === 'booking' ? adminRoutes.booking(r.id!) : adminRoutes.message(r.id!)}
                    className="flex items-center justify-between rounded-xl bg-neutral-cream px-3 py-2 text-sm hover:bg-neutral-pearl"
                  >
                    <span className="text-emerald-deep">
                      {r.kind === 'booking' ? 'Booking' : 'Message'} · {r.name}
                    </span>
                    <StatusBadge status={r.status} />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </article>
  )
}

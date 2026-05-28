import Link from 'next/link'
import type { IntakeRecord } from '@/lib/intake'
import { formatDateTime } from '@/lib/admin/format'
import { adminRoutes } from '@/lib/admin/routes'
import StatusBadge from '@/components/admin/StatusBadge'

export default function RecordListItem({ record }: { record: IntakeRecord }) {
  const href = record.kind === 'booking' ? adminRoutes.booking(record.id!) : adminRoutes.message(record.id!)

  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-2xl border border-emerald-deep/10 bg-neutral-white p-4 shadow-card-sm transition-all hover:border-gold-primary/50 hover:shadow-card md:flex-row md:items-center md:justify-between"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">
            {record.kind === 'booking' ? 'Booking' : 'Message'}
          </p>
          <StatusBadge status={record.status} />
        </div>
        <h3 className="mt-1 truncate font-heading text-xl text-emerald-deep group-hover:text-emerald-rich">{record.name}</h3>
        {record.kind === 'booking' ? (
          <p className="mt-1 font-body text-sm text-neutral-slate">
            {record.service} · {record.date} · {record.time}
          </p>
        ) : (
          <p className="mt-1 line-clamp-2 font-body text-sm text-neutral-slate">{record.message}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center justify-between gap-4 md:flex-col md:items-end">
        <p className="font-body text-xs text-neutral-stone">{formatDateTime(record.created_at)}</p>
        <span className="font-accent text-[10px] uppercase tracking-wide-2 text-emerald-deep opacity-0 transition-opacity group-hover:opacity-100">
          Open →
        </span>
      </div>
    </Link>
  )
}

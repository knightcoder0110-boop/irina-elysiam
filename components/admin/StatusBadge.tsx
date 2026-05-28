import { statusClass, statusLabel } from '@/lib/admin/format'

export default function StatusBadge({ status }: { status?: string }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 font-accent text-[9px] uppercase tracking-wide ${statusClass(status)}`}>
      {statusLabel(status)}
    </span>
  )
}

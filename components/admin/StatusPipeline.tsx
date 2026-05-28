'use client'

import type { IntakeRecord, IntakeStatus } from '@/lib/intake'
import { bookingStatusFlow, messageStatusFlow, secondaryStatuses, statusLabel } from '@/lib/admin/format'

export default function StatusPipeline({
  record,
  onStatus,
}: {
  record: IntakeRecord
  onStatus: (status: IntakeStatus) => void
}) {
  const flow = record.kind === 'booking' ? bookingStatusFlow : messageStatusFlow
  const current = record.status || 'new'

  return (
    <div className="space-y-4">
      <div>
        <p className="form-label mb-3">Progress</p>
        <div className="flex flex-wrap gap-2">
          {flow.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onStatus(status)}
              className={`rounded-full px-4 py-2 font-accent text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                current === status
                  ? 'bg-gold-primary text-emerald-deep'
                  : 'border border-emerald-deep/15 text-emerald-deep hover:bg-neutral-cream'
              }`}
            >
              {statusLabel(status)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="form-label mb-3">Other</p>
        <div className="flex flex-wrap gap-2">
          {secondaryStatuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onStatus(status)}
              className={`rounded-full px-4 py-2 font-accent text-[10px] font-semibold uppercase tracking-wide ${
                current === status
                  ? 'bg-neutral-mist text-neutral-charcoal'
                  : 'border border-emerald-deep/10 text-neutral-stone hover:text-emerald-deep'
              }`}
            >
              {statusLabel(status)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

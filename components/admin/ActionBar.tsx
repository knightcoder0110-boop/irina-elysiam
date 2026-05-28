'use client'

import type { IntakeRecord } from '@/lib/intake'
import { bookingSummary } from '@/lib/admin/records'
import { useAdmin } from '@/components/admin/AdminProvider'

async function copyText(text: string, onDone: (ok: boolean) => void) {
  try {
    await navigator.clipboard.writeText(text)
    onDone(true)
  } catch {
    onDone(false)
  }
}

export default function ActionBar({ record }: { record: IntakeRecord }) {
  const { showToast, updateStatus } = useAdmin()

  const copy = (text: string, label: string) => {
    void copyText(text, (ok) => showToast(ok ? `${label} copied` : `Could not copy ${label}`, ok ? 'success' : 'error'))
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {record.phone && (
          <a
            href={`tel:${record.phone}`}
            className="rounded-full bg-emerald-deep px-4 py-3 text-center font-accent text-[11px] font-semibold uppercase tracking-wide-2 text-gold-light"
          >
            Call
          </a>
        )}
        <a
          href={`mailto:${record.email}`}
          className="rounded-full border border-emerald-deep/20 px-4 py-3 text-center font-accent text-[11px] font-semibold uppercase tracking-wide-2 text-emerald-deep"
        >
          Email
        </a>
      </div>

      <div className="flex flex-wrap gap-2">
        {record.phone && (
          <button
            type="button"
            onClick={() => copy(record.phone!, 'Phone')}
            className="rounded-full border border-emerald-deep/15 px-3 py-2 font-accent text-[10px] font-semibold uppercase tracking-wide text-emerald-deep"
          >
            Copy phone
          </button>
        )}
        <button
          type="button"
          onClick={() => copy(record.email, 'Email')}
          className="rounded-full border border-emerald-deep/15 px-3 py-2 font-accent text-[10px] font-semibold uppercase tracking-wide text-emerald-deep"
        >
          Copy email
        </button>
        {record.kind === 'booking' && (
          <button
            type="button"
            onClick={() => copy(bookingSummary(record), 'Summary')}
            className="rounded-full border border-emerald-deep/15 px-3 py-2 font-accent text-[10px] font-semibold uppercase tracking-wide text-emerald-deep"
          >
            Copy summary
          </button>
        )}
        {(record.status || 'new') === 'new' && (
          <button
            type="button"
            onClick={() => updateStatus(record, 'contacted')}
            className="rounded-full bg-gold-champagne px-3 py-2 font-accent text-[10px] font-semibold uppercase tracking-wide text-emerald-deep"
          >
            Mark contacted
          </button>
        )}
      </div>
    </div>
  )
}

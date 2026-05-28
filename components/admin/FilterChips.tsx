import type { IntakeStatus } from '@/lib/intake'
import { statusLabel } from '@/lib/admin/format'

export default function FilterChips({
  options,
  selected,
  onChange,
  showAll = true,
}: {
  options: (IntakeStatus | 'all')[]
  selected: IntakeStatus | 'all'
  onChange: (value: IntakeStatus | 'all') => void
  showAll?: boolean
}) {
  const items = showAll ? (['all', ...options] as const) : options

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onChange(status)}
          className={`rounded-full px-3 py-1.5 font-accent text-[10px] font-semibold uppercase tracking-wide transition-colors ${
            selected === status
              ? 'bg-emerald-deep text-gold-light'
              : 'border border-emerald-deep/15 text-emerald-deep hover:bg-neutral-cream'
          }`}
        >
          {status === 'all' ? 'All' : statusLabel(status)}
        </button>
      ))}
    </div>
  )
}

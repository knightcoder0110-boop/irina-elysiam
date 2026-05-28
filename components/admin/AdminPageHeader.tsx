import type { ReactNode } from 'react'

export default function AdminPageHeader({
  label,
  title,
  description,
  actions,
}: {
  label?: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {label && <p className="section-label mb-2">{label}</p>}
        <h1 className="font-display text-3xl text-emerald-deep md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-text font-body text-sm leading-relaxed text-neutral-stone">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

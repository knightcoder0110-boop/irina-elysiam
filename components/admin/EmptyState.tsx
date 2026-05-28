import Link from 'next/link'

export default function EmptyState({
  title,
  description,
  href,
  hrefLabel,
}: {
  title: string
  description: string
  href?: string
  hrefLabel?: string
}) {
  return (
    <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-10 text-center shadow-card-sm">
      <p className="font-heading text-2xl text-emerald-deep">{title}</p>
      <p className="mt-2 font-body text-sm text-neutral-stone">{description}</p>
      {href && hrefLabel && (
        <Link href={href} className="btn-primary mt-6 inline-block">
          {hrefLabel}
        </Link>
      )}
    </div>
  )
}

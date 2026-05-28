import Link from 'next/link'

export default function StatCard({
  label,
  value,
  href,
}: {
  label: string
  value: number
  href?: string
}) {
  const inner = (
    <>
      <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">{label}</p>
      <p className="mt-1 font-display text-3xl text-emerald-deep">{value}</p>
    </>
  )

  const className =
    'rounded-2xl border border-emerald-deep/10 bg-neutral-white p-4 shadow-card-sm transition-colors hover:border-gold-primary/40'

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    )
  }

  return <div className={className}>{inner}</div>
}

export default function DetailRow({ label, value, href }: { label: string; value?: string; href?: string }) {
  if (!value) return null

  const content = href ? (
    <a href={href} className="text-emerald-deep underline decoration-gold-primary/40 underline-offset-4">
      {value}
    </a>
  ) : (
    value
  )

  return (
    <div className="rounded-2xl bg-neutral-cream px-4 py-3">
      <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">{label}</p>
      <p className="mt-1 font-body text-sm leading-relaxed text-neutral-charcoal">{content}</p>
    </div>
  )
}

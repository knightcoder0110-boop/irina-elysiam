import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Meet Irina',
  description: 'Meet Irina, founder and master stylist at Irina Elysian Hair Design Studio in Denver.',
}

export default function TeamPage() {
  return (
    <div className="animate-fade-in pt-32">
      {/* Page Header */}
      <section className="page-header bg-gradient-to-br from-neutral-pearl to-emerald-pale/30">
        <p className="section-label">MEET YOUR STYLIST</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep mb-5">Meet Irina</h1>
        <p className="font-body text-lg text-neutral-slate max-w-text mx-auto">
          Founder and master stylist with a passion for transformative beauty.
        </p>
      </section>

      {/* Irina Profile */}
      <section className="py-16 md:py-[100px] px-6 md:px-10 max-w-container-md mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[500px] rounded-3xl overflow-hidden group">
            <Image
              src="/images/platinum-blonde-portrait.jpg"
              alt="Irina - Founder & Master Stylist"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 to-transparent" />
          </div>

          {/* Bio */}
          <div>
            <p className="font-accent text-[11px] tracking-wide-3 text-gold-primary mb-4">
              FOUNDER & MASTER STYLIST
            </p>
            <h2 className="font-display text-4xl text-emerald-deep mb-6">Irina</h2>

            <p className="font-body text-base leading-relaxed text-neutral-slate mb-6">
              With over 15 years of experience in the hair industry, Irina founded Irina Elysian
              Hair Design Studio with a simple belief: everyone deserves access to exceptional
              hair care.
            </p>

            <p className="font-body text-base leading-relaxed text-neutral-slate mb-8">
              Specializing in the highest level of coloring techniques including balayage,
              highlights, and precision color work, Irina provides top-notch services for
              the whole family—women, men, and children alike.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="badge badge-emerald">Color Specialist</span>
              <span className="badge badge-emerald">Precision Cutting</span>
              <span className="badge badge-gold">15+ Years</span>
            </div>

            <div className="p-6 rounded-2xl bg-gold-champagne/30 border border-gold-primary/20">
              <p className="font-heading text-lg italic text-emerald-deep">
                "Divine Beauty, For Everyone"
              </p>
              <p className="font-body text-sm text-neutral-stone mt-2">
                — Irina&apos;s guiding philosophy
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

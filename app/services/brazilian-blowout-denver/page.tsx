import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { businessInfo } from '@/lib/data'
import { ServiceSchema, BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Brazilian Blowout Denver | Smoothing Treatment Experts',
  description: `Get a Brazilian Blowout in Denver at ${businessInfo.name}. Eliminate frizz, reduce styling time, and enjoy smooth, shiny hair for months. Near Washington Park. Book now!`,
  keywords: ['Brazilian Blowout Denver', 'smoothing treatment Denver', 'frizz treatment Denver', 'Brazilian Blowout near me', 'hair smoothing Denver'],
  openGraph: {
    title: 'Brazilian Blowout Denver | Smoothing Treatment',
    description: 'Professional Brazilian Blowout treatments in Denver. Eliminate frizz for months.',
    url: `${businessInfo.website}/services/brazilian-blowout-denver`,
  },
  alternates: { canonical: `${businessInfo.website}/services/brazilian-blowout-denver` },
}

const benefits = [
  'Eliminates frizz for 10-12 weeks',
  'Reduces styling time by 50%',
  'Safe for all hair types',
  'No downtime - wash same day',
  'Adds incredible shine',
  'Improves hair health over time',
]

export default function BrazilianBlowoutDenverPage() {
  return (
    <>
      <ServiceSchema serviceName="Brazilian Blowout" serviceDescription="Professional smoothing treatment that eliminates frizz and creates silky, smooth hair for months." price="$300" />
      <BreadcrumbSchema items={[
        { name: 'Home', url: businessInfo.website },
        { name: 'Services', url: `${businessInfo.website}/services` },
        { name: 'Brazilian Blowout Denver', url: `${businessInfo.website}/services/brazilian-blowout-denver` },
      ]} />

      <div className="animate-fade-in pt-32">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center">
          <div className="absolute inset-0">
            <Image src="/images/new-images/client-back-blonde-highlights-wavy.jpeg" alt="Brazilian Blowout Denver" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/90 to-emerald-deep/60" />
          </div>
          <div className="relative z-10 max-w-container mx-auto px-6 md:px-10 py-20">
            <p className="font-accent text-[13px] tracking-wide-3 text-gold-primary mb-4">SMOOTHING EXPERTS</p>
            <h1 className="font-display text-4xl md:text-6xl text-neutral-white mb-6">Brazilian Blowout in Denver</h1>
            <p className="font-body text-lg text-neutral-pearl max-w-xl mb-8">
              Say goodbye to frizz! Our professional Brazilian Blowout treatments create smooth,
              frizz-free hair that lasts for months. Perfect for Denver&apos;s dry climate.
            </p>
            <Link href="/booking" className="btn-primary">BOOK BRAZILIAN BLOWOUT</Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-6 md:px-10 max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-emerald-deep mb-6">
                Why Brazilian Blowout?
              </h2>
              <p className="font-body text-base leading-relaxed text-neutral-slate mb-6">
                The Brazilian Blowout is the most effective professional smoothing treatment available.
                It improves the condition of your hair by creating a protective protein layer around
                each strand, eliminating frizz and sealing the cuticle for incredible shine.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-gold-primary">✓</span>
                    <span className="font-body text-neutral-slate">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-6 rounded-xl bg-gold-champagne/30 border border-gold-primary/20">
                <p className="font-accent text-[11px] tracking-wide-2 text-gold-primary mb-2">PRICING</p>
                <p className="font-display text-3xl text-emerald-deep">$300</p>
                <p className="font-body text-sm text-neutral-stone">Approximately 2.5 hours</p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden">
              <Image src="/images/new-images/straight-brunette-hair-with-blonde-highlights-wet.jpeg" alt="Smooth hair result after treatment" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-10 bg-emerald-gradient text-center">
          <h2 className="font-display text-3xl text-gold-light mb-4">Ready for Frizz-Free Hair?</h2>
          <p className="font-body text-base text-neutral-pearl max-w-text mx-auto mb-8">
            Book your Brazilian Blowout today and enjoy smooth, manageable hair for months.
          </p>
          <Link href="/booking" className="px-12 py-4 rounded-full bg-gold-gradient text-emerald-deep font-accent text-[13px] font-semibold tracking-wide-2 shadow-gold">
            BOOK NOW
          </Link>
        </section>
      </div>
    </>
  )
}

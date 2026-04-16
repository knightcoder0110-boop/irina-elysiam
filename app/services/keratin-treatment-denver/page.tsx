import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { businessInfo } from '@/lib/data'
import { ServiceSchema, BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Keratin Treatment Denver | Smoothing & Straightening',
  description: `Professional keratin treatments in Denver at ${businessInfo.name}. Long-lasting smoothing and straightening for frizzy, unruly hair. Located near Washington Park. Book today!`,
  keywords: ['keratin treatment Denver', 'keratin smoothing Denver', 'hair straightening Denver', 'keratin near me', 'frizz treatment Denver CO'],
  openGraph: {
    title: 'Keratin Treatment Denver | Smoothing Experts',
    description: 'Professional keratin treatments for smooth, frizz-free hair in Denver.',
    url: `${businessInfo.website}/services/keratin-treatment-denver`,
  },
  alternates: { canonical: `${businessInfo.website}/services/keratin-treatment-denver` },
}

export default function KeratinTreatmentDenverPage() {
  return (
    <>
      <ServiceSchema serviceName="Keratin Treatment" serviceDescription="Professional keratin smoothing treatment for long-lasting frizz control and silky smooth hair." price="$350" />
      <BreadcrumbSchema items={[
        { name: 'Home', url: businessInfo.website },
        { name: 'Services', url: `${businessInfo.website}/services` },
        { name: 'Keratin Treatment Denver', url: `${businessInfo.website}/services/keratin-treatment-denver` },
      ]} />

      <div className="animate-fade-in pt-32">
        {/* Hero */}
        <section className="page-header bg-gradient-to-br from-neutral-pearl to-emerald-pale/30">
          <p className="section-label">SMOOTHING SPECIALISTS</p>
          <h1 className="font-display text-4xl md:text-6xl text-emerald-deep mb-5">Keratin Treatment in Denver</h1>
          <p className="font-body text-lg text-neutral-slate max-w-text mx-auto mb-8">
            Transform frizzy, unmanageable hair with our professional keratin treatments. Enjoy smooth,
            silky hair for months with reduced styling time.
          </p>
          <Link href="/booking" className="btn-primary">BOOK KERATIN TREATMENT</Link>
        </section>

        {/* Content */}
        <section className="py-20 px-6 md:px-10 max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[450px] rounded-3xl overflow-hidden">
              <Image src="/images/new-images/close-up-foils-hair-coloring-process-2.jpeg" alt="Keratin treatment process Denver" fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-display text-3xl text-emerald-deep mb-6">What is Keratin Treatment?</h2>
              <p className="font-body text-base leading-relaxed text-neutral-slate mb-6">
                Keratin treatments infuse your hair with keratin protein, smoothing the cuticle and
                creating a protective barrier. The result is dramatically reduced frizz, enhanced
                shine, and easier styling that lasts for months.
              </p>
              <div className="space-y-4 mb-8">
                {['Lasts 3-5 months', 'Reduces frizz by up to 95%', 'Cuts styling time in half', 'Safe for color-treated hair'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-gold-primary">✓</span>
                    <span className="font-body text-neutral-slate">{item}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-xl bg-gold-champagne/30 border border-gold-primary/20">
                <p className="font-accent text-[11px] tracking-wide-2 text-gold-primary mb-2">PRICING</p>
                <p className="font-display text-3xl text-emerald-deep">$350</p>
                <p className="font-body text-sm text-neutral-stone">Approximately 3 hours</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-10 bg-emerald-gradient text-center">
          <h2 className="font-display text-3xl text-gold-light mb-4">Ready for Smoother Hair?</h2>
          <p className="font-body text-base text-neutral-pearl mb-8">Book your keratin treatment consultation today.</p>
          <Link href="/booking" className="px-12 py-4 rounded-full bg-gold-gradient text-emerald-deep font-accent text-[13px] font-semibold tracking-wide-2 shadow-gold">
            BOOK NOW
          </Link>
        </section>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo, faqData } from '@/lib/data'
import { FAQSchema, BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'FAQ | Frequently Asked Questions',
  description: `Common questions about ${businessInfo.name} hair salon in Denver. Learn about our services, pricing, location, hours, and booking process.`,
  keywords: [
    'hair salon FAQ',
    'Denver hair salon questions',
    'balayage FAQ',
    'hair color questions',
    'salon booking Denver',
  ],
  openGraph: {
    title: `FAQ | ${businessInfo.name}`,
    description: 'Frequently asked questions about our Denver hair salon services.',
    url: `${businessInfo.website}/faq`,
  },
  alternates: {
    canonical: `${businessInfo.website}/faq`,
  },
}

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={faqData} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: businessInfo.website },
          { name: 'FAQ', url: `${businessInfo.website}/faq` },
        ]}
      />

      <div className="animate-fade-in pt-32">
        {/* Page Header */}
        <section className="page-header bg-gradient-to-br from-neutral-pearl to-emerald-pale/30">
          <p className="section-label">QUESTIONS & ANSWERS</p>
          <h1 className="font-display text-5xl md:text-7xl text-emerald-deep mb-5">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-lg text-neutral-slate max-w-text mx-auto">
            Find answers to common questions about our services, pricing, and salon experience.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 md:px-10 max-w-container-sm mx-auto">
          <div className="space-y-6">
            {faqData.map((faq, i) => (
              <details
                key={i}
                className="group card p-0 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-gold-champagne/20 transition-colors">
                  <h2 className="font-heading text-lg text-emerald-deep pr-4">{faq.question}</h2>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-2 border-t border-gold-primary/10">
                  <p className="font-body text-base leading-relaxed text-neutral-slate">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 px-6 md:px-10 bg-emerald-gradient">
          <div className="max-w-container-sm mx-auto text-center">
            <h2 className="font-display text-3xl text-gold-light mb-4">
              Still Have Questions?
            </h2>
            <p className="font-body text-base text-neutral-pearl mb-8">
              We&apos;re happy to help! Contact us directly or book a consultation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/contact"
                className="px-10 py-4 rounded-full bg-gold-gradient text-emerald-deep font-accent text-[13px] font-semibold tracking-wide-2 shadow-gold hover:shadow-gold-lg transition-all duration-300"
              >
                CONTACT US
              </Link>
              <a
                href={`tel:${businessInfo.phoneRaw}`}
                className="px-10 py-4 rounded-full border-2 border-gold-light text-gold-light font-accent text-[13px] font-semibold tracking-wide-2 hover:bg-gold-light hover:text-emerald-deep transition-all duration-300"
              >
                CALL {businessInfo.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-20 px-6 md:px-10 max-w-container-md mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-emerald-deep">Quick Links</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Our Services', href: '/services' },
              { label: 'Book Online', href: '/booking' },
              { label: 'Our Location', href: '/contact' },
              { label: 'Meet the Team', href: '/team' },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="p-6 rounded-xl border border-gold-primary/20 bg-neutral-white hover:border-gold-primary hover:shadow-card transition-all duration-300 text-center"
              >
                <span className="font-heading text-base text-emerald-deep">{link.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

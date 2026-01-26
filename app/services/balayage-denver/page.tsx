import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { businessInfo } from '@/lib/data'
import { ServiceSchema, BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Balayage Denver | Expert Hand-Painted Highlights',
  description: `Looking for the best balayage in Denver? ${businessInfo.name} specializes in hand-painted, natural-looking balayage highlights. Located near Washington Park & Cherry Creek. Book your consultation today!`,
  keywords: [
    'balayage Denver',
    'balayage near me',
    'Denver balayage specialist',
    'hand painted highlights Denver',
    'balayage hair color Denver',
    'balayage salon Denver CO',
    'best balayage Denver',
  ],
  openGraph: {
    title: 'Balayage Denver | Expert Hand-Painted Highlights',
    description: 'Stunning balayage highlights by Denver\'s top colorists. Natural, sun-kissed results.',
    url: `${businessInfo.website}/services/balayage-denver`,
  },
  alternates: {
    canonical: `${businessInfo.website}/services/balayage-denver`,
  },
}

const balayageTypes = [
  { name: 'Classic Balayage', desc: 'Natural, sun-kissed dimension throughout', price: '$220+' },
  { name: 'Partial Balayage', desc: 'Face-framing and top sections only', price: '$180+' },
  { name: 'Full Balayage', desc: 'Comprehensive coverage for maximum dimension', price: '$280+' },
  { name: 'Balayage + Toner', desc: 'Includes gloss for perfect tone', price: '$250+' },
]

const faqs = [
  {
    q: 'What is balayage?',
    a: 'Balayage is a French hair coloring technique where highlights are hand-painted onto the hair. Unlike traditional foil highlights, balayage creates a more natural, sun-kissed look with softer, less noticeable regrowth lines.',
  },
  {
    q: 'How long does balayage last?',
    a: 'Balayage typically lasts 3-4 months before needing a touch-up, making it a low-maintenance option. The soft grow-out means you can often go longer between appointments than with traditional highlights.',
  },
  {
    q: 'Is balayage good for all hair types?',
    a: 'Yes! Balayage works beautifully on all hair types, lengths, and colors. Our expert colorists customize the technique and placement based on your unique hair and desired look.',
  },
  {
    q: 'How much does balayage cost in Denver?',
    a: `At ${businessInfo.name}, balayage services start at $220 and vary based on hair length, thickness, and desired result. We recommend booking a consultation for an accurate quote.`,
  },
]

export default function BalayageDenverPage() {
  return (
    <>
      <ServiceSchema
        serviceName="Balayage Hair Coloring"
        serviceDescription="Expert hand-painted balayage highlights for natural, sun-kissed dimension. Denver's premier balayage specialists."
        price="$220"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: businessInfo.website },
          { name: 'Services', url: `${businessInfo.website}/services` },
          { name: 'Balayage Denver', url: `${businessInfo.website}/services/balayage-denver` },
        ]}
      />

      <div className="animate-fade-in pt-32">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/balayage-brunette-long-1.jpg"
              alt="Balayage Denver - Hand Painted Highlights"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/90 to-emerald-deep/60" />
          </div>
          <div className="relative z-10 max-w-container mx-auto px-6 md:px-10 py-20">
            <p className="font-accent text-[13px] tracking-wide-3 text-gold-primary mb-4">
              DENVER&apos;S BALAYAGE EXPERTS
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-neutral-white mb-6">
              Balayage in Denver
            </h1>
            <p className="font-body text-lg text-neutral-pearl max-w-xl mb-8">
              Experience the art of hand-painted highlights at {businessInfo.name}. Our expert
              colorists specialize in creating natural, dimensional balayage that enhances your
              unique beauty.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/booking" className="btn-primary">
                BOOK BALAYAGE CONSULTATION
              </Link>
              <a href={`tel:${businessInfo.phoneRaw}`} className="px-8 py-4 rounded-full border-2 border-gold-light text-gold-light font-accent text-[13px] tracking-wide-2 hover:bg-gold-light hover:text-emerald-deep transition-all">
                CALL {businessInfo.phone}
              </a>
            </div>
          </div>
        </section>

        {/* What is Balayage */}
        <section className="py-20 px-6 md:px-10 max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-emerald-deep mb-6">
                What is Balayage?
              </h2>
              <p className="font-body text-base leading-relaxed text-neutral-slate mb-6">
                Balayage (French for &quot;sweeping&quot;) is a freehand highlighting technique
                where color is hand-painted onto the hair. Unlike traditional foil highlights,
                balayage creates a more <strong>natural, sun-kissed effect</strong> with soft,
                graduated lightening from root to tip.
              </p>
              <p className="font-body text-base leading-relaxed text-neutral-slate mb-6">
                At {businessInfo.name}, our colorists specialize in the <strong>highest level
                of coloring techniques</strong>, including custom balayage tailored to your
                hair type, skin tone, and lifestyle.
              </p>
              <h3 className="font-heading text-xl text-emerald-rich mb-4">Benefits of Balayage:</h3>
              <ul className="space-y-3">
                {[
                  'Natural, sun-kissed results',
                  'Low maintenance with soft regrowth',
                  'Customizable for any hair color',
                  'Works on all hair lengths',
                  'Less damage than traditional highlights',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-gold-primary">✓</span>
                    <span className="font-body text-neutral-slate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-2xl overflow-hidden">
                <Image src="/images/balayage-brunette-long-2.jpg" alt="Balayage example" fill className="object-cover" />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden mt-8">
                <Image src="/images/balayage-brunette-long-3.jpg" alt="Balayage result" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6 md:px-10 bg-neutral-pearl/50">
          <div className="max-w-container-md mx-auto">
            <div className="text-center mb-16">
              <p className="section-label">BALAYAGE SERVICES</p>
              <h2 className="section-title">Balayage Pricing</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {balayageTypes.map((type, i) => (
                <div key={i} className="card p-8 flex justify-between items-center">
                  <div>
                    <h3 className="font-heading text-xl text-emerald-rich mb-2">{type.name}</h3>
                    <p className="font-body text-sm text-neutral-stone">{type.desc}</p>
                  </div>
                  <p className="font-display text-2xl text-gold-primary">{type.price}</p>
                </div>
              ))}
            </div>
            <p className="text-center font-body text-sm text-neutral-stone mt-8">
              *Prices vary based on hair length and thickness. Consultation recommended.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 md:px-10 max-w-container-sm mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Balayage FAQs</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="card p-6">
                <h3 className="font-heading text-lg text-emerald-deep mb-3">{faq.q}</h3>
                <p className="font-body text-base text-neutral-slate">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-10 bg-emerald-gradient text-center">
          <h2 className="font-display text-3xl md:text-4xl text-gold-light mb-4">
            Ready for Your Dream Balayage?
          </h2>
          <p className="font-body text-base text-neutral-pearl max-w-text mx-auto mb-8">
            Book a consultation with our expert colorists and discover your perfect balayage look.
          </p>
          <Link href="/booking" className="px-12 py-4 rounded-full bg-gold-gradient text-emerald-deep font-accent text-[13px] font-semibold tracking-wide-2 shadow-gold hover:shadow-gold-lg transition-all duration-300">
            BOOK BALAYAGE CONSULTATION
          </Link>
        </section>
      </div>
    </>
  )
}

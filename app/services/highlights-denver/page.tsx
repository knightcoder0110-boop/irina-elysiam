import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { businessInfo } from '@/lib/data'
import { ServiceSchema, BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Highlights Denver | Full & Partial Foil Highlights',
  description: `Expert hair highlights in Denver at ${businessInfo.name}. Full highlights, partial highlights, face-framing, and dimensional color. Near Washington Park. Book today!`,
  keywords: ['highlights Denver', 'foil highlights Denver', 'hair highlights near me', 'partial highlights Denver', 'blonde highlights Denver'],
  openGraph: {
    title: 'Highlights Denver | Expert Foil Highlights',
    description: 'Beautiful, dimensional highlights by Denver\'s top colorists.',
    url: `${businessInfo.website}/services/highlights-denver`,
  },
  alternates: { canonical: `${businessInfo.website}/services/highlights-denver` },
}

const highlightTypes = [
  { name: 'Full Highlights', desc: 'Complete foil highlights throughout', time: '2.5 hrs' },
  { name: 'Partial Highlights', desc: 'Face-framing and top sections', time: '2 hrs' },
  { name: 'Baby Lights', desc: 'Ultra-fine, natural-looking highlights', time: '3 hrs' },
  { name: 'Highlights + Gloss', desc: 'Highlights with toning treatment', time: '3 hrs' },
]

export default function HighlightsDenverPage() {
  return (
    <>
      <ServiceSchema serviceName="Hair Highlights" serviceDescription="Expert foil highlights for dimensional, multi-tonal color. Full and partial highlights available." price="$140" />
      <BreadcrumbSchema items={[
        { name: 'Home', url: businessInfo.website },
        { name: 'Services', url: `${businessInfo.website}/services` },
        { name: 'Highlights Denver', url: `${businessInfo.website}/services/highlights-denver` },
      ]} />

      <div className="animate-fade-in pt-32">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center">
          <div className="absolute inset-0">
            <Image src="/images/new-images/client-hair-coloring-foils-process-1.jpeg" alt="Highlights Denver" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/90 to-emerald-deep/60" />
          </div>
          <div className="relative z-10 max-w-container mx-auto px-6 md:px-10 py-20">
            <p className="font-accent text-[13px] tracking-wide-3 text-gold-primary mb-4">EXPERT COLORISTS</p>
            <h1 className="font-display text-4xl md:text-6xl text-neutral-white mb-6">Hair Highlights in Denver</h1>
            <p className="font-body text-lg text-neutral-pearl max-w-xl mb-8">
              Add beautiful dimension to your hair with expert foil highlights at {businessInfo.name}.
              From subtle face-framing to full, dramatic highlights—we create the perfect look for you.
            </p>
            <Link href="/booking" className="btn-primary">BOOK HIGHLIGHTS APPOINTMENT</Link>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-6 md:px-10 max-w-container-md mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">OUR HIGHLIGHT SERVICES</p>
            <h2 className="section-title">Highlights Pricing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlightTypes.map((type, i) => (
              <div key={i} className="card p-6">
                <h4 className="font-heading text-lg text-emerald-rich mb-1">{type.name}</h4>
                <p className="font-body text-sm text-neutral-stone mb-2">{type.desc}</p>
                <span className="font-accent text-[11px] text-neutral-silver">{type.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Real Process Photos */}
        <section className="py-20 px-6 md:px-10 max-w-container mx-auto">
          <p className="section-label text-center mb-10">THE PROCESS</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image src="/images/new-images/client-hair-coloring-foils-process-1.jpeg" alt="Foil highlight process Denver" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-deep/80 to-transparent p-4">
                <p className="font-heading text-sm text-neutral-white">Foil Placement</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image src="/images/new-images/close-up-foils-hair-coloring-process-2.jpeg" alt="Hair coloring foil close-up Denver" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-deep/80 to-transparent p-4">
                <p className="font-heading text-sm text-neutral-white">Processing</p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image src="/images/new-images/straight-brunette-hair-with-blonde-highlights-wet.jpeg" alt="Finished highlights result Denver" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-deep/80 to-transparent p-4">
                <p className="font-heading text-sm text-neutral-white">Finished Result</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-6 md:px-10 bg-emerald-gradient text-center">
          <h2 className="font-display text-3xl text-gold-light mb-4">Expert Highlight Specialists</h2>
          <p className="font-body text-base text-neutral-pearl max-w-text mx-auto mb-8">
            Our colorists specialize in creating natural, expensive-looking highlights that complement your skin tone
            and lifestyle. We use the highest quality products for healthy, shiny results.
          </p>
          <Link href="/booking" className="px-12 py-4 rounded-full bg-gold-gradient text-emerald-deep font-accent text-[13px] font-semibold tracking-wide-2 shadow-gold">
            BOOK YOUR APPOINTMENT
          </Link>
        </section>
      </div>
    </>
  )
}

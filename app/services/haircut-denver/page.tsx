import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { businessInfo, services } from '@/lib/data'
import { ServiceSchema, BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Haircut Denver | Precision Cuts for Men, Women & Kids',
  description: `Expert haircuts in Denver for the whole family at ${businessInfo.name}. Precision cuts, men's grooming, children's cuts & styling. Near Washington Park. Book today!`,
  keywords: ['haircut Denver', 'hair salon Denver', 'mens haircut Denver', 'womens haircut Denver', 'kids haircut Denver', 'barber Denver'],
  openGraph: {
    title: 'Haircut Denver | Expert Cuts for Everyone',
    description: 'Precision haircuts for men, women, and children in Denver.',
    url: `${businessInfo.website}/services/haircut-denver`,
  },
  alternates: { canonical: `${businessInfo.website}/services/haircut-denver` },
}

export default function HaircutDenverPage() {
  return (
    <>
      <ServiceSchema serviceName="Precision Haircut" serviceDescription="Expert haircuts for men, women, and children. Consultation, shampoo, precision cut, and style." price="$45" />
      <BreadcrumbSchema items={[
        { name: 'Home', url: businessInfo.website },
        { name: 'Services', url: `${businessInfo.website}/services` },
        { name: 'Haircut Denver', url: `${businessInfo.website}/services/haircut-denver` },
      ]} />

      <div className="animate-fade-in pt-32">
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-center">
          <div className="absolute inset-0">
            <Image src="/images/pixie-blonde-highlights-1.jpg" alt="Haircut Denver" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/90 to-emerald-deep/60" />
          </div>
          <div className="relative z-10 max-w-container mx-auto px-6 md:px-10 py-20">
            <p className="font-accent text-[13px] tracking-wide-3 text-gold-primary mb-4">FOR THE WHOLE FAMILY</p>
            <h1 className="font-display text-4xl md:text-6xl text-neutral-white mb-6">Haircuts in Denver</h1>
            <p className="font-body text-lg text-neutral-pearl max-w-xl mb-8">
              Top-notch haircutting services for women, men, and children. Our expert stylists
              deliver precision cuts tailored to your face shape, lifestyle, and personal style.
            </p>
            <Link href="/booking" className="btn-primary">BOOK HAIRCUT</Link>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-6 md:px-10 max-w-container-md mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">OUR CUTTING SERVICES</p>
            <h2 className="section-title">Haircut Menu</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.cutting.map((service, i) => (
              <div key={i} className="card p-8">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-heading text-xl text-emerald-rich">{service.name}</h3>
                  <p className="font-display text-2xl text-gold-primary">{service.price}</p>
                </div>
                <p className="font-body text-sm text-neutral-stone mb-2">{service.description}</p>
                <p className="font-accent text-[11px] text-neutral-silver">{service.duration}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Family Friendly */}
        <section className="py-20 px-6 md:px-10 bg-neutral-pearl/50">
          <div className="max-w-container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '👩', title: "Women's Cuts", desc: 'From classic bobs to trendy pixies, precision cuts for every style.' },
                { icon: '👨', title: "Men's Grooming", desc: 'Expert barber services including cuts, beard trims, and neck cleanup.' },
                { icon: '👧', title: "Kids' Cuts", desc: 'Patient, friendly service for children ages 12 and under.' },
              ].map((item, i) => (
                <div key={i} className="text-center p-8 rounded-2xl bg-neutral-white border border-gold-primary/15">
                  <span className="text-5xl mb-4 block">{item.icon}</span>
                  <h3 className="font-heading text-xl text-emerald-deep mb-3">{item.title}</h3>
                  <p className="font-body text-sm text-neutral-stone">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-10 bg-emerald-gradient text-center">
          <h2 className="font-display text-3xl text-gold-light mb-4">Ready for a Fresh Cut?</h2>
          <p className="font-body text-base text-neutral-pearl mb-8">Book your appointment at Denver&apos;s premier family hair salon.</p>
          <Link href="/booking" className="px-12 py-4 rounded-full bg-gold-gradient text-emerald-deep font-accent text-[13px] font-semibold tracking-wide-2 shadow-gold">
            BOOK NOW
          </Link>
        </section>
      </div>
    </>
  )
}

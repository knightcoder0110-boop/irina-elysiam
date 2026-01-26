import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { businessInfo, businessHours, services, neighborhoods, stats } from '@/lib/data'
import { LocalBusinessSchema, BreadcrumbSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Best Hair Salon in Denver, CO | Balayage, Highlights & Cuts',
  description: `Looking for the best hair salon in Denver? ${businessInfo.name} offers expert balayage, highlights, haircuts, Brazilian blowouts & more. Located near Washington Park & Cherry Creek. Book today!`,
  keywords: [
    'hair salon Denver',
    'Denver hair stylist',
    'best hair salon Denver CO',
    'balayage Denver',
    'highlights Denver',
    'haircut Denver',
    'hair color Denver',
    'Washington Park hair salon',
    'Cherry Creek hair salon',
  ],
  openGraph: {
    title: 'Best Hair Salon in Denver, CO | Irina Elysian',
    description: 'Premium hair salon in Denver offering balayage, highlights, haircuts, and treatments. Near Washington Park & Cherry Creek.',
    url: `${businessInfo.website}/denver-hair-salon`,
  },
  alternates: {
    canonical: `${businessInfo.website}/denver-hair-salon`,
  },
}

const popularServices = [
  { name: 'Balayage', desc: 'Hand-painted highlights for natural dimension', price: 'From $220', link: '/services/balayage-denver', image: '/images/balayage-brunette-long-1.jpg' },
  { name: 'Highlights', desc: 'Full or partial foil highlights', price: 'From $140', link: '/services/highlights-denver', image: '/images/bob-blonde-highlights-1.jpg' },
  { name: 'Precision Haircuts', desc: 'Expert cuts for the whole family', price: 'From $45', link: '/services/haircut-denver', image: '/images/pixie-blonde-highlights-1.jpg' },
  { name: 'Brazilian Blowout', desc: 'Smoothing treatment for frizz-free hair', price: 'From $300', link: '/services/brazilian-blowout-denver', image: '/images/layered-blonde-waves-1.jpg' },
]

export default function DenverHairSalonPage() {
  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: businessInfo.website },
          { name: 'Denver Hair Salon', url: `${businessInfo.website}/denver-hair-salon` },
        ]}
      />

      <div className="animate-fade-in pt-32">
        {/* Hero Section */}
        <section className="page-header bg-gradient-to-br from-neutral-pearl to-emerald-pale/30">
          <p className="section-label">DENVER&apos;S PREMIER HAIR SALON</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-emerald-deep mb-5">
            Best Hair Salon in Denver, CO
          </h1>
          <p className="font-body text-lg text-neutral-slate max-w-text mx-auto mb-8">
            Experience the highest level of coloring techniques, precision haircuts, and
            transformative treatments at {businessInfo.name}. Proudly serving Denver and
            surrounding neighborhoods including Washington Park, Cherry Creek, and Belcaro.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/booking" className="btn-primary">
              BOOK APPOINTMENT
            </Link>
            <Link href="/services" className="btn-secondary">
              VIEW ALL SERVICES
            </Link>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-6 md:px-10 max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-emerald-deep mb-6">
                Why Denver Chooses {businessInfo.name}
              </h2>
              <p className="font-body text-base leading-relaxed text-neutral-slate mb-6">
                At {businessInfo.legalName}, we specialize in the <strong>highest level of
                coloring techniques</strong> including balayage, highlights, root touch-ups,
                and glossing treatments. Our expert stylists provide <strong>top-notch
                haircutting services for the whole family</strong> — women, men, and children.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Expert balayage & dimensional color specialists',
                  'Precision haircuts for men, women & children',
                  'Brazilian Blowout & Keratin certified stylists',
                  'Convenient location near Washington Park',
                  'Family-friendly atmosphere',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-gold-primary mt-1">✓</span>
                    <span className="font-body text-neutral-slate">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="font-accent text-[12px] tracking-wide-2 text-gold-primary hover:text-emerald-deep transition-colors"
              >
                LEARN MORE ABOUT US →
              </Link>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden">
              <Image
                src="/images/platinum-blonde-portrait.jpg"
                alt="Hair Salon Denver - Expert Styling"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="py-20 px-6 md:px-10 bg-neutral-pearl/50">
          <div className="max-w-container mx-auto">
            <div className="text-center mb-16">
              <p className="section-label">OUR DENVER SERVICES</p>
              <h2 className="section-title">Popular Hair Services</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularServices.map((service, i) => (
                <Link
                  key={i}
                  href={service.link}
                  className="card card-hover overflow-hidden group"
                >
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={`${service.name} Denver`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-white via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl text-emerald-rich mb-2">{service.name}</h3>
                    <p className="font-body text-sm text-neutral-stone mb-3">{service.desc}</p>
                    <p className="font-display text-lg text-gold-primary">{service.price}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services" className="btn-secondary">
                VIEW FULL SERVICE MENU
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6 md:px-10 bg-emerald-gradient">
          <div className="max-w-container-md mx-auto">
            <div className="grid grid-cols-3 gap-10 text-center">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="stat-number">{stat.number}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods We Serve */}
        <section className="py-20 px-6 md:px-10 max-w-container mx-auto">
          <div className="text-center mb-16">
            <p className="section-label">SERVING DENVER</p>
            <h2 className="section-title">Neighborhoods We Serve</h2>
            <p className="font-body text-base text-neutral-slate max-w-text mx-auto mt-4">
              Conveniently located at {businessInfo.address.street} in Denver, we proudly serve
              clients from throughout the metro area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoods.map((n, i) => (
              <Link
                key={i}
                href={`/${n.slug}-hair-salon`}
                className="p-8 rounded-2xl border border-gold-primary/20 bg-neutral-white hover:border-gold-primary hover:shadow-card transition-all duration-300 text-center group"
              >
                <h3 className="font-heading text-xl text-emerald-deep mb-2 group-hover:text-gold-primary transition-colors">
                  {n.name}
                </h3>
                <p className="font-body text-sm text-neutral-stone mb-3">{n.description}</p>
                <span className="font-accent text-[11px] tracking-wide-2 text-gold-primary">
                  LEARN MORE →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Location & Hours */}
        <section className="py-20 px-6 md:px-10 bg-gradient-to-br from-gold-champagne/30 to-neutral-pearl">
          <div className="max-w-container-md mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Location */}
              <div className="card p-10">
                <h3 className="font-heading text-2xl text-emerald-deep mb-6">Visit Our Denver Salon</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-accent text-[11px] tracking-wide-2 text-gold-primary mb-2">ADDRESS</p>
                    <p className="font-body text-base text-neutral-slate">
                      {businessInfo.address.street}<br />
                      {businessInfo.address.suite}<br />
                      {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zip}
                    </p>
                  </div>
                  <div>
                    <p className="font-accent text-[11px] tracking-wide-2 text-gold-primary mb-2">PHONE</p>
                    <a href={`tel:${businessInfo.phoneRaw}`} className="font-body text-base text-emerald-deep hover:text-gold-primary transition-colors">
                      {businessInfo.phone}
                    </a>
                  </div>
                  <div>
                    <p className="font-accent text-[11px] tracking-wide-2 text-gold-primary mb-2">EMAIL</p>
                    <a href={`mailto:${businessInfo.email}`} className="font-body text-base text-emerald-deep hover:text-gold-primary transition-colors">
                      {businessInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="card p-10">
                <h3 className="font-heading text-2xl text-emerald-deep mb-6">Salon Hours</h3>
                <div className="space-y-3">
                  {businessHours.display.map((item, i) => (
                    <div key={i} className="flex justify-between pb-3 border-b border-gold-primary/15">
                      <span className="font-body text-sm text-neutral-slate">{item.day}</span>
                      <span className="font-accent text-[12px] text-emerald-deep">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <Link href="/booking" className="btn-primary w-full mt-8">
                  BOOK YOUR APPOINTMENT
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 md:px-10 bg-emerald-gradient text-center">
          <h2 className="font-display text-3xl md:text-4xl text-gold-light mb-4">
            Ready for Your Best Hair Yet?
          </h2>
          <p className="font-body text-base text-neutral-pearl max-w-text mx-auto mb-8">
            Book your appointment at Denver&apos;s premier hair salon today and experience the
            {businessInfo.name} difference.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/booking" className="px-10 py-4 rounded-full bg-gold-gradient text-emerald-deep font-accent text-[13px] font-semibold tracking-wide-2 shadow-gold hover:shadow-gold-lg transition-all duration-300">
              BOOK NOW
            </Link>
            <a href={`tel:${businessInfo.phoneRaw}`} className="px-10 py-4 rounded-full border-2 border-gold-light text-gold-light font-accent text-[13px] font-semibold tracking-wide-2 hover:bg-gold-light hover:text-emerald-deep transition-all duration-300">
              CALL {businessInfo.phone}
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

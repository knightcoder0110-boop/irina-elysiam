import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { businessInfo, businessHours, neighborhoods, services } from '@/lib/data'
import { LocalBusinessSchema, BreadcrumbSchema } from '@/components/SchemaMarkup'

// Generate static params for all neighborhoods
export function generateStaticParams() {
  return neighborhoods.map((n) => ({
    'neighborhood': n.slug,
  }))
}

// Generate metadata for each neighborhood
export function generateMetadata({ params }: { params: { 'neighborhood': string } }): Metadata {
  const slug = params['neighborhood']
  const neighborhood = neighborhoods.find((n) => n.slug === slug)

  if (!neighborhood) {
    return { title: 'Not Found' }
  }

  return {
    title: `Hair Salon in ${neighborhood.name}, Denver | ${businessInfo.name}`,
    description: `Looking for a hair salon in ${neighborhood.name}? ${businessInfo.name} offers expert balayage, highlights, haircuts & treatments near ${neighborhood.name}. ${neighborhood.description}`,
    keywords: [
      `${neighborhood.name} hair salon`,
      `hair salon ${neighborhood.name} Denver`,
      `${neighborhood.name} hairdresser`,
      `balayage ${neighborhood.name}`,
      `haircut ${neighborhood.name}`,
      ...neighborhood.nearby.map((n) => `hair salon near ${n}`),
    ],
    openGraph: {
      title: `Hair Salon in ${neighborhood.name} | ${businessInfo.name}`,
      description: `Premium hair services near ${neighborhood.name}, Denver. Expert coloring, cuts & treatments.`,
      url: `${businessInfo.website}/${neighborhood.slug}-hair-salon`,
    },
    alternates: {
      canonical: `${businessInfo.website}/${neighborhood.slug}-hair-salon`,
    },
  }
}

export default function NeighborhoodPage({ params }: { params: { 'neighborhood': string } }) {
  const slug = params['neighborhood']
  const neighborhood = neighborhoods.find((n) => n.slug === slug)

  if (!neighborhood) {
    notFound()
  }

  const featuredServices = [
    { ...services.color[2], image: '/images/balayage-brunette-long-1.jpg' }, // Balayage
    { ...services.color[3], image: '/images/bob-blonde-highlights-1.jpg' }, // Highlights
    { ...services.cutting[0], image: '/images/pixie-blonde-highlights-1.jpg' }, // Haircut
    { ...services.treatments[0], image: '/images/layered-blonde-waves-1.jpg' }, // Brazilian Blowout
  ]

  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: businessInfo.website },
          { name: 'Denver Hair Salon', url: `${businessInfo.website}/denver-hair-salon` },
          { name: `${neighborhood.name} Hair Salon`, url: `${businessInfo.website}/${neighborhood.slug}-hair-salon` },
        ]}
      />

      <div className="animate-fade-in pt-32">
        {/* Hero Section */}
        <section className="page-header bg-gradient-to-br from-neutral-pearl to-emerald-pale/30">
          <p className="section-label">SERVING {neighborhood.name.toUpperCase()}</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-emerald-deep mb-5">
            Hair Salon Near {neighborhood.name}
          </h1>
          <p className="font-body text-lg text-neutral-slate max-w-text mx-auto mb-8">
            {neighborhood.description} Our Denver salon is conveniently located just minutes
            from {neighborhood.name}, offering premium hair services including balayage,
            highlights, precision cuts, and treatments.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/booking" className="btn-primary">
              BOOK APPOINTMENT
            </Link>
            <a href={`tel:${businessInfo.phoneRaw}`} className="btn-secondary">
              CALL {businessInfo.phone}
            </a>
          </div>
        </section>

        {/* About This Location */}
        <section className="py-20 px-6 md:px-10 max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[450px] rounded-3xl overflow-hidden">
              <Image
                src="/images/balayage-brunette-long-2.jpg"
                alt={`Hair Salon ${neighborhood.name} Denver`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-emerald-deep mb-6">
                Your {neighborhood.name} Hair Salon
              </h2>
              <p className="font-body text-base leading-relaxed text-neutral-slate mb-6">
                {businessInfo.name} is proud to serve the {neighborhood.name} community with
                premium hair services. Whether you&apos;re looking for a stunning balayage,
                expert highlights, a precision haircut, or a smoothing treatment, our skilled
                stylists are here to help you look and feel your best.
              </p>
              <p className="font-body text-base leading-relaxed text-neutral-slate mb-6">
                Located at <strong>{businessInfo.address.full}</strong>, we&apos;re just a
                short drive from {neighborhood.name} and surrounding areas including{' '}
                {neighborhood.nearby.join(', ')}.
              </p>
              <div className="p-6 rounded-xl bg-gold-champagne/30 border border-gold-primary/20">
                <p className="font-accent text-[11px] tracking-wide-2 text-gold-primary mb-2">
                  EASY TO REACH FROM
                </p>
                <div className="flex flex-wrap gap-2">
                  {[neighborhood.name, ...neighborhood.nearby].map((area, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-neutral-white text-sm text-emerald-deep">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-6 md:px-10 bg-neutral-pearl/50">
          <div className="max-w-container mx-auto">
            <div className="text-center mb-16">
              <p className="section-label">OUR SERVICES</p>
              <h2 className="section-title">Hair Services Near {neighborhood.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.map((service, i) => (
                <div key={i} className="card overflow-hidden group">
                  <div className="h-40 relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={`${service.name} near ${neighborhood.name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg text-emerald-rich mb-2">{service.name}</h3>
                    <p className="font-body text-sm text-neutral-stone mb-3">{service.description}</p>
                    <p className="font-display text-lg text-gold-primary">{service.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/services" className="btn-secondary">
                VIEW ALL SERVICES
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-6 md:px-10 max-w-container-md mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-emerald-deep">
              Why {neighborhood.name} Residents Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '✨',
                title: 'Expert Colorists',
                desc: 'Specializing in balayage, highlights, and dimensional color techniques.',
              },
              {
                icon: '✂️',
                title: 'Precision Cuts',
                desc: 'Top-notch haircutting services for the whole family.',
              },
              {
                icon: '📍',
                title: 'Convenient Location',
                desc: `Easy access from ${neighborhood.name} with ample parking.`,
              },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-2xl border border-gold-primary/15 bg-neutral-white">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-heading text-xl text-emerald-deep mb-3">{item.title}</h3>
                <p className="font-body text-sm text-neutral-stone">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Hours */}
        <section className="py-20 px-6 md:px-10 bg-emerald-gradient">
          <div className="max-w-container-md mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl text-gold-light">Visit Us Today</h2>
              <p className="font-body text-base text-neutral-pearl mt-4">
                Conveniently located near {neighborhood.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur">
                <h3 className="font-accent text-[11px] tracking-wide-2 text-gold-primary mb-4">LOCATION</h3>
                <p className="font-heading text-xl text-neutral-pearl mb-4">
                  {businessInfo.address.street}<br />
                  {businessInfo.address.suite}<br />
                  {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zip}
                </p>
                <p className="font-body text-neutral-pearl">
                  <a href={`tel:${businessInfo.phoneRaw}`} className="hover:text-gold-light transition-colors">
                    {businessInfo.phone}
                  </a>
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur">
                <h3 className="font-accent text-[11px] tracking-wide-2 text-gold-primary mb-4">HOURS</h3>
                {businessHours.display.map((item, i) => (
                  <div key={i} className="flex justify-between mb-2 text-neutral-pearl">
                    <span className="font-body text-sm">{item.day}</span>
                    <span className="font-accent text-sm">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/booking" className="px-12 py-4 rounded-full bg-gold-gradient text-emerald-deep font-accent text-[13px] font-semibold tracking-wide-2 shadow-gold hover:shadow-gold-lg transition-all duration-300">
                BOOK YOUR APPOINTMENT
              </Link>
            </div>
          </div>
        </section>

        {/* Other Neighborhoods */}
        <section className="py-20 px-6 md:px-10 max-w-container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-emerald-deep">Also Serving</h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {neighborhoods
              .filter((n) => n.slug !== neighborhood.slug)
              .map((n, i) => (
                <Link
                  key={i}
                  href={`/${n.slug}-hair-salon`}
                  className="px-6 py-3 rounded-full border border-emerald-deep/20 text-emerald-deep font-accent text-[11px] tracking-wide-2 hover:border-gold-primary hover:text-gold-primary transition-colors"
                >
                  {n.name.toUpperCase()}
                </Link>
              ))}
            <Link
              href="/denver-hair-salon"
              className="px-6 py-3 rounded-full bg-emerald-deep text-gold-light font-accent text-[11px] tracking-wide-2 hover:bg-emerald-rich transition-colors"
            >
              ALL DENVER AREAS
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

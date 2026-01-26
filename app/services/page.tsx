import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our premium hair services including precision cuts, color artistry, treatments, and bridal packages at Irina Elysian Hair Design Studio.',
}

const cuttingServices = [
  { name: 'Signature Haircut', desc: 'Consultation, shampoo, precision cut, and style', price: '$85', time: '60 min' },
  { name: 'Express Cut', desc: 'Quick trim and refresh', price: '$55', time: '30 min' },
  { name: "Men's Grooming", desc: 'Cut, beard trim, and neck cleanup', price: '$65', time: '45 min' },
  { name: "Children's Cut", desc: 'Ages 12 and under', price: '$45', time: '30 min' },
  { name: 'Blowout & Style', desc: 'Shampoo and professional styling', price: '$65', time: '45 min' },
  { name: 'Special Occasion', desc: 'Updo or elaborate styling', price: '$120+', time: '90 min' },
]

const colorServices = [
  { name: 'Full Color', desc: 'Complete all-over color application', price: '$150+', time: '2 hrs' },
  { name: 'Root Touch-Up', desc: 'Refresh your color at the roots', price: '$95', time: '90 min' },
  { name: 'Balayage', desc: 'Hand-painted, natural-looking dimension', price: '$220+', time: '3 hrs' },
  { name: 'Full Highlights', desc: 'Foil highlights throughout', price: '$185+', time: '2.5 hrs' },
  { name: 'Partial Highlights', desc: 'Face-framing and top sections', price: '$140', time: '2 hrs' },
  { name: 'Gloss Treatment', desc: 'Shine-boosting toner treatment', price: '$65', time: '30 min' },
]

const treatmentServices = [
  { name: 'Brazilian Blowout', desc: 'Smoothing treatment for frizz-free hair', price: '$300', time: '2.5 hrs' },
  { name: 'Keratin Treatment', desc: 'Long-lasting smoothing and shine', price: '$350', time: '3 hrs' },
  { name: 'Deep Conditioning', desc: 'Intensive moisture therapy', price: '$55', time: '30 min' },
  { name: 'Scalp Treatment', desc: 'Detoxifying and nourishing scalp therapy', price: '$75', time: '45 min' },
]

const bridalServices = [
  { name: 'Bridal Trial', price: '$150' },
  { name: 'Wedding Day Hair', price: '$300' },
  { name: 'Bridal Party (each)', price: '$125' },
]

function ServiceCard({ name, desc, price, time }: { name: string; desc: string; price: string; time: string }) {
  return (
    <div className="service-card">
      <div>
        <h4 className="font-heading text-xl text-emerald-rich mb-2">{name}</h4>
        <p className="font-body text-sm text-neutral-stone mb-2">{desc}</p>
        <span className="font-accent text-[11px] text-neutral-silver">{time}</span>
      </div>
      <p className="font-display text-2xl text-gold-primary">{price}</p>
    </div>
  )
}

function ServiceCategory({ title, services }: { title: string; services: typeof cuttingServices }) {
  return (
    <div className="mb-20">
      <h2 className="font-heading text-4xl text-emerald-deep mb-10 pb-4 border-b-2 border-gold-primary/30">
        {title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
        {services.map((service, i) => (
          <ServiceCard key={i} {...service} />
        ))}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div className="animate-fade-in pt-32">
      {/* Page Header */}
      <section className="page-header">
        <p className="section-label">WHAT WE OFFER</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep mb-5">Our Services</h1>
        <p className="font-body text-lg text-neutral-slate max-w-text mx-auto">
          From precision cuts to transformative color, every service is executed with
          master-level technique.
        </p>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-[100px] px-6 md:px-10 max-w-container mx-auto">
        <ServiceCategory title="Cutting & Styling" services={cuttingServices} />
        <ServiceCategory title="Color Artistry" services={colorServices} />
        <ServiceCategory title="Treatments & Care" services={treatmentServices} />

        {/* Bridal Section */}
        <div className="rounded-3xl bg-gradient-to-br from-gold-champagne/40 to-neutral-pearl border border-gold-primary/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Side */}
            <div className="h-64 lg:h-auto relative">
              <Image
                src="/images/curly-blonde-medium-1.jpg"
                alt="Bridal Hair Styling"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gold-champagne/60 lg:block hidden" />
            </div>
            {/* Content Side */}
            <div className="p-6 md:p-10 lg:p-16 text-center lg:text-left">
              <span className="text-5xl mb-6 block">👑</span>
              <h2 className="font-display text-4xl text-emerald-deep mb-4">Bridal Services</h2>
              <p className="font-body text-base text-neutral-slate max-w-text mx-auto lg:mx-0 mb-8">
                Your wedding day deserves perfection. Includes consultation, trial session, and
                day-of styling.
              </p>
              <div className="flex gap-6 justify-center lg:justify-start flex-wrap">
                {bridalServices.map((item, i) => (
                  <div key={i} className="px-8 py-5 rounded-xl bg-neutral-white shadow-card-sm">
                    <p className="font-accent text-[12px] text-emerald-rich mb-1">{item.name}</p>
                    <p className="font-display text-xl text-gold-primary">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

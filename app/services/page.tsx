import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our premium hair services including precision cuts, color artistry, treatments, and bridal packages at Irina Elysian Hair Design Studio.',
}

const cuttingServices = [
  { name: 'Signature Haircut', desc: 'Consultation, shampoo, precision cut, and style', time: '60 min' },
  { name: 'Express Cut', desc: 'Quick trim and refresh', time: '30 min' },
  { name: "Men's Grooming", desc: 'Cut, beard trim, and neck cleanup', time: '45 min' },
  { name: "Children's Cut", desc: 'Ages 12 and under', time: '30 min' },
  { name: 'Blowout & Style', desc: 'Shampoo and professional styling', time: '45 min' },
  { name: 'Special Occasion', desc: 'Updo or elaborate styling', time: '90 min' },
]

const colorServices = [
  { name: 'Full Color', desc: 'Complete all-over color application', time: '2 hrs' },
  { name: 'Root Touch-Up', desc: 'Refresh your color at the roots', time: '90 min' },
  { name: 'Balayage', desc: 'Hand-painted, natural-looking dimension', time: '3 hrs' },
  { name: 'Full Highlights', desc: 'Foil highlights throughout', time: '2.5 hrs' },
  { name: 'Partial Highlights', desc: 'Face-framing and top sections', time: '2 hrs' },
  { name: 'Gloss Treatment', desc: 'Shine-boosting toner treatment', time: '30 min' },
]

const treatmentServices = [
  { name: 'Brazilian Blowout', desc: 'Smoothing treatment for frizz-free hair', time: '2.5 hrs' },
  { name: 'Keratin Treatment', desc: 'Long-lasting smoothing and shine', time: '3 hrs' },
  { name: 'Deep Conditioning', desc: 'Intensive moisture therapy', time: '30 min' },
  { name: 'Scalp Treatment', desc: 'Detoxifying and nourishing scalp therapy', time: '45 min' },
]

const bridalServices = [
  { name: 'Bridal Trial' },
  { name: 'Wedding Day Hair' },
  { name: 'Bridal Party (each)' },
]

function ServiceCard({ name, desc, time }: { name: string; desc: string; time: string }) {
  return (
    <div className="service-card">
      <div>
        <h4 className="font-heading text-xl text-emerald-rich mb-2">{name}</h4>
        <p className="font-body text-sm text-neutral-stone mb-2">{desc}</p>
        <span className="font-accent text-[11px] text-neutral-silver">{time}</span>
      </div>
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

      {/* Real Work Photo Strip */}
      <section className="py-10 px-6 md:px-10 max-w-container mx-auto">
        <p className="section-label text-center mb-6">REAL CLIENT RESULTS</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
            <Image src="/images/new-images/straight-bob-blonde-highlights.jpeg" alt="Bob with blonde highlights - Irina Elysian Denver" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="absolute bottom-3 left-3 font-heading text-sm text-neutral-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">Bob + Highlights</p>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
            <Image src="/images/new-images/client-back-blonde-highlights-wavy.jpeg" alt="Wavy blonde highlights client - Denver salon" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="absolute bottom-3 left-3 font-heading text-sm text-neutral-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">Wavy Color</p>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
            <Image src="/images/new-images/straight-brunette-hair-with-blonde-highlights-wet.jpeg" alt="Brunette hair with blonde highlights - Denver" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="absolute bottom-3 left-3 font-heading text-sm text-neutral-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">Brunette Highlights</p>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
            <Image src="/images/new-images/mens-hair-dark-with-blonde-highlights-wet.jpeg" alt="Mens hair with highlights - Irina Elysian" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="absolute bottom-3 left-3 font-heading text-sm text-neutral-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">Men&apos;s Highlights</p>
          </div>
        </div>
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
                src="/images/new-images/stylist-hugging-male-client-with-highlights.jpeg"
                alt="Bridal Hair Styling at Irina Elysian"
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

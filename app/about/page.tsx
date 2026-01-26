import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Irina Elysian Hair Design Studio - our story, values, and commitment to divine beauty for everyone.',
}

const values = [
  {
    title: 'Supreme Excellence',
    description: 'We never compromise on quality. Every service is executed with master-level precision.',
  },
  {
    title: 'Natural Elegance',
    description: 'We enhance your natural beauty, never mask it. Healthy hair is our foundation.',
  },
  {
    title: 'Inclusive Luxury',
    description: 'Premium service for everyone—regardless of age, gender, or background.',
  },
  {
    title: 'Continuous Growth',
    description: 'Our team constantly evolves, learning new techniques to serve you better.',
  },
]

const amenities = [
  { icon: '🍾', title: 'Complimentary Beverages', desc: 'Champagne, wine, coffee, or tea' },
  { icon: '🎧', title: 'Personal Sound', desc: 'Noise-canceling headphones available' },
  { icon: '🌿', title: 'Botanical Products', desc: 'Premium, eco-conscious haircare' },
  { icon: '📱', title: 'Digital Comfort', desc: 'Charging stations & WiFi' },
]

export default function AboutPage() {
  return (
    <div className="animate-fade-in pt-32">
      {/* Page Header */}
      <section className="page-header bg-gradient-to-br from-neutral-pearl to-emerald-pale/30">
        <p className="section-label">OUR STORY</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep">About Irina Elysian</h1>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-[100px] px-6 md:px-10 max-w-container-sm mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="font-heading text-4xl text-emerald-deep mb-6">A Legacy of Excellence</h2>
            <p className="font-body text-base leading-relaxed text-neutral-slate mb-5">
              Founded in 2008 by master stylist Irina Volkov, our studio was born from a
              simple yet powerful belief: everyone deserves access to exceptional hair care.
            </p>
            <p className="font-body text-base leading-relaxed text-neutral-slate">
              The name "Elysian" comes from the Greek concept of paradise—a heavenly realm
              of beauty and tranquility. That's exactly what we strive to create for every
              guest.
            </p>
          </div>
          <div className="h-96 rounded-3xl overflow-hidden relative group">
            <Image
              src="/images/platinum-blonde-portrait.jpg"
              alt="Irina Elysian Studio"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/30 to-transparent" />
          </div>
        </div>

        {/* Values */}
        <div className="p-6 md:p-10 lg:p-16 rounded-3xl bg-neutral-white border border-gold-primary/15 shadow-card">
          <h3 className="font-display text-3xl text-emerald-deep text-center mb-12">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {values.map((value, i) => (
              <div key={i}>
                <h4 className="font-heading text-xl text-gold-primary mb-3">{value.title}</h4>
                <p className="font-body text-sm leading-relaxed text-neutral-slate">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 md:py-[100px] px-6 md:px-10 bg-emerald-gradient">
        <div className="max-w-container-md mx-auto">
          <h3 className="font-display text-4xl text-gold-light text-center mb-16">
            The Elysian Experience
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((amenity, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/5 border border-gold-primary/20 text-center"
              >
                <span className="text-4xl block mb-4">{amenity.icon}</span>
                <h4 className="font-accent text-xs tracking-widest text-gold-light mb-2">
                  {amenity.title}
                </h4>
                <p className="font-body text-sm text-neutral-pearl/80">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Reviews & Testimonials',
  description: 'Read what our clients say about their experience at Irina Elysian Hair Design Studio.',
}

const reviews = [
  { quote: "The balayage is absolutely stunning. Everyone asks where I get my hair done!", name: 'Amanda S.', service: 'Balayage', rating: 5, image: '/images/balayage-brunette-long-1.jpg' },
  { quote: "Best haircut I've ever had. Irina really understood what I wanted.", name: 'Rachel T.', service: 'Precision Cut', rating: 5, image: '/images/pixie-blonde-highlights-1.jpg' },
  { quote: "My husband and son both come here now. Great with the whole family!", name: 'Lisa M.', service: 'Family Services', rating: 5, image: '/images/bob-blonde-salon-1.jpg' },
  { quote: "The Brazilian blowout changed my life. My morning routine is so much easier!", name: 'Caroline H.', service: 'Brazilian Blowout', rating: 5, image: '/images/layered-blonde-waves-1.jpg' },
  { quote: "Irina made me look like a princess on my wedding day. Couldn't be happier!", name: 'Jessica R.', service: 'Bridal', rating: 5, image: '/images/curly-blonde-medium-1.jpg' },
  { quote: "Finally found a colorist who gets it. My highlights look natural and expensive.", name: 'Megan K.', service: 'Highlights', rating: 5, image: '/images/bob-blonde-highlights-1.jpg' },
]

const stats = [
  { value: '5.0', label: 'Google Rating' },
  { value: '100%', label: 'Would Recommend' },
  { value: '15+', label: 'Years Experience' },
]

export default function TestimonialsPage() {
  return (
    <div className="animate-fade-in pt-32">
      {/* Page Header */}
      <section className="page-header">
        <p className="section-label">CLIENT STORIES</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep">
          Reviews & Testimonials
        </h1>
      </section>

      <section className="py-16 md:py-[100px] px-6 md:px-10 max-w-container-md mx-auto">
        {/* Featured Review */}
        <div className="p-6 md:p-10 lg:p-16 rounded-3xl bg-emerald-gradient text-center mb-16">
          <div className="text-5xl opacity-40 mb-6">"</div>
          <p className="font-heading text-2xl md:text-3xl italic text-gold-light leading-relaxed max-w-3xl mx-auto mb-8">
            Irina Elysian transformed not just my hair, but my entire sense of self. From
            the moment I walked in, I knew I'd found my forever salon.
          </p>
          <p className="font-accent text-[13px] tracking-wide-2 text-gold-champagne">
            JENNIFER L. • CLIENT SINCE 2019
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="testimonial-card overflow-hidden group">
              {/* Review Image */}
              <div className="h-40 -mx-10 -mt-10 mb-6 relative overflow-hidden">
                <Image
                  src={review.image}
                  alt={`${review.name}'s styling`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-white via-neutral-white/50 to-transparent" />
              </div>
              <div className="flex gap-1 mb-5">
                {[...Array(review.rating)].map((_, j) => (
                  <span key={j} className="text-gold-primary text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="font-heading text-lg italic leading-relaxed text-neutral-slate mb-6">
                "{review.quote}"
              </p>
              <div className="flex justify-between items-center">
                <p className="font-accent text-sm font-semibold text-emerald-rich">
                  {review.name}
                </p>
                <span className="badge badge-emerald">{review.service}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 p-6 md:p-10 lg:p-12 rounded-3xl bg-gold-champagne/40 grid grid-cols-3 gap-6 md:gap-10 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="font-display text-4xl text-emerald-deep mb-2">{stat.value}</p>
              <p className="font-accent text-[11px] tracking-wide-2 text-neutral-slate">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

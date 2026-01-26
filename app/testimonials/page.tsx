import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reviews & Testimonials',
  description: 'Read what our clients say about their experience at Irina Elysian Hair Design Studio.',
}

const reviews = [
  { quote: "The balayage Marcus did is absolutely stunning. Everyone asks where I get my hair done!", name: 'Amanda S.', service: 'Balayage', rating: 5 },
  { quote: "Best haircut I've ever had. Sofia really understood what I wanted.", name: 'Rachel T.', service: 'Precision Cut', rating: 5 },
  { quote: "My husband and son both come here now. David is amazing with men's cuts.", name: 'Lisa M.', service: 'Family Services', rating: 5 },
  { quote: "The Brazilian blowout changed my life. My morning routine is so much easier!", name: 'Caroline H.', service: 'Brazilian Blowout', rating: 5 },
  { quote: "Olivia made me look like a princess on my wedding day. Couldn't be happier!", name: 'Jessica R.', service: 'Bridal', rating: 5 },
  { quote: "Finally found a colorist who gets it. My highlights look natural and expensive.", name: 'Megan K.', service: 'Highlights', rating: 5 },
]

const stats = [
  { value: '4.9', label: 'Average Rating' },
  { value: '500+', label: 'Google Reviews' },
  { value: '98%', label: 'Would Recommend' },
  { value: '#1', label: 'Rated Salon' },
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

      <section className="py-[100px] px-10 max-w-container-md mx-auto">
        {/* Featured Review */}
        <div className="p-16 rounded-3xl bg-emerald-gradient text-center mb-16">
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
            <div key={i} className="testimonial-card">
              <div className="flex gap-1 mb-5">
                {[...Array(review.rating)].map((_, j) => (
                  <span key={j} className="text-gold-primary text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="font-heading text-lg italic leading-relaxed text-neutral-charcoal mb-6">
                "{review.quote}"
              </p>
              <div className="flex justify-between items-center">
                <p className="font-accent text-sm font-semibold text-emerald-deep">
                  {review.name}
                </p>
                <span className="badge badge-emerald">{review.service}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 p-12 rounded-3xl bg-gold-champagne/40 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
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

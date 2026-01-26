import Link from 'next/link'

const services = [
  {
    icon: '✂️',
    title: 'Precision Cutting',
    description: 'Master-level cuts tailored to your face shape, lifestyle, and personal style.',
    price: 'From $75',
  },
  {
    icon: '🎨',
    title: 'Color Artistry',
    description: 'Balayage, highlights, full color—dimensional, natural-looking results.',
    price: 'From $150',
  },
  {
    icon: '✨',
    title: 'Treatments & Care',
    description: 'Keratin treatments, deep conditioning, and scalp therapies.',
    price: 'From $100',
  },
  {
    icon: '👑',
    title: 'Bridal & Special',
    description: 'Picture-perfect styling for your most important moments.',
    price: 'From $250',
  },
]

const stats = [
  { number: '15+', label: 'Years Experience' },
  { number: '10K+', label: 'Happy Clients' },
  { number: '25+', label: 'Expert Stylists' },
  { number: '50+', label: 'Awards Won' },
]

const testimonials = [
  {
    quote: "The attention to detail is extraordinary. I've never felt more confident.",
    name: 'Sarah M.',
    service: 'Balayage & Cut',
  },
  {
    quote: 'A truly transformative experience. The whole family comes here now.',
    name: 'Michael R.',
    service: 'Family Styling',
  },
  {
    quote: 'My wedding day hair was absolutely perfect. Worth every penny.',
    name: 'Emily K.',
    service: 'Bridal Services',
  },
]

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-hero-gradient">
        {/* Decorative Elements */}
        <div className="decorative-circle top-[15%] left-[5%] w-72 h-72 border border-gold-primary/20 animate-float" />
        <div className="decorative-circle bottom-[20%] right-[10%] w-48 h-48 bg-gradient-to-br from-gold-primary/10 to-transparent animate-float-reverse" />

        {/* Hero Content */}
        <div className="text-center max-w-4xl px-10 z-10">
          <p className="font-accent text-sm tracking-ultra-wide text-gold-primary mb-6 uppercase">
            Divine Beauty, For Everyone
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-wide mb-8 leading-tight text-emerald-deep">
            Where Artistry
            <span className="block text-gradient-gold">Meets Elegance</span>
          </h1>

          <p className="font-body text-lg leading-relaxed text-neutral-slate max-w-xl mx-auto mb-12">
            Experience transformative hair design crafted with supreme skill and heavenly
            care. Every visit is a journey to your most radiant self.
          </p>

          <div className="flex gap-5 justify-center flex-wrap">
            <Link href="/booking" className="btn-primary">
              RESERVE YOUR EXPERIENCE
            </Link>
            <Link href="/services" className="btn-secondary">
              EXPLORE SERVICES
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="font-accent text-xs tracking-widest text-neutral-silver mb-3">
            SCROLL TO DISCOVER
          </p>
          <div className="w-px h-10 bg-gradient-to-b from-gold-primary to-transparent mx-auto animate-pulse-slow" />
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 px-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-label">OUR EXPERTISE</p>
          <h2 className="section-title">Signature Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div key={i} className="card card-hover p-12 cursor-pointer">
              <div className="icon-circle icon-circle-gold mb-7">{service.icon}</div>
              <h3 className="font-heading text-2xl font-medium text-emerald-deep mb-4">
                {service.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-neutral-slate mb-6">
                {service.description}
              </p>
              <div className="pt-5 border-t border-gold-primary/20 flex justify-between items-center">
                <span className="font-display text-xl text-gold-primary">{service.price}</span>
                <span className="font-accent text-xs tracking-widest text-emerald-deep">
                  LEARN MORE →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Promise */}
      <section className="py-32 px-10 bg-emerald-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-pattern" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-primary to-gold-light flex items-center justify-center mx-auto mb-10 text-4xl">
            👑
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-gold-light mb-6 italic">
            "Divine Beauty, For Everyone"
          </h2>

          <p className="font-body text-lg leading-relaxed text-neutral-pearl max-w-2xl mx-auto mb-12">
            At Irina Elysian, we believe premium quality shouldn't be exclusive. We serve
            every guest—women, men, children, families—with the same unwavering dedication
            to excellence.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="stat-number">{stat.number}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-32 px-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label">CLIENT LOVE</p>
          <h2 className="section-title">What They Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-card">
              <div className="text-4xl text-gold-primary opacity-50 mb-5">"</div>
              <p className="font-heading text-lg italic leading-relaxed text-neutral-charcoal mb-7">
                {testimonial.quote}
              </p>
              <div>
                <p className="font-accent text-sm font-semibold text-emerald-deep mb-1">
                  {testimonial.name}
                </p>
                <p className="font-body text-xs text-gold-primary">{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-10 bg-gradient-to-br from-gold-champagne/50 to-neutral-pearl text-center">
        <h2 className="font-display text-4xl md:text-5xl text-emerald-deep mb-5">
          Ready for Your Transformation?
        </h2>
        <p className="font-body text-base text-neutral-slate max-w-md mx-auto mb-10">
          Book your appointment today and discover the Irina Elysian difference.
        </p>
        <Link
          href="/booking"
          className="inline-block px-16 py-5 rounded-full bg-emerald-gradient text-gold-light font-accent text-sm font-semibold tracking-widest shadow-emerald transition-all duration-300 hover:-translate-y-0.5"
        >
          BOOK YOUR APPOINTMENT
        </Link>
      </section>
    </div>
  )
}

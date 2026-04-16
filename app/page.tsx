import Link from 'next/link'
import Image from 'next/image'
import VideoReelCarousel, { type VideoReel } from '@/components/VideoReelCarousel'

const services = [
  {
    icon: '✂️',
    title: 'Precision Cutting',
    description: 'Master-level cuts tailored to your face shape, lifestyle, and personal style.',
    price: 'From $75',
    image: '/images/new-images/straight-bob-blonde-highlights.jpeg',
    href: '/services/haircut-denver',
  },
  {
    icon: '🎨',
    title: 'Color Artistry',
    description: 'Balayage, highlights, full color—dimensional, natural-looking results.',
    price: 'From $150',
    image: '/images/new-images/client-back-blonde-highlights-wavy.jpeg',
    href: '/services/balayage-denver',
  },
  {
    icon: '✨',
    title: 'Treatments & Care',
    description: 'Keratin treatments, deep conditioning, and scalp therapies.',
    price: 'From $100',
    image: '/images/new-images/straight-brunette-hair-with-blonde-highlights-wet.jpeg',
    href: '/services/brazilian-blowout-denver',
  },
  {
    icon: '👑',
    title: 'Bridal & Special',
    description: 'Picture-perfect styling for your most important moments.',
    price: 'From $250',
    image: '/images/curly-blonde-medium-1.jpg',
    href: '/services',
  },
]

const stats = [
  { number: '15+', label: 'Years Experience' },
  { number: '100s', label: 'Happy Clients' },
  { number: '5★', label: 'Google Rating' },
]

const testimonials = [
  {
    quote: "The attention to detail is extraordinary. I've never felt more confident.",
    name: 'Sarah M.',
    service: 'Balayage & Cut',
    image: '/images/new-images/client-hair-coloring-foils-process-1.jpeg',
  },
  {
    quote: 'A truly transformative experience. The whole family comes here now.',
    name: 'Michael R.',
    service: 'Family Styling',
    image: '/images/new-images/stylist-hugging-male-client-with-highlights.jpeg',
  },
  {
    quote: 'My wedding day hair was absolutely perfect. Worth every penny.',
    name: 'Emily K.',
    service: 'Bridal Services',
    image: '/images/curly-blonde-medium-2.jpg',
  },
]

const featuredWork = [
  { src: '/images/new-images/close-up-foils-hair-coloring-process-2.jpeg', title: 'Color Processing' },
  { src: '/images/new-images/mens-hair-dark-with-blonde-highlights-wet.jpeg', title: 'Mens Highlighting' },
  { src: '/images/bob-blonde-highlights-1.jpg', title: 'Classic Bob' },
  { src: '/images/balayage-brunette-long-3.jpg', title: 'Sun-Kissed Balayage' },
]

const reels: VideoReel[] = [
  {
    src: '/videos/salon-showcase.mp4',
    title: 'Welcome to Irina Elysian',
    caption: 'Denver\'s premier hair design studio — where artistry meets elegance.',
    socialHandle: '@irina.elysian',
    socialPlatform: 'instagram',
    link: '/booking',
    linkLabel: 'Book Now',
  },
  {
    src: '/videos/brunette-bob-cut-blow-dry-style.mp4',
    title: 'The Perfect Bob',
    caption: 'Precision cuts and expert blow-dry styling for a flawless finish.',
    socialHandle: '@irina.elysian',
    socialPlatform: 'instagram',
    link: '/services/haircut-denver',
    linkLabel: 'See Haircuts',
  },
  {
    src: '/videos/brunette-bob-cut-wet-hair.mp4',
    title: 'Fresh Cut Reveal',
    caption: 'Every cut starts with a thorough consultation and precision shaping.',
    socialHandle: '@irina.elysian',
    socialPlatform: 'tiktok',
    link: '/services/haircut-denver',
    linkLabel: 'Book a Cut',
  },
  {
    src: '/videos/womens-short-bob-styling-back-view.mp4',
    title: 'Short Bob Perfection',
    caption: 'Clean lines, beautiful volume — the timeless bob reimagined.',
    socialHandle: '@irina.elysian',
    socialPlatform: 'instagram',
    link: '/services/haircut-denver',
    linkLabel: 'Explore Cuts',
  },
  {
    src: '/videos/brunette-short-hair-wet-styling.mp4',
    title: 'Wet Styling Session',
    caption: 'Watch our stylists sculpt and perfect each cut from start to finish.',
    socialHandle: '@irina.elysian',
    socialPlatform: 'tiktok',
    link: '/booking',
    linkLabel: 'Book Today',
  },
  {
    src: '/videos/mens-haircut-gray-hair-before-after.mp4',
    title: 'Men\'s Transformation',
    caption: 'Expert men\'s grooming — cuts, trims, and neck cleanup.',
    socialHandle: '@irina.elysian',
    socialPlatform: 'instagram',
    link: '/services/haircut-denver',
    linkLabel: 'Men\'s Services',
  },
  {
    src: '/videos/mens-short-haircut-dry-style.mp4',
    title: 'Finished & Polished',
    caption: 'The final result — styled, dried, and ready to impress.',
    socialHandle: '@irina.elysian',
    socialPlatform: 'tiktok',
    link: '/booking',
    linkLabel: 'Book Now',
  },
  {
    src: '/videos/mens-short-haircut-wet-style.mp4',
    title: 'Precision Men\'s Cut',
    caption: 'Detailed scissor work for a sharp, modern men\'s silhouette.',
    socialHandle: '@irina.elysian',
    socialPlatform: 'instagram',
    link: '/services/haircut-denver',
    linkLabel: 'View Services',
  },
  {
    src: '/videos/mens-gray-haircut-finished-style.mp4',
    title: 'Distinguished Finish',
    caption: 'Classic cuts for the modern gentleman — timeless and refined.',
    socialHandle: '@irina.elysian',
    socialPlatform: 'tiktok',
    link: '/booking',
    linkLabel: 'Book Yours',
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
        <div className="text-center max-w-content px-6 md:px-10 z-10">
          <p className="font-accent text-[13px] tracking-wide-8 text-gold-primary mb-6 uppercase">
            Divine Beauty, For Everyone
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-wide mb-8 leading-tight text-emerald-deep">
            Where Artistry
            <span className="block text-gradient-gold">Meets Elegance</span>
          </h1>

          <p className="font-body text-lg leading-relaxed text-neutral-slate max-w-text mx-auto mb-12">
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
          <p className="font-accent text-[10px] tracking-wide-3 text-neutral-silver mb-3">
            SCROLL TO DISCOVER
          </p>
          <div className="w-px h-10 bg-gradient-to-b from-gold-primary to-transparent mx-auto animate-pulse-slow" />
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-[120px] px-6 md:px-10 max-w-container mx-auto">
        <div className="text-center mb-20">
          <p className="section-label">OUR EXPERTISE</p>
          <h2 className="section-title">Signature Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
          {services.map((service, i) => (
            <Link key={i} href={service.href} className="card card-hover overflow-hidden cursor-pointer group block">
              {/* Service Image */}
              <div className="h-48 relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-white via-transparent to-transparent" />
                <div className="absolute top-4 left-4 icon-circle icon-circle-gold">
                  {service.icon}
                </div>
              </div>

              {/* Service Content */}
              <div className="p-8">
                <h3 className="font-heading text-[26px] font-medium text-emerald-rich mb-4">
                  {service.title}
                </h3>
                <p className="font-body text-[15px] leading-[1.7] text-neutral-stone mb-6">
                  {service.description}
                </p>
                <div className="pt-5 border-t border-gold-primary/20 flex justify-between items-center">
                  <span className="font-display text-xl text-gold-primary">{service.price}</span>
                  <span className="font-accent text-[11px] tracking-wide-2 text-emerald-deep">
                    LEARN MORE →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-6 md:px-10 bg-neutral-pearl/50">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <p className="section-label">PORTFOLIO</p>
              <h2 className="font-display text-4xl md:text-5xl text-emerald-deep">Featured Work</h2>
            </div>
            <Link
              href="/gallery"
              className="mt-4 md:mt-0 font-accent text-[12px] tracking-wide-2 text-gold-primary hover:text-emerald-deep transition-colors"
            >
              VIEW ALL GALLERY →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredWork.map((item, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="font-heading text-sm text-neutral-white">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO REELS SECTION ────────────────────────────────────────── */}
      <VideoReelCarousel
        reels={reels}
        heading="Watch the Magic"
        subheading="Real transformations, real results — direct from our chair."
        autoAdvanceMs={7000}
      />

      {/* Brand Promise */}
      <section className="py-[120px] px-6 md:px-10 bg-emerald-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-diagonal-pattern" />

        <div className="max-w-container-md mx-auto text-center relative z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-primary to-gold-light flex items-center justify-center mx-auto mb-10 text-4xl">
            👑
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-gold-light mb-6 italic">
            "Divine Beauty, For Everyone"
          </h2>

          <p className="font-body text-lg leading-relaxed text-neutral-pearl max-w-content-sm mx-auto mb-12">
            At Irina Elysian, we believe premium quality shouldn't be exclusive. We serve
            every guest—women, men, children, families—with the same unwavering dedication
            to excellence.
          </p>

          <div className="grid grid-cols-3 gap-10 mt-16">
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
      <section className="py-[120px] px-6 md:px-10 max-w-container-md mx-auto">
        <div className="text-center mb-16">
          <p className="section-label">CLIENT LOVE</p>
          <h2 className="section-title">What They Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-card overflow-hidden group">
              {/* Testimonial Image */}
              <div className="h-40 -mx-10 -mt-10 mb-6 relative overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}'s styling`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-white via-neutral-white/50 to-transparent" />
              </div>

              <div className="text-4xl text-gold-primary opacity-50 mb-5">"</div>
              <p className="font-heading text-lg italic leading-relaxed text-neutral-slate mb-7">
                {testimonial.quote}
              </p>
              <div>
                <p className="font-accent text-sm font-semibold text-emerald-rich mb-1">
                  {testimonial.name}
                </p>
                <p className="font-body text-xs text-gold-primary">{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[100px] px-6 md:px-10 bg-gradient-to-br from-gold-champagne/50 to-neutral-pearl text-center">
        <h2 className="font-display text-4xl md:text-5xl text-emerald-deep mb-5">
          Ready for Your Transformation?
        </h2>
        <p className="font-body text-base text-neutral-slate max-w-text-sm mx-auto mb-10">
          Book your appointment today and discover the Irina Elysian difference.
        </p>
        <Link
          href="/booking"
          className="inline-block px-16 py-5 rounded-full bg-emerald-gradient text-gold-light font-accent text-[13px] font-semibold tracking-wide-3 shadow-emerald transition-all duration-300 hover:-translate-y-0.5"
        >
          BOOK YOUR APPOINTMENT
        </Link>
      </section>
    </div>
  )
}

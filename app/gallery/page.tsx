import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse our portfolio of stunning hair transformations at Irina Elysian Hair Design Studio.',
}

const categories = ['All', 'Color', 'Cuts', 'Styling', 'Highlights', 'Process']

const galleryItems = [
  {
    src: '/images/new-images/straight-bob-blonde-highlights.jpeg',
    category: 'Cuts',
    title: 'Bob with Highlights',
  },
  {
    src: '/images/new-images/client-back-blonde-highlights-wavy.jpeg',
    category: 'Highlights',
    title: 'Wavy Blonde Highlights',
  },
  {
    src: '/images/new-images/client-hair-coloring-foils-process-1.jpeg',
    category: 'Process',
    title: 'Foil Color Process',
  },
  {
    src: '/images/new-images/close-up-foils-hair-coloring-process-2.jpeg',
    category: 'Process',
    title: 'Close-Up Foils',
  },
  {
    src: '/images/new-images/straight-brunette-hair-with-blonde-highlights-wet.jpeg',
    category: 'Highlights',
    title: 'Brunette + Blonde Highlights',
  },
  {
    src: '/images/new-images/mens-hair-dark-with-blonde-highlights-wet.jpeg',
    category: 'Highlights',
    title: "Men's Highlights",
  },
  {
    src: '/images/new-images/stylist-hugging-male-client-with-highlights.jpeg',
    category: 'Cuts',
    title: 'Happy Client',
  },
  {
    src: '/images/balayage-brunette-long-1.jpg',
    category: 'Color',
    title: 'Brunette Balayage',
  },
  {
    src: '/images/pixie-blonde-highlights-1.jpg',
    category: 'Cuts',
    title: 'Pixie Cut',
  },
  {
    src: '/images/curly-blonde-medium-1.jpg',
    category: 'Styling',
    title: 'Voluminous Curls',
  },
  {
    src: '/images/pixie-rose-gold-1.jpg',
    category: 'Color',
    title: 'Rose Gold Pixie',
  },
  {
    src: '/images/layered-blonde-waves-1.jpg',
    category: 'Styling',
    title: 'Layered Waves',
  },
  {
    src: '/images/bob-blonde-highlights-1.jpg',
    category: 'Highlights',
    title: 'Blonde Bob',
  },
  {
    src: '/images/platinum-blonde-portrait.jpg',
    category: 'Color',
    title: 'Platinum Blonde',
  },
  {
    src: '/images/balayage-brunette-long-2.jpg',
    category: 'Highlights',
    title: 'Natural Highlights',
  },
  {
    src: '/images/pixie-blonde-highlights-2.jpg',
    category: 'Cuts',
    title: 'Textured Pixie',
  },
  {
    src: '/images/bob-blonde-salon-1.jpg',
    category: 'Cuts',
    title: 'Classic Bob',
  },
  {
    src: '/images/pixie-rose-gold-2.jpg',
    category: 'Color',
    title: 'Peach Tones',
  },
  {
    src: '/images/curly-blonde-medium-2.jpg',
    category: 'Styling',
    title: 'Bouncy Curls',
  },
  {
    src: '/images/pixie-blonde-highlights-3.jpg',
    category: 'Cuts',
    title: 'Modern Pixie',
  },
  {
    src: '/images/balayage-brunette-long-3.jpg',
    category: 'Highlights',
    title: 'Sun-Kissed Balayage',
  },
  {
    src: '/images/bob-blonde-back-1.jpg',
    category: 'Cuts',
    title: 'Layered Bob',
  },
  {
    src: '/images/pixie-blonde-highlights-4.jpg',
    category: 'Highlights',
    title: 'Dimensional Highlights',
  },
]

export default function GalleryPage() {
  return (
    <div className="animate-fade-in pt-32">
      {/* Page Header */}
      <section className="page-header">
        <p className="section-label">OUR WORK</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep mb-5">Gallery</h1>
        <p className="font-body text-lg text-neutral-slate max-w-text mx-auto">
          Browse our portfolio of transformations. Every style tells a story.
        </p>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6 md:px-10 max-w-container mx-auto">
        {/* Category Filter */}
        <div className="flex gap-3 justify-center mb-16 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-7 py-3 rounded-full font-accent text-[11px] tracking-wide-2 transition-all duration-300 ${
                i === 0
                  ? 'bg-gold-primary text-emerald-deep'
                  : 'border border-emerald-deep/30 text-neutral-slate hover:border-gold-primary hover:text-gold-primary'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border border-gold-primary/10 transition-all duration-500 hover:shadow-card hover:border-gold-primary/30"
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-primary/90 text-emerald-deep font-accent text-[10px] tracking-wide-2 mb-2">
                  {item.category.toUpperCase()}
                </span>
                <h3 className="font-heading text-lg text-neutral-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

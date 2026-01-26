import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse our portfolio of stunning hair transformations at Irina Elysian Hair Design Studio.',
}

const categories = ['All', 'Color', 'Cuts', 'Treatments', 'Bridal', 'Men']

const galleryItems = [
  { category: 'Balayage', color: 'bg-gold-champagne' },
  { category: 'Precision Cut', color: 'bg-emerald-pale' },
  { category: 'Bridal Updo', color: 'bg-accent-rose/30' },
  { category: "Men's Grooming", color: 'bg-neutral-mist' },
  { category: 'Color Correction', color: 'bg-gold-shimmer/50' },
  { category: 'Brazilian Blowout', color: 'bg-emerald-pale' },
  { category: 'Fashion Color', color: 'bg-accent-burgundy/30' },
  { category: 'Natural Highlights', color: 'bg-gold-champagne' },
  { category: 'Textured Layers', color: 'bg-neutral-pearl' },
]

export default function GalleryPage() {
  return (
    <div className="animate-fade-in pt-32">
      {/* Page Header */}
      <section className="page-header">
        <p className="section-label">OUR WORK</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep mb-5">Gallery</h1>
        <p className="font-body text-lg text-neutral-slate max-w-xl mx-auto">
          Browse our portfolio of transformations. Every style tells a story.
        </p>
      </section>

      {/* Gallery */}
      <section className="py-20 px-10 max-w-7xl mx-auto">
        {/* Category Filter */}
        <div className="flex gap-3 justify-center mb-16 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-7 py-3 rounded-full font-accent text-xs tracking-widest transition-all duration-300 ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`aspect-[4/5] rounded-2xl ${item.color} flex flex-col items-center justify-center cursor-pointer border border-gold-primary/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-card`}
            >
              <span className="text-5xl mb-5">✨</span>
              <p className="font-accent text-xs tracking-widest text-emerald-deep">
                {item.category.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

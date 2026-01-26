import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet our team of master stylists, color experts, and treatment specialists at Irina Elysian Hair Design Studio.',
}

const team = [
  {
    name: 'Irina Volkov',
    role: 'Founder & Master Stylist',
    specialty: 'Color & Cutting',
    years: '20+ years',
    bio: 'Trained in Paris and Milan. Creator of the Elysian color technique.',
    image: '/images/platinum-blonde-portrait.jpg',
  },
  {
    name: 'Marcus Chen',
    role: 'Senior Colorist',
    specialty: 'Balayage & Vivids',
    years: '12 years',
    bio: 'Award-winning colorist specializing in dimensional color.',
    image: '/images/balayage-brunette-long-1.jpg',
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Cutting Specialist',
    specialty: 'Precision Cuts',
    years: '8 years',
    bio: 'Known for transformative precision cuts and texture.',
    image: '/images/pixie-blonde-highlights-1.jpg',
  },
  {
    name: 'David Kim',
    role: "Men's Grooming Expert",
    specialty: 'Classic & Modern Barber',
    years: '10 years',
    bio: 'Master of traditional barbering with a modern edge.',
    image: '/images/bob-blonde-salon-1.jpg',
  },
  {
    name: 'Emma Thompson',
    role: 'Treatment Specialist',
    specialty: 'Keratin & Repair',
    years: '7 years',
    bio: 'Expert in restorative treatments and hair health.',
    image: '/images/layered-blonde-waves-1.jpg',
  },
  {
    name: 'Olivia Brown',
    role: 'Bridal Director',
    specialty: 'Special Occasions',
    years: '15 years',
    bio: 'Over 500 weddings styled with picture-perfect results.',
    image: '/images/curly-blonde-medium-1.jpg',
  },
]

export default function TeamPage() {
  return (
    <div className="animate-fade-in pt-32">
      {/* Page Header */}
      <section className="page-header bg-gradient-to-br from-neutral-pearl to-emerald-pale/30">
        <p className="section-label">MEET THE ARTISTS</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep mb-5">Our Team</h1>
        <p className="font-body text-lg text-neutral-slate max-w-text mx-auto">
          Master stylists, color experts, and treatment specialists—united by a passion for
          transformative beauty.
        </p>
      </section>

      {/* Team Grid */}
      <section className="py-[100px] px-6 md:px-10 max-w-container-md mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <div key={i} className="team-card group">
              {/* Image Section */}
              <div className="h-64 relative overflow-hidden">
                <Image
                  src={member.image}
                  alt={`Work by ${member.name}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/60 to-transparent" />

                {/* Name overlay on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-xl text-neutral-white mb-1">{member.name}</h3>
                  <p className="font-accent text-[10px] tracking-wide-2 text-gold-primary">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-6">
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="badge badge-emerald">{member.specialty}</span>
                  <span className="badge badge-gold">{member.years}</span>
                </div>

                <p className="font-body text-sm leading-relaxed text-neutral-stone">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

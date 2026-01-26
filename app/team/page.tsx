import type { Metadata } from 'next'

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
  },
  {
    name: 'Marcus Chen',
    role: 'Senior Colorist',
    specialty: 'Balayage & Vivids',
    years: '12 years',
    bio: 'Award-winning colorist specializing in dimensional color.',
  },
  {
    name: 'Sofia Rodriguez',
    role: 'Cutting Specialist',
    specialty: 'Precision Cuts',
    years: '8 years',
    bio: 'Known for transformative precision cuts and texture.',
  },
  {
    name: 'David Kim',
    role: "Men's Grooming Expert",
    specialty: 'Classic & Modern Barber',
    years: '10 years',
    bio: 'Master of traditional barbering with a modern edge.',
  },
  {
    name: 'Emma Thompson',
    role: 'Treatment Specialist',
    specialty: 'Keratin & Repair',
    years: '7 years',
    bio: 'Expert in restorative treatments and hair health.',
  },
  {
    name: 'Olivia Brown',
    role: 'Bridal Director',
    specialty: 'Special Occasions',
    years: '15 years',
    bio: 'Over 500 weddings styled with picture-perfect results.',
  },
]

export default function TeamPage() {
  return (
    <div className="animate-fade-in pt-32">
      {/* Page Header */}
      <section className="page-header bg-gradient-to-br from-neutral-pearl to-emerald-pale/30">
        <p className="section-label">MEET THE ARTISTS</p>
        <h1 className="font-display text-5xl md:text-7xl text-emerald-deep mb-5">Our Team</h1>
        <p className="font-body text-lg text-neutral-slate max-w-xl mx-auto">
          Master stylists, color experts, and treatment specialists—united by a passion for
          transformative beauty.
        </p>
      </section>

      {/* Team Grid */}
      <section className="py-24 px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <div key={i} className="team-card">
              {/* Avatar Section */}
              <div className="h-52 bg-gradient-to-br from-gold-champagne/60 to-emerald-pale/40 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-neutral-white border-[3px] border-gold-primary flex items-center justify-center">
                  <span className="font-display text-3xl text-emerald-deep">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-7">
                <h3 className="font-heading text-xl text-emerald-deep mb-1">{member.name}</h3>
                <p className="font-accent text-[10px] tracking-wide text-gold-primary mb-4">
                  {member.role}
                </p>

                <div className="flex gap-3 mb-4 flex-wrap">
                  <span className="badge badge-emerald">{member.specialty}</span>
                  <span className="badge badge-gold">{member.years}</span>
                </div>

                <p className="font-body text-sm leading-relaxed text-neutral-slate">
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

import Link from 'next/link'
import Image from 'next/image'

const quickLinks = ['Services', 'About', 'Team', 'Gallery', 'Contact']
const services = ['Haircuts', 'Color', 'Treatments', 'Bridal', "Men's Grooming"]
const socials = ['Instagram', 'Facebook', 'Pinterest', 'TikTok']

export default function Footer() {
  return (
    <footer className="bg-emerald-deep text-neutral-pearl py-20 px-6 md:px-10">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 relative">
                <Image
                  src="/irina-elysiam-png.png"
                  alt="Irina Elysian Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-xl tracking-wide-3 text-gold-light">
                IRINA ELYSIAN
              </h3>
            </div>
            <p className="font-body text-sm leading-relaxed opacity-80 max-w-xs">
              Divine beauty, for everyone. Experience transformative hair design
              crafted with supreme skill and heavenly care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-accent text-[11px] tracking-wide-3 text-gold-primary mb-6">
              QUICK LINKS
            </h4>
            {quickLinks.map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="block font-body text-sm mb-3 opacity-80 hover:opacity-100 hover:text-gold-light transition-all duration-300"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="font-accent text-[11px] tracking-wide-3 text-gold-primary mb-6">
              SERVICES
            </h4>
            {services.map((service) => (
              <p key={service} className="font-body text-sm mb-3 opacity-80">
                {service}
              </p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent text-[11px] tracking-wide-3 text-gold-primary mb-6">
              CONTACT
            </h4>
            <p className="font-body text-sm mb-3 opacity-80">100 S Madison St, Suite 2A</p>
            <p className="font-body text-sm mb-3 opacity-80">Denver, CO 80209</p>
            <p className="font-body text-sm mb-3 opacity-80">(720) 505-7717</p>
            <p className="font-body text-sm opacity-80">hello@irinaelysian.com</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold-primary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs opacity-60">
            © 2026 Irina Elysian Hair Design Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socials.map((social) => (
              <span
                key={social}
                className="font-accent text-[10px] tracking-wide-2 cursor-pointer opacity-70 hover:opacity-100 hover:text-gold-light transition-all duration-300"
              >
                {social.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

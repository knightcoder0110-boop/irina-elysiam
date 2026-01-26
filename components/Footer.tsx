import Link from 'next/link'
import Image from 'next/image'
import { businessInfo, businessHours } from '@/lib/data'

const quickLinks = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
]

const serviceLinks = [
  { label: 'Balayage', href: '/services/balayage-denver' },
  { label: 'Highlights', href: '/services/highlights-denver' },
  { label: 'Haircuts', href: '/services/haircut-denver' },
  { label: 'Brazilian Blowout', href: '/services/brazilian-blowout-denver' },
  { label: 'Keratin Treatment', href: '/services/keratin-treatment-denver' },
]

const areaLinks = [
  { label: 'Denver Hair Salon', href: '/denver-hair-salon' },
  { label: 'Washington Park', href: '/washington-park-hair-salon' },
  { label: 'Cherry Creek', href: '/cherry-creek-hair-salon' },
]

export default function Footer() {
  return (
    <footer className="bg-emerald-deep text-neutral-pearl py-20 px-6 md:px-10">
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 relative">
                <Image
                  src="/irina-elysiam-png.png"
                  alt={`${businessInfo.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-xl tracking-wide-3 text-gold-light">
                {businessInfo.name.toUpperCase()}
              </h3>
            </div>
            <p className="font-body text-sm leading-relaxed opacity-80 max-w-xs mb-4">
              {businessInfo.tagline}. {businessInfo.description.slice(0, 100)}...
            </p>
            <div className="flex gap-4">
              {Object.entries(businessInfo.social).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-accent text-[10px] tracking-wide-2 opacity-70 hover:opacity-100 hover:text-gold-light transition-all duration-300"
                >
                  {name.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-accent text-[11px] tracking-wide-3 text-gold-primary mb-6">
              QUICK LINKS
            </h4>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-body text-sm mb-3 opacity-80 hover:opacity-100 hover:text-gold-light transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="font-accent text-[11px] tracking-wide-3 text-gold-primary mb-6">
              SERVICES
            </h4>
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-body text-sm mb-3 opacity-80 hover:opacity-100 hover:text-gold-light transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-accent text-[11px] tracking-wide-3 text-gold-primary mb-6">
              CONTACT
            </h4>
            <p className="font-body text-sm mb-3 opacity-80">
              {businessInfo.address.street}, {businessInfo.address.suite}
            </p>
            <p className="font-body text-sm mb-3 opacity-80">
              {businessInfo.address.city}, {businessInfo.address.state} {businessInfo.address.zip}
            </p>
            <a
              href={`tel:${businessInfo.phoneRaw}`}
              className="block font-body text-sm mb-3 opacity-80 hover:opacity-100 hover:text-gold-light transition-all"
            >
              {businessInfo.phone}
            </a>
            <a
              href={`mailto:${businessInfo.email}`}
              className="block font-body text-sm opacity-80 hover:opacity-100 hover:text-gold-light transition-all"
            >
              {businessInfo.email}
            </a>
          </div>
        </div>

        {/* Areas Served */}
        <div className="pb-8 mb-8 border-b border-gold-primary/20">
          <p className="font-accent text-[10px] tracking-wide-2 text-gold-primary mb-4">SERVING DENVER</p>
          <div className="flex flex-wrap gap-4">
            {areaLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs opacity-70 hover:opacity-100 hover:text-gold-light transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs opacity-60">
            © {new Date().getFullYear()} {businessInfo.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/faq" className="font-body text-xs opacity-60 hover:opacity-100 transition-all">
              FAQ
            </Link>
            <Link href="/booking" className="font-body text-xs opacity-60 hover:opacity-100 transition-all">
              Book Online
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

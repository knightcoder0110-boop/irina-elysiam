'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/team', label: 'Team' },
  { href: '/testimonials', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-400 ${
          scrolled || mobileMenuOpen
            ? 'bg-neutral-cream/95 border-b border-emerald-deep/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-container mx-auto px-6 md:px-10 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="w-12 h-12 md:w-14 md:h-14 relative transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/irina-elysiam-png.png"
                alt="Irina Elysian Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="font-display text-lg md:text-[22px] font-semibold tracking-wide-3 text-gradient-emerald">
                IRINA ELYSIAN
              </h1>
              <p className="font-accent text-[8px] md:text-[9px] tracking-widest text-gold-primary uppercase">
                Hair Design Studio
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${
                  pathname === item.href ? 'nav-link-active' : 'nav-link-inactive'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Book Now Button */}
          <Link
            href="/booking"
            className="hidden lg:block px-8 py-3.5 rounded-full bg-gold-gradient text-emerald-deep font-accent text-xs font-semibold tracking-widest shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold-lg"
          >
            BOOK NOW
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full border border-emerald-deep/20 bg-neutral-white/50 transition-all duration-300 hover:border-gold-primary"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`w-5 h-0.5 bg-emerald-deep rounded-full transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-emerald-deep rounded-full transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0 scale-0' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-emerald-deep rounded-full transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-emerald-deep/20 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-neutral-cream shadow-2xl transition-transform duration-500 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Menu Content */}
          <div className="pt-28 px-8 pb-10 h-full flex flex-col">
            {/* Nav Links */}
            <nav className="flex-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-4 border-b border-gold-primary/15 transition-all duration-300 ${
                    mobileMenuOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-8'
                  }`}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${index * 50 + 100}ms` : '0ms',
                  }}
                >
                  <span
                    className={`font-heading text-xl ${
                      pathname === item.href
                        ? 'text-gold-primary'
                        : 'text-emerald-deep hover:text-gold-primary'
                    }`}
                  >
                    {item.label}
                  </span>
                  {pathname === item.href && (
                    <span className="ml-3 text-gold-primary text-sm">•</span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div
              className={`mt-8 transition-all duration-500 ${
                mobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? '400ms' : '0ms',
              }}
            >
              <Link
                href="/booking"
                className="block w-full py-4 rounded-full bg-gold-gradient text-emerald-deep font-accent text-sm font-semibold tracking-wide-2 shadow-gold text-center transition-all duration-300 hover:shadow-gold-lg"
              >
                BOOK NOW
              </Link>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gold-primary/20">
                <p className="font-accent text-[10px] tracking-wide-2 text-gold-primary mb-3">
                  CONTACT US
                </p>
                <p className="font-body text-sm text-neutral-slate mb-2">
                  (720) 505-7717
                </p>
                <p className="font-body text-sm text-neutral-slate">
                  hello@irinaelysian.com
                </p>
              </div>

              {/* Decorative with Logo */}
              <div className="mt-8 flex items-center gap-3">
                <div className="w-10 h-10 relative">
                  <Image
                    src="/irina-elysiam-png.png"
                    alt="Irina Elysian"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-accent text-[9px] tracking-wide-2 text-neutral-silver">
                  DIVINE BEAUTY, FOR EVERYONE
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import Link from 'next/link'
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-400 ${
        scrolled
          ? 'bg-neutral-cream/95 border-b border-emerald-deep/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold transition-transform duration-300 group-hover:scale-105">
            <span className="font-display text-xl font-bold text-emerald-deep">IE</span>
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold tracking-wide text-gradient-emerald">
              IRINA ELYSIAN
            </h1>
            <p className="font-accent text-[9px] tracking-widest text-gold-primary uppercase">
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

        {/* Book Now Button */}
        <Link
          href="/booking"
          className="hidden md:block px-8 py-3.5 rounded-full bg-gold-gradient text-emerald-deep font-accent text-xs font-semibold tracking-widest shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold-lg"
        >
          BOOK NOW
        </Link>
      </div>
    </header>
  )
}

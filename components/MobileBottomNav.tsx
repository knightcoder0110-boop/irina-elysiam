'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5M5.5 9.5V21h13V9.5M9 21v-6h6v6" />
    ),
  },
  {
    href: '/services',
    label: 'Services',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
    ),
  },
  {
    href: '/booking',
    label: 'Book',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3m8-3v3M4.5 9h15M6 5h12a2 2 0 0 1 2 2v11.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm4 8h4m-4 4h6" />
    ),
    featured: true,
  },
  {
    href: '/gallery',
    label: 'Gallery',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v11A2.5 2.5 0 0 1 17 20H7a2.5 2.5 0 0 1-2.5-2.5v-11Zm3 8 2.25-2.25 2 2L15 11l2 2.25M8.5 8.5h.01" />
    ),
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14v14H5zM7 8l5 4 5-4" />
    ),
  },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-emerald-deep/10 bg-neutral-cream/95 px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 shadow-[0_-10px_30px_rgba(10,61,46,0.12)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 items-end gap-1">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`flex min-h-[58px] flex-col items-center justify-center rounded-2xl px-1 text-center transition-all ${
                item.featured
                  ? '-mt-7 bg-gold-gradient text-emerald-deep shadow-gold'
                  : active
                  ? 'bg-emerald-pale text-emerald-deep'
                  : 'text-neutral-stone'
              }`}
            >
              <svg
                className={`${item.featured ? 'h-6 w-6' : 'h-5 w-5'}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                {item.icon}
              </svg>
              <span className={`mt-1 font-accent text-[9px] font-semibold uppercase ${item.featured ? 'tracking-wide' : 'tracking-wide-2'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

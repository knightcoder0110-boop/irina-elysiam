'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminToast from '@/components/admin/AdminToast'
import { adminRoutes } from '@/lib/admin/routes'
import { IconArchive, IconCalendar, IconDashboard, IconInbox, IconSettings, IconUsers } from '@/components/admin/icons'

const mobileNav = [
  { href: adminRoutes.home, label: 'Home', icon: IconDashboard },
  { href: adminRoutes.bookings, label: 'Bookings', icon: IconCalendar },
  { href: adminRoutes.messages, label: 'Messages', icon: IconInbox },
  { href: adminRoutes.customers, label: 'Clients', icon: IconUsers },
  { href: adminRoutes.settingsEmails, label: 'Settings', icon: IconSettings },
]

export default function AdminShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-neutral-cream lg:flex">
      <div className="hidden w-64 shrink-0 lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:z-40">
        <AdminSidebar />
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-emerald-deep/40" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] shadow-card">
            <AdminSidebar onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-emerald-deep/10 bg-neutral-cream/95 px-4 py-3 backdrop-blur-md md:px-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-xl border border-emerald-deep/15 px-3 py-2 font-accent text-[10px] font-semibold uppercase tracking-wide text-emerald-deep lg:hidden"
          >
            Menu
          </button>
          <Link href={adminRoutes.home} className="font-heading text-lg text-emerald-deep lg:hidden">
            Admin
          </Link>
          <div className="hidden lg:block" />
        </header>

        <div className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</div>

        <nav className="sticky bottom-0 z-30 border-t border-emerald-deep/10 bg-neutral-white px-1 pb-[calc(env(safe-area-inset-bottom)+4px)] pt-1 lg:hidden">
          <div className="grid grid-cols-5 gap-0.5">
            {mobileNav.map((item) => {
              const active =
                item.href === adminRoutes.home
                  ? pathname === adminRoutes.home
                  : item.href === adminRoutes.settingsEmails
                    ? pathname?.startsWith('/admin/settings')
                    : pathname?.startsWith(item.href)
              const Icon = item.icon
              const href = item.href === adminRoutes.settingsEmails ? adminRoutes.settingsEmails : item.href

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={`flex min-h-[52px] flex-col items-center justify-center rounded-xl px-1 ${
                    active ? 'bg-emerald-deep text-gold-light' : 'text-neutral-stone'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="mt-0.5 font-accent text-[8px] font-semibold uppercase tracking-wide">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      <AdminToast />
    </div>
  )
}

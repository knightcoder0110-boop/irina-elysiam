'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdmin } from '@/components/admin/AdminProvider'
import { adminRoutes } from '@/lib/admin/routes'
import {
  IconArchive,
  IconCalendar,
  IconDashboard,
  IconInbox,
  IconSettings,
  IconUsers,
} from '@/components/admin/icons'

const navItems = [
  { href: adminRoutes.home, label: 'Dashboard', icon: IconDashboard, match: (p: string) => p === adminRoutes.home },
  { href: adminRoutes.bookings, label: 'Bookings', icon: IconCalendar, match: (p: string) => p.startsWith('/admin/bookings') },
  { href: adminRoutes.messages, label: 'Messages', icon: IconInbox, match: (p: string) => p.startsWith('/admin/messages') },
  { href: adminRoutes.customers, label: 'Customers', icon: IconUsers, match: (p: string) => p.startsWith('/admin/customers') },
  { href: adminRoutes.archive, label: 'Archive', icon: IconArchive, match: (p: string) => p.startsWith('/admin/archive') },
  { href: adminRoutes.settingsEmails, label: 'Settings', icon: IconSettings, match: (p: string) => p.startsWith('/admin/settings') },
]

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { counts, loadRecords, isLoading, logout } = useAdmin()

  const badge = (href: string) => {
    if (href === adminRoutes.home && counts.new > 0) return counts.new
    if (href === adminRoutes.bookings && counts.new > 0) return counts.new
    return null
  }

  return (
    <aside className="flex h-full flex-col border-r border-emerald-deep/10 bg-neutral-white">
      <div className="border-b border-emerald-deep/10 px-5 py-6">
        <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">Salon Admin</p>
        <h1 className="mt-1 font-display text-2xl text-emerald-deep">Irina Elysian</h1>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const active = item.match(pathname || '')
          const Icon = item.icon
          const count = badge(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-accent text-[11px] font-semibold uppercase tracking-wide transition-colors ${
                active ? 'bg-emerald-deep text-gold-light' : 'text-neutral-stone hover:bg-neutral-cream hover:text-emerald-deep'
              }`}
            >
              <Icon className="shrink-0" />
              <span className="flex-1">{item.label}</span>
              {count != null && count > 0 && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] ${
                    active ? 'bg-gold-primary text-emerald-deep' : 'bg-gold-champagne text-emerald-deep'
                  }`}
                >
                  {count}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-2 border-t border-emerald-deep/10 p-3">
        <button
          type="button"
          onClick={() => loadRecords()}
          disabled={isLoading}
          className="w-full rounded-xl border border-emerald-deep/15 px-3 py-2.5 font-accent text-[10px] font-semibold uppercase tracking-wide text-emerald-deep"
        >
          {isLoading ? 'Refreshing…' : 'Refresh'}
        </button>
        <button
          type="button"
          onClick={() => logout()}
          className="w-full rounded-xl bg-emerald-deep px-3 py-2.5 font-accent text-[10px] font-semibold uppercase tracking-wide text-gold-light"
        >
          Log out
        </button>
      </div>
    </aside>
  )
}

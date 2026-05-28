'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { adminRoutes } from '@/lib/admin/routes'
import AdminPageHeader from '@/components/admin/AdminPageHeader'

const settingsNav = [
  { href: adminRoutes.settingsEmails, label: 'Emails' },
  { href: adminRoutes.settingsSocial, label: 'Social' },
]

export default function AdminSettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="mx-auto max-w-6xl">
      <AdminPageHeader
        label="Settings"
        title="Site configuration"
        description="Manage notification emails, auto-replies, and social links."
      />
      <nav className="mb-6 flex gap-2 border-b border-emerald-deep/10 pb-4">
        {settingsNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-4 py-2 font-accent text-[10px] font-semibold uppercase tracking-wide ${
              pathname === item.href
                ? 'bg-emerald-deep text-gold-light'
                : 'border border-emerald-deep/15 text-emerald-deep hover:bg-neutral-cream'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  )
}

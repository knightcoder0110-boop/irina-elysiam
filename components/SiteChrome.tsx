'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      <main className="pb-24 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </>
  )
}

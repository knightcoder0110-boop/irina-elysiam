'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { useAdmin } from '@/components/admin/AdminProvider'
import AdminShell from '@/components/admin/AdminShell'
import { adminRoutes } from '@/lib/admin/routes'

export default function AdminGate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAdmin()
  const isLoginPage = pathname === adminRoutes.login

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated && !isLoginPage) {
      router.replace(adminRoutes.login)
    }
    if (isAuthenticated && isLoginPage) {
      router.replace(adminRoutes.home)
    }
  }, [isAuthenticated, isLoading, isLoginPage, router])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-cream">
        <p className="font-body text-sm text-neutral-stone">Loading workspace…</p>
      </div>
    )
  }

  return <AdminShell>{children}</AdminShell>
}

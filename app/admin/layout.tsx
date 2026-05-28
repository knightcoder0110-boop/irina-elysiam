import type { Metadata } from 'next'
import { AdminProvider } from '@/components/admin/AdminProvider'
import AdminGate from '@/components/admin/AdminGate'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminGate>{children}</AdminGate>
    </AdminProvider>
  )
}

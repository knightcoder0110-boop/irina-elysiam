import { redirect } from 'next/navigation'
import { adminRoutes } from '@/lib/admin/routes'

export default function AdminSettingsPage() {
  redirect(adminRoutes.settingsEmails)
}

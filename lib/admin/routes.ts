export const adminRoutes = {
  home: '/admin',
  login: '/admin/login',
  bookings: '/admin/bookings',
  booking: (id: string) => `/admin/bookings/${id}`,
  messages: '/admin/messages',
  message: (id: string) => `/admin/messages/${id}`,
  customers: '/admin/customers',
  customer: (key: string) => `/admin/customers/${encodeURIComponent(key)}`,
  archive: '/admin/archive',
  settings: '/admin/settings',
  settingsEmails: '/admin/settings/emails',
  settingsSocial: '/admin/settings/social',
} as const

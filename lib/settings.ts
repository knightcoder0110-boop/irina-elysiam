import { businessInfo } from '@/lib/data'

export type SocialSettings = {
  instagram: string
  facebook: string
  tiktok: string
  pinterest: string
}

export type EmailTemplateSettings = {
  subject: string
  intro: string
  footer: string
}

export type SiteSettings = {
  salonIntakeEmails: string
  bookingClientEmail: EmailTemplateSettings
  contactClientEmail: EmailTemplateSettings
  social: SocialSettings
}

export const defaultSiteSettings: SiteSettings = {
  salonIntakeEmails: '',
  bookingClientEmail: {
    subject: `We received your ${businessInfo.name} appointment request`,
    intro: 'We received your appointment request. We will review your preferred time and confirm directly by phone or email.',
    footer: `Questions? Call us at ${businessInfo.phone}.`,
  },
  contactClientEmail: {
    subject: `We received your message for ${businessInfo.name}`,
    intro: 'Thank you for reaching out. We received your message and will reply as soon as possible.',
    footer: `Questions? Call us at ${businessInfo.phone}.`,
  },
  social: {
    instagram: businessInfo.social.instagram,
    facebook: businessInfo.social.facebook,
    tiktok: businessInfo.social.tiktok,
    pinterest: businessInfo.social.pinterest,
  },
}

export function parseIntakeEmails(value: string) {
  return value
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
}

export function mergeSiteSettings(settings?: Partial<SiteSettings> | null): SiteSettings {
  return {
    salonIntakeEmails: settings?.salonIntakeEmails ?? defaultSiteSettings.salonIntakeEmails,
    bookingClientEmail: {
      ...defaultSiteSettings.bookingClientEmail,
      ...(settings?.bookingClientEmail || {}),
    },
    contactClientEmail: {
      ...defaultSiteSettings.contactClientEmail,
      ...(settings?.contactClientEmail || {}),
    },
    social: {
      ...defaultSiteSettings.social,
      ...(settings?.social || {}),
    },
  }
}

export function renderTemplate(template: string, values: Record<string, string | undefined>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key] || '')
}

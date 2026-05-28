'use client'

import { businessInfo } from '@/lib/data'
import { renderTemplate, type SiteSettings } from '@/lib/settings'
import { useAdmin } from '@/components/admin/AdminProvider'

function EmailPreview({ settings, type }: { settings: SiteSettings; type: 'booking' | 'contact' }) {
  const template = type === 'booking' ? settings.bookingClientEmail : settings.contactClientEmail
  const sample =
    type === 'booking'
      ? {
          name: 'Alex',
          service: 'Balayage',
          date: 'June 12, 2026',
          time: '10:00 AM',
          salonPhone: businessInfo.phone,
        }
      : {
          name: 'Alex',
          message: 'Hi, I would like to know your availability.',
          salonPhone: businessInfo.phone,
          salonEmail: businessInfo.email,
        }

  const subject = renderTemplate(template.subject, sample)
  const body = [renderTemplate(template.intro, sample), '', renderTemplate(template.footer, sample)].join('\n')

  return (
    <div className="rounded-2xl border border-dashed border-emerald-deep/15 bg-neutral-cream p-4">
      <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">Preview</p>
      <p className="mt-2 font-body text-xs text-neutral-stone">
        <span className="font-semibold text-emerald-deep">Subject:</span> {subject}
      </p>
      <pre className="mt-3 whitespace-pre-wrap font-body text-xs leading-relaxed text-neutral-charcoal">{body}</pre>
    </div>
  )
}

export default function SettingsEmailsForm() {
  const { settings, setSettings, saveSettings, isSavingSettings } = useAdmin()

  const setTemplate = (
    section: 'bookingClientEmail' | 'contactClientEmail',
    key: 'subject' | 'intro' | 'footer',
    value: string,
  ) => {
    setSettings({
      ...settings,
      [section]: { ...settings[section], [key]: value },
    })
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm">
        <h2 className="font-heading text-2xl text-emerald-deep">Salon notifications</h2>
        <p className="mt-1 font-body text-sm text-neutral-stone">Comma-separated inboxes for new booking and contact alerts.</p>
        <div className="mt-5">
          <label className="form-label">Recipients</label>
          <input
            className="form-input"
            value={settings.salonIntakeEmails}
            onChange={(e) => setSettings({ ...settings, salonIntakeEmails: e.target.value })}
            placeholder="hello@example.com, manager@example.com"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm">
        <h2 className="font-heading text-2xl text-emerald-deep">Booking auto-reply</h2>
        <p className="mt-1 font-body text-xs text-neutral-stone">
          Placeholders: {'{{name}}'}, {'{{service}}'}, {'{{date}}'}, {'{{time}}'}, {'{{salonPhone}}'}
        </p>
        <div className="mt-5 space-y-4">
          <input className="form-input" value={settings.bookingClientEmail.subject} onChange={(e) => setTemplate('bookingClientEmail', 'subject', e.target.value)} placeholder="Subject" />
          <textarea className="form-input min-h-28 resize-y" value={settings.bookingClientEmail.intro} onChange={(e) => setTemplate('bookingClientEmail', 'intro', e.target.value)} placeholder="Intro" />
          <textarea className="form-input min-h-20 resize-y" value={settings.bookingClientEmail.footer} onChange={(e) => setTemplate('bookingClientEmail', 'footer', e.target.value)} placeholder="Footer" />
        </div>
        <div className="mt-4">
          <EmailPreview settings={settings} type="booking" />
        </div>
      </div>

      <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm">
        <h2 className="font-heading text-2xl text-emerald-deep">Contact auto-reply</h2>
        <p className="mt-1 font-body text-xs text-neutral-stone">
          Placeholders: {'{{name}}'}, {'{{message}}'}, {'{{salonPhone}}'}, {'{{salonEmail}}'}
        </p>
        <div className="mt-5 space-y-4">
          <input className="form-input" value={settings.contactClientEmail.subject} onChange={(e) => setTemplate('contactClientEmail', 'subject', e.target.value)} placeholder="Subject" />
          <textarea className="form-input min-h-28 resize-y" value={settings.contactClientEmail.intro} onChange={(e) => setTemplate('contactClientEmail', 'intro', e.target.value)} placeholder="Intro" />
          <textarea className="form-input min-h-20 resize-y" value={settings.contactClientEmail.footer} onChange={(e) => setTemplate('contactClientEmail', 'footer', e.target.value)} placeholder="Footer" />
        </div>
        <div className="mt-4">
          <EmailPreview settings={settings} type="contact" />
        </div>
      </div>

      <button type="button" onClick={() => saveSettings(settings)} disabled={isSavingSettings} className={`btn-primary w-full max-w-md ${isSavingSettings ? 'opacity-50' : ''}`}>
        {isSavingSettings ? 'Saving…' : 'Save email settings'}
      </button>
    </div>
  )
}

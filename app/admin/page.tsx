'use client'

import { type FormEvent, useEffect, useMemo, useState } from 'react'
import type { IntakeRecord, IntakeStatus } from '@/lib/intake'
import { defaultSiteSettings, mergeSiteSettings, type SiteSettings } from '@/lib/settings'

type AdminTab = 'today' | 'bookings' | 'customers' | 'messages' | 'settings'

const statusOptions: IntakeStatus[] = ['new', 'contacted', 'confirmed', 'completed', 'cancelled', 'archived']

const tabs: { id: AdminTab; label: string; icon: string }[] = [
  { id: 'today', label: 'Today', icon: '●' },
  { id: 'bookings', label: 'Bookings', icon: '□' },
  { id: 'customers', label: 'Clients', icon: '◇' },
  { id: 'messages', label: 'Messages', icon: '✉' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

function formatDateTime(value?: string) {
  if (!value) return 'Just now'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function statusLabel(status?: string) {
  if (!status) return 'new'
  return status.replace(/_/g, ' ')
}

function statusClass(status?: string) {
  if (status === 'confirmed') return 'bg-emerald-pale text-emerald-deep'
  if (status === 'completed') return 'bg-gold-champagne text-gold-deep'
  if (status === 'cancelled') return 'bg-red-50 text-red-900'
  if (status === 'archived') return 'bg-neutral-mist/50 text-neutral-stone'
  if (status === 'contacted') return 'bg-neutral-pearl text-emerald-rich'
  return 'bg-gold-primary text-emerald-deep'
}

function getRecordTime(record: IntakeRecord) {
  return new Date(record.created_at || '').getTime() || 0
}

function customerKey(record: IntakeRecord) {
  return (record.email || record.phone || record.name).toLowerCase()
}

function DetailRow({ label, value, href }: { label: string; value?: string; href?: string }) {
  if (!value) return null

  const content = href ? (
    <a href={href} className="text-emerald-deep underline decoration-gold-primary/40 underline-offset-4">
      {value}
    </a>
  ) : value

  return (
    <div className="rounded-2xl bg-neutral-cream px-4 py-3">
      <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">{label}</p>
      <p className="mt-1 font-body text-sm leading-relaxed text-neutral-charcoal">{content}</p>
    </div>
  )
}

function RecordCard({
  record,
  selected,
  onSelect,
}: {
  record: IntakeRecord
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-2xl border bg-neutral-white p-4 text-left shadow-card-sm transition-all ${
        selected ? 'border-gold-primary ring-2 ring-gold-primary/20' : 'border-emerald-deep/10'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">
            {record.kind === 'booking' ? 'Booking' : 'Message'}
          </p>
          <h3 className="mt-1 truncate font-heading text-xl text-emerald-deep">{record.name}</h3>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 font-accent text-[9px] uppercase tracking-wide ${statusClass(record.status)}`}>
          {statusLabel(record.status)}
        </span>
      </div>
      {record.kind === 'booking' ? (
        <p className="mt-3 font-body text-sm text-neutral-slate">
          {record.service} · {record.date} · {record.time}
        </p>
      ) : (
        <p className="mt-3 line-clamp-2 font-body text-sm text-neutral-slate">{record.message}</p>
      )}
      <div className="mt-4 flex items-center justify-between">
        <p className="font-body text-xs text-neutral-stone">{formatDateTime(record.created_at)}</p>
        <span className="font-accent text-[10px] uppercase tracking-wide-2 text-emerald-deep">Open</span>
      </div>
    </button>
  )
}

function RecordDetail({
  record,
  onStatus,
}: {
  record?: IntakeRecord
  onStatus: (record: IntakeRecord, status: IntakeStatus) => void
}) {
  if (!record) {
    return (
      <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-8 text-center shadow-card-sm">
        <p className="font-heading text-2xl text-emerald-deep">Select a request</p>
        <p className="mt-2 font-body text-sm text-neutral-stone">Details and quick actions will appear here.</p>
      </div>
    )
  }

  return (
    <article className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">
            {record.kind === 'booking' ? 'Appointment Request' : 'Website Message'}
          </p>
          <h2 className="mt-1 font-display text-3xl text-emerald-deep">{record.name}</h2>
          <p className="mt-1 font-body text-xs text-neutral-stone">{formatDateTime(record.created_at)}</p>
        </div>
        <span className={`rounded-full px-3 py-1.5 font-accent text-[10px] uppercase tracking-wide ${statusClass(record.status)}`}>
          {statusLabel(record.status)}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <a href={`tel:${record.phone || ''}`} className="rounded-full bg-emerald-deep px-4 py-3 text-center font-accent text-[11px] font-semibold uppercase tracking-wide-2 text-gold-light">
          Call
        </a>
        <a href={`mailto:${record.email}`} className="rounded-full border border-emerald-deep/20 px-4 py-3 text-center font-accent text-[11px] font-semibold uppercase tracking-wide-2 text-emerald-deep">
          Email
        </a>
      </div>

      <div className="mt-5 grid gap-3">
        <DetailRow label="Email" value={record.email} href={`mailto:${record.email}`} />
        <DetailRow label="Phone" value={record.phone} href={record.phone ? `tel:${record.phone}` : undefined} />
        {record.kind === 'booking' ? (
          <>
            <DetailRow label="Service" value={record.service} />
            <DetailRow label="Stylist" value={record.stylist} />
            <DetailRow label="Preferred Time" value={`${record.date} at ${record.time}`} />
            <DetailRow label="Client Notes" value={record.notes} />
          </>
        ) : (
          <DetailRow label="Message" value={record.message} />
        )}
      </div>

      <div className="mt-5">
        <p className="form-label">STATUS</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => onStatus(record, status)}
              className={`rounded-full px-3 py-2 font-accent text-[10px] font-semibold uppercase tracking-wide ${
                (record.status || 'new') === status
                  ? 'bg-gold-primary text-emerald-deep'
                  : 'border border-emerald-deep/15 text-emerald-deep'
              }`}
            >
              {statusLabel(status)}
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

function SettingsForm({
  settings,
  onChange,
  onSave,
  saving,
}: {
  settings: SiteSettings
  onChange: (settings: SiteSettings) => void
  onSave: () => void
  saving: boolean
}) {
  const setTemplate = (section: 'bookingClientEmail' | 'contactClientEmail', key: 'subject' | 'intro' | 'footer', value: string) => {
    onChange({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: value,
      },
    })
  }

  const setSocial = (key: keyof SiteSettings['social'], value: string) => {
    onChange({
      ...settings,
      social: {
        ...settings.social,
        [key]: value,
      },
    })
  }

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm">
        <h2 className="font-heading text-2xl text-emerald-deep">Intake Emails</h2>
        <p className="mt-1 font-body text-sm text-neutral-stone">Where salon notifications should arrive. Use commas for multiple inboxes.</p>
        <div className="mt-5">
          <label className="form-label">SALON RECIPIENTS</label>
          <input
            className="form-input"
            value={settings.salonIntakeEmails}
            onChange={(event) => onChange({ ...settings, salonIntakeEmails: event.target.value })}
            placeholder="hello@example.com, manager@example.com"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm">
        <h2 className="font-heading text-2xl text-emerald-deep">Booking Reply</h2>
        <p className="mt-1 font-body text-xs leading-relaxed text-neutral-stone">
          You can use placeholders like {'{{name}}'}, {'{{service}}'}, {'{{date}}'}, {'{{time}}'}, and {'{{salonPhone}}'}.
        </p>
        <div className="mt-5 space-y-4">
          <input className="form-input" value={settings.bookingClientEmail.subject} onChange={(event) => setTemplate('bookingClientEmail', 'subject', event.target.value)} placeholder="Subject" />
          <textarea className="form-input min-h-28 resize-y" value={settings.bookingClientEmail.intro} onChange={(event) => setTemplate('bookingClientEmail', 'intro', event.target.value)} placeholder="Intro message" />
          <textarea className="form-input min-h-20 resize-y" value={settings.bookingClientEmail.footer} onChange={(event) => setTemplate('bookingClientEmail', 'footer', event.target.value)} placeholder="Footer message" />
        </div>
      </div>

      <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm">
        <h2 className="font-heading text-2xl text-emerald-deep">Contact Reply</h2>
        <p className="mt-1 font-body text-xs leading-relaxed text-neutral-stone">
          You can use placeholders like {'{{name}}'}, {'{{message}}'}, {'{{salonPhone}}'}, and {'{{salonEmail}}'}.
        </p>
        <div className="mt-5 space-y-4">
          <input className="form-input" value={settings.contactClientEmail.subject} onChange={(event) => setTemplate('contactClientEmail', 'subject', event.target.value)} placeholder="Subject" />
          <textarea className="form-input min-h-28 resize-y" value={settings.contactClientEmail.intro} onChange={(event) => setTemplate('contactClientEmail', 'intro', event.target.value)} placeholder="Intro message" />
          <textarea className="form-input min-h-20 resize-y" value={settings.contactClientEmail.footer} onChange={(event) => setTemplate('contactClientEmail', 'footer', event.target.value)} placeholder="Footer message" />
        </div>
      </div>

      <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm">
        <h2 className="font-heading text-2xl text-emerald-deep">Social Links</h2>
        <div className="mt-5 space-y-4">
          <input className="form-input" value={settings.social.instagram} onChange={(event) => setSocial('instagram', event.target.value)} placeholder="Instagram URL" />
          <input className="form-input" value={settings.social.facebook} onChange={(event) => setSocial('facebook', event.target.value)} placeholder="Facebook URL" />
          <input className="form-input" value={settings.social.tiktok} onChange={(event) => setSocial('tiktok', event.target.value)} placeholder="TikTok URL" />
          <input className="form-input" value={settings.social.pinterest} onChange={(event) => setSocial('pinterest', event.target.value)} placeholder="Pinterest URL" />
        </div>
      </div>

      <button onClick={onSave} disabled={saving} className={`btn-primary w-full ${saving ? 'opacity-50' : ''}`}>
        {saving ? 'SAVING...' : 'SAVE SETTINGS'}
      </button>
    </div>
  )
}

export default function AdminPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>('today')
  const [records, setRecords] = useState<IntakeRecord[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [isSavingSettings, setIsSavingSettings] = useState(false)

  const visibleRecords = useMemo(() => {
    const searchable = query.trim().toLowerCase()
    return records
      .filter((record) => record.status !== 'archived')
      .filter((record) => activeTab === 'bookings' ? record.kind === 'booking' : activeTab === 'messages' ? record.kind === 'contact' : true)
      .filter((record) => {
        if (activeTab !== 'today') return true
        return ['new', 'contacted', undefined].includes(record.status)
      })
      .filter((record) => {
        if (!searchable) return true
        const haystack = [
          record.name,
          record.email,
          record.phone,
          record.kind === 'booking' ? record.service : record.message,
        ].filter(Boolean).join(' ').toLowerCase()
        return haystack.includes(searchable)
      })
      .sort((a, b) => getRecordTime(b) - getRecordTime(a))
  }, [activeTab, query, records])

  const selectedRecord = useMemo(() => {
    return visibleRecords.find((record) => `${record.kind}-${record.id}` === selectedId) || visibleRecords[0]
  }, [selectedId, visibleRecords])

  const counts = useMemo(() => {
    return {
      new: records.filter((record) => (record.status || 'new') === 'new').length,
      bookings: records.filter((record) => record.kind === 'booking' && record.status !== 'archived').length,
      messages: records.filter((record) => record.kind === 'contact' && record.status !== 'archived').length,
      confirmed: records.filter((record) => record.status === 'confirmed').length,
    }
  }, [records])

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone?: string; count: number; lastAt: number; records: IntakeRecord[] }>()
    records.forEach((record) => {
      const key = customerKey(record)
      const existing = map.get(key)
      const lastAt = getRecordTime(record)
      if (existing) {
        existing.count += 1
        existing.lastAt = Math.max(existing.lastAt, lastAt)
        existing.records.push(record)
      } else {
        map.set(key, {
          name: record.name,
          email: record.email,
          phone: record.phone,
          count: 1,
          lastAt,
          records: [record],
        })
      }
    })
    return Array.from(map.values()).sort((a, b) => b.lastAt - a.lastAt)
  }, [records])

  const loadSettings = async () => {
    const response = await fetch('/api/admin/settings', { cache: 'no-store' })
    const data = await response.json().catch(() => null)
    if (response.ok) {
      setSettings(mergeSiteSettings(data.settings))
    }
  }

  const loadRecords = async ({ silentUnauthorized = false } = {}) => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/intake', { cache: 'no-store' })
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false)
          if (silentUnauthorized) return
        }
        throw new Error(data?.error || 'Could not load requests.')
      }

      setRecords(data.records || [])
      setIsAuthenticated(true)
      await loadSettings()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load requests.')
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (record: IntakeRecord, status: IntakeStatus) => {
    if (!record.id) return

    const previous = records
    setRecords((current) => current.map((item) => (
      item.id === record.id && item.kind === record.kind ? { ...item, status } : item
    )))

    try {
      const response = await fetch('/api/admin/intake', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: record.id, kind: record.kind, status }),
      })
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || 'Could not update request.')
      }
    } catch (error) {
      setRecords(previous)
      setMessage(error instanceof Error ? error.message : 'Could not update request.')
    }
  }

  const saveSettings = async () => {
    setIsSavingSettings(true)
    setMessage('')
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(data?.error || 'Could not save settings.')
      }
      setSettings(mergeSiteSettings(data.settings))
      setMessage('Settings saved.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save settings.')
    } finally {
      setIsSavingSettings(false)
    }
  }

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || 'Could not sign in.')
      }

      setPassword('')
      setIsAuthenticated(true)
      await loadRecords()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not sign in.')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setIsAuthenticated(false)
    setRecords([])
    setPassword('')
  }

  useEffect(() => {
    void loadRecords({ silentUnauthorized: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-neutral-cream pb-28 pt-28">
      <section className="px-5 pb-8 md:px-10">
        <div className="mx-auto max-w-container">
          <p className="section-label">SALON ADMIN</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-4xl text-emerald-deep md:text-6xl">Workspace</h1>
              <p className="mt-3 max-w-text font-body text-sm leading-relaxed text-neutral-stone">
                Review requests, manage clients, and tune the messages customers receive.
              </p>
            </div>
            {isAuthenticated && (
              <div className="flex gap-2">
                <button onClick={() => loadRecords()} disabled={isLoading} className="rounded-full border border-emerald-deep/20 px-5 py-3 font-accent text-[11px] font-semibold tracking-wide-2 text-emerald-deep">
                  {isLoading ? 'REFRESHING' : 'REFRESH'}
                </button>
                <button onClick={logout} className="rounded-full bg-emerald-deep px-5 py-3 font-accent text-[11px] font-semibold tracking-wide-2 text-gold-light">
                  LOG OUT
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-10">
        <div className="mx-auto max-w-container">
          {!isAuthenticated && (
            <form onSubmit={login} className="mx-auto max-w-content-sm rounded-3xl border border-gold-primary/20 bg-neutral-white p-6 shadow-card md:p-8">
              <h2 className="font-heading text-2xl text-emerald-deep">Admin Sign In</h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-neutral-stone">
                Use the private salon username and password.
              </p>
              <div className="mt-6">
                <label className="form-label">USERNAME</label>
                <input type="text" className="form-input" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
              </div>
              <div className="mt-5">
                <label className="form-label">PASSWORD</label>
                <input type="password" className="form-input" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
              </div>
              {message && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-900">{message}</p>}
              <button type="submit" disabled={!username || !password || isLoading} className={`btn-primary mt-6 w-full ${!username || !password || isLoading ? 'opacity-45 cursor-not-allowed' : ''}`}>
                {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>
          )}

          {isAuthenticated && (
            <>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ['New', counts.new],
                  ['Bookings', counts.bookings],
                  ['Messages', counts.messages],
                  ['Confirmed', counts.confirmed],
                ].map(([label, count]) => (
                  <div key={label} className="rounded-2xl border border-emerald-deep/10 bg-neutral-white p-4 shadow-card-sm">
                    <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">{label}</p>
                    <p className="mt-1 font-display text-3xl text-emerald-deep">{count}</p>
                  </div>
                ))}
              </div>

              {message && <p className="mt-5 rounded-2xl bg-gold-champagne/40 px-4 py-3 text-sm text-emerald-deep">{message}</p>}

              {activeTab !== 'settings' && activeTab !== 'customers' && (
                <div className="mt-5">
                  <input
                    className="form-input bg-neutral-white"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search name, phone, email, service"
                  />
                </div>
              )}

              {activeTab === 'customers' ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {customers.map((customer) => (
                    <div key={customerKey(customer.records[0])} className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm">
                      <h2 className="font-heading text-2xl text-emerald-deep">{customer.name}</h2>
                      <p className="mt-1 font-body text-sm text-neutral-stone">{customer.count} request{customer.count === 1 ? '' : 's'}</p>
                      <div className="mt-4 grid gap-2 text-sm text-neutral-slate">
                        <a href={`mailto:${customer.email}`} className="truncate">{customer.email}</a>
                        {customer.phone && <a href={`tel:${customer.phone}`}>{customer.phone}</a>}
                        <p>Last seen {formatDateTime(customer.records.sort((a, b) => getRecordTime(b) - getRecordTime(a))[0]?.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'settings' ? (
                <div className="mt-6 max-w-content">
                  <SettingsForm settings={settings} onChange={setSettings} onSave={saveSettings} saving={isSavingSettings} />
                </div>
              ) : (
                <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,1.1fr)]">
                  <div className="space-y-3">
                    {visibleRecords.length === 0 && (
                      <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-8 text-center shadow-card-sm">
                        <p className="font-heading text-2xl text-emerald-deep">No requests here</p>
                        <p className="mt-2 font-body text-sm text-neutral-stone">New items will show up automatically.</p>
                      </div>
                    )}
                    {visibleRecords.map((record) => (
                      <RecordCard
                        key={`${record.kind}-${record.id}`}
                        record={record}
                        selected={`${record.kind}-${record.id}` === `${selectedRecord?.kind}-${selectedRecord?.id}`}
                        onSelect={() => setSelectedId(`${record.kind}-${record.id}`)}
                      />
                    ))}
                  </div>
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <RecordDetail record={selectedRecord} onStatus={updateStatus} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {isAuthenticated && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-emerald-deep/10 bg-neutral-cream/95 px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 shadow-[0_-10px_30px_rgba(10,61,46,0.12)] backdrop-blur-xl">
          <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[58px] rounded-2xl px-1 text-center transition-all ${
                  activeTab === tab.id ? 'bg-emerald-deep text-gold-light' : 'text-neutral-stone'
                }`}
              >
                <span className="block text-lg leading-none">{tab.icon}</span>
                <span className="mt-1 block font-accent text-[9px] font-semibold uppercase tracking-wide">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}

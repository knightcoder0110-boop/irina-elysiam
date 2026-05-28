'use client'

import { type FormEvent, useEffect, useMemo, useState } from 'react'
import type { IntakeRecord, IntakeStatus } from '@/lib/intake'

const statusOptions: IntakeStatus[] = ['new', 'contacted', 'confirmed', 'cancelled']

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

export default function AdminPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [records, setRecords] = useState<IntakeRecord[]>([])
  const [filter, setFilter] = useState<'all' | 'booking' | 'contact'>('all')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const filteredRecords = useMemo(() => {
    if (filter === 'all') return records
    return records.filter((record) => record.kind === filter)
  }, [filter, records])

  const counts = useMemo(() => {
    return {
      all: records.length,
      booking: records.filter((record) => record.kind === 'booking').length,
      contact: records.filter((record) => record.kind === 'contact').length,
      new: records.filter((record) => (record.status || 'new') === 'new').length,
    }
  }, [records])

  const loadRecords = async ({ silentUnauthorized = false } = {}) => {
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/intake', {
        cache: 'no-store',
      })
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
        headers: {
          'Content-Type': 'application/json',
        },
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
    <div className="min-h-screen bg-neutral-cream pt-28">
      <section className="px-5 pb-8 md:px-10">
        <div className="mx-auto max-w-container-md">
          <p className="section-label">SALON INBOX</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-4xl text-emerald-deep md:text-6xl">
                Requests
              </h1>
              <p className="mt-3 max-w-text font-body text-sm leading-relaxed text-neutral-stone">
                A simple daily workspace for new appointment requests and website messages.
              </p>
            </div>
            {isAuthenticated && (
              <div className="flex gap-2">
                <button
                  onClick={() => loadRecords()}
                  disabled={isLoading}
                  className="rounded-full border border-emerald-deep/20 px-5 py-3 font-accent text-[11px] font-semibold tracking-wide-2 text-emerald-deep"
                >
                  {isLoading ? 'REFRESHING' : 'REFRESH'}
                </button>
                <button
                  onClick={logout}
                  className="rounded-full bg-emerald-deep px-5 py-3 font-accent text-[11px] font-semibold tracking-wide-2 text-gold-light"
                >
                  LOG OUT
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10">
        <div className="mx-auto max-w-container-md">
          {!isAuthenticated && (
            <form
              onSubmit={login}
              className="rounded-3xl border border-gold-primary/20 bg-neutral-white p-6 shadow-card md:p-8"
            >
              <h2 className="font-heading text-2xl text-emerald-deep">Admin Sign In</h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-neutral-stone">
                Use the private salon username and password. Your session is stored in a secure server cookie.
              </p>
              <div className="mt-6">
                <label className="form-label">USERNAME</label>
                <input
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  placeholder="admin"
                />
              </div>
              <div className="mt-5">
                <label className="form-label">PASSWORD</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  placeholder="Password"
                />
              </div>
              {message && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-900">{message}</p>}
              <button
                type="submit"
                disabled={!username || !password || isLoading}
                className={`btn-primary mt-6 w-full ${!username || !password || isLoading ? 'opacity-45 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>
          )}

          {isAuthenticated && (
            <>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  ['All', counts.all],
                  ['Bookings', counts.booking],
                  ['Messages', counts.contact],
                  ['New', counts.new],
                ].map(([label, count]) => (
                  <div key={label} className="rounded-2xl border border-emerald-deep/10 bg-neutral-white p-4 shadow-card-sm">
                    <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">{label}</p>
                    <p className="mt-1 font-display text-3xl text-emerald-deep">{count}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {[
                  { label: 'All', value: 'all' as const },
                  { label: 'Bookings', value: 'booking' as const },
                  { label: 'Messages', value: 'contact' as const },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setFilter(item.value)}
                    className={`rounded-full px-5 py-3 font-accent text-[11px] font-semibold uppercase tracking-wide-2 ${
                      filter === item.value
                        ? 'bg-emerald-deep text-gold-light'
                        : 'border border-emerald-deep/15 bg-neutral-white text-emerald-deep'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {message && <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-900">{message}</p>}

              <div className="mt-6 space-y-4">
                {filteredRecords.length === 0 && (
                  <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-8 text-center shadow-card-sm">
                    <p className="font-heading text-2xl text-emerald-deep">No requests yet</p>
                    <p className="mt-2 font-body text-sm text-neutral-stone">New bookings and messages will appear here.</p>
                  </div>
                )}

                {filteredRecords.map((record) => (
                  <article key={`${record.kind}-${record.id}`} className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-accent text-[10px] uppercase tracking-wide-2 text-gold-primary">
                          {record.kind === 'booking' ? 'Appointment Request' : 'Website Message'}
                        </p>
                        <h2 className="mt-1 font-heading text-2xl text-emerald-deep">{record.name}</h2>
                        <p className="mt-1 font-body text-xs text-neutral-stone">{formatDateTime(record.created_at)}</p>
                      </div>
                      <span className="rounded-full bg-emerald-pale px-3 py-1.5 font-accent text-[10px] uppercase tracking-wide text-emerald-deep">
                        {statusLabel(record.status)}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 font-body text-sm text-neutral-slate md:grid-cols-2">
                      {record.kind === 'booking' ? (
                        <>
                          <p><span className="text-gold-deep">Service:</span> {record.service}</p>
                          <p><span className="text-gold-deep">When:</span> {record.date} at {record.time}</p>
                          <p><span className="text-gold-deep">Stylist:</span> {record.stylist}</p>
                          <p><span className="text-gold-deep">Phone:</span> <a href={`tel:${record.phone}`}>{record.phone}</a></p>
                          <p className="md:col-span-2"><span className="text-gold-deep">Email:</span> <a href={`mailto:${record.email}`}>{record.email}</a></p>
                          {record.notes && <p className="md:col-span-2"><span className="text-gold-deep">Notes:</span> {record.notes}</p>}
                        </>
                      ) : (
                        <>
                          <p><span className="text-gold-deep">Email:</span> <a href={`mailto:${record.email}`}>{record.email}</a></p>
                          {record.phone && <p><span className="text-gold-deep">Phone:</span> <a href={`tel:${record.phone}`}>{record.phone}</a></p>}
                          <p className="md:col-span-2"><span className="text-gold-deep">Message:</span> {record.message}</p>
                        </>
                      )}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(record, status)}
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
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

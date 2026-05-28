'use client'

import { useEffect, useMemo, useState } from 'react'
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
  const [accessKey, setAccessKey] = useState('')
  const [savedKey, setSavedKey] = useState('')
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

  const loadRecords = async (key = savedKey) => {
    if (!key) return

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/intake', {
        headers: { 'x-admin-key': key },
        cache: 'no-store',
      })
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.error || 'Could not load requests.')
      }

      setRecords(data.records || [])
      setSavedKey(key)
      sessionStorage.setItem('irina-admin-key', key)
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
          'x-admin-key': savedKey,
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

  useEffect(() => {
    const key = sessionStorage.getItem('irina-admin-key') || ''
    if (key) {
      setAccessKey(key)
      setSavedKey(key)
      void loadRecords(key)
    }
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
            {savedKey && (
              <button
                onClick={() => loadRecords()}
                disabled={isLoading}
                className="rounded-full border border-emerald-deep/20 px-5 py-3 font-accent text-[11px] font-semibold tracking-wide-2 text-emerald-deep"
              >
                {isLoading ? 'REFRESHING' : 'REFRESH'}
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-10">
        <div className="mx-auto max-w-container-md">
          {!savedKey && (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                void loadRecords(accessKey)
              }}
              className="rounded-3xl border border-gold-primary/20 bg-neutral-white p-6 shadow-card md:p-8"
            >
              <h2 className="font-heading text-2xl text-emerald-deep">Admin Access</h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-neutral-stone">
                Enter the private admin key configured on the server.
              </p>
              <div className="mt-6">
                <label className="form-label">ACCESS KEY</label>
                <input
                  type="password"
                  className="form-input"
                  value={accessKey}
                  onChange={(event) => setAccessKey(event.target.value)}
                  placeholder="Private key"
                />
              </div>
              {message && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-900">{message}</p>}
              <button
                type="submit"
                disabled={!accessKey || isLoading}
                className={`btn-primary mt-6 w-full ${!accessKey || isLoading ? 'opacity-45 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'OPENING...' : 'OPEN INBOX'}
              </button>
            </form>
          )}

          {savedKey && (
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

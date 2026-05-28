'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import type { IntakeRecord, IntakeStatus } from '@/lib/intake'
import { defaultSiteSettings, mergeSiteSettings, type SiteSettings } from '@/lib/settings'

type Toast = { id: number; message: string; type: 'success' | 'error' }

type AdminContextValue = {
  records: IntakeRecord[]
  settings: SiteSettings
  isAuthenticated: boolean
  isLoading: boolean
  isSavingSettings: boolean
  bannerMessage: string
  toasts: Toast[]
  counts: { new: number; bookings: number; messages: number; confirmed: number; archived: number }
  loadRecords: (opts?: { silentUnauthorized?: boolean }) => Promise<void>
  updateStatus: (record: IntakeRecord, status: IntakeStatus) => Promise<void>
  saveSettings: (settings: SiteSettings) => Promise<void>
  setSettings: (settings: SiteSettings) => void
  login: (event: FormEvent<HTMLFormElement>, username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  showToast: (message: string, type?: 'success' | 'error') => void
  dismissToast: (id: number) => void
}

const AdminContext = createContext<AdminContextValue | null>(null)

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<IntakeRecord[]>([])
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSavingSettings, setIsSavingSettings] = useState(false)
  const [bannerMessage, setBannerMessage] = useState('')
  const [toasts, setToasts] = useState<Toast[]>([])
  const [toastId, setToastId] = useState(0)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = toastId + 1
    setToastId(id)
    setToasts((current) => [...current, { id, message, type }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id))
    }, 4000)
  }, [toastId])

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const loadSettings = async () => {
    const response = await fetch('/api/admin/settings', { cache: 'no-store' })
    const data = await response.json().catch(() => null)
    if (response.ok) {
      setSettings(mergeSiteSettings(data.settings))
    }
  }

  const loadRecords = useCallback(async ({ silentUnauthorized = false } = {}) => {
    setIsLoading(true)
    setBannerMessage('')

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
      setBannerMessage(error instanceof Error ? error.message : 'Could not load requests.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateStatus = useCallback(async (record: IntakeRecord, status: IntakeStatus) => {
    if (!record.id) return

    const previous = records
    setRecords((current) =>
      current.map((item) =>
        item.id === record.id && item.kind === record.kind ? { ...item, status } : item,
      ),
    )

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
      showToast(`Marked as ${status.replace(/_/g, ' ')}`)
    } catch (error) {
      setRecords(previous)
      showToast(error instanceof Error ? error.message : 'Could not update request.', 'error')
    }
  }, [records, showToast])

  const saveSettings = useCallback(async (next: SiteSettings) => {
    setIsSavingSettings(true)
    setBannerMessage('')
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: next }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(data?.error || 'Could not save settings.')
      }
      setSettings(mergeSiteSettings(data.settings))
      showToast('Settings saved')
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Could not save settings.', 'error')
    } finally {
      setIsSavingSettings(false)
    }
  }, [showToast])

  const login = useCallback(async (event: FormEvent<HTMLFormElement>, username: string, password: string) => {
    event.preventDefault()
    setIsLoading(true)
    setBannerMessage('')

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

      setIsAuthenticated(true)
      await loadRecords()
      showToast('Signed in')
    } catch (error) {
      setBannerMessage(error instanceof Error ? error.message : 'Could not sign in.')
    } finally {
      setIsLoading(false)
    }
  }, [loadRecords, showToast])

  const logout = useCallback(async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setIsAuthenticated(false)
    setRecords([])
    showToast('Signed out')
  }, [showToast])

  const counts = useMemo(
    () => ({
      new: records.filter((r) => (r.status || 'new') === 'new').length,
      bookings: records.filter((r) => r.kind === 'booking' && r.status !== 'archived').length,
      messages: records.filter((r) => r.kind === 'contact' && r.status !== 'archived').length,
      confirmed: records.filter((r) => r.status === 'confirmed').length,
      archived: records.filter((r) => r.status === 'archived').length,
    }),
    [records],
  )

  useEffect(() => {
    void loadRecords({ silentUnauthorized: true })
  }, [loadRecords])

  const value: AdminContextValue = {
    records,
    settings,
    isAuthenticated,
    isLoading,
    isSavingSettings,
    bannerMessage,
    toasts,
    counts,
    loadRecords,
    updateStatus,
    saveSettings,
    setSettings,
    login,
    logout,
    showToast,
    dismissToast,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

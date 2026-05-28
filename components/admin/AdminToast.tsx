'use client'

import { useAdmin } from '@/components/admin/AdminProvider'

export default function AdminToast() {
  const { toasts, dismissToast } = useAdmin()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex max-w-sm flex-col gap-2 md:bottom-6 md:right-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start justify-between gap-3 rounded-2xl px-4 py-3 shadow-card text-sm ${
            toast.type === 'error' ? 'bg-red-50 text-red-900' : 'bg-emerald-deep text-gold-light'
          }`}
        >
          <p>{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 font-accent text-[10px] uppercase opacity-70"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  )
}

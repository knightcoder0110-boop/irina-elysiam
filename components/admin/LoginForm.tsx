'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/components/admin/AdminProvider'
import { adminRoutes } from '@/lib/admin/routes'

export default function LoginForm() {
  const { login, isLoading, bannerMessage, isAuthenticated } = useAdmin()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isAuthenticated) router.replace(adminRoutes.home)
  }, [isAuthenticated, router])

  if (isAuthenticated) return null

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-cream px-5">
      <form
        onSubmit={(e) => login(e, username, password)}
        className="w-full max-w-content-sm rounded-3xl border border-gold-primary/20 bg-neutral-white p-6 shadow-card md:p-8"
      >
        <p className="section-label mb-2">Salon admin</p>
        <h1 className="font-display text-3xl text-emerald-deep">Sign in</h1>
        <p className="mt-2 font-body text-sm leading-relaxed text-neutral-stone">
          Use your private salon username and password.
        </p>
        <div className="mt-6">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="mt-5">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {bannerMessage && (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-900">{bannerMessage}</p>
        )}
        <button
          type="submit"
          disabled={!username || !password || isLoading}
          className={`btn-primary mt-6 w-full ${!username || !password || isLoading ? 'cursor-not-allowed opacity-45' : ''}`}
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

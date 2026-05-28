'use client'

import type { SiteSettings } from '@/lib/settings'
import { useAdmin } from '@/components/admin/AdminProvider'

export default function SettingsSocialForm() {
  const { settings, setSettings, saveSettings, isSavingSettings } = useAdmin()

  const setSocial = (key: keyof SiteSettings['social'], value: string) => {
    setSettings({
      ...settings,
      social: { ...settings.social, [key]: value },
    })
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="rounded-3xl border border-emerald-deep/10 bg-neutral-white p-5 shadow-card-sm">
        <h2 className="font-heading text-2xl text-emerald-deep">Social links</h2>
        <p className="mt-1 font-body text-sm text-neutral-stone">Shown in the website footer.</p>
        <div className="mt-5 space-y-4">
          <div>
            <label className="form-label">Instagram</label>
            <input className="form-input" value={settings.social.instagram} onChange={(e) => setSocial('instagram', e.target.value)} placeholder="https://instagram.com/…" />
          </div>
          <div>
            <label className="form-label">Facebook</label>
            <input className="form-input" value={settings.social.facebook} onChange={(e) => setSocial('facebook', e.target.value)} placeholder="https://facebook.com/…" />
          </div>
          <div>
            <label className="form-label">TikTok</label>
            <input className="form-input" value={settings.social.tiktok} onChange={(e) => setSocial('tiktok', e.target.value)} placeholder="https://tiktok.com/…" />
          </div>
          <div>
            <label className="form-label">Pinterest</label>
            <input className="form-input" value={settings.social.pinterest} onChange={(e) => setSocial('pinterest', e.target.value)} placeholder="https://pinterest.com/…" />
          </div>
        </div>
      </div>

      <button type="button" onClick={() => saveSettings(settings)} disabled={isSavingSettings} className={`btn-primary w-full max-w-md ${isSavingSettings ? 'opacity-50' : ''}`}>
        {isSavingSettings ? 'Saving…' : 'Save social links'}
      </button>
    </div>
  )
}

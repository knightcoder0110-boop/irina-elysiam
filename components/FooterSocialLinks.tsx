'use client'

import { useEffect, useState } from 'react'
import { businessInfo } from '@/lib/data'
import type { SocialSettings } from '@/lib/settings'

export default function FooterSocialLinks() {
  const [social, setSocial] = useState<SocialSettings>(businessInfo.social)

  useEffect(() => {
    let mounted = true

    fetch('/api/site-settings')
      .then((response) => response.json())
      .then((data) => {
        if (mounted && data?.social) {
          setSocial(data.social)
        }
      })
      .catch(() => undefined)

    return () => {
      mounted = false
    }
  }, [])

  const links = Object.entries(social).filter(([, url]) => Boolean(url))

  return (
    <div className="flex gap-4">
      {links.map(([name, url]) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-accent text-[10px] tracking-wide-2 opacity-70 hover:opacity-100 hover:text-gold-light transition-all duration-300"
        >
          {name.toUpperCase()}
        </a>
      ))}
    </div>
  )
}

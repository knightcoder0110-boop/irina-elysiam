import { MetadataRoute } from 'next'
import { businessInfo } from '@/lib/data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${businessInfo.website}/sitemap.xml`,
  }
}

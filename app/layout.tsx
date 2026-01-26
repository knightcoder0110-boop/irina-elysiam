import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { HomePageSchema } from '@/components/SchemaMarkup'
import { businessInfo, seoKeywords } from '@/lib/data'

export const metadata: Metadata = {
  metadataBase: new URL(businessInfo.website),
  title: {
    default: `${businessInfo.name} | Premium Hair Salon Denver CO`,
    template: `%s | ${businessInfo.name}`,
  },
  description: `${businessInfo.tagline}. ${businessInfo.description} Located in Denver, CO near Washington Park & Cherry Creek.`,
  keywords: [
    ...seoKeywords.primary,
    ...seoKeywords.secondary,
    ...seoKeywords.services,
  ],
  authors: [{ name: businessInfo.name }],
  creator: businessInfo.legalName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: businessInfo.website,
    siteName: businessInfo.name,
    title: `${businessInfo.name} | Premium Hair Salon Denver CO`,
    description: `${businessInfo.tagline}. Premium coloring, cutting, and treatments in Denver. Near Washington Park & Cherry Creek.`,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: businessInfo.legalName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessInfo.name} | Premium Hair Salon Denver`,
    description: `${businessInfo.tagline}. Premium hair services in Denver, CO.`,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: businessInfo.website,
  },
  verification: {
    // Add your verification codes here when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <HomePageSchema />
      </head>
      <body className="min-h-screen bg-neutral-cream text-neutral-charcoal font-body">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

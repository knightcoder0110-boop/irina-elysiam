import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Irina Elysian | Premium Hair Design Studio',
    template: '%s | Irina Elysian'
  },
  description: 'Divine Beauty, For Everyone. Experience transformative hair design crafted with supreme skill and heavenly care at Irina Elysian Hair Design Studio.',
  keywords: ['hair salon', 'hair stylist', 'balayage', 'hair color', 'haircut', 'Denver salon', 'premium hair design', 'bridal hair'],
  authors: [{ name: 'Irina Elysian' }],
  creator: 'Irina Elysian Hair Design Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://irinaelysian.com',
    siteName: 'Irina Elysian',
    title: 'Irina Elysian | Premium Hair Design Studio',
    description: 'Divine Beauty, For Everyone. Experience transformative hair design crafted with supreme skill and heavenly care.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Irina Elysian Hair Design Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Irina Elysian | Premium Hair Design Studio',
    description: 'Divine Beauty, For Everyone. Experience transformative hair design crafted with supreme skill and heavenly care.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-cream text-neutral-charcoal font-body">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

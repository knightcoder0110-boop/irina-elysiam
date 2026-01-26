/**
 * Schema Markup Component
 * =======================
 * Generates JSON-LD structured data for SEO.
 * Includes: LocalBusiness, HairSalon, FAQPage schemas
 */

import { businessInfo, businessHours, allServices, faqData } from '@/lib/data'

// LocalBusiness + HairSalon Schema
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HairSalon', 'BeautySalon'],
    '@id': `${businessInfo.website}/#business`,
    name: businessInfo.legalName,
    alternateName: businessInfo.name,
    description: businessInfo.description,
    url: businessInfo.website,
    telephone: businessInfo.phoneRaw,
    email: businessInfo.email,
    foundingDate: businessInfo.foundedYear.toString(),
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Debit Card',

    address: {
      '@type': 'PostalAddress',
      streetAddress: `${businessInfo.address.street}, ${businessInfo.address.suite}`,
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.state,
      postalCode: businessInfo.address.zip,
      addressCountry: businessInfo.address.country,
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },

    openingHoursSpecification: businessHours.schema.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),

    sameAs: [
      businessInfo.social.instagram,
      businessInfo.social.facebook,
      businessInfo.social.pinterest,
      businessInfo.social.tiktok,
    ],

    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hair Services',
      itemListElement: allServices.slice(0, 10).map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
      })),
    },

    areaServed: [
      {
        '@type': 'City',
        name: 'Denver',
        '@id': 'https://en.wikipedia.org/wiki/Denver',
      },
      { '@type': 'Neighborhood', name: 'Washington Park' },
      { '@type': 'Neighborhood', name: 'Cherry Creek' },
      { '@type': 'Neighborhood', name: 'Belcaro' },
      { '@type': 'Neighborhood', name: 'Platt Park' },
    ],

    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: businessInfo.bookingUrl,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'Reservation',
        name: 'Book Appointment',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ Schema
export function FAQSchema({ faqs = faqData }: { faqs?: typeof faqData }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Service Schema (for individual service pages)
export function ServiceSchema({
  serviceName,
  serviceDescription,
  price,
}: {
  serviceName: string
  serviceDescription: string
  price?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: businessInfo.legalName,
      '@id': `${businessInfo.website}/#business`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Denver',
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price: price.replace(/[^0-9]/g, ''),
        priceCurrency: 'USD',
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumb Schema
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Website Schema
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: businessInfo.legalName,
    url: businessInfo.website,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${businessInfo.website}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Combined Schema for homepage
export function HomePageSchema() {
  return (
    <>
      <LocalBusinessSchema />
      <WebsiteSchema />
    </>
  )
}

/**
 * Centralized Business Data
 * ========================
 * Update this file to change business information across the entire site.
 * This data is used for:
 * - Contact information display
 * - Schema markup (SEO)
 * - Footer/Navigation
 * - Local SEO pages
 */

// ============================================
// BUSINESS INFORMATION
// ============================================
export const businessInfo = {
  name: 'Irina Elysian',
  legalName: 'Irina Elysian Hair Design Studio',
  tagline: 'Divine Beauty, For Everyone',
  description: 'Experience transformative hair design crafted with supreme skill and heavenly care. Premium coloring, cutting, and treatments for the whole family.',

  // Contact
  phone: '(720) 505-7717',
  phoneRaw: '+17205057717', // For schema markup
  email: 'hello@irinaelysian.com',

  // Address
  address: {
    street: '100 S Madison St',
    suite: 'Suite 2A',
    city: 'Denver',
    state: 'CO',
    stateFullName: 'Colorado',
    zip: '80209',
    country: 'US',
    full: '100 S Madison St, Suite 2A, Denver, CO 80209',
  },

  // Geo coordinates (for schema markup - approximate for 80209)
  geo: {
    latitude: 39.7087,
    longitude: -104.9652,
  },

  // URLs
  website: 'https://irinaelysian.com',
  bookingUrl: 'https://irinaelysian.com/booking',

  // Social Media
  social: {
    instagram: 'https://instagram.com/irinaelysian',
    facebook: 'https://facebook.com/irinaelysian',
    pinterest: 'https://pinterest.com/irinaelysian',
    tiktok: 'https://tiktok.com/@irinaelysian',
  },

  // Year established
  foundedYear: 2008,
}

// ============================================
// BUSINESS HOURS
// ============================================
export const businessHours = {
  // Display format
  display: [
    { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 5:00 PM' },
  ],

  // Schema format (ISO 8601)
  schema: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '20:00' },
    { dayOfWeek: ['Saturday'], opens: '09:00', closes: '18:00' },
    { dayOfWeek: ['Sunday'], opens: '10:00', closes: '17:00' },
  ],
}

// ============================================
// SERVICES
// ============================================
export const services = {
  cutting: [
    { name: 'Signature Haircut', description: 'Consultation, shampoo, precision cut, and style', price: '$85', duration: '60 min' },
    { name: 'Express Cut', description: 'Quick trim and refresh', price: '$55', duration: '30 min' },
    { name: "Men's Grooming / Barber", description: 'Cut, beard trim, and neck cleanup', price: '$65', duration: '45 min' },
    { name: "Children's Cut", description: 'Ages 12 and under', price: '$45', duration: '30 min' },
    { name: 'Blowout & Style', description: 'Shampoo and professional styling', price: '$65', duration: '45 min' },
    { name: 'Special Occasion', description: 'Updo or elaborate styling', price: '$120+', duration: '90 min' },
  ],

  color: [
    { name: 'Full Color', description: 'Complete all-over color application', price: '$150+', duration: '2 hrs' },
    { name: 'Root Touch-Up', description: 'Refresh your color at the roots', price: '$95', duration: '90 min' },
    { name: 'Balayage', description: 'Hand-painted, natural-looking dimension', price: '$220+', duration: '3 hrs' },
    { name: 'Full Highlights', description: 'Foil highlights throughout', price: '$185+', duration: '2.5 hrs' },
    { name: 'Partial Highlights', description: 'Face-framing and top sections', price: '$140', duration: '2 hrs' },
    { name: 'Gloss Treatment', description: 'Shine-boosting toner treatment', price: '$65', duration: '30 min' },
  ],

  treatments: [
    { name: 'Brazilian Blowout', description: 'Smoothing treatment for frizz-free hair', price: '$300', duration: '2.5 hrs' },
    { name: 'Keratin Treatment', description: 'Long-lasting smoothing and shine', price: '$350', duration: '3 hrs' },
    { name: 'Deep Conditioning', description: 'Intensive moisture therapy', price: '$55', duration: '30 min' },
    { name: 'Scalp Treatment', description: 'Detoxifying and nourishing scalp therapy', price: '$75', duration: '45 min' },
  ],

  bridal: [
    { name: 'Bridal Trial', price: '$150' },
    { name: 'Wedding Day Hair', price: '$300' },
    { name: 'Bridal Party (each)', price: '$125' },
  ],
}

// All services flattened for schema markup
export const allServices = [
  ...services.cutting,
  ...services.color,
  ...services.treatments,
]

// ============================================
// LOCAL SEO - DENVER NEIGHBORHOODS
// ============================================
export const neighborhoods = [
  {
    slug: 'washington-park',
    name: 'Washington Park',
    shortName: 'Wash Park',
    description: 'Serving the Washington Park community with premium hair services. Located just minutes from the park.',
    nearby: ['Bonnie Brae', 'Old South Gaylord', 'Platt Park'],
    zip: '80209',
  },
  {
    slug: 'cherry-creek',
    name: 'Cherry Creek',
    shortName: 'Cherry Creek',
    description: 'Convenient to Cherry Creek Shopping District. Luxury hair services for the Cherry Creek community.',
    nearby: ['Cherry Creek North', 'Cherry Creek Mall', 'Glendale'],
    zip: '80206',
  },
  {
    slug: 'belcaro',
    name: 'Belcaro',
    shortName: 'Belcaro',
    description: 'Premium hair salon serving the Belcaro neighborhood and surrounding areas.',
    nearby: ['Cory-Merrill', 'University', 'Virginia Village'],
    zip: '80209',
  },
  {
    slug: 'platt-park',
    name: 'Platt Park',
    shortName: 'Platt Park',
    description: 'Your neighborhood hair salon near Platt Park. Expert color and cutting services.',
    nearby: ['South Pearl Street', 'Washington Park', 'University'],
    zip: '80210',
  },
]

// ============================================
// SEO KEYWORDS
// ============================================
export const seoKeywords = {
  primary: [
    'hair salon Denver',
    'Denver hair stylist',
    'balayage Denver',
    'highlights Denver',
    'haircut Denver',
  ],
  secondary: [
    'Brazilian blowout Denver',
    'keratin treatment Denver',
    'hair color Denver',
    'Washington Park hair salon',
    'Cherry Creek hair salon',
  ],
  services: [
    'balayage',
    'highlights',
    'root touch up',
    'hair coloring',
    'precision haircut',
    'Brazilian blowout',
    'keratin treatment',
    'deep conditioning',
    'barber services',
    'family hair salon',
  ],
}

// ============================================
// FAQ DATA (for FAQ page and schema)
// ============================================
export const faqData = [
  {
    question: 'What hair services do you offer?',
    answer: 'We offer a full range of premium hair services including precision haircuts, balayage, highlights, full color, root touch-ups, gloss treatments, Brazilian blowouts, keratin treatments, deep conditioning, and bridal styling. We serve the whole family including men and children.',
  },
  {
    question: 'Where is Irina Elysian located?',
    answer: 'We are located at 100 S Madison St, Suite 2A, Denver, CO 80209. We\'re conveniently located near Washington Park and Cherry Creek, easily accessible from throughout the Denver metro area.',
  },
  {
    question: 'Do I need an appointment?',
    answer: 'Yes, we recommend booking an appointment to ensure availability with your preferred stylist. You can book online through our website or call us at (720) 505-7717.',
  },
  {
    question: 'What are your hours?',
    answer: 'We\'re open Monday through Friday 9:00 AM - 8:00 PM, Saturday 9:00 AM - 6:00 PM, and Sunday 10:00 AM - 5:00 PM.',
  },
  {
    question: 'Do you offer services for men and children?',
    answer: 'Absolutely! We proudly serve the whole family. We offer expert men\'s grooming and barber services, as well as children\'s haircuts for ages 12 and under.',
  },
  {
    question: 'What is balayage?',
    answer: 'Balayage is a French hair coloring technique where highlights are hand-painted onto the hair to create a natural, sun-kissed look. It\'s one of our most popular services and creates beautiful, low-maintenance color.',
  },
  {
    question: 'How much does a haircut cost?',
    answer: 'Our signature haircuts start at $85 and include consultation, shampoo, precision cut, and styling. Men\'s grooming starts at $65, and children\'s cuts start at $45.',
  },
  {
    question: 'Do you offer bridal hair services?',
    answer: 'Yes! We offer comprehensive bridal services including bridal trials ($150), wedding day hair ($300), and bridal party styling ($125 per person). We recommend booking well in advance for wedding services.',
  },
  {
    question: 'What parking is available?',
    answer: 'We have convenient street parking available on Madison Street and surrounding streets. There is also a parking lot nearby for additional options.',
  },
  {
    question: 'What is a Brazilian Blowout?',
    answer: 'A Brazilian Blowout is a professional smoothing treatment that eliminates frizz and creates silky, smooth hair that lasts for months. It\'s perfect for managing unruly hair while maintaining your natural texture.',
  },
]

// ============================================
// STATS (for display on pages)
// ============================================
export const stats = [
  { number: '15+', label: 'Years Experience' },
  { number: '100s', label: 'Happy Clients' },
  { number: '5★', label: 'Google Rating' },
]

export const reviewStats = [
  { value: '5.0', label: 'Rating' },
  { value: '100+', label: 'Reviews' },
  { value: '15+', label: 'Years Experience' },
]

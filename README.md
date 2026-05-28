# Irina Elysian - Premium Hair Design Studio

A stunning, SEO-optimized website for a premium hair salon built with **Next.js 16.1**, **React 19**, and **Tailwind CSS**.

![Irina Elysian](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)

## ✨ Features

- **8 Fully Designed Pages**: Home, Services, About, Gallery, Team, Testimonials, Contact, Booking
- **SEO Optimized**: Full metadata, Open Graph, Twitter cards, structured data ready
- **Custom Design System**: Emerald & gold color palette with 4 typography families
- **Multi-step Booking Wizard**: Interactive appointment booking flow
- **Responsive Design**: Mobile-first approach, works on all devices
- **Performance Optimized**: Turbopack, image optimization, code splitting
- **Accessibility Ready**: Semantic HTML, proper contrast ratios

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone or download the project
cd irina-elysian-nextjs

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server with Turbopack
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
irina-elysian-nextjs/
├── app/
│   ├── globals.css          # Global styles & Tailwind components
│   ├── layout.tsx           # Root layout with SEO metadata
│   ├── page.tsx             # Home page
│   ├── services/
│   │   └── page.tsx         # Services page
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── gallery/
│   │   └── page.tsx         # Gallery page
│   ├── team/
│   │   └── page.tsx         # Team page
│   ├── testimonials/
│   │   └── page.tsx         # Testimonials page
│   ├── contact/
│   │   └── page.tsx         # Contact page
│   └── booking/
│       └── page.tsx         # Booking wizard page
├── components/
│   ├── Navigation.tsx       # Header & navigation
│   └── Footer.tsx           # Footer component
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration with custom theme
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Emerald Deep | `#0A3D2E` | Primary brand color |
| Emerald Rich | `#0D5740` | Gradients, accents |
| Gold Primary | `#C9A227` | CTAs, highlights |
| Gold Champagne | `#F0E6C8` | Backgrounds |
| Cream | `#FAF8F3` | Page background |
| Pearl | `#F5F1E8` | Card backgrounds |

### Typography

| Font | Usage |
|------|-------|
| Playfair Display | Display text, logos |
| Cormorant Garamond | Headings |
| Raleway | Body text |
| Montserrat | UI elements, labels |

### Components

Pre-built Tailwind components in `globals.css`:

- `.btn-primary` - Gold gradient button
- `.btn-secondary` - Emerald outline button
- `.card` - White card with shadow
- `.form-input` - Styled form inputs
- `.section-label` - Gold uppercase labels
- `.badge-emerald` / `.badge-gold` - Tag badges

## 🔧 Customization

## 📬 Booking & Contact Intake

The booking and contact forms are wired to real server endpoints:

- `POST /api/booking`
- `POST /api/contact`
- `/admin` for reviewing requests on mobile

For production, copy `.env.example` to `.env.local` and configure:

- `RESEND_API_KEY`, `RESEND_FROM`, `SALON_INTAKE_EMAIL` for email alerts. Use commas for multiple inboxes, e.g. `hello@irina-elysian.com,manager@gmail.com`.
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` for saved requests
- `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET` for one private admin login
- `ADMIN_USERS` for multiple admins, using `username=passwordHash,username2=passwordHash`

Generate a safe admin password hash:

```bash
pnpm hash:admin-password "replace-with-a-strong-password"
```

Generate a hash with a ready-to-copy multi-admin entry:

```bash
pnpm hash:admin-password "replace-with-irina-password" irina
pnpm hash:admin-password "replace-with-manager-password" manager
```

Then set:

```bash
ADMIN_USERS="irina=scrypt:...hash...,manager=scrypt:...hash..."
```

Generate a session secret:

```bash
openssl rand -base64 32
```

Create these Supabase tables:

```sql
create table booking_requests (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'booking',
  status text not null default 'new',
  service text not null,
  stylist text not null,
  date text not null,
  time text not null,
  name text not null,
  phone text not null,
  email text not null,
  notes text,
  source text,
  created_at timestamptz not null default now()
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'contact',
  status text not null default 'new',
  name text not null,
  phone text,
  email text not null,
  message text not null,
  source text,
  created_at timestamptz not null default now()
);

create table site_settings (
  id text primary key default 'default',
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
```

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  emerald: {
    deep: '#YOUR_COLOR',
    // ...
  },
  gold: {
    primary: '#YOUR_COLOR',
    // ...
  },
}
```

### Adding Pages

1. Create folder in `app/` directory
2. Add `page.tsx` with your content
3. Export metadata for SEO
4. Add link to Navigation component

### Fonts

Fonts are loaded via Google Fonts in `globals.css`. To change:

1. Update the `@import` URL
2. Modify `fontFamily` in `tailwind.config.ts`

## 📱 Responsive Breakpoints

| Breakpoint | Width |
|------------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The project works with any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Docker

## 📄 License

This project is created for client delivery. All rights reserved.

---

Built with ❤️ using the Irina Elysian Design System

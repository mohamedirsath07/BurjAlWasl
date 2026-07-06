# Folder Structure

## Root Layout

```
burjalwasl/
├── app/                          # ← PRESERVED: Existing Vite prototype (reference only)
├── architecture/                 # ← Architecture documentation (this directory)
│
├── src/                          # ← Next.js App Router source root
│   ├── app/                      # Pages & API routes
│   ├── components/               # Reusable UI (atoms/molecules/organisms/shared)
│   ├── features/                 # Feature-based domain modules
│   ├── hooks/                    # Global custom hooks
│   ├── lib/                      # Library integrations, utils, configs
│   ├── store/                    # Zustand state stores
│   ├── types/                    # Global TypeScript type definitions
│   ├── data/                     # Static content & copy data
│   └── styles/                   # Design system CSS files
│
├── public/                       # Static assets (images, videos, icons, fonts)
├── scripts/                      # Build & utility scripts
└── [config files]                # next.config.ts, tailwind, tsconfig, etc.
```

## Detailed Breakdown

### `src/app/` — Pages (Next.js App Router)

```
app/
├── layout.tsx                    # Root layout: <html>, fonts, metadata, providers
├── page.tsx                      # Homepage
├── loading.tsx                   # Global loading skeleton
├── not-found.tsx                 # Custom 404 page
├── error.tsx                     # Global error boundary
├── globals.css                   # Tailwind directives + global styles
│
├── about/
│   └── page.tsx                  # Company story, values, team
│
├── collections/
│   ├── page.tsx                  # Collections gallery grid
│   └── [slug]/
│       └── page.tsx              # Individual collection detail
│
├── projects/
│   ├── page.tsx                  # Project portfolio with filters
│   └── [slug]/
│       └── page.tsx              # Project case study + gallery
│
├── services/
│   ├── page.tsx                  # All services overview
│   └── [slug]/
│       └── page.tsx              # Individual service detail
│
├── process/
│   └── page.tsx                  # How we work / our process
│
├── contact/
│   └── page.tsx                  # Contact form + map + info
│
├── blog/
│   ├── page.tsx                  # Blog/insights listing
│   └── [slug]/
│       └── page.tsx              # Individual blog post
│
└── api/
    ├── contact/
    │   └── route.ts              # POST: Contact form handler
    └── revalidate/
        └── route.ts              # POST: ISR revalidation webhook
```

### `src/components/` — UI Component Library

```
components/
├── atoms/                        # Smallest building blocks
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   └── index.ts
│   ├── Badge/
│   ├── Heading/
│   ├── Text/
│   ├── Icon/
│   ├── Logo/
│   ├── Divider/
│   ├── Skeleton/
│   └── index.ts                  # Barrel export for all atoms
│
├── molecules/                    # Composed atoms
│   ├── NavLink/
│   ├── SectionHeader/
│   ├── StatCard/
│   ├── TestimonialCard/
│   ├── ProjectCard/
│   ├── ServiceCard/
│   ├── ContactInfo/
│   ├── SocialLinks/
│   ├── FormField/
│   └── index.ts
│
├── organisms/                    # Full page sections
│   ├── Navbar/
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Navbar.types.ts
│   │   └── index.ts
│   ├── Hero/
│   ├── Footer/
│   ├── VideoShowcase/
│   ├── ExpertiseSection/
│   ├── CollectionsGrid/
│   ├── ProcessTimeline/
│   ├── TestimonialsCarousel/
│   ├── ContactForm/
│   ├── CTABanner/
│   └── index.ts
│
└── shared/                       # Cross-cutting UX components
    ├── CustomCursor/
    ├── PageTransition/
    ├── ScrollProgress/
    ├── BackToTop/
    ├── MagneticElement/
    ├── ParallaxImage/
    ├── RevealOnScroll/
    ├── SmoothScroll/
    └── index.ts
```

### `src/features/` — Domain Modules

```
features/
├── booking/
│   ├── components/               # Booking-specific components
│   ├── hooks/                    # useBookingForm, useAvailableSlots
│   ├── utils/                    # Date formatting, validation
│   ├── types.ts                  # BookingFormData, TimeSlot, etc.
│   └── index.ts
│
├── gallery/
│   ├── components/               # GalleryGrid, Lightbox, ImageZoom
│   ├── hooks/                    # useGalleryFilters, useLightbox
│   ├── utils/                    # Image preloading, grid calculations
│   ├── types.ts
│   └── index.ts
│
└── newsletter/
    ├── components/               # NewsletterForm, SuccessMessage
    ├── hooks/                    # useNewsletterSubscription
    ├── utils/
    ├── types.ts
    └── index.ts
```

### `src/lib/` — Libraries & Utilities

```
lib/
├── api/
│   ├── client.ts                 # Typed fetch wrapper
│   └── endpoints.ts              # API endpoint constants
│
├── animations/
│   ├── gsap.ts                   # GSAP registration & default config
│   ├── variants.ts               # Framer Motion variant library
│   ├── timelines.ts              # GSAP timeline factory functions
│   └── easings.ts                # Custom easing curves
│
├── seo/
│   ├── metadata.ts               # Page metadata factory
│   ├── jsonLd.ts                 # JSON-LD schema generators
│   └── sitemap.ts                # Sitemap configuration
│
├── fonts.ts                      # next/font configuration
├── cn.ts                         # clsx + tailwind-merge utility
└── constants.ts                  # Global constants (SITE_URL, etc.)
```

### `public/` — Static Assets

```
public/
├── images/
│   ├── hero/                     # Hero section backgrounds
│   ├── collections/              # Product collections
│   ├── projects/                 # Project case study photos
│   ├── team/                     # Team member portraits
│   ├── backgrounds/              # Patterns, gradients, textures
│   └── testimonials/             # Client photos
│
├── videos/
│   ├── hero-reel.mp4
│   └── poster-hero.webp          # Video poster frames
│
├── icons/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   └── safari-pinned-tab.svg
│
├── fonts/                        # Self-hosted fallback fonts only
├── og/                           # Open Graph images (1200x630)
├── robots.txt
├── sitemap.xml
└── manifest.json
```

## Key Principles

1. **Colocation** — Types, tests, and styles live next to their component.
2. **Barrel exports** — Each directory has an `index.ts` for clean imports.
3. **Feature isolation** — Domain logic never leaks into `components/`.
4. **No deep imports** — Import from barrel files: `@/components/atoms`, not `@/components/atoms/Button/Button`.
5. **Path aliases** — Use `@/` prefix mapped to `src/` in `tsconfig.json`.

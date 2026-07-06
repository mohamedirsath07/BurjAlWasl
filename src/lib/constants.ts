// =============================================================================
// Burj Al Wasl — Global Constants
// =============================================================================

// ── Site ──

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://burjalwasl.ae';
export const SITE_NAME = 'Burj Al Wasl';
export const SITE_TAGLINE = 'Premium Window Treatments Dubai';
export const SITE_DESCRIPTION =
  'International standard premium window treatments, curtains, and blinds. Bespoke solutions for luxury residences and commercial spaces across the UAE.';

// ── Brand Colors ──

export const BRAND_COLORS = {
  navy: '#0f2a4a',
  azure: '#1e81b0',
  slate: '#64748b',
  cream: '#f8f9fa',
  white: '#ffffff',
} as const;

// ── Company Info ──

export const COMPANY_INFO = {
  legalName: 'Burj Al Wasl Trading L.L.C',
  shortName: 'Burj Al Wasl',
  phone: '+971 50 123 4567',
  email: 'info@burjdubaicurtains.ae',
  whatsapp: '+971501234567',
  address: {
    street: 'Business Bay',
    city: 'Dubai',
    region: 'Dubai',
    country: 'United Arab Emirates',
    countryCode: 'AE',
  },
  coordinates: {
    latitude: 25.1857,
    longitude: 55.2614,
  },
  social: {
    instagram: 'https://instagram.com/burjalwasl',
    linkedin: 'https://linkedin.com/company/burjalwasl',
    facebook: 'https://facebook.com/burjalwasl',
  },
} as const;

// ── Breakpoints (match Tailwind) ──

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

// ── Animation ──

export const SCROLL_THRESHOLD = 50;
export const ANIMATION_DURATION = {
  fast: 300,
  normal: 600,
  slow: 1000,
  reveal: 1200,
} as const;

// ── SEO Defaults ──

export const DEFAULT_OG_IMAGE = '/og/default.jpg';
export const DEFAULT_LOCALE = 'en_AE';

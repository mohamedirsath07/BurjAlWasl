# SEO Architecture

## Strategy Overview

As an international agency website, SEO is critical for discoverability. Our strategy combines:

1. **Technical SEO** — Server-side rendering, structured data, semantic HTML
2. **On-Page SEO** — Metadata, headings, internal linking, image alt text
3. **Performance SEO** — Core Web Vitals optimization (LCP, FID, CLS)
4. **Local SEO** — Google Business Profile integration, local schema markup

## Metadata System

### Factory Function

Every page uses a centralized metadata factory for consistency:

```typescript
// lib/seo/metadata.ts
import { type Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://burjalwasl.ae';
const SITE_NAME = 'Burj Al Wasl';
const DEFAULT_DESCRIPTION = 'International standard premium window treatments, curtains, and blinds. Bespoke solutions for luxury residences and commercial spaces across the UAE.';
const DEFAULT_OG_IMAGE = '/og/default.jpg';

interface PageMetaOptions {
  title: string;
  description?: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function createPageMetadata(options: PageMetaOptions): Metadata {
  const description = options.description || DEFAULT_DESCRIPTION;

  return {
    title: options.title,
    description,
    alternates: {
      canonical: `${SITE_URL}${options.path}`,
    },
    openGraph: {
      title: options.title,
      description,
      url: `${SITE_URL}${options.path}`,
      siteName: SITE_NAME,
      images: [
        {
          url: options.ogImage || DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ],
      locale: 'en_AE',
      type: options.type || 'website',
      ...(options.publishedTime && { publishedTime: options.publishedTime }),
      ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description,
      images: [options.ogImage || DEFAULT_OG_IMAGE],
    },
    robots: {
      index: !options.noIndex,
      follow: true,
      googleBot: {
        index: !options.noIndex,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```

### Root Layout Metadata Template

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Burj Al Wasl | Premium Window Treatments Dubai',
    template: '%s | Burj Al Wasl',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'premium curtains dubai',
    'luxury window treatments uae',
    'motorized blinds dubai',
    'bespoke curtains business bay',
    'commercial window solutions',
    'interior design dubai',
  ],
  authors: [{ name: 'Burj Al Wasl Trading L.L.C' }],
  creator: 'Burj Al Wasl',
  publisher: 'Burj Al Wasl Trading L.L.C',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
```

### Per-Page Metadata Examples

```typescript
// app/collections/page.tsx
export const metadata = createPageMetadata({
  title: 'Premium Collections',
  description: 'Explore our curated collection of premium fabrics, sheer curtains, blackout solutions, and motorized window treatments.',
  path: '/collections',
  ogImage: '/og/collections.jpg',
});

// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${params.slug}`,
    ogImage: post.ogImage,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}
```

## Structured Data (JSON-LD)

### Organization Schema

```typescript
// lib/seo/jsonLd.ts
import { type WithContext, type Organization, type LocalBusiness, type Product, type BreadcrumbList, type WebSite } from 'schema-dml';

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Burj Al Wasl Trading L.L.C',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Business Bay',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+971-50-123-4567',
      contactType: 'sales',
      areaServed: 'AE',
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
      'https://instagram.com/burjalwasl',
      'https://linkedin.com/company/burjalwasl',
      'https://facebook.com/burjalwasl',
    ],
  };
}
```

### Local Business Schema

```typescript
export function generateLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Burj Al Wasl Trading L.L.C',
    image: `${SITE_URL}/images/storefront.jpg`,
    url: SITE_URL,
    telephone: '+971501234567',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Business Bay',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1857,
      longitude: 55.2614,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
  };
}
```

### Breadcrumb Schema

```typescript
export function generateBreadcrumbSchema(
  items: Array<{ name: string; href: string }>
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
```

### Product Schema (for Collections)

```typescript
export function generateProductSchema(collection: CollectionData): WithContext<Product> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: collection.name,
    description: collection.description,
    image: collection.images.map((img) => `${SITE_URL}${img}`),
    brand: {
      '@type': 'Brand',
      name: 'Burj Al Wasl',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'AED',
      seller: {
        '@type': 'Organization',
        name: 'Burj Al Wasl Trading L.L.C',
      },
    },
  };
}
```

### Injecting JSON-LD

```typescript
// In any page or layout:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(generateOrganizationSchema()),
  }}
/>
```

## Sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '', '/about', '/collections', '/projects',
    '/services', '/process', '/contact', '/blog',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const collections = await getCollections();
  const collectionPages = collections.map((c) => ({
    url: `${SITE_URL}/collections/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // ... projects, blog posts, etc.

  return [...staticPages, ...collectionPages];
}
```

## Robots

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

## Semantic HTML Checklist

- [ ] Single `<h1>` per page
- [ ] Proper heading hierarchy (`h1` → `h2` → `h3`, no skipping)
- [ ] `<main>` element wrapping page content
- [ ] `<nav>` for navigation
- [ ] `<article>` for blog posts
- [ ] `<section>` with accessible names for page sections
- [ ] `<footer>` for site footer
- [ ] All images have descriptive `alt` text
- [ ] All interactive elements have unique `id` attributes
- [ ] Proper `<a>` vs `<button>` usage (navigation vs actions)

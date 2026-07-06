# Routing — Next.js App Router

## Route Map

| Route | Page | Rendering | Description |
|-------|------|-----------|-------------|
| `/` | Homepage | Static (ISR 60s) | Hero + Expertise + Video + Collections preview + CTA |
| `/about` | About | Static | Company story, values, team |
| `/collections` | Collections | Static (ISR 60s) | Fabric/product collections grid |
| `/collections/[slug]` | Collection Detail | Dynamic (ISR 300s) | Individual collection showcase |
| `/projects` | Projects | Static (ISR 60s) | Project portfolio grid with filters |
| `/projects/[slug]` | Project Detail | Dynamic (ISR 300s) | Case study with full gallery |
| `/services` | Services | Static | All services overview |
| `/services/[slug]` | Service Detail | Dynamic | Individual service page |
| `/process` | Process | Static | How we work / our process |
| `/contact` | Contact | Static | Contact form + map + info |
| `/blog` | Blog | Static (ISR 60s) | Articles / insights grid |
| `/blog/[slug]` | Blog Post | Dynamic (ISR 300s) | Individual article |

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | POST | Contact form submission handler |
| `/api/revalidate` | POST | ISR on-demand revalidation webhook |

## Navigation Data

```typescript
// src/data/navigation.ts
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { label: 'Expertise', href: '/services' },
  { label: 'Collections', href: '/collections' },
  { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNavigation = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Process', href: '/process' },
    { label: 'Blog', href: '/blog' },
  ],
  services: [
    { label: 'Residential', href: '/services/residential' },
    { label: 'Commercial', href: '/services/commercial' },
    { label: 'Motorized Systems', href: '/services/motorized' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;
```

## Layout Hierarchy

```
layout.tsx (Root)
├── Fonts (Inter + Playfair Display)
├── Global metadata
├── Analytics scripts
├── <CustomCursor />
├── <SmoothScroll>
│   ├── <Navbar />
│   ├── <PageTransition>
│   │   ├── {children}              ← Page content
│   ├── </PageTransition>
│   ├── <Footer />
│   ├── <BackToTop />
│   └── <ScrollProgress />
├── </SmoothScroll>
└── <Toaster />                     ← Toast notifications
```

## Dynamic Route Configuration

### `generateStaticParams`

For dynamic routes, we pre-generate paths at build time:

```typescript
// app/collections/[slug]/page.tsx
export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}
```

### ISR (Incremental Static Regeneration)

```typescript
// app/collections/page.tsx
export const revalidate = 60;  // Revalidate every 60 seconds

// app/collections/[slug]/page.tsx
export const revalidate = 300; // Revalidate every 5 minutes
```

### On-Demand Revalidation

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { path, tag, secret } = await request.json();

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  if (tag) revalidateTag(tag);
  if (path) revalidatePath(path);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
```

## Loading & Error States

```
app/
├── loading.tsx         # Global loading skeleton
├── not-found.tsx       # Custom 404 with brand styling
├── error.tsx           # Global error boundary with retry
│
├── collections/
│   ├── loading.tsx     # Collections-specific skeleton
│   └── [slug]/
│       ├── loading.tsx # Collection detail skeleton
│       └── error.tsx   # Collection-specific error
```

Each `loading.tsx` renders a `<Skeleton>` layout matching the page structure for a smooth perceived loading experience.

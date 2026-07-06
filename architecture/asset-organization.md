# Asset Organization

## Directory Structure

```
public/
├── images/
│   ├── hero/
│   │   ├── hero-main.webp              # 1920x1080 — primary hero
│   │   ├── hero-main-mobile.webp       # 768x1024 — mobile hero
│   │   └── hero-overlay.webp           # Overlay gradient/texture
│   │
│   ├── collections/
│   │   ├── sheers/
│   │   │   ├── sheer-linen-01.webp
│   │   │   └── sheer-linen-02.webp
│   │   ├── blackout/
│   │   ├── motorized/
│   │   └── luxury/
│   │
│   ├── projects/
│   │   ├── palm-jumeirah-villa/
│   │   │   ├── cover.webp             # 1200x800 card thumbnail
│   │   │   ├── gallery-01.webp        # 1920x1280 full resolution
│   │   │   ├── gallery-02.webp
│   │   │   └── gallery-03.webp
│   │   ├── downtown-penthouse/
│   │   └── difc-office/
│   │
│   ├── team/
│   │   ├── founder.webp               # 400x400 portrait
│   │   └── designer.webp
│   │
│   ├── backgrounds/
│   │   ├── pattern-arabesque.svg      # Subtle brand pattern overlay
│   │   ├── gradient-mesh.webp         # Decorative gradient
│   │   └── noise-texture.png          # Subtle noise overlay
│   │
│   └── testimonials/
│       ├── client-01.webp             # 100x100 avatar
│       └── client-02.webp
│
├── videos/
│   ├── hero-reel.mp4                  # 1080p, <15MB, H.264
│   ├── motorized-demo.mp4            # Product demo video
│   ├── poster-hero.webp              # Video poster frame
│   └── poster-motorized.webp
│
├── icons/
│   ├── favicon.ico                    # 32x32 multi-size
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png          # 180x180
│   ├── icon-192.png                  # PWA icon
│   ├── icon-512.png                  # PWA splash
│   └── safari-pinned-tab.svg         # Safari pin color
│
├── fonts/
│   └── (self-hosted fallbacks only)
│
├── og/
│   ├── default.jpg                    # 1200x630 — fallback OG image
│   ├── collections.jpg
│   ├── projects.jpg
│   ├── contact.jpg
│   └── blog.jpg
│
├── robots.txt
├── sitemap.xml                        # Generated via app/sitemap.ts
└── manifest.json
```

## Image Standards

### Format Priority

1. **WebP** — Primary format for all raster images (90% quality)
2. **AVIF** — Next.js `<Image>` auto-serves when browser supports
3. **SVG** — Icons, logos, patterns, simple illustrations
4. **PNG** — Only for images requiring true transparency
5. **JPEG** — Only as fallback for legacy formats

### Size Guidelines

| Use Case | Max Width | Max File Size | Format |
|----------|----------|---------------|--------|
| Hero background | 1920px | 200KB | WebP |
| Hero mobile | 768px | 100KB | WebP |
| Project gallery | 1920px | 150KB | WebP |
| Card thumbnail | 800px | 80KB | WebP |
| Avatar | 200px | 15KB | WebP |
| OG Image | 1200x630 | 100KB | JPEG |
| Logo | Variable | 10KB | SVG |
| Pattern/texture | Variable | 20KB | SVG/PNG |

### Next.js `<Image>` Usage

```typescript
import Image from 'next/image';

// ✅ Hero (above the fold) — priority loading
<Image
  src="/images/hero/hero-main.webp"
  alt="Luxury curtains in a Dubai penthouse living room"
  width={1920}
  height={1080}
  priority
  placeholder="blur"
  blurDataURL="data:image/webp;base64,..."
  sizes="100vw"
  className="object-cover"
/>

// ✅ Gallery image — lazy loaded with responsive sizes
<Image
  src={`/images/projects/${slug}/gallery-01.webp`}
  alt={altText}
  width={1920}
  height={1280}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={blurDataURL}
/>

// ✅ Avatar — small fixed size
<Image
  src="/images/testimonials/client-01.webp"
  alt="Sarah Ahmed"
  width={100}
  height={100}
  className="rounded-full"
/>
```

## Video Standards

| Property | Requirement |
|----------|------------|
| Format | H.264 MP4 |
| Resolution | 1080p max |
| File size | <15MB per video |
| Poster frame | Required (WebP) |
| Autoplay | `muted` + `playsInline` required |
| Captions | WebVTT file for accessible content |

```typescript
<video
  autoPlay
  loop
  muted
  playsInline
  poster="/videos/poster-hero.webp"
  className="w-full h-full object-cover"
>
  <source src="/videos/hero-reel.mp4" type="video/mp4" />
  <track kind="captions" src="/videos/hero-reel.vtt" srclang="en" label="English" />
</video>
```

## Font Strategy

Primary fonts loaded via `next/font` (zero layout shift):

```typescript
// lib/fonts.ts
import { Inter, Playfair_Display } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700'],
});
```

## PWA Manifest

```json
{
  "name": "Burj Al Wasl",
  "short_name": "BurjAlWasl",
  "description": "Premium Window Treatments Dubai",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0f2a4a",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

## Naming Conventions for Assets

```
# Images
hero-main.webp                    # Descriptive, kebab-case
collection-sheer-linen-01.webp   # Category prefix + number
project-palm-villa-cover.webp    # Context + role suffix
team-ahmed-founder.webp           # Category + name + role

# Videos
hero-reel.mp4                     # Section + type
motorized-demo.mp4                # Feature + type
poster-hero.webp                  # "poster-" prefix for video frames

# OG Images
default.jpg                       # Fallback
collections.jpg                   # Page-specific, matching route name
```

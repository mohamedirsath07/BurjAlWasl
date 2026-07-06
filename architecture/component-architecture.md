# Component Architecture

## Design Philosophy: Atomic Design (Adapted)

We use a 4-tier component hierarchy inspired by Brad Frost's Atomic Design, adapted for React + Next.js:

| Layer | Purpose | Examples | Default Rendering |
|-------|---------|----------|-------------------|
| **Atoms** | Single-purpose, stateless UI primitives | `Button`, `Heading`, `Text`, `Badge`, `Icon` | Client |
| **Molecules** | Composite atoms with minimal logic | `NavLink`, `SectionHeader`, `ProjectCard` | Client |
| **Organisms** | Full sections with state & data binding | `Navbar`, `Hero`, `Footer`, `ContactForm` | Server or Client |
| **Shared** | Cross-cutting UX/animation components | `CustomCursor`, `PageTransition`, `ParallaxImage` | Client |

---

## Component Contract

Every component follows a consistent folder structure:

```
ComponentName/
├── ComponentName.tsx        # Implementation
├── ComponentName.types.ts   # Props interface + variant types
└── index.ts                 # Named + default barrel export
```

### Rules

1. **One component per file** — No colocating multiple components in one `.tsx`.
2. **Named exports** — Always use named exports, never default exports.
3. **Types colocated** — Props interfaces live in `.types.ts`, not inline.
4. **Barrel exports** — Every `index.ts` re-exports everything from the folder.
5. **No business logic** — Components render UI; logic lives in hooks or features.

---

## Atoms

### `Button`

The most-used atom. Supports multiple variants, magnetic hover, and polymorphic rendering (button vs link).

```typescript
// Button.types.ts
import { type ComponentPropsWithRef, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Enable magnetic cursor attraction on hover */
  magnetic?: boolean;
  /** Icon element to render alongside text */
  icon?: ReactNode;
  /** Icon placement relative to text */
  iconPosition?: 'left' | 'right';
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Stretch to full container width */
  fullWidth?: boolean;
  /** When provided, renders as Next.js <Link> */
  href?: string;
  /** Mark link as external (adds target="_blank" + rel) */
  external?: boolean;
}
```

**Variant Styling (Design Tokens)**:

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | `--color-navy` | `white` | none | `--color-azure` bg |
| `secondary` | `white` | `--color-navy` | `--color-navy/20` | `--color-azure` border |
| `ghost` | transparent | `--color-navy` | none | `--color-navy/5` bg |
| `outline` | transparent | `--color-azure` | `--color-azure` | `--color-azure` bg, white text |

### `Heading`

Semantic heading with design system typography.

```typescript
// Heading.types.ts
export interface HeadingProps {
  /** HTML heading level */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Visual size (decoupled from semantic level) */
  size?: 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  /** Text color */
  color?: 'navy' | 'azure' | 'slate' | 'white';
  /** Font weight override */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  /** Enable text gradient */
  gradient?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

### `Text`

Body text with design system typography.

```typescript
// Text.types.ts
export interface TextProps {
  as?: 'p' | 'span' | 'div' | 'label';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  color?: 'navy' | 'slate' | 'muted' | 'azure' | 'white';
  weight?: 'light' | 'normal' | 'medium' | 'semibold';
  leading?: 'tight' | 'normal' | 'relaxed';
  children: React.ReactNode;
  className?: string;
}
```

### Other Atoms

| Atom | Purpose | Key Props |
|------|---------|-----------|
| `Badge` | Label/tag element | `variant`, `size`, `icon` |
| `Icon` | SVG icon wrapper with consistent sizing | `name`, `size`, `color` |
| `Logo` | Brand logo with responsive variants | `variant: 'full' \| 'mark'`, `theme: 'light' \| 'dark'` |
| `Divider` | Horizontal/vertical separator | `orientation`, `decorative` |
| `Skeleton` | Loading placeholder | `width`, `height`, `rounded` |

---

## Molecules

### `SectionHeader`

Reusable section heading pattern (eyebrow + title + subtitle).

```typescript
// SectionHeader.types.ts
export interface SectionHeaderProps {
  /** Small uppercase label above heading */
  eyebrow?: string;
  /** Main heading text */
  title: string;
  /** Supporting description */
  subtitle?: string;
  /** Text alignment */
  alignment?: 'left' | 'center';
  /** Enable scroll reveal animation */
  animate?: boolean;
  className?: string;
}
```

### `ProjectCard`

Card component for project portfolio grid.

```typescript
// ProjectCard.types.ts
export interface ProjectCardProps {
  /** Project title */
  title: string;
  /** Project category (e.g., "Residential", "Commercial") */
  category: string;
  /** Cover image URL */
  image: string;
  /** Project detail page slug */
  slug: string;
  /** Optional aspect ratio */
  aspectRatio?: '4/3' | '3/4' | '16/9' | '1/1';
}
```

### Other Molecules

| Molecule | Purpose |
|----------|---------|
| `NavLink` | Navigation link with animated underline |
| `StatCard` | Statistic display (number + label) |
| `TestimonialCard` | Client testimonial with avatar |
| `ServiceCard` | Service overview card with icon |
| `ContactInfo` | Contact detail row (icon + text + link) |
| `SocialLinks` | Social media icon row |
| `FormField` | Label + input + error message wrapper |

---

## Organisms

### `Navbar`

The navigation bar is the most complex organism, handling:

- Desktop: Horizontal link row + CTA button
- Mobile: Full-screen overlay with clip-path animation
- Scroll: Background transition (transparent → frosted glass)
- State: Connected to `useUIStore` for scroll lock coordination

```typescript
// Navbar.types.ts
export interface NavbarProps {
  /** Show/hide the CTA button */
  showCTA?: boolean;
  /** Override the CTA text */
  ctaText?: string;
  /** Override the CTA link */
  ctaHref?: string;
}
```

**Internal Components**:
- `Navbar.tsx` — Desktop layout, scroll detection
- `MobileMenu.tsx` — Full-screen overlay with staggered link reveals

### `Hero`

The hero section orchestrates multiple animation layers:

- Text reveal (line-by-line with clip + transform)
- Image reveal (clip-path polygon animation)
- Parallax scrolling on background image
- Floating accent card animation

### `Footer`

Server component (no interactivity) with:
- Brand column (logo + description + social)
- Location column
- Contact column
- CTA column
- Bottom bar (copyright + legal links)

### Other Organisms

| Organism | Key Complexity |
|----------|---------------|
| `VideoShowcase` | Scroll-expanding video with play/pause, GSAP ScrollTrigger |
| `ExpertiseSection` | Alternating layout (image left/right), parallax, numbered sections |
| `CollectionsGrid` | Responsive masonry grid with hover effects |
| `ProcessTimeline` | Horizontal scroll or vertical stepped timeline |
| `TestimonialsCarousel` | Auto-playing carousel with drag gesture |
| `ContactForm` | Multi-field form with validation + API submission |
| `CTABanner` | Full-width call-to-action with background image |

---

## Shared Components

These are cross-cutting UX components used throughout the application:

| Component | Purpose | Key Tech |
|-----------|---------|----------|
| `CustomCursor` | Custom cursor with hover state changes | `useRef`, `mousemove` event |
| `PageTransition` | Animate route changes | Framer Motion `AnimatePresence` |
| `ScrollProgress` | Top progress bar during scroll | `useScrollProgress` hook |
| `BackToTop` | Floating button to scroll to top | `IntersectionObserver` |
| `MagneticElement` | Wrapper that adds magnetic hover to any element | Mouse position math |
| `ParallaxImage` | Image with parallax scroll effect | GSAP ScrollTrigger or CSS |
| `RevealOnScroll` | Generic scroll reveal wrapper | `useScrollReveal` hook |
| `SmoothScroll` | Lenis smooth scroll provider | Lenis library |

---

## Server vs Client Component Matrix

| Component | Type | Rationale |
|-----------|------|-----------|
| `layout.tsx` | **Server** | Static shell, no interactivity |
| All `page.tsx` | **Server** | SEO-critical, static content |
| `Footer` | **Server** | No interactive state |
| `Navbar` | **Client** | Scroll detection, mobile menu toggle |
| `Hero` | **Client** | Parallax, animations, scroll listeners |
| `Button` (with magnetic) | **Client** | Mouse tracking interaction |
| `ProjectCard` | **Client** | Hover animations |
| `ContactForm` | **Client** | Form state, validation, submission |
| `CustomCursor` | **Client** | Global mouse tracking |
| `VideoShowcase` | **Client** | Video controls, scroll-driven resize |
| `SectionHeader` (animated) | **Client** | Scroll reveal |
| `SectionHeader` (static) | **Server** | No animation needed |

### Import Pattern

```typescript
// In a Server Component page:
import { SectionHeader } from '@/components/molecules';  // Server-safe version
import { Hero } from '@/components/organisms';            // 'use client' internally

// The 'use client' boundary is at the component level, not the import level.
```

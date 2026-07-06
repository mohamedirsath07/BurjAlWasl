# Naming Conventions

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `Button.tsx`, `ProjectCard.tsx` |
| Component types | PascalCase + `.types` | `Button.types.ts` |
| Hooks | camelCase with `use` prefix | `useScrollReveal.ts` |
| Utilities | kebab-case | `format-date.ts`, `cn.ts` |
| Constants | kebab-case (file), SCREAMING_SNAKE (exports) | `constants.ts` → `SITE_URL` |
| Data files | kebab-case | `navigation.ts`, `social-links.ts` |
| Type definition files | kebab-case | `common.ts`, `content.ts` |
| Style files | kebab-case | `design-tokens.css`, `animations.css` |
| Test files | PascalCase + `.test` | `Button.test.tsx` |
| Barrel exports | `index.ts` | `index.ts` |

## Code Naming

### Variables & Functions

```typescript
// ✅ camelCase for variables and functions
const isMenuOpen = false;
const scrollPosition = 0;
function handleNavClick() { ... }
function formatPhoneNumber(phone: string): string { ... }

// ✅ Boolean variables start with is/has/can/should
const isVisible = true;
const hasError = false;
const canSubmit = true;
const shouldAnimate = !prefersReducedMotion;
```

### Components

```typescript
// ✅ PascalCase for component names
export function Navbar() { ... }
export function ProjectCard() { ... }
export function SectionHeader() { ... }
export function VideoShowcase() { ... }

// ✅ Descriptive, no abbreviations
export function TestimonialCard() { ... }  // ✅
export function TestCard() { ... }          // ❌ Ambiguous
```

### Props Interfaces

```typescript
// ✅ ComponentName + "Props" suffix
export interface ButtonProps { ... }
export interface NavbarProps { ... }
export interface SectionHeaderProps { ... }

// ✅ Event handlers: on + EventName
interface FormProps {
  onSubmit: (data: FormData) => void;
  onChange: (field: string, value: string) => void;
  onReset: () => void;
}
```

### Type Aliases & Unions

```typescript
// ✅ PascalCase for types
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ProjectCategory = 'residential' | 'commercial' | 'hospitality';
export type AnimationDirection = 'left' | 'right' | 'up' | 'down';

// ✅ Descriptive over terse
export type ScrollRevealOptions = { ... };   // ✅
export type SROptions = { ... };              // ❌
```

### Constants

```typescript
// ✅ SCREAMING_SNAKE_CASE for constants
export const SITE_URL = 'https://burjalwasl.ae';
export const DEFAULT_OG_IMAGE = '/og/default.jpg';
export const SCROLL_THRESHOLD = 50;
export const ANIMATION_DURATION = 800;

// ✅ Const objects use PascalCase key names or SCREAMING_SNAKE
export const BRAND_COLORS = {
  navy: '#0f2a4a',
  azure: '#1e81b0',
  slate: '#64748b',
  cream: '#f8f9fa',
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;
```

### Hooks

```typescript
// ✅ camelCase with "use" prefix
export function useScrollReveal() { ... }
export function useParallax() { ... }
export function useMagneticEffect() { ... }
export function useMediaQuery() { ... }

// ✅ Return values as named object (not tuple, unless simple)
export function useScrollReveal() {
  return { ref, isVisible } as const;  // ✅ Named
}

export function useToggle(initial: boolean) {
  return [value, toggle] as const;     // ✅ Tuple OK for simple cases
}
```

### Zustand Stores

```typescript
// ✅ "use" prefix + descriptive + "Store" suffix
export const useUIStore = create<UIState>(...);
export const useFormStore = create<FormState>(...);

// ✅ Store interface: descriptive state + action names
interface UIState {
  isMobileMenuOpen: boolean;          // State: is/has prefix
  toggleMobileMenu: () => void;       // Action: verb
  openModal: (id: string) => void;    // Action: verb + noun
  setCursorVariant: (v: string) => void; // Action: set + property
}
```

## CSS Naming

### Design Tokens (CSS Custom Properties)

```css
/* Category prefix → descriptive name */
--color-navy: #0f2a4a;
--color-azure: #1e81b0;
--color-slate: #64748b;
--color-cream: #f8f9fa;

--font-sans: 'Inter', sans-serif;
--font-heading: 'Playfair Display', serif;

--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
--ease-snap: cubic-bezier(0.7, 0, 0.3, 1);

--duration-fast: 300ms;
--duration-normal: 600ms;
--duration-slow: 1000ms;

--spacing-section: 8rem;
--spacing-container: 6rem;

--radius-sm: 0.375rem;
--radius-md: 0.75rem;
--radius-lg: 1rem;
--radius-xl: 1.5rem;
--radius-full: 9999px;

--shadow-sm: 0 1px 3px rgba(15, 42, 74, 0.08);
--shadow-md: 0 4px 12px rgba(15, 42, 74, 0.1);
--shadow-lg: 0 8px 30px rgba(15, 42, 74, 0.12);
--shadow-xl: 0 20px 60px rgba(15, 42, 74, 0.15);
```

### Tailwind Theme Extensions

```typescript
// tailwind.config.ts — extend, don't override
theme: {
  extend: {
    colors: {
      navy: 'var(--color-navy)',
      azure: 'var(--color-azure)',
      cream: 'var(--color-cream)',
    },
    fontFamily: {
      sans: ['var(--font-sans)'],
      heading: ['var(--font-heading)'],
    },
    fontSize: {
      display: ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
    },
  },
}
```

## Git Naming

### Branches

```
feature/navbar-component          # New feature
feature/hero-section
feature/booking-flow
fix/mobile-menu-z-index           # Bug fix
fix/safari-parallax-jitter
chore/eslint-config               # Maintenance
chore/update-dependencies
refactor/animation-system          # Code improvement
style/typography-scale             # Visual changes
perf/image-optimization            # Performance
docs/architecture-readme           # Documentation
```

### Commits (Conventional Commits)

```
feat(navbar): add responsive mobile menu with clip-path animation
feat(hero): implement parallax scroll and text reveal timeline
feat(seo): add organization and local business JSON-LD schemas

fix(mobile-menu): resolve z-index conflict with video overlay
fix(hero): eliminate parallax jitter on Safari iOS

style(tokens): add secondary color palette and shadow scale
style(typography): implement Playfair Display for headings

chore(deps): upgrade gsap to 3.13, framer-motion to 11.x
chore(ci): add Lighthouse CI to GitHub Actions

perf(images): convert all hero assets to WebP with blur placeholders
perf(fonts): self-host Inter subset for faster initial load

docs(readme): add development setup and architecture overview
docs(api): document contact form API route schema

refactor(hooks): extract parallax logic into reusable useParallax hook
refactor(store): split UI store into separate navigation and modal stores

test(button): add visual regression tests for all button variants
```

## Data Attribute Naming (for GSAP targeting)

```typescript
// ✅ Use data-* attributes for animation targets
<div data-hero-line>Elevating</div>
<div data-hero-eyebrow>Premium Interiors</div>
<div data-hero-cta>...</div>
<div data-hero-image>...</div>
<div data-hero-float>...</div>
<div data-section-image>...</div>
<div data-section-content>...</div>
<div data-video-container>...</div>

// Pattern: data-[section]-[element]
```

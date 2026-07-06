# Coding Conventions

## TypeScript Standards

### General Rules

```typescript
// ✅ DO: Use explicit return types on all exported functions
export function formatPrice(amount: number, currency: string = 'AED'): string {
  return new Intl.NumberFormat('en-AE', { style: 'currency', currency }).format(amount);
}

// ✅ DO: Use `interface` for object shapes (extendable)
export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  images: string[];
}

// ✅ DO: Use `type` for unions, intersections, and primitives
export type ProjectCategory = 'residential' | 'commercial' | 'hospitality';
export type WithClassName<T = object> = T & { className?: string };

// ✅ DO: Use const assertions for static lookup objects
export const BRAND_COLORS = {
  navy: '#0f2a4a',
  azure: '#1e81b0',
  slate: '#64748b',
  cream: '#f8f9fa',
} as const;

// ✅ DO: Use `satisfies` for type-safe object literals
const routes = {
  home: '/',
  about: '/about',
  collections: '/collections',
} satisfies Record<string, string>;

// ❌ DON'T: Use `any` — use `unknown` and narrow
// ❌ DON'T: Use `enum` — use union types or const objects
// ❌ DON'T: Use namespace
// ❌ DON'T: Use `!` (non-null assertion) except in strict initialization patterns
```

### Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## React Standards

### Component Declaration

```typescript
// ✅ DO: Use function declarations (hoisted, named in stack traces)
export function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

// ✅ DO: Forward refs for interactive primitives
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, ...props }, ref) {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} {...props} />
        {error && <span role="alert">{error}</span>}
      </div>
    );
  }
);

// ❌ DON'T: Use React.FC (adds implicit children typing)
// ❌ DON'T: Use arrow functions for component exports
// ❌ DON'T: Use default exports for components
```

### Component File Structure

```typescript
// ComponentName.tsx — standard order:

// 1. Imports (external → internal → types → styles)
'use client';  // Only if needed

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/cn';
import { useScrollReveal } from '@/hooks';
import { fadeInUp } from '@/lib/animations/variants';

import type { ButtonProps } from './Button.types';

// 2. Constants (if any)
const ANIMATION_DURATION = 600;

// 3. Component
export function Button({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) {
  // State
  const [isHovered, setIsHovered] = useState(false);

  // Refs
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Hooks
  const { ref, isVisible } = useScrollReveal();

  // Derived state
  const isDisabled = props.disabled || props.loading;

  // Effects
  useEffect(() => {
    // ...
  }, []);

  // Handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    <button
      ref={buttonRef}
      className={cn(
        'base-classes',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={handleClick}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Server vs Client Components

```typescript
// ✅ Default: Server Components (no directive needed)
// app/about/page.tsx
export default function AboutPage() {
  return <main>...</main>;  // Server-rendered, zero JS shipped
}

// ✅ Client: Only when interaction or browser APIs are needed
// components/organisms/Navbar/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
// ...
```

### `'use client'` boundary rules:

1. Add `'use client'` at the **lowest possible level**
2. Never add it to a `page.tsx` or `layout.tsx` unless absolutely necessary
3. Server Components can import Client Components (not vice versa)
4. Pass server data to client components as **serializable props**

## Styling (Tailwind CSS)

### Class Merging

```typescript
// ✅ Always use cn() for conditional/composed classes
import { cn } from '@/lib/cn';

<div className={cn(
  // Base styles
  'flex items-center gap-4 rounded-xl p-6',
  // Conditional styles
  isActive && 'ring-2 ring-azure',
  isDisabled && 'opacity-50 pointer-events-none',
  // Consumer override
  className
)} />
```

### Design Token Usage

```typescript
// ✅ DO: Use design tokens via CSS custom properties
<div className="bg-[var(--color-navy)] text-[var(--color-cream)]" />

// ✅ DO: Use Tailwind's extended theme values
<h1 className="font-heading text-display text-navy" />

// ❌ DON'T: Use arbitrary hex values directly
<div className="bg-[#0f2a4a]" />  // Use token instead

// ❌ DON'T: Use inline styles except for dynamic values
<div style={{ transform: `translateY(${offset}px)` }} />  // OK — dynamic
<div style={{ color: '#0f2a4a' }} />  // BAD — use class
```

### Responsive Design

```typescript
// Mobile-first approach
<div className="
  px-6              // Mobile
  md:px-12          // Tablet
  lg:px-16          // Desktop
  xl:px-20          // Large desktop
" />

// Breakpoints: sm(640) md(768) lg(1024) xl(1280) 2xl(1536)
```

## Import Organization

```typescript
// Order (enforced by ESLint import/order):
// 1. React / Next.js built-ins
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. External packages
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

// 3. Internal aliases (@/ prefix)
import { cn } from '@/lib/cn';
import { useScrollReveal } from '@/hooks';
import { Button, Heading } from '@/components/atoms';

// 4. Relative imports
import { MobileMenu } from './MobileMenu';

// 5. Type imports (always use `import type`)
import type { NavbarProps } from './Navbar.types';

// 6. Styles
import './Navbar.css';  // Component-specific styles (rare)
```

## Error Handling

```typescript
// ✅ API routes: Return typed error responses
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // ... validation & processing
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Contact Form]', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

// ✅ Components: Use error boundaries
// app/error.tsx
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Accessibility Standards

```typescript
// ✅ Interactive elements need accessible labels
<button aria-label="Open navigation menu" onClick={toggleMenu}>
  <MenuIcon />
</button>

// ✅ Form fields need labels
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-describedby="email-error" />
{error && <span id="email-error" role="alert">{error}</span>}

// ✅ Unique IDs for all interactive elements
<button id="nav-toggle" />
<button id="booking-cta" />

// ✅ Proper heading hierarchy (h1 → h2 → h3, no skipping)
// ✅ Focus management for modals (trap focus, return on close)
// ✅ Skip navigation link for keyboard users
```

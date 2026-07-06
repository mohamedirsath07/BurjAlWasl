# Reusable Hooks Reference

## Overview

All hooks live in `src/hooks/` with a barrel export in `src/hooks/index.ts`. Import via `@/hooks`.

```typescript
import { useScrollReveal, useParallax, useMediaQuery } from '@/hooks';
```

---

## `useScrollReveal`

Triggers a visibility flag when an element enters the viewport. Used for scroll-triggered animations.

### Signature

```typescript
function useScrollReveal(options?: ScrollRevealOptions): {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
};

interface ScrollRevealOptions {
  /** Intersection threshold (0-1). Default: 0.1 */
  threshold?: number;
  /** Root margin for earlier/later trigger. Default: '0px 0px -80px 0px' */
  rootMargin?: string;
  /** Trigger only once (stop observing after visible). Default: true */
  once?: boolean;
}
```

### Implementation

```typescript
'use client';
import { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -80px 0px', once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold, rootMargin, once, prefersReduced]);

  return { ref, isVisible } as const;
}
```

### Usage

```typescript
function ExpertiseSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section ref={ref} className={cn('transition-all duration-1000', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12')}>
      ...
    </section>
  );
}
```

---

## `useParallax`

Creates a parallax scroll effect, returning a transform offset value.

### Signature

```typescript
function useParallax(options?: ParallaxOptions): {
  ref: React.RefObject<HTMLElement>;
  offset: number;
};

interface ParallaxOptions {
  /** Speed multiplier. Negative = opposite direction. Default: 0.15 */
  speed?: number;
  /** Axis. Default: 'y' */
  direction?: 'x' | 'y';
}
```

### Usage

```typescript
function HeroImage() {
  const { ref, offset } = useParallax({ speed: 0.15 });

  return (
    <div ref={ref} style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
      <Image src="/images/hero/hero-main.webp" alt="..." fill />
    </div>
  );
}
```

---

## `useMagneticEffect`

Adds magnetic cursor attraction to an element. The element subtly follows the cursor when hovered.

### Signature

```typescript
function useMagneticEffect(options?: MagneticOptions): {
  ref: React.RefObject<HTMLElement>;
  style: React.CSSProperties;
  handlers: {
    onMouseMove: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
  };
};

interface MagneticOptions {
  /** Attraction strength (0-1). Default: 0.3 */
  strength?: number;
  /** How quickly it returns to center (ms). Default: 500 */
  returnSpeed?: number;
}
```

### Usage

```typescript
function MagneticButton({ children }: PropsWithChildren) {
  const { ref, style, handlers } = useMagneticEffect({ strength: 0.3 });

  return (
    <button ref={ref} style={style} {...handlers} className="...">
      {children}
    </button>
  );
}
```

---

## `useMediaQuery`

Reactive media query matching for responsive behavior.

### Signature

```typescript
function useMediaQuery(query: string): boolean;
```

### Usage

```typescript
function Navbar() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return isMobile ? <MobileMenu /> : <DesktopMenu />;
}
```

---

## `useLockScroll`

Locks/unlocks body scroll. Used for modals and mobile menu overlays.

### Signature

```typescript
function useLockScroll(locked: boolean): void;
```

### Implementation

```typescript
export function useLockScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}
```

---

## `useDebounce`

Debounces a rapidly changing value.

### Signature

```typescript
function useDebounce<T>(value: T, delay?: number): T;
```

### Usage

```typescript
function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

---

## `useScrollProgress`

Tracks the scroll progress (0 → 1) of an element through the viewport.

### Signature

```typescript
function useScrollProgress(): {
  ref: React.RefObject<HTMLElement>;
  progress: number;  // 0 when element enters viewport, 1 when it leaves
};
```

### Usage

```typescript
function VideoShowcase() {
  const { ref, progress } = useScrollProgress();
  const borderRadius = Math.max(0, 24 - progress * 24);

  return (
    <div ref={ref} style={{ borderRadius: `${borderRadius}px` }}>
      <video ... />
    </div>
  );
}
```

---

## `usePrefersReducedMotion`

Detects the user's reduced motion preference.

### Signature

```typescript
function usePrefersReducedMotion(): boolean;
```

### Implementation

```typescript
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
```

---

## `useClickOutside`

Detects clicks outside a ref element. Used for dropdowns and modals.

### Signature

```typescript
function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
): void;
```

### Usage

```typescript
function Dropdown({ onClose }: { onClose: () => void }) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, onClose);

  return <div ref={dropdownRef}>...</div>;
}
```

---

## `useLocalStorage`

Persists state to localStorage with SSR safety.

### Signature

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void];
```

---

## `useWindowSize`

Tracks window dimensions with debounce.

### Signature

```typescript
function useWindowSize(debounceMs?: number): {
  width: number;
  height: number;
};
```

---

## `useIntersection`

Generic IntersectionObserver wrapper (more flexible than `useScrollReveal`).

### Signature

```typescript
function useIntersection(
  options?: IntersectionObserverInit
): {
  ref: React.RefObject<HTMLElement>;
  entry: IntersectionObserverEntry | null;
};
```

---

## Hook Barrel Export

```typescript
// hooks/index.ts
export { useScrollReveal } from './useScrollReveal';
export { useParallax } from './useParallax';
export { useMagneticEffect } from './useMagneticEffect';
export { useMediaQuery } from './useMediaQuery';
export { useLockScroll } from './useLockScroll';
export { useIntersection } from './useIntersection';
export { useDebounce } from './useDebounce';
export { useLocalStorage } from './useLocalStorage';
export { useScrollProgress } from './useScrollProgress';
export { usePrefersReducedMotion } from './usePrefersReducedMotion';
export { useClickOutside } from './useClickOutside';
export { useWindowSize } from './useWindowSize';
```

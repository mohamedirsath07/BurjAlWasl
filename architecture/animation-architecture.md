# Animation Architecture

## Technology Stack

| Tool | Use Case | Bundle Impact |
|------|----------|---------------|
| **GSAP 3 + ScrollTrigger** | Scroll-driven animations, parallax, timeline sequences, pinned sections | ~30KB gzipped |
| **Framer Motion 11** | Component mount/unmount, page transitions, layout animations, gestures | ~40KB gzipped (tree-shakeable) |
| **CSS `@keyframes`** | Simple looping animations (shimmer, pulse, spin) | 0KB (native) |
| **CSS `transition`** | Hover states, color changes, simple transforms | 0KB (native) |
| **Lenis** | Smooth scroll behavior | ~5KB gzipped |

### Decision Matrix: GSAP vs Framer Motion vs CSS

| Scenario | Technology | Why |
|----------|-----------|-----|
| Scroll-triggered reveal | GSAP ScrollTrigger | Best scroll integration, pin support |
| Parallax images | GSAP ScrollTrigger | Precise scroll-linked transforms |
| Page route transitions | Framer Motion | `AnimatePresence` handles mount/unmount |
| Stagger children on appear | Framer Motion | `staggerChildren` in variants |
| Hover effect on card | CSS `transition` | No JS overhead needed |
| Loading spinner | CSS `@keyframes` | Simple infinite loop |
| Hero text split reveal | GSAP SplitText | Character/word-level animation |
| Drag-to-dismiss modal | Framer Motion | Built-in gesture support |
| Scroll-expanding video | GSAP ScrollTrigger | Pin + scrub for scroll-linked sizing |

## GSAP Configuration

```typescript
// lib/animations/gsap.ts
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once at app level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Default Configuration ──
gsap.defaults({
  duration: 0.8,
  ease: 'power3.out',
});

// ── Scroll defaults ──
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
  start: 'top 80%',
});

export { gsap, ScrollTrigger };
```

### Custom Easings

```typescript
// lib/animations/easings.ts
export const EASE = {
  /** Smooth deceleration — default for most reveals */
  smooth: 'power3.out',
  /** Sharp snap — for UI interactions */
  snap: 'power4.out',
  /** Elastic — for playful micro-interactions */
  bounce: 'elastic.out(1, 0.5)',
  /** Dramatic reveal — for hero/section intros */
  reveal: 'expo.out',
  /** Cubic bezier — matches Framer Motion default */
  cubic: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const DURATION = {
  /** Micro-interaction (hover, toggle) */
  fast: 0.3,
  /** Standard animation */
  normal: 0.6,
  /** Slow reveal (sections, hero) */
  slow: 1.0,
  /** Dramatic entrance */
  reveal: 1.2,
  /** Page transition */
  pageTransition: 0.8,
} as const;
```

## Framer Motion Variants

```typescript
// lib/animations/variants.ts

// ── Fade In Up (most common) ──
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Stagger Container ──
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ── Scale In (cards, images) ──
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Slide from Left ──
export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Slide from Right ──
export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Clip Reveal (for images) ──
export const clipReveal = {
  hidden: {
    clipPath: 'inset(10% 10% 10% 10%)',
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// ── Page Transition ──
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// ── Mobile Menu Links ──
export const menuLinkStagger = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};
```

## GSAP Timeline Factories

```typescript
// lib/animations/timelines.ts

import { gsap, ScrollTrigger } from './gsap';

/**
 * Hero section entrance timeline.
 * Orchestrates: nav reveal → text lines → CTA → image clip → floating card
 */
export function createHeroTimeline(container: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.from('[data-hero-eyebrow]', { opacity: 0, y: 20, duration: 0.8 }, 0.3)
    .from('[data-hero-line]', { y: '120%', rotateZ: 3, opacity: 0, duration: 1.2, stagger: 0.15 }, 0.5)
    .from('[data-hero-subtitle]', { opacity: 0, y: 20, duration: 0.8 }, 0.9)
    .from('[data-hero-cta]', { opacity: 0, y: 20, duration: 0.8 }, 1.1)
    .from('[data-hero-image]', {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
      scale: 1.1,
      duration: 1.5,
    }, 0.3)
    .from('[data-hero-float]', { opacity: 0, y: 30, duration: 0.8 }, 1.4);

  return tl;
}

/**
 * Section scroll reveal with parallax image.
 * Used by Expertise, Collections preview, etc.
 */
export function createSectionReveal(
  container: HTMLElement,
  options?: { direction?: 'left' | 'right' }
): void {
  const dir = options?.direction === 'right' ? 60 : -60;

  ScrollTrigger.create({
    trigger: container,
    start: 'top 80%',
    onEnter: () => {
      gsap.from(container.querySelector('[data-section-image]'), {
        clipPath: 'inset(10% 10% 10% 10%)',
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
      });
      gsap.from(container.querySelector('[data-section-content]'), {
        x: dir,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 0.3,
      });
    },
  });
}

/**
 * Video showcase scroll-expand effect.
 * Expands video container from contained to full-width on scroll.
 */
export function createVideoExpand(container: HTMLElement): ScrollTrigger {
  return ScrollTrigger.create({
    trigger: container,
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
    onUpdate: (self) => {
      const video = container.querySelector('[data-video-container]') as HTMLElement;
      if (!video) return;
      const progress = self.progress;
      video.style.maxWidth = `${1024 + progress * (window.innerWidth - 1024)}px`;
      video.style.borderRadius = `${24 - progress * 24}px`;
    },
  });
}
```

## Accessibility: Reduced Motion

**Every animated component MUST respect `prefers-reduced-motion`.**

```typescript
// hooks/usePrefersReducedMotion.ts
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

### Usage in Components

```typescript
function Hero() {
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return; // Skip all GSAP animations

    const tl = createHeroTimeline(containerRef.current!);
    return () => tl.kill();
  }, [prefersReduced]);

  // For Framer Motion:
  return (
    <motion.div
      variants={prefersReduced ? {} : fadeInUp}
      initial={prefersReduced ? false : 'hidden'}
      animate="visible"
    >
      ...
    </motion.div>
  );
}
```

## CSS Keyframe Animations

```css
/* styles/animations.css */

/* ── Loading shimmer ── */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* ── Gentle float (decorative elements) ── */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* ── Pulse (notification dot) ── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

/* ── Spin (loading spinner) ── */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Gradient shift (background) ── */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

## Performance Guidelines

1. **Use `will-change` sparingly** — Only on elements that actually animate
2. **Prefer `transform` and `opacity`** — These trigger GPU compositing, not reflow
3. **Kill ScrollTriggers on unmount** — Prevent memory leaks
4. **Batch GSAP calls** — Use timelines instead of individual tweens
5. **Lazy-load animation libraries** — Dynamic import GSAP only in client components
6. **Target 60fps** — Profile animations in Chrome DevTools Performance tab

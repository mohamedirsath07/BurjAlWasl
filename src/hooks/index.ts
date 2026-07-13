'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// useScroll — Tracks scroll position and direction
// =============================================================================
export function useScroll(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setIsScrolled(y > threshold);
      setDirection(y > lastY.current ? 'down' : 'up');
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { isScrolled, scrollY, direction };
}

// =============================================================================
// useMediaQuery — Reactive breakpoint detection
// =============================================================================
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// =============================================================================
// useLockScroll — Locks body scroll preserving position
// =============================================================================
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) {
      document.body.classList.remove('scroll-locked');
      document.body.style.removeProperty('--scroll-y');
      const scrollY = parseInt(document.body.style.top || '0') * -1;
      document.body.style.removeProperty('top');
      if (scrollY) window.scrollTo(0, scrollY);
      return;
    }
    const y = window.scrollY;
    document.body.style.setProperty('--scroll-y', `-${y}px`);
    document.body.style.top = `-${y}px`;
    document.body.classList.add('scroll-locked');
  }, [locked]);
}

// =============================================================================
// useMounted — SSR safety guard
// =============================================================================
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

// =============================================================================
// useScrollProgress — Page scroll progress 0→1
// =============================================================================
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}

// =============================================================================
// useActiveSection — Scroll spy for navigation highlighting
// =============================================================================
export function useActiveSection(sectionIds: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

// =============================================================================
// usePrefersReducedMotion — Accessibility: respect user preferences
// =============================================================================
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

// =============================================================================
// useWindowSize — Debounced window dimensions
// =============================================================================
export function useWindowSize(debounceMs = 150) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }, debounceMs);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [debounceMs]);

  return size;
}

// =============================================================================
// useClickOutside — Detects clicks outside a ref element
// =============================================================================
export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// =============================================================================
// useIntersection — Generic IntersectionObserver wrapper
// =============================================================================
export function useIntersection(
  options?: IntersectionObserverInit & { once?: boolean }
) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { once = true, ...observerOptions } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsVisible(true);
        if (once) observer.unobserve(el);
      } else if (!once) {
        setIsVisible(false);
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px', ...observerOptions });

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [once, observerOptions.threshold, observerOptions.rootMargin]);

  return { ref, isVisible };
}

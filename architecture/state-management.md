# State Management

## Philosophy: Minimal, Colocated, Server-First

For an agency/portfolio website, global state is deliberately minimal. The vast majority of state is:
1. **Server-side** — Content fetched via React Server Components
2. **URL-based** — Filters and pagination encoded in `searchParams`
3. **Component-local** — `useState`/`useReducer` for isolated interactions

We add Zustand only for the narrow band of **cross-component UI coordination** that can't be handled by props or context.

## State Strategy Matrix

| State Type | Tool | Examples |
|-----------|------|---------|
| **Server data** | React Server Components | Page content, collections, blog posts, project data |
| **URL state** | `searchParams` / `useSearchParams` | Gallery filters, blog pagination, active tab |
| **Component state** | `useState` / `useReducer` | Form inputs, accordion open/close, tooltip visibility |
| **Cross-component UI** | Zustand | Nav menu open/close, modal stack, cursor variant, scroll lock |
| **Persisted preferences** | `useLocalStorage` hook | Theme preference, cookie consent state |

## Zustand Stores

### `useUIStore`

Manages global UI state that multiple components need to coordinate on.

```typescript
// store/useUIStore.ts
import { create } from 'zustand';

type CursorVariant = 'default' | 'hover' | 'drag' | 'hidden';

interface UIState {
  // ── Navigation ──
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setScrolled: (scrolled: boolean) => void;

  // ── Modals ──
  activeModal: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;

  // ── Scroll Lock ──
  isScrollLocked: boolean;
  lockScroll: () => void;
  unlockScroll: () => void;

  // ── Custom Cursor ──
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Navigation
  isMobileMenuOpen: false,
  isScrolled: false,
  toggleMobileMenu: () =>
    set((state) => {
      const next = !state.isMobileMenuOpen;
      if (next) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = '';
      return { isMobileMenuOpen: next, isScrollLocked: next };
    }),
  closeMobileMenu: () =>
    set(() => {
      document.body.style.overflow = '';
      return { isMobileMenuOpen: false, isScrollLocked: false };
    }),
  setScrolled: (scrolled) => set({ isScrolled: scrolled }),

  // Modals
  activeModal: null,
  openModal: (id) =>
    set(() => {
      document.body.style.overflow = 'hidden';
      return { activeModal: id, isScrollLocked: true };
    }),
  closeModal: () =>
    set(() => {
      document.body.style.overflow = '';
      return { activeModal: null, isScrollLocked: false };
    }),

  // Scroll Lock
  isScrollLocked: false,
  lockScroll: () => {
    document.body.style.overflow = 'hidden';
    set({ isScrollLocked: true });
  },
  unlockScroll: () => {
    document.body.style.overflow = '';
    set({ isScrollLocked: false });
  },

  // Cursor
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
```

### `useFormStore` (Optional)

Only needed if the booking form spans multiple steps/pages:

```typescript
// store/useFormStore.ts
import { create } from 'zustand';
import type { BookingFormData } from '@/features/booking/types';

interface FormState {
  bookingData: Partial<BookingFormData>;
  currentStep: number;
  updateBookingData: (data: Partial<BookingFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  bookingData: {},
  currentStep: 0,
  updateBookingData: (data) =>
    set((state) => ({ bookingData: { ...state.bookingData, ...data } })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  resetForm: () => set({ bookingData: {}, currentStep: 0 }),
}));
```

## What We Deliberately Avoid

| Anti-Pattern | Why |
|-------------|-----|
| **Redux** | Overkill for this project's state surface area |
| **React Context for state** | Re-renders all consumers on any change |
| **Global form state** | Forms are feature-local unless multi-step |
| **Client-side data fetching** | Server Components handle data loading |
| **State for derived data** | Compute from source of truth (URL params, server data) |

## URL State Pattern

For filterable pages (gallery, blog), state lives in the URL:

```typescript
// In a Server Component page:
export default function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; page?: string };
}) {
  const category = searchParams.category || 'all';
  const sort = searchParams.sort || 'newest';
  const page = parseInt(searchParams.page || '1');

  // Fetch with these parameters...
}
```

This makes filtered views **shareable, bookmarkable, and SEO-indexable**.

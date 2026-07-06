# Feature-Based Architecture

## Philosophy

Features encapsulate **domain-specific** logic that spans multiple components. They are self-contained modules that own their components, hooks, utilities, and types. A feature never depends on another feature — shared logic lives in `lib/` or `hooks/`.

## Feature Structure

```
features/
├── feature-name/
│   ├── components/           # Feature-specific components
│   │   ├── ComponentA.tsx
│   │   └── ComponentB.tsx
│   ├── hooks/                # Feature-specific hooks
│   │   └── useFeatureHook.ts
│   ├── utils/                # Feature-specific utilities
│   │   └── helpers.ts
│   ├── types.ts              # Feature types & interfaces
│   └── index.ts              # Public API barrel export
```

## Features

### `booking/`

**Purpose**: Consultation booking flow — from date selection to confirmation.

**Components**:
- `BookingModal` — Full-screen modal with multi-step booking form
- `DatePicker` — Calendar component for appointment selection
- `TimeSlotSelector` — Available time slot grid
- `BookingConfirmation` — Success state with appointment details

**Hooks**:
- `useBookingForm(initialData?)` — Form state, validation, submission
- `useAvailableSlots(date)` — Fetch available time slots for a date

**Types**:
```typescript
export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  projectType: 'residential' | 'commercial' | 'hospitality';
  date: Date;
  timeSlot: TimeSlot;
  message?: string;
}

export interface TimeSlot {
  id: string;
  start: string;      // "09:00"
  end: string;         // "10:00"
  available: boolean;
}

export type BookingStatus = 'idle' | 'submitting' | 'success' | 'error';
```

---

### `gallery/`

**Purpose**: Project/collection image galleries with lightbox, filtering, and zoom.

**Components**:
- `GalleryGrid` — Responsive masonry grid with hover effects
- `Lightbox` — Full-screen image viewer with navigation
- `ImageZoom` — Pinch/scroll zoom on detail images
- `FilterBar` — Category/tag filter controls

**Hooks**:
- `useGalleryFilters(items, categories)` — Filter state + filtered results
- `useLightbox()` — Open/close/navigate lightbox state
- `useImagePreload(urls)` — Preload adjacent images for smooth navigation

**Types**:
```typescript
export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: GalleryCategory;
  tags: string[];
  blurDataURL?: string;
}

export type GalleryCategory = 'residential' | 'commercial' | 'hospitality' | 'all';

export interface GalleryFilter {
  category: GalleryCategory;
  tags: string[];
  sortBy: 'newest' | 'popular';
}
```

---

### `newsletter/`

**Purpose**: Email capture and newsletter subscription.

**Components**:
- `NewsletterForm` — Email input with submit button (inline or modal variant)
- `SuccessMessage` — Animated confirmation after successful subscription

**Hooks**:
- `useNewsletterSubscription()` — Form state, API call, success/error handling

**Types**:
```typescript
export interface SubscriptionData {
  email: string;
  source: 'footer' | 'popup' | 'blog';
}

export type SubscriptionStatus = 'idle' | 'submitting' | 'success' | 'error';
```

## Dependency Rules

```
┌─────────────────────────────────────┐
│  Pages (app/)                        │
│  ├── imports from: components,       │
│  │    features, lib, hooks, data     │
├─────────────────────────────────────┤
│  Features (features/)               │
│  ├── imports from: components,       │
│  │    lib, hooks, types              │
│  ├── NEVER imports from: other       │
│  │    features, pages                │
├─────────────────────────────────────┤
│  Components (components/)           │
│  ├── imports from: lib, hooks, types │
│  ├── NEVER imports from: features,   │
│  │    pages                          │
├─────────────────────────────────────┤
│  Lib / Hooks / Types                │
│  ├── imports from: types only        │
│  ├── NEVER imports from: components, │
│  │    features, pages                │
└─────────────────────────────────────┘
```

# Utility Functions Reference

## Overview

Utilities live in `src/lib/` and are pure functions with no side effects. Import via `@/lib/`.

---

## Core Utilities

### `cn()` — Class Name Merger

Merges Tailwind classes with conflict resolution. The most-used utility in the project.

```typescript
// lib/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Combines clsx for conditional logic with tailwind-merge for deduplication.
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-azure text-white', className)
 * cn('text-sm text-navy', 'text-lg') // → 'text-lg text-navy' (size conflict resolved)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

**Dependencies**: `clsx`, `tailwind-merge`

---

## String Utilities

```typescript
// lib/utils/string.ts

/**
 * Convert a string to a URL-safe slug.
 * @example slugify('Palm Jumeirah Villa') → 'palm-jumeirah-villa'
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to a maximum length with ellipsis.
 * Breaks at the nearest word boundary.
 * @example truncate('Hello world of design', 15) → 'Hello world...'
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...';
}

/**
 * Capitalize the first letter of a string.
 * @example capitalize('residential') → 'Residential'
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Generate initials from a full name.
 * @example getInitials('Ahmed Al Rashid') → 'AA'
 */
export function getInitials(name: string, max: number = 2): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, max)
    .join('')
    .toUpperCase();
}
```

---

## Math Utilities

```typescript
// lib/utils/math.ts

/**
 * Clamp a number between min and max bounds.
 * @example clamp(150, 0, 100) → 100
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values.
 * @example lerp(0, 100, 0.5) → 50
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Map a value from one range to another.
 * @example mapRange(50, 0, 100, 0, 1) → 0.5
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Round a number to a specified number of decimal places.
 * @example roundTo(3.14159, 2) → 3.14
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Generate a random number between min and max (inclusive).
 */
export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
```

---

## Format Utilities

```typescript
// lib/utils/format.ts

/**
 * Format a phone number for tel: links.
 * @example formatPhone('+971 50 123 4567') → '+971501234567'
 */
export function formatPhone(phone: string): string {
  return phone.replace(/[\s()-]/g, '');
}

/**
 * Format a phone number for display.
 * @example formatPhoneDisplay('+971501234567') → '+971 50 123 4567'
 */
export function formatPhoneDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('971')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  return phone;
}

/**
 * Format a date for display.
 * @example formatDate('2026-07-04') → 'July 4, 2026'
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

/**
 * Format a relative time string.
 * @example formatRelativeTime(twoDaysAgo) → '2 days ago'
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
```

---

## URL Utilities

```typescript
// lib/utils/url.ts

/**
 * Check if a URL is external (not the same domain).
 * @example isExternalUrl('https://google.com') → true
 * @example isExternalUrl('/about') → false
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http') || url.startsWith('//');
}

/**
 * Create a WhatsApp chat link.
 * @example createWhatsAppLink('+971501234567', 'Hello!') → 'https://wa.me/971501234567?text=Hello!'
 */
export function createWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/[+\s()-]/g, '');
  const base = `https://wa.me/${cleaned}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Create a mailto link with optional subject and body.
 */
export function createMailtoLink(
  email: string,
  options?: { subject?: string; body?: string }
): string {
  const params = new URLSearchParams();
  if (options?.subject) params.set('subject', options.subject);
  if (options?.body) params.set('body', options.body);
  const query = params.toString();
  return `mailto:${email}${query ? `?${query}` : ''}`;
}
```

---

## Async Utilities

```typescript
// lib/utils/async.ts

/**
 * Promise-based delay.
 * @example await wait(1000); // Wait 1 second
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options?: { maxAttempts?: number; baseDelay?: number }
): Promise<T> {
  const { maxAttempts = 3, baseDelay = 1000 } = options ?? {};
  let lastError: Error;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts - 1) {
        await wait(baseDelay * Math.pow(2, attempt));
      }
    }
  }

  throw lastError!;
}
```

---

## Image Utilities

```typescript
// lib/utils/image.ts

/**
 * Generate responsive sizes string for Next.js Image component.
 * @example getImageSizes({ sm: '100vw', md: '50vw', lg: '33vw' })
 *          → '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
 */
export function getImageSizes(sizes: {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  default?: string;
}): string {
  const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 };
  const parts: string[] = [];

  if (sizes.sm) parts.push(`(max-width: ${breakpoints.md}px) ${sizes.sm}`);
  if (sizes.md) parts.push(`(max-width: ${breakpoints.lg}px) ${sizes.md}`);
  if (sizes.lg) parts.push(`(max-width: ${breakpoints.xl}px) ${sizes.lg}`);
  parts.push(sizes.xl || sizes.default || '100vw');

  return parts.join(', ');
}

/**
 * Generate a lightweight blur placeholder data URL.
 * Used as `blurDataURL` prop on Next.js Image.
 */
export function generateBlurPlaceholder(
  width: number = 10,
  height: number = 10
): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <filter id="b" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="20"/>
      </filter>
      <rect width="100%" height="100%" fill="#f8f9fa" filter="url(#b)"/>
    </svg>`
  )}`;
}
```

---

## Validation Utilities

```typescript
// lib/utils/validation.ts

/**
 * Validate an email address format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate a UAE phone number.
 */
export function isValidUAEPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s()-+]/g, '');
  return /^(971|0)?(5[0-9])\d{7}$/.test(cleaned);
}

/**
 * Check if a string is not empty after trimming.
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}
```

---

## Barrel Export

```typescript
// lib/utils/index.ts
export * from './string';
export * from './math';
export * from './format';
export * from './url';
export * from './async';
export * from './image';
export * from './validation';
```

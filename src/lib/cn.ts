// =============================================================================
// Burj Al Wasl — Class Name Merger Utility
// =============================================================================
// Combines clsx for conditional class logic with tailwind-merge for conflict resolution.
//
// Usage:
//   cn('px-4 py-2', isActive && 'bg-azure text-white', className)
//   cn('text-sm text-navy', 'text-lg') // → 'text-lg text-navy'
// =============================================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

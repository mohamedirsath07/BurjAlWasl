// =============================================================================
// Burj Al Wasl — Button Component Types
// =============================================================================

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

// =============================================================================
// LandingButton — reusable CTA (renders <a>, next/link, or <button>)
// =============================================================================

import Link from 'next/link';
import { type MouseEventHandler, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ln-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ln-bg)] disabled:opacity-60';

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm md:text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[var(--ln-accent-strong)] to-[var(--ln-accent)] text-white shadow-[0_10px_30px_-8px_var(--ln-glow-1)] hover:shadow-[0_16px_44px_-8px_var(--ln-glow-1)] hover:-translate-y-0.5',
  secondary:
    'ln-glass-strong text-[var(--ln-heading)] hover:border-[var(--ln-accent)]/50 hover:-translate-y-0.5',
  ghost: 'text-[var(--ln-text)] hover:text-[var(--ln-heading)] hover:bg-[var(--ln-surface)]',
};

interface LandingButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** When provided, renders a link instead of a button */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
}

/** Non-navigational hrefs are better served by a plain <a>. */
function isPlainAnchor(href: string): boolean {
  return /^(#|tel:|mailto:|https?:)/.test(href);
}

export function LandingButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: LandingButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (href !== undefined) {
    if (isPlainAnchor(href)) {
      return (
        <a href={href} className={classes} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

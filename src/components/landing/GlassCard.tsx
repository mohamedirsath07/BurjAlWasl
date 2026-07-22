// =============================================================================
// GlassCard — reusable glassmorphism surface
// =============================================================================

import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Use a more opaque glass surface */
  strong?: boolean;
  /** Enable hover lift + border highlight */
  interactive?: boolean;
}

export function GlassCard({
  strong = false,
  interactive = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? 'ln-glass-strong' : 'ln-glass',
        'rounded-2xl',
        interactive && 'group ln-interactive',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

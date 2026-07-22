// =============================================================================
// SectionHeading — reusable eyebrow + title + description block
// =============================================================================

import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /** Portion of the title to render with the gradient accent */
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="ln-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--ln-accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ln-accent)]" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.05}>
        <h2 className="max-w-3xl font-heading text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--ln-heading)] sm:text-4xl md:text-5xl">
          {title}
          {highlight && <span className="ln-gradient-text"> {highlight}</span>}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-[var(--ln-text-muted)] sm:text-lg',
              isCenter && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

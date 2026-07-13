import { cn } from '@/lib/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'narrow' | 'normal' | 'wide' | 'fluid';
  clean?: boolean;
}

/**
 * Container — Premium layout container ensuring responsive safety alignments.
 * Placed within sections to bounds content width consistently.
 */
export function Container({
  children,
  size = 'normal',
  clean = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        !clean && 'px-6 md:px-12 lg:px-16',
        size === 'narrow' && 'max-w-[var(--max-width-narrow)]',
        size === 'normal' && 'max-w-[var(--max-width)]',
        size === 'wide' && 'max-w-[var(--max-width-wide)]',
        size === 'fluid' && 'max-w-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

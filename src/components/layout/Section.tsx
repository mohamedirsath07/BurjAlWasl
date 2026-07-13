import { cn } from '@/lib/cn';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'none' | 'small' | 'normal' | 'large';
  background?: 'white' | 'cream' | 'navy' | 'transparent';
}

/**
 * Section — Full-bleed layout section with standard vertical spacing and backgrounds.
 */
export function Section({
  children,
  spacing = 'normal',
  background = 'transparent',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'w-full relative overflow-hidden',
        // Vertical spacing variants
        spacing === 'small' && 'py-12 md:py-16',
        spacing === 'normal' && 'py-20 md:py-28',
        spacing === 'large' && 'py-28 md:py-40',
        // Background color variants
        background === 'white' && 'bg-white text-navy',
        background === 'cream' && 'bg-cream text-navy',
        background === 'navy' && 'bg-navy text-white',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

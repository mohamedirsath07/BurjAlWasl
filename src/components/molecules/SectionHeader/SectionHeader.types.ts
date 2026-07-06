// =============================================================================
// Burj Al Wasl — SectionHeader Types
// =============================================================================

export interface SectionHeaderProps {
  /** Small uppercase label above heading (e.g., "Our Expertise") */
  eyebrow?: string;
  /** Main heading text */
  title: string;
  /** Supporting description text */
  subtitle?: string;
  /** Text alignment */
  alignment?: 'left' | 'center';
  /** Enable scroll reveal animation */
  animate?: boolean;
  /** Additional CSS classes */
  className?: string;
}

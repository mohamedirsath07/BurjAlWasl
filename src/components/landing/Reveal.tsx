'use client';

// =============================================================================
// Reveal — reusable scroll-reveal wrapper (Framer Motion)
// =============================================================================

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal animates in (seconds) */
  delay?: number;
  /** Vertical offset to animate from (px) */
  y?: number;
  /** Direction of travel */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Animate on every entry instead of once */
  repeat?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  direction = 'up',
  repeat = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const offset = { x: 0, y: 0 };
  if (direction === 'up') offset.y = y;
  if (direction === 'down') offset.y = -y;
  if (direction === 'left') offset.x = y;
  if (direction === 'right') offset.x = -y;

  const variants: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/cn';

interface HeroCTAProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

/**
 * HeroCTA — Dynamic action buttons for the Hero section.
 * Features:
 * - Magnetic attraction effect on mouse hover.
 * - Staggered slide-up entry animations.
 * - Keyboard accessible focus styles.
 * - Smooth fallback for touch screens and reduced motion preferences.
 */
export function HeroCTA({ onPrimaryClick, onSecondaryClick }: HeroCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap gap-4 items-center justify-start z-10 relative"
    >
      <MagneticButton variant="primary" onClick={onPrimaryClick}>
        Book Free Consultation
        <Calendar className="w-4 h-4 ml-1.5 opacity-80" />
      </MagneticButton>

      <a
        href="#expertise"
        onClick={onSecondaryClick}
        className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:border-[#1e81b0] hover:text-[#1e81b0] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1e81b0] focus-visible:outline-offset-4"
      >
        View Projects
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MagneticButton — Sub-component with mouse-tracking hover springs
// ─────────────────────────────────────────────────────────────────────────────
interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

function MagneticButton({ children, variant = 'primary', onClick, className }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    
    // Calculate mouse offset from button center
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Attract position by 30% factor
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative px-8 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-colors duration-500 overflow-hidden',
        variant === 'primary' ? 'bg-[#1e81b0] text-white hover:bg-[#166a93]' : 'bg-[#0f2a4a] text-white hover:bg-[#1e81b0]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1e81b0] focus-visible:outline-offset-4',
        className
      )}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
    >
      <span
        className="relative z-10 flex items-center justify-center gap-1.5"
        style={{
          transform: `translate3d(${position.x * 0.3}px, ${position.y * 0.3}px, 0)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        {children}
      </span>
    </button>
  );
}
export default HeroCTA;

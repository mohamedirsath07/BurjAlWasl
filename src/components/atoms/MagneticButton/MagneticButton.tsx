'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, variant = 'primary', className, onClick, ...props }, ref) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const { currentTarget, clientX, clientY } = e;
      const { width, height, left, top } = currentTarget.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    const variantStyles = {
      primary: "bg-[#c5a55a] text-white hover:bg-[#b8943f] border border-transparent",
      secondary: "bg-[#0f2a4a] text-white hover:bg-[#c5a55a] border border-transparent",
      ghost: "bg-transparent text-white border border-white/20 hover:bg-white hover:text-[#0f2a4a]",
      outline: "bg-transparent text-[#0f2a4a] border border-[#0f2a4a]/20 hover:border-[#c5a55a] hover:text-[#c5a55a]"
    };

    return (
      <button
        ref={ref}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'group relative px-8 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-500 overflow-hidden',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c5a55a] focus-visible:outline-offset-4',
          variantStyles[variant],
          className
        )}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        {...props}
      >
        <span
          className="relative z-10 flex items-center justify-center gap-2"
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
);

MagneticButton.displayName = 'MagneticButton';

'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/cn';
import { useUIStore } from '@/store/useUIStore';

/**
 * CustomCursor — A premium mouse follower and glow effect.
 * Features:
 * - Fluid movement using spring physics for high-end digital agency feel.
 * - Reactive state transformations (grows on link hover, hides on mouse leave).
 * - Desktop-only auto-disable (safeguards touch devices via pointer media queries).
 * - Full integration with global Zustand UI store.
 */
export function CustomCursor() {
  const { cursorVariant, setCursorVariant } = useUIStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // High-performance motion values for cursor position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs to eliminate jitter and replicate agency-level feel
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Attach listeners to track document pointer activity
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Track links, buttons, and custom triggers for reactive changes
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .interactive-hover'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovered(true);
          setCursorVariant('hover');
        });
        el.addEventListener('mouseleave', () => {
          setIsHovered(false);
          setCursorVariant('default');
        });
      });
    };

    // Periodic check to capture dynamically rendered elements
    const interval = setInterval(addHoverListeners, 1000);
    addHoverListeners();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(interval);
    };
  }, [mouseX, mouseY, isVisible, setCursorVariant]);

  if (typeof window === 'undefined') return null;

  // Pointer media check: hide cursor entirely on touch screens
  const supportsHover = window.matchMedia('(pointer: fine)').matches;
  if (!supportsHover) return null;

  return (
    <>
      {/* ── Background Cursor Glow (Aesop/Stripe style) ── */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[var(--z-behind)] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure/5 blur-[100px]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* ── Dynamic Mouse Follower Ring ── */}
      <motion.div
        ref={cursorRef}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-azure/40 transition-all duration-300 ease-out',
          !isVisible && 'scale-0 opacity-0',
          cursorVariant === 'hover' && 'h-14 w-14 border-azure bg-azure/10'
        )}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* ── Precision Center Dot ── */}
      <motion.div
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure transition-all duration-300 ease-out',
          !isVisible && 'scale-0 opacity-0',
          cursorVariant === 'hover' && 'scale-0'
        )}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}

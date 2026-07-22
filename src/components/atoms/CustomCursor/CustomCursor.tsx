'use client';

import React, { useState, useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && dotRef.current) {
        // Smooth follow for outer circle
        cursorRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
        // Instant follow for inner dot
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[100] hidden lg:block transition-all duration-300 ease-out will-change-transform ${isHovering ? 'scale-[2.5] bg-[#c5a55a]/10 border-[#c5a55a]/50' : 'scale-100 bg-transparent border-white/50 mix-blend-difference'}`} 
      />
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white mix-blend-difference rounded-full pointer-events-none z-[100] hidden lg:block will-change-transform" 
      />
    </>
  );
}

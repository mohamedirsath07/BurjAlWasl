'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/cn';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-full bg-[#0f2a4a] text-white flex items-center justify-center shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#c5a55a] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#c5a55a] focus-visible:outline-none",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
      )}
    >
      <ArrowUp size={20} strokeWidth={1.5} />
    </button>
  );
}

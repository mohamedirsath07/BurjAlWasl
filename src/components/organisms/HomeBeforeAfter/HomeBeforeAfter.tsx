'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useIntersection } from '@/hooks';
import { cn } from '@/lib/cn';
import { ArrowRightLeft } from 'lucide-react';
import Image from 'next/image';

/**
 * HomeBeforeAfter — A standalone interactive comparison slider for the homepage.
 * Uses existing project images to demonstrate transformation.
 * Touch-friendly, accessible, and GPU-accelerated.
 */
export function HomeBeforeAfter() {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    if (touch) handleMove(touch.clientX);
  };

  useEffect(() => {
    const stop = () => setIsDragging(false);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, []);

  return (
    <section ref={ref as React.Ref<HTMLElement>} className="py-40 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className={cn(
          "text-center mb-20 transition-all duration-[1200ms] transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        )}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-[#c5a55a]" />
            <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold">Transformation</span>
            <span className="w-12 h-[1px] bg-[#c5a55a]" />
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-light text-[#0f2a4a] leading-tight">
            Before & <span className="italic font-medium text-[#c5a55a]">After.</span>
          </h2>
        </div>

        {/* Slider */}
        <div className={cn(
          "max-w-5xl mx-auto transition-all duration-[1500ms] delay-200 transform",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl cursor-ew-resize select-none shadow-2xl"
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchMove={handleTouchMove}
            role="slider"
            aria-label="Before and after comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSliderPosition(p => Math.max(0, p - 2));
              if (e.key === 'ArrowRight') setSliderPosition(p => Math.min(100, p + 2));
            }}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0 w-full h-full">
              <Image src="/home-hall-interiro.jpeg" alt="After installation" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
              <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-[#c5a55a]/90 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest">After</div>
            </div>

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image src="/img-4.jpeg" alt="Before installation" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[#0f2a4a] text-[9px] font-bold uppercase tracking-widest">Before</div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0f2a4a] hover:scale-110 transition-transform duration-300">
                <ArrowRightLeft size={18} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

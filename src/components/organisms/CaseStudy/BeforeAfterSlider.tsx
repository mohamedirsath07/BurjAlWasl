'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useIntersection } from '@/hooks';
import { cn } from '@/lib/cn';
import { ArrowRightLeft } from 'lucide-react';
import { CaseStudy } from '@/data/portfolio';
import Image from 'next/image';

export function BeforeAfterSlider({ project }: { project: CaseStudy }) {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      if (touch) handleMove(touch.clientX);
    }
  };

  // Add global mouseup to stop dragging if cursor leaves container
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section ref={ref as any} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-4">Transformation</h3>
        <h2 className="font-heading text-4xl md:text-5xl font-light text-[#0f2a4a]">Before & After</h2>
      </div>

      <div className={cn(
        "max-w-5xl mx-auto px-6 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}>
        <div 
          ref={containerRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl cursor-ew-resize select-none shadow-2xl"
          onMouseDown={() => setIsDragging(true)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchMove={handleTouchMove}
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image src={project.afterImage} alt="After" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
            <div className="absolute top-6 right-6 px-4 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest pointer-events-none">After</div>
          </div>

          {/* Before Image (Foreground Clipped) */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image src={project.beforeImage} alt="Before" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
            <div className="absolute top-6 left-6 px-4 py-1 rounded-full bg-white/50 backdrop-blur-md text-[#0f2a4a] text-[10px] font-bold uppercase tracking-widest pointer-events-none">Before</div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-none"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0f2a4a]">
              <ArrowRightLeft size={20} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

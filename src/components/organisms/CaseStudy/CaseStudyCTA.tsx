'use client';

import React from 'react';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import { useIntersection } from '@/hooks';
import { cn } from '@/lib/cn';

export function CaseStudyCTA() {
  const { ref, isVisible } = useIntersection({ threshold: 0.3 });

  return (
    <section ref={ref as any} className="py-32 bg-[#05111d] text-center relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#c5a55a]/30 to-transparent"></div>
      
      <div className={cn(
        "max-w-3xl mx-auto px-6 relative z-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      )}>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-6">Start Your Project</h3>
        <h2 className="font-heading text-4xl md:text-6xl font-light text-white mb-8">Ready to transform your space?</h2>
        <p className="text-slate-400 font-light mb-12 max-w-xl mx-auto">
          Schedule a private consultation with our design team to discuss your vision and explore our premium material collections.
        </p>
        <div className="flex justify-center">
          <MagneticButton variant="primary" className="px-10 py-5 text-xs font-bold tracking-widest">
            Book a Consultation
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

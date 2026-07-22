'use client';

import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useIntersection } from '@/hooks';
import { cn } from '@/lib/cn';

export function VideoShowcase() {
  const { ref, isVisible } = useIntersection({ threshold: 0.2 });
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={ref as any} id="process" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Typography Side */}
        <div className={cn(
          "w-full lg:w-5/12 flex flex-col justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-[#c5a55a]"></span>
            <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold">The Experience</span>
          </div>
          
          <h3 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light text-[#0f2a4a] leading-[1.1] mb-8">
            Light, <br/><span className="italic font-medium text-[#c5a55a]">Controlled.</span>
          </h3>
          
          <p className="text-slate-500 font-light text-lg max-w-md leading-relaxed mb-10">
            Watch our seamless motorized tracks and premium sheer fabrics transform environments. Smooth, silent, and beautifully orchestrated to provide unparalleled comfort.
          </p>
        </div>

        {/* Right Video Side - Asymmetrical Split */}
        <div className={cn(
          "w-full lg:w-7/12 relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl group transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform",
          isVisible ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 translate-x-12"
        )}>
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[1500ms] ease-out"
          >
            <source src="WhatsApp Video 2026-07-04 at 5.43.52 PM.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-[#0f2a4a]/20 transition-opacity duration-700 group-hover:opacity-0 mix-blend-multiply" />
          
          <button 
            onClick={toggleVideo}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-[#0f2a4a] hover:scale-110 transition-all duration-500 z-10 opacity-0 group-hover:opacity-100 scale-90"
            aria-label={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-8 h-8" strokeWidth={1} /> : <Play className="w-8 h-8 pl-2" strokeWidth={1} />}
          </button>
        </div>
      </div>
    </section>
  );
}

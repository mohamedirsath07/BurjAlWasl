'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useIntersection } from '@/hooks';
import { cn } from '@/lib/cn';
import { CaseStudy } from '@/data/portfolio';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export function ImmersiveGallery({ project }: { project: CaseStudy }) {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
    document.body.style.overflow = '';
  };

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setLightboxIndex(prev => prev === null ? null : (prev + 1) % project.gallery.length);
  }, [project.gallery.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setLightboxIndex(prev => prev === null ? null : (prev - 1 + project.gallery.length) % project.gallery.length);
  }, [project.gallery.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <section ref={ref as any} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-4">Project Gallery</h3>
        <h2 className="font-heading text-4xl md:text-5xl font-light text-[#0f2a4a]">Visual Documentation</h2>
      </div>

      {/* Masonry-Style Gallery Grid */}
      <div className={cn(
        "max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
      )}>
        {project.gallery.map((image, index) => {
          // Asymmetrical sizing for gallery
          const isLarge = index === 0 || index === 3;
          return (
            <div 
              key={index}
              onClick={() => openLightbox(index)}
              className={cn(
                "group relative overflow-hidden bg-slate-100 cursor-pointer rounded-xl",
                isLarge ? "md:col-span-2 aspect-[16/9]" : "col-span-1 aspect-square md:aspect-[4/5]"
              )}
            >
              <Image 
                src={image.src} 
                alt={image.caption || "Gallery Image"}
                fill
                sizes={isLarge ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                className="object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#05111d]/0 group-hover:bg-[#05111d]/20 transition-colors duration-500 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <ZoomIn size={24} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && project.gallery[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#05111d]/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
              <div className="text-white/50 text-xs font-bold tracking-widest uppercase">
                {(lightboxIndex as number) + 1} / {project.gallery.length}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-colors pointer-events-auto"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50 pointer-events-auto"
            >
              <ChevronLeft size={32} strokeWidth={1} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50 pointer-events-auto"
            >
              <ChevronRight size={32} strokeWidth={1} />
            </button>

            {/* Main Image */}
            <div 
              className="relative w-full h-full max-w-6xl max-h-[80vh] flex flex-col items-center justify-center px-24 cursor-zoom-in"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
            >
              <motion.img 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={project.gallery[lightboxIndex].src}
                alt={project.gallery[lightboxIndex].caption}
                className={cn(
                  "max-w-full max-h-full object-contain transition-transform duration-500",
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                )}
              />
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-[-40px] text-white/70 text-sm font-light tracking-wide text-center"
              >
                {project.gallery[lightboxIndex].caption}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

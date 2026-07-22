'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import Link from 'next/link';

interface GlobalSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickLinks = [
  { title: 'Luxury Curtains', href: '/services/luxury-curtains' },
  { title: 'Motorized Systems', href: '/services/motorized-systems' },
  { title: 'Portfolio: Villas', href: '/portfolio' },
  { title: 'Book Consultation', href: '/consultation' }
];

export function GlobalSearchOverlay({ isOpen, onClose }: GlobalSearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  // Prevent closing when clicking inside the content
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex items-start justify-center pt-24 md:pt-48 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-xl bg-white/95",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-4"
      )}
      onClick={onClose}
    >
      <button 
        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-[#0f2a4a] hover:bg-slate-200 transition-colors"
        onClick={onClose}
      >
        <X size={24} strokeWidth={1.5} />
      </button>

      <div 
        className="w-full max-w-4xl px-6 relative"
        onClick={handleContentClick}
      >
        <div className="relative border-b-2 border-black/10 flex items-center">
          <Search size={32} className="text-slate-300 absolute left-0" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our collections, services, or case studies..."
            className="w-full bg-transparent border-none py-6 pl-16 pr-8 text-2xl md:text-4xl font-light text-[#0f2a4a] placeholder:text-slate-300 focus:outline-none"
          />
        </div>

        <div className={cn(
          "mt-12 transition-all duration-500 delay-200",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link 
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center gap-4 text-xl md:text-2xl font-light text-slate-500 hover:text-[#0f2a4a] transition-colors group"
                >
                  <span className="w-0 overflow-hidden group-hover:w-6 transition-all duration-300 ease-out text-[#c5a55a]">
                    <ArrowRight size={20} />
                  </span>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

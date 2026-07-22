'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import Image from 'next/image';
import { GlobalSearchOverlay } from './GlobalSearchOverlay';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial reveal animation
    const timer = setTimeout(() => setNavVisible(true), 100);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '/#expertise' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Process', href: '/#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform",
        navVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        scrolled ? "bg-white/90 backdrop-blur-xl py-4 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-black/5" : "bg-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center cursor-pointer relative z-50 group">
          <a href="/">
            <Image 
              src="/Burj_LOGO_2026-removebg-preview.png" 
              alt="Burj Al Wasl" 
              width={160}
              height={56}
              priority
              className={cn(
                "transition-all duration-700 ease-out origin-left group-hover:scale-105 w-auto",
                scrolled ? "h-8 md:h-10 brightness-100" : "h-12 md:h-14 brightness-0 invert" 
              )} 
            />
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.25em] transition-colors relative group overflow-hidden py-2",
                scrolled ? "text-[#0f2a4a] hover:text-[#c5a55a]" : "text-white hover:text-white/70"
              )}
            >
              {item.name}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-[1.5px] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                scrolled ? "bg-[#c5a55a]" : "bg-white"
              )} />
            </a>
          ))}
          <button 
            onClick={() => setSearchOpen(true)}
            className={cn("ml-6 hover:text-[#c5a55a] transition-colors", scrolled ? "text-[#0f2a4a]" : "text-white")}
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          
          <Link href="/consultation" className="ml-6">
            <MagneticButton 
              variant={scrolled ? "primary" : "ghost"} 
              className="px-6 py-3 text-[10px]"
            >
              Book Consultation
            </MagneticButton>
          </Link>
        </div>

        {/* Mobile Toggles */}
        <div className="flex items-center gap-4 md:hidden z-50 relative">
          <button 
            onClick={() => setSearchOpen(true)}
            className={cn("hover:text-[#c5a55a] transition-colors", scrolled ? "text-[#0f2a4a]" : "text-white")}
            aria-label="Search"
          >
            <Search size={24} strokeWidth={1.5} />
          </button>
          <button 
            className={cn(scrolled ? "text-[#0f2a4a]" : "text-white")} 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} strokeWidth={1.5} className="text-white" /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-[#0f2a4a] z-40 transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] flex flex-col justify-center items-center",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ clipPath: isOpen ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((item, index) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={cn(
                "font-heading text-4xl font-light text-white uppercase tracking-widest hover:text-[#c5a55a] transition-colors transform",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${isOpen ? 300 + (index * 100) : 0}ms`, transitionDuration: '800ms' }}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      <GlobalSearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}

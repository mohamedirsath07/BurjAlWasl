'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-[#f5f5f0]/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
          STUDIO X
        </Link>
        
        <nav className="hidden md:flex items-center gap-12">
          {['Work', 'Services', 'Agency', 'Insights'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#f5f5f0]/70 hover:text-[#f5f5f0] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <Link 
          href="/contact"
          className="hidden md:flex items-center justify-center px-8 py-3 rounded-full bg-[#f5f5f0] text-[#050505] text-xs font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300"
        >
          Let's Talk
        </Link>

        {/* Mobile Menu Toggle (Placeholder) */}
        <button className="md:hidden flex flex-col gap-1.5 p-2">
          <span className="w-6 h-[1.5px] bg-[#f5f5f0]"></span>
          <span className="w-6 h-[1.5px] bg-[#f5f5f0]"></span>
        </button>
      </div>
    </motion.header>
  );
}

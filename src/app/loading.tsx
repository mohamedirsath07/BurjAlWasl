'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Simple elegant spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border border-[#0f2a4a]/10"></div>
          <div className="absolute inset-0 rounded-full border border-[#c5a55a] border-t-transparent animate-spin"></div>
        </div>
        
        {/* Brand Text */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0f2a4a]">
            Burj Al Wasl
          </div>
          <div className="text-[8px] font-medium uppercase tracking-widest text-[#c5a55a]">
            Loading Experience
          </div>
        </div>
      </div>
    </div>
  );
}

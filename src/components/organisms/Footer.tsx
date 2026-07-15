import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#050505] text-[#f5f5f0] pt-32 pb-12 overflow-hidden border-t border-[#f5f5f0]/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          
          <div>
            <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9]">
              LET'S BUILD <br />
              <span className="text-[#f5f5f0]/30">THE FUTURE.</span>
            </h2>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#f5f5f0] text-[#050505] text-sm font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300"
            >
              Start a Project
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-12 lg:ml-auto">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50 mb-4">Dubai</h4>
              <p className="text-sm text-[#f5f5f0]/70 font-light">
                Burj Daman, DIFC<br />
                Dubai, UAE<br />
                hello@studiox.ae
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5f5f0]/50 mb-4">Socials</h4>
              {['Instagram', 'LinkedIn', 'Twitter', 'Awwwards'].map(social => (
                <a key={social} href="#" className="text-sm font-bold uppercase tracking-widest text-[#f5f5f0]/70 hover:text-[#f5f5f0] transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Massive Typography Footer */}
        <div className="relative w-full border-t border-[#f5f5f0]/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-heading text-8xl md:text-[12rem] lg:text-[18rem] leading-none tracking-tighter font-black opacity-10">
            STUDIO X
          </div>
          <div className="absolute bottom-12 right-0 text-xs font-bold uppercase tracking-[0.2em] text-[#f5f5f0]/50">
            &copy; {new Date().getFullYear()} Studio X. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

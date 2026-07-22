'use client';

import React from 'react';
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import Image from 'next/image';

export function Footer() {
  return (
    <footer id="contact" className="bg-[#05111d] text-white pt-64 pb-12 relative overflow-hidden selection:bg-[#c5a55a]">
      {/* ── Premium Top Divider ── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── Top Section: Logo & Newsletter ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 lg:gap-8 mb-48">
          
          <div className="max-w-xl">
            <Image src="/Burj_LOGO_2026-removebg-preview.png" alt="Burj Al Wasl" width={200} height={64} className="h-16 w-auto brightness-0 invert mb-10" />
            <h3 className="text-3xl md:text-4xl font-light leading-tight text-white mb-6">
              Precision in every <br/>
              <span className="italic text-slate-400">dimension.</span>
            </h3>
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
              International standard window treatments and intelligent motorization, crafted for the most discerning clients.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-[400px]">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-6">Stay Inspired</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 focus:outline-none focus:border-[#c5a55a] transition-colors font-light text-sm"
              />
              <button className="absolute right-0 top-0 text-white/50 group-hover:text-[#c5a55a] transition-colors h-full flex items-center pr-2 pb-4">
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

        </div>

        {/* ── Middle Section: Links & Contact ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 lg:gap-16 mb-48">
          
          {/* Column 1: Services */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-12">Services</h4>
            <ul className="space-y-6 font-light text-slate-300 text-sm">
              {['Luxury Curtains', 'Motorized Systems', 'Custom Blinds', 'Premium Wallpapers', 'Upholstery', 'Flooring'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors relative inline-block group">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Projects */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-12">Projects</h4>
            <ul className="space-y-6 font-light text-slate-300 text-sm">
              {['Residential Villas', 'Commercial Spaces', 'Hospitality', 'Smart Integrations'].map(link => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors relative inline-block group">
                    {link}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-12">Contact</h4>
            <ul className="space-y-8 font-light text-slate-300 text-sm">
              <li>
                <a href="tel:+971501234567" className="group flex items-center hover:text-white transition-colors w-fit">
                  <Phone className="w-4 h-4 mr-4 text-white/30 group-hover:text-[#c5a55a] transition-colors" strokeWidth={1.5} />
                  +971 50 123 4567
                </a>
              </li>
              <li>
                <a href="mailto:info@burjdubaicurtains.ae" className="group flex items-center hover:text-white transition-colors w-fit">
                  <Mail className="w-4 h-4 mr-4 text-white/30 group-hover:text-[#c5a55a] transition-colors" strokeWidth={1.5} />
                  info@burjdubaicurtains.ae
                </a>
              </li>
              <li className="flex items-start group pt-2 border-t border-white/5">
                <MapPin className="w-4 h-4 mr-4 text-white/30 group-hover:text-[#c5a55a] transition-colors mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="leading-relaxed">
                  Burj Al Wasl Trading L.L.C<br/>
                  Business Bay, Dubai<br/>
                  United Arab Emirates
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c5a55a] mb-12">Connect</h4>
            <div className="flex gap-6">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Facebook, label: "Facebook" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-[#05111d] hover:border-white transition-all duration-300" 
                  aria-label={social.label}
                >
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ── Monumental Brand Typography ── */}
      <div className="w-full overflow-hidden flex justify-center items-center pointer-events-none select-none opacity-[0.02] mb-12">
        <h2 className="font-[family-name:var(--font-heading)] text-[16vw] leading-none font-bold whitespace-nowrap tracking-tighter">
          BURJ AL WASL
        </h2>
      </div>

      {/* ── Bottom Legal Bar ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em] relative z-10">
        <p>© {new Date().getFullYear()} Burj Al Wasl L.L.C. All rights reserved.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

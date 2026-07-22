import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { CustomCursor } from '@/components/atoms/CustomCursor';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Burj Al Wasl',
  description: 'Get in touch with Burj Al Wasl. We are here to assist with your luxury interior inquiries.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <CustomCursor />
      <Navbar />
      
      <section className="pt-48 pb-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[#c5a55a] uppercase tracking-[0.3em] text-[10px] font-bold block mb-8">Reach Out</span>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-[#0f2a4a] leading-tight mb-8">
            Let's create something <span className="italic text-[#c5a55a]">exceptional.</span>
          </h1>
          <p className="text-slate-500 font-light text-lg mb-12">
            For general inquiries, reach out below. For project inquiries and site visits, we recommend our dedicated consultation process.
          </p>
          
          <Link href="/consultation">
            <MagneticButton variant="primary" className="px-8 py-4 text-xs tracking-widest uppercase">
              Book a Consultation
            </MagneticButton>
          </Link>
        </div>
      </section>

      <section className="py-24 bg-[#f8f9fa] border-t border-black/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="font-bold text-[#0f2a4a] text-sm uppercase tracking-widest mb-4">Visit Us</h3>
            <p className="text-slate-500 font-light text-sm">
              Al Quoz Industrial Area 4<br />
              Dubai, United Arab Emirates
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#0f2a4a] text-sm uppercase tracking-widest mb-4">Email</h3>
            <p className="text-slate-500 font-light text-sm">
              hello@burjalwasl.com<br />
              projects@burjalwasl.com
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#0f2a4a] text-sm uppercase tracking-widest mb-4">Call</h3>
            <p className="text-slate-500 font-light text-sm">
              +971 50 123 4567<br />
              Mon-Sat, 9AM-6PM
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

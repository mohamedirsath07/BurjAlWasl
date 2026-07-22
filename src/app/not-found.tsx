import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import { CustomCursor } from '@/components/atoms/CustomCursor';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <CustomCursor />
      <Navbar />
      
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <h1 className="font-heading text-8xl md:text-[150px] font-light text-[#0f2a4a] mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl font-light text-slate-500 mb-8">
          This space has not been <span className="italic text-[#c5a55a]">designed</span> yet.
        </h2>
        <p className="text-slate-400 font-light max-w-md mx-auto mb-12">
          The page you are looking for does not exist or has been moved. Return to our curated collections below.
        </p>
        
        <Link href="/">
          <MagneticButton variant="primary" className="px-8 py-4 text-xs tracking-widest uppercase">
            Return Home
          </MagneticButton>
        </Link>
      </section>

      <Footer />
    </main>
  );
}

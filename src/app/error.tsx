'use client';

import React, { useEffect } from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { MagneticButton } from '@/components/atoms/MagneticButton';
import { CustomCursor } from '@/components/atoms/CustomCursor';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <CustomCursor />
      <Navbar />
      
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <h1 className="font-heading text-8xl md:text-[120px] font-light text-[#0f2a4a] mb-4 tracking-tighter">
          500
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl font-light text-slate-500 mb-8">
          An unexpected <span className="italic text-[#c5a55a]">disruption</span> occurred.
        </h2>
        <p className="text-slate-400 font-light max-w-md mx-auto mb-12">
          We apologize for the inconvenience. Our engineering team has been notified. Please try refreshing the page.
        </p>
        
        <div className="flex items-center gap-6">
          <button onClick={() => reset()}>
            <MagneticButton variant="primary" className="px-8 py-4 text-xs tracking-widest uppercase">
              Try Again
            </MagneticButton>
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

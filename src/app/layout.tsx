import type { Metadata } from 'next';
import { inter, playfair } from '@/lib/fonts';
import { rootMetadata } from '@/lib/seo/metadata';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  CustomCursor,
  PageTransition,
  ScrollProgress,
  SmoothScroll,
  FloatingActions,
} from '@/components/shared';

import './globals.css';

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="relative bg-white font-sans text-navy antialiased min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-azure selection:text-white">
        {/* Custom cursor (mouse follower/glow) */}
        <CustomCursor />

        {/* Global scroll progress tracker */}
        <ScrollProgress />

        {/* Smooth scroll configuration wrapper */}
        <SmoothScroll>
          {/* Main sticky navigation header */}
          <Navbar />

          {/* Route enter/exit transition wrapper */}
          <PageTransition>
            <main id="main-content" className="flex-1 w-full pt-20">
              {children}
            </main>
            {/* Global footer component */}
            <Footer />
          </PageTransition>

          {/* UAE WhatsApp, Call & Consultation CTAs */}
          <FloatingActions />
        </SmoothScroll>
      </body>
    </html>
  );
}

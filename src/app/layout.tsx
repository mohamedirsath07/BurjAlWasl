import type { Metadata } from 'next';
import { inter, spaceGrotesk } from '@/lib/fonts';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/organisms/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Premium Agency',
  description: 'Award-winning digital product studio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans bg-[#050505] text-[#f5f5f0] antialiased selection:bg-[#f5f5f0] selection:text-[#050505] overflow-x-hidden min-h-screen">
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

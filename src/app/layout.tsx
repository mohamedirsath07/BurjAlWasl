import type { Metadata } from 'next';
import { inter, playfair } from '@/lib/fonts';
import { rootMetadata } from '@/lib/seo/metadata';

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
        {children}
      </body>
    </html>
  );
}

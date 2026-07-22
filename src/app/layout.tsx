import type { Metadata } from 'next';
import { inter, playfair } from '@/lib/fonts';
import { rootMetadata } from '@/lib/seo/metadata';
import { COMPANY_INFO, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { ScrollToTop } from '@/components/atoms/ScrollToTop';
import { MobileCTA } from '@/components/shared/MobileCTA';

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: COMPANY_INFO.legalName,
              image: `${SITE_URL}/og/default.jpg`,
              '@id': SITE_URL,
              url: SITE_URL,
              telephone: COMPANY_INFO.phone,
              email: COMPANY_INFO.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: COMPANY_INFO.address.street,
                addressLocality: COMPANY_INFO.address.city,
                addressRegion: COMPANY_INFO.address.region,
                addressCountry: COMPANY_INFO.address.countryCode,
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: COMPANY_INFO.coordinates.latitude,
                longitude: COMPANY_INFO.coordinates.longitude,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ],
                opens: '09:00',
                closes: '18:00',
              },
              sameAs: [
                COMPANY_INFO.social.instagram,
                COMPANY_INFO.social.linkedin,
                COMPANY_INFO.social.facebook,
              ],
            }),
          }}
        />
      </head>
      <body className="relative bg-white font-sans text-navy antialiased min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-azure selection:text-white">
        {children}
        <MobileCTA />
        <ScrollToTop />
      </body>
    </html>
  );
}

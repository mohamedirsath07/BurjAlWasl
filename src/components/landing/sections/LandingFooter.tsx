import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO, SITE_NAME } from '@/lib/constants';
import { NAV_LINKS } from '../landing.data';

const SERVICE_LINKS = [
  { label: 'Curtains & Drapery', href: '/services' },
  { label: 'Blinds & Shades', href: '/services' },
  { label: 'Smart Motorization', href: '/services' },
  { label: 'Commercial Fit-Out', href: '/services' },
];

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--ln-border)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/Burj_LOGO_2026-removebg-preview.png"
            alt={SITE_NAME}
            width={150}
            height={46}
            className="h-11 w-auto object-contain"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--ln-text-muted)]">
            Premium window treatments and interior finishing crafted to international standard for
            Dubai&apos;s finest homes and businesses.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Instagram, href: COMPANY_INFO.social.instagram, label: 'Instagram' },
              { icon: Linkedin, href: COMPANY_INFO.social.linkedin, label: 'LinkedIn' },
              { icon: Facebook, href: COMPANY_INFO.social.facebook, label: 'Facebook' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="ln-glass grid h-10 w-10 place-items-center rounded-full text-[var(--ln-text)] transition-colors duration-300 hover:text-[var(--ln-accent)]"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--ln-heading)]">
            Explore
          </h3>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[var(--ln-text-muted)] transition-colors hover:text-[var(--ln-accent)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--ln-heading)]">
            Services
          </h3>
          <ul className="flex flex-col gap-3">
            {SERVICE_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--ln-text-muted)] transition-colors hover:text-[var(--ln-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--ln-heading)]">
            Contact
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-[var(--ln-text-muted)]">
            <li>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 transition-colors hover:text-[var(--ln-accent)]"
              >
                <Phone size={15} className="text-[var(--ln-accent)]" />
                {COMPANY_INFO.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 transition-colors hover:text-[var(--ln-accent)]"
              >
                <Mail size={15} className="text-[var(--ln-accent)]" />
                {COMPANY_INFO.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-[var(--ln-accent)]" />
              {COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}
            </li>
          </ul>
        </div>
      </div>

      <div className="ln-hairline mx-auto max-w-6xl" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-[var(--ln-text-muted)] sm:flex-row">
        <p>
          © {year} {COMPANY_INFO.legalName}. All rights reserved.
        </p>
        <p>Crafted to international standard in Dubai, UAE.</p>
      </div>
    </footer>
  );
}

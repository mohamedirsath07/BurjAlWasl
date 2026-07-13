/**
 * Footer — Premium 4-column footer with company info, links, newsletter, and legal.
 *
 * Architecture:
 * - Server Component (no interactivity needed)
 * - Semantic HTML: <footer>, <nav>, <address>
 * - Responsive: stacked on mobile → 4 columns on desktop
 * - Accessibility: aria-label on each nav section
 */

import Link from 'next/link';
import { Instagram, Linkedin, Facebook, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/cn';
import { mainNavigation, footerNavigation, socialLinks } from '@/data/navigation';
import { SITE_NAME, COMPANY_INFO } from '@/lib/constants';

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-100 bg-white" aria-label="Site footer">
      {/* ── Main Footer ── */}
      <div className="mx-auto max-w-[80rem] px-6 py-16 lg:px-12 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* ── Brand Column ── */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label={`${SITE_NAME} homepage`}>
              <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight text-navy">
                Burj Al Wasl
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              International standard premium window treatments, curtains, and blinds.
              Bespoke solutions for luxury residences and commercial spaces across the UAE.
            </p>

            {/* Contact Details */}
            <address className="mt-6 space-y-2.5 not-italic">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-azure"
              >
                <Phone className="h-3.5 w-3.5 text-azure/60" />
                {COMPANY_INFO.phone}
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-azure"
              >
                <Mail className="h-3.5 w-3.5 text-azure/60" />
                {COMPANY_INFO.email}
              </a>
              <span className="flex items-center gap-2.5 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-azure/60" />
                {COMPANY_INFO.address.street}, {COMPANY_INFO.address.city}
              </span>
            </address>

            {/* Social Links */}
            <div className="mt-6 flex gap-2.5">
              {socialLinks.map((link) => {
                const Icon = socialIcons[link.platform as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full border border-slate-200',
                      'text-slate-400 transition-all duration-300',
                      'hover:border-azure hover:bg-azure hover:text-white'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="lg:col-span-2 lg:col-start-6">
            <FooterColumn title="Explore" items={mainNavigation} />
          </div>

          {/* ── Services ── */}
          <div className="lg:col-span-2">
            <FooterColumn title="Services" items={footerNavigation.services} />
          </div>

          {/* ── Company ── */}
          <div className="lg:col-span-2">
            <FooterColumn title="Company" items={footerNavigation.company} />
          </div>

          {/* ── Newsletter Placeholder ── */}
          <div className="md:col-span-2 lg:col-span-4 lg:col-start-6 lg:row-start-1">
            <div className="rounded-2xl border border-slate-100 bg-cream p-6 lg:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-azure">
                Stay Inspired
              </p>
              <p className="mt-2 font-[family-name:var(--font-heading)] text-xl font-light text-navy">
                Design insights & exclusive offers
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="h-11 flex-1 rounded-full border border-slate-200 bg-white px-4 text-sm text-navy outline-none transition-colors placeholder:text-slate-400 focus:border-azure"
                  aria-label="Email address for newsletter"
                />
                <button className="flex h-11 items-center justify-center rounded-full bg-navy px-5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-azure">
                  Join
                </button>
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-slate-100">
        <div className="mx-auto flex max-w-[80rem] flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-slate-400 md:flex-row lg:px-12">
          <p>© {currentYear} {COMPANY_INFO.legalName}. All rights reserved.</p>
          <nav className="flex gap-6" aria-label="Legal">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function FooterColumn({ title, items }: { title: string; items: readonly { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-azure">{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-navy"
            >
              {item.label}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

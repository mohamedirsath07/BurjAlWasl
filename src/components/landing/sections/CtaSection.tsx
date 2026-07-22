import { ArrowRight, PhoneCall } from 'lucide-react';
import { Reveal } from '../Reveal';
import { LandingButton } from '../LandingButton';
import { CTA_HIGHLIGHTS } from '../landing.data';
import { COMPANY_INFO } from '@/lib/constants';

export function CtaSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
      <Reveal>
        <div className="ln-glass-strong relative overflow-hidden rounded-[2rem] px-6 py-14 text-center md:px-16 md:py-20">
          {/* glow accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--ln-glow-1), transparent 70%)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--ln-glow-2), transparent 70%)' }}
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight text-[var(--ln-heading)] sm:text-4xl md:text-5xl">
              Ready to transform your space with
              <span className="ln-gradient-text"> world-class finishing?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--ln-text-muted)] sm:text-lg">
              Book a complimentary consultation today. Our designers will bring the samples,
              take the measurements and handle everything end to end.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LandingButton href="/consultation" size="lg">
                Book free consultation
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </LandingButton>
              <LandingButton href={`tel:${COMPANY_INFO.phone}`} variant="secondary" size="lg">
                <PhoneCall size={18} />
                {COMPANY_INFO.phone}
              </LandingButton>
            </div>

            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {CTA_HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--ln-text)]"
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--ln-accent)]/15 text-[var(--ln-accent)]">
                    <Icon size={13} strokeWidth={3} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

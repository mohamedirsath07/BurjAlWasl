import { Sparkles } from 'lucide-react';
import { TRUST_BADGES } from '../landing.data';

export function TrustBar() {
  const items = [...TRUST_BADGES, ...TRUST_BADGES];

  return (
    <section aria-label="Sectors we serve" className="relative py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ln-text-muted)]">
        Delivering excellence across
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <div className="ln-marquee-track gap-4">
          {items.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="ln-glass inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--ln-text)]"
            >
              <Sparkles size={14} className="text-[var(--ln-accent)]" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

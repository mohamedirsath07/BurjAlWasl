'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';
import { FAQS } from '../landing.data';

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-3xl scroll-mt-24 px-5 py-20 md:py-28">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions,"
        highlight="answered"
        description="Everything you need to know before starting your project. Still curious? Our team is one message away."
      />

      <div className="mt-12 flex flex-col gap-3">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.question} delay={i * 0.04}>
              <div
                className={cn(
                  'ln-glass overflow-hidden rounded-2xl transition-colors duration-300',
                  isOpen && 'is-active',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-[var(--ln-heading)]">{faq.question}</span>
                  <span
                    className={cn(
                      'grid h-8 w-8 shrink-0 place-items-center rounded-full text-[var(--ln-accent)] transition-transform duration-300',
                      isOpen ? 'rotate-45 bg-[var(--ln-accent)]/15' : 'bg-[var(--ln-surface)]',
                    )}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--ln-text-muted)]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

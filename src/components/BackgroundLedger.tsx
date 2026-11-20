import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { EXPERIENCE_LEDGER } from '../data/portfolioData';

export function BackgroundLedger() {
  const [openId, setOpenId] = useState<string>(EXPERIENCE_LEDGER[0].id);
  const prefersReduced = useReducedMotion();

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? '' : id));
  };

  return (
    <section
      id="background"
      className="relative border-t border-black/10 bg-[#ECEAE3] py-20 sm:py-24 lg:py-28 text-[#111216]"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-10 border-b border-black/12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-[#2563EB] mb-3">03. Experience &amp; Education</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111216]">
              Track record across teams, products &amp;{' '}
              <span className="font-serif italic font-normal text-[#4B4E57]">
                competitions.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="text-sm text-[#4B4E57] leading-relaxed">
              Select any entry below to inspect contributions, engineering scope, and live links.
            </p>
          </div>
        </div>

        <div className="divide-y divide-black/12 border-b border-black/12">
          {EXPERIENCE_LEDGER.map((entry, idx) => {
            const isOpen = openId === entry.id;
            return (
              <motion.div
                key={entry.id}
                initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 sm:py-7"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(entry.id)}
                  className="w-full text-left grid grid-cols-1 md:grid-cols-12 gap-4 items-center group cursor-pointer"
                >
                  <div className="md:col-span-2">
                    <span className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
                      {entry.period}
                    </span>
                  </div>

                  <div className="md:col-span-4">
                    <h3 className="font-display text-xl font-bold text-[#111216] group-hover:text-[#2563EB] transition-colors">
                      {entry.organization}
                    </h3>
                    <p className="text-xs text-[#52555E] mt-0.5">{entry.location}</p>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-sm font-semibold text-[#111216]">{entry.role}</p>
                    <p className="text-xs text-[#52555E] mt-1 leading-relaxed">
                      {entry.highlight}
                    </p>
                  </div>

                  <div className="md:col-span-1 flex md:justify-end">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/12 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#111216] text-white border-[#111216]' : 'text-[#111216] group-hover:bg-black/5'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-5">
                        <div className="hidden md:block md:col-span-2" />
                        <div className="md:col-span-10 rounded-xl bg-[#F6F5F0] p-5 sm:p-6 border border-black/8">
                          <ul className="space-y-2.5 text-sm leading-relaxed text-[#393C44]">
                            {entry.details.map((detail) => (
                              <li key={detail} className="flex items-start gap-3">
                                <span
                                  aria-hidden="true"
                                  className="text-[#2563EB] font-mono shrink-0"
                                >
                                  —
                                </span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>

                          {entry.link && (
                            <div className="mt-4 pt-4 border-t border-black/8">
                              <a
                                href={entry.link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                              >
                                Visit {entry.link.label}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

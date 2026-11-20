import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { CRAFT_CHAPTERS } from '../data/portfolioData';

export function CraftTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 65%'],
  });

  const smoothScaleY = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="craft"
      className="relative bg-[#F6F5F0] py-20 sm:py-24 lg:py-28 text-[#111216]"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="font-mono text-xs text-[#2563EB] mb-3">02. Engineering Craft</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] tracking-tight text-[#111216]">
              Full-stack clarity from{' '}
              <span className="font-serif italic font-normal text-[#2563EB]">
                Python logic
              </span>{' '}
              to browser motion.
            </h2>
            <p className="mt-5 text-[15px] sm:text-base leading-[1.7] text-[#4B4E57] max-w-[46ch]">
              Great software feels effortless because the architecture beneath it is disciplined. I bridge applied Python &amp; AI engineering with responsive React.js interfaces and real production delivery.
            </p>

            <div className="mt-8 pt-6 border-t border-black/10 grid grid-cols-2 gap-6">
              <div>
                <p className="font-mono text-xs text-[#52555E]">Core Languages</p>
                <p className="mt-1.5 font-display text-base font-semibold text-[#111216]">
                  Python · TypeScript · JS
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-[#52555E]">Delivery Surfaces</p>
                <p className="mt-1.5 font-display text-base font-semibold text-[#111216]">
                  Web · Node SEO · Android
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative pl-7 sm:pl-10">
            <div
              aria-hidden="true"
              className="absolute left-2 sm:left-3 top-2 bottom-2 w-[2px] bg-black/10"
            />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: prefersReduced ? 1 : smoothScaleY }}
              className="absolute left-2 sm:left-3 top-2 bottom-2 w-[2px] origin-top bg-[#2563EB]"
            />

            <div className="space-y-8 sm:space-y-10">
              {CRAFT_CHAPTERS.map((chapter, idx) => (
                <motion.div
                  key={chapter.index}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative rounded-2xl bg-white p-6 sm:p-8 border border-black/8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[25px] sm:-left-[33px] top-8 h-3 w-3 rounded-full border-2 border-[#2563EB] bg-[#F6F5F0]"
                  />

                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs text-[#52555E]">
                    <span className="font-mono font-medium text-[#2563EB] tabular-nums">
                      Chapter {chapter.index}
                    </span>
                    <span className="font-serif italic text-sm text-[#4B4E57]">
                      {chapter.focus}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold tracking-tight text-[#111216]">
                    {chapter.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-[15px] leading-[1.7] text-[#4B4E57]">
                    {chapter.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-black/8 text-xs text-[#52555E]">
                    {chapter.capabilities.join(' · ')}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

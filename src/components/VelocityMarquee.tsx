import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MARQUEE_ITEMS_ROW_ONE, MARQUEE_ITEMS_ROW_TWO } from '../data/portfolioData';

export function VelocityMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xRowOne = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['0%', '-18%']);
  const xRowTwo = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['-14%', '4%']);

  const trackOne = [...MARQUEE_ITEMS_ROW_ONE, ...MARQUEE_ITEMS_ROW_ONE, ...MARQUEE_ITEMS_ROW_ONE];
  const trackTwo = [...MARQUEE_ITEMS_ROW_TWO, ...MARQUEE_ITEMS_ROW_TWO, ...MARQUEE_ITEMS_ROW_TWO];

  return (
    <section
      ref={containerRef}
      aria-label="Core disciplines and shipped projects"
      className="relative overflow-hidden border-y border-black/10 bg-[#ECEAE3] py-6 sm:py-8 select-none"
    >
      <div className="space-y-3">
        <motion.div
          style={{ x: xRowOne }}
          className="flex items-center gap-6 whitespace-nowrap will-change-transform"
        >
          {trackOne.map((item, idx) => (
            <div key={`r1-${idx}`} className="flex items-center gap-6">
              <span className="font-display text-lg sm:text-2xl font-semibold tracking-tight text-[#111216]">
                {item}
              </span>
              <span aria-hidden="true" className="text-[#2563EB] font-serif italic text-xl">
                /
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          style={{ x: xRowTwo }}
          className="flex items-center gap-6 whitespace-nowrap will-change-transform"
        >
          {trackTwo.map((item, idx) => (
            <div key={`r2-${idx}`} className="flex items-center gap-6">
              <span className="font-serif italic text-base sm:text-xl text-[#4B4E57]">
                {item}
              </span>
              <span aria-hidden="true" className="text-black/25 text-sm">
                ·
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

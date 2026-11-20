import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { HERO_METRICS, PROFILE, PROJECTS } from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';

interface HeroSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function HeroSection({ onSelectProject }: HeroSectionProps) {
  const scrollStageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  const spotlightProjects = PROJECTS;
  const totalProjects = spotlightProjects.length;
  const activeSpotlight = spotlightProjects[spotlightIndex] ?? PROJECTS[0];

  const { scrollYProgress } = useScroll({
    target: scrollStageRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  // Shift featured shipments from 01 -> 02 -> 03 -> 04 -> 05 as user scrolls through hero stage
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReduced) return;
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const nextIdx = Math.min(totalProjects - 1, Math.floor(latest * totalProjects));
    setSpotlightIndex((prev) => (prev === nextIdx ? prev : nextIdx));
  });

  const handleManualSelect = (idx: number) => {
    setSpotlightIndex(idx);
    if (
      typeof window !== 'undefined' &&
      window.innerWidth >= 1024 &&
      scrollStageRef.current &&
      !prefersReduced
    ) {
      const stageTop = scrollStageRef.current.getBoundingClientRect().top + window.scrollY;
      const scrollableDistance = Math.max(
        0,
        scrollStageRef.current.offsetHeight - window.innerHeight
      );
      const targetProgress = (idx + 0.15) / totalProjects;
      window.scrollTo({
        top: stageTop + scrollableDistance * Math.min(targetProgress, 0.99),
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="top" className="relative bg-[#F6F5F0]">
      {/* Scroll-pinned stage on desktop so scrolling smoothly shifts Featured Shipments 01 -> 05 */}
      <div ref={scrollStageRef} className="relative lg:h-[260vh]">
        <div className="lg:sticky lg:top-16 lg:min-h-[calc(100vh-4rem)] flex items-center py-10 sm:py-14 lg:py-10">
          <div className="mx-auto w-full max-w-[1360px] px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left column: Typographic authority & focal anchor */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] font-medium text-[#52555E] mb-6">
                    <span>{PROFILE.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{PROFILE.headline}</span>
                    <span aria-hidden="true">·</span>
                    <span>{PROFILE.gradClass}</span>
                  </div>

                  <h1 className="font-display text-[clamp(2.5rem,5.1vw,4.65rem)] font-bold leading-[1.03] tracking-[-0.03em] text-[#111216] max-w-[18ch]">
                    Building web platforms,{' '}
                    <span className="font-serif italic font-normal text-[#2563EB]">
                      mobile apps
                    </span>{' '}
                    &amp; AI software that ship.
                  </h1>

                  <p className="mt-7 max-w-[58ch] text-[15px] sm:text-base leading-[1.68] text-[#454851]">
                    I am <strong className="font-semibold text-[#111216]">{PROFILE.fullName}</strong> — a Python Developer, React.js Engineer, and AI Engineer at{' '}
                    <strong className="font-semibold text-[#111216]">{PROFILE.company}</strong>. Currently engineering{' '}
                    <a
                      href="https://www.dfmscowgenic.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-[#2563EB]/50 underline-offset-4 hover:decoration-[#2563EB] text-[#111216] font-medium transition-colors"
                    >
                      Cowgenic DFMS
                    </a>
                    , after shipping production client sites like{' '}
                    <a
                      href="https://salt-ranges.com"
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-black/25 underline-offset-4 hover:decoration-[#111216] text-[#111216] font-medium transition-colors"
                    >
                      Salt Ranges
                    </a>{' '}
                    and cross-platform product work for{' '}
                    <a
                      href="https://growst.co"
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-black/25 underline-offset-4 hover:decoration-[#111216] text-[#111216] font-medium transition-colors"
                    >
                      Growst
                    </a>{' '}
                    on the web and Google Play Store.
                  </p>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex h-12 items-center gap-2.5 rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    Explore Selected Work
                    <ArrowDownRight className="h-4 w-4" />
                  </a>

                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#111216] hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0"
                  >
                    LinkedIn Profile
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Right column: Engineer profile & scroll-shifting Featured Shipments (01 -> 05) */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative flex-1 rounded-2xl bg-[#0C0D10] p-6 sm:p-7 text-white architectural-grid-dark flex flex-col justify-between overflow-hidden">
                  {/* Top identity strip */}
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <p className="font-mono text-[11px] text-zinc-400">Engineer Profile</p>
                      <p className="font-display text-xl font-bold text-white mt-1">
                        {PROFILE.monogram}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {PROFILE.company} · {PROFILE.competition}
                      </p>
                    </div>

                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-full p-1 bg-gradient-to-b from-white/20 to-white/5">
                      {!portraitFailed ? (
                        <img
                          src={PROFILE.portraitSrc}
                          alt="Portrait of Muhammad Hassan Raza"
                          referrerPolicy="no-referrer"
                          onError={() => setPortraitFailed(true)}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1C202B] font-display text-xl font-bold text-white">
                          HR
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scroll-driven Featured Shipments switcher (01 -> 05) */}
                  <div className="mt-6 space-y-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-zinc-400">
                        Featured Shipments
                      </span>
                      <div className="flex items-center gap-1 rounded-lg bg-white/[0.06] p-1">
                        {spotlightProjects.map((proj, idx) => (
                          <button
                            key={proj.id}
                            type="button"
                            onClick={() => handleManualSelect(idx)}
                            className={`px-2 py-1 text-[11px] font-mono font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                              spotlightIndex === idx
                                ? 'bg-white text-[#111216]'
                                : 'text-zinc-400 hover:text-white'
                            }`}
                          >
                            {proj.index}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Smooth scroll-linked progress indicator */}
                    <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        aria-hidden="true"
                        style={{
                          scaleX: prefersReduced
                            ? (spotlightIndex + 1) / totalProjects
                            : smoothProgress,
                        }}
                        className="h-full w-full origin-left bg-[#2563EB]"
                      />
                    </div>

                    {/* Animated shipment card */}
                    <div className="rounded-xl bg-[#15171D] p-4 sm:p-5 border border-white/10 min-h-[208px] flex flex-col justify-between overflow-hidden">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={activeSpotlight.id}
                          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={prefersReduced ? undefined : { opacity: 0, y: -12 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col justify-between flex-1"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                              <span>{activeSpotlight.categoryLabel}</span>
                              <span className="font-mono text-[11px] text-blue-400">
                                {activeSpotlight.status}
                              </span>
                            </div>
                            <h2 className="font-display text-lg font-bold text-white mt-1.5">
                              {activeSpotlight.title}
                            </h2>
                            <p className="text-xs leading-relaxed text-zinc-300 mt-1.5 line-clamp-4">
                              {activeSpotlight.summary}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-4">
                            <button
                              type="button"
                              onClick={() => onSelectProject(activeSpotlight)}
                              className="text-xs font-semibold text-white hover:text-blue-400 transition-colors cursor-pointer whitespace-nowrap"
                            >
                              Inspect Case Study
                            </button>
                            <a
                              href={activeSpotlight.links[0].url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-white transition-colors truncate"
                            >
                              {activeSpotlight.links[0].url
                                .replace(/^https?:\/\/(www\.)?/, '')
                                .replace(/\/$/, '')}
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                            </a>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Bottom availability caption + subtle scroll cue on desktop */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                    <span>
                      <span className="hidden lg:inline">
                        Scroll to cycle work ({activeSpotlight.index}/{String(totalProjects).padStart(2, '0')})
                      </span>
                      <span className="lg:hidden">{PROFILE.availability}</span>
                    </span>
                    <span className="font-mono text-[11px] text-zinc-300 tabular-nums">
                      {PROFILE.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-column proof strip directly below the sticky Hero stage */}
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10 pb-16 sm:pb-20">
        <div className="border-t border-black/12 pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {HERO_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111216] tabular-nums">
                {metric.value}
              </span>
              <span className="mt-1 text-sm font-semibold text-[#111216]">
                {metric.label}
              </span>
              <span className="mt-1 text-xs leading-relaxed text-[#52555E]">
                {metric.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

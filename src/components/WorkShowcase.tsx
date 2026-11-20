import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/portfolioData';
import { ProjectStageVisual } from './ProjectStageVisual';

interface WorkShowcaseProps {
  onSelectProject: (project: ProjectItem) => void;
}

const FILTER_TABS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'client', label: 'Client & Enterprise' },
  { id: 'product', label: 'Web & Play Store' },
  { id: 'demo', label: 'Interactive Demos' },
];

export function WorkShowcase({ onSelectProject }: WorkShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');

  const visibleProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <section
      id="work"
      className="relative bg-[#0C0D10] py-20 sm:py-24 lg:py-28 text-white"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/12 pb-10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs text-blue-400 mb-3">01. Selected Works</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Shipped websites, mobile apps &amp;{' '}
              <span className="font-serif italic font-normal text-zinc-300">
                production builds.
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-300 max-w-[58ch]">
              Every project below is a live web platform, Play Store product, or interactive demo I have built or actively contribute to. Click any stage to inspect the architecture or open the live deployment.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1 rounded-xl bg-white/[0.06] p-1 self-start lg:self-end"
          >
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-white text-[#111216]'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 space-y-12 lg:space-y-16">
          {visibleProjects.map((project, idx) => (
            <ScrollProjectSpread
              key={project.id}
              project={project}
              reversed={idx % 2 === 1}
              onSelect={() => onSelectProject(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ScrollProjectSpreadProps {
  project: ProjectItem;
  reversed: boolean;
  onSelect: () => void;
}

function ScrollProjectSpread({ project, reversed, onSelect }: ScrollProjectSpreadProps) {
  const cardRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [0.96, 1]);
  const visualY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [26, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], prefersReduced ? [1, 1] : [0.55, 1]);

  return (
    <motion.article
      ref={cardRef}
      style={{ scale, opacity }}
      className="group rounded-2xl bg-[#15171D] border border-white/10 p-6 sm:p-8 lg:p-10 transition-colors duration-200 hover:border-white/20 will-change-transform"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div
          className={`lg:col-span-5 flex flex-col justify-between ${
            reversed ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-400">
              <span className="font-mono text-blue-400 font-medium tabular-nums">
                {project.index}
              </span>
              <span aria-hidden="true">/</span>
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-200">{project.status}</span>
            </div>

            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-1 font-serif italic text-base text-zinc-300">
              {project.subtitle}
            </p>

            <p className="mt-4 text-sm leading-[1.7] text-zinc-300">
              {project.summary}
            </p>

            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="font-mono text-[11px] text-zinc-500 mb-1.5">Engineering Stack</p>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {project.stack.join(' · ')}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onSelect}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-xs font-semibold text-[#111216] hover:bg-[#2563EB] hover:text-white transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
            >
              Case Study
              <Maximize2 className="h-3.5 w-3.5" />
            </button>

            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

        <motion.div
          style={{ y: visualY }}
          onClick={onSelect}
          role="button"
          tabIndex={0}
          aria-label={`Open full case study for ${project.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect();
            }
          }}
          className={`lg:col-span-7 cursor-pointer will-change-transform ${
            reversed ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <ProjectStageVisual projectId={project.id} />
        </motion.div>
      </div>
    </motion.article>
  );
}

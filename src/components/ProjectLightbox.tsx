import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import { ProjectStageVisual } from './ProjectStageVisual';

interface ProjectLightboxProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-project-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 lg:p-10 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111318] text-white border border-white/12 shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#111318]/95 backdrop-blur-md px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3 text-xs text-zinc-400 min-w-0">
                <span className="font-mono text-blue-400 tabular-nums">{project.index}</span>
                <span aria-hidden="true">/</span>
                <span className="truncate">{project.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{project.timeframe}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study viewer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-zinc-200 hover:bg-white hover:text-[#111216] transition-colors cursor-pointer shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <p className="font-mono text-xs text-blue-400">{project.status}</p>
                  <h2
                    id="lightbox-project-title"
                    className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white"
                  >
                    {project.title}
                  </h2>
                  <p className="font-serif italic text-lg text-zinc-300">{project.subtitle}</p>
                  <p className="text-sm leading-relaxed text-zinc-300">{project.summary}</p>

                  <div className="pt-2 space-y-1 text-xs text-zinc-400">
                    <div>
                      <span className="text-zinc-500">Role: </span>
                      <span className="text-zinc-200 font-medium">{project.role}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">Stack: </span>
                      <span className="text-zinc-200">{project.stack.join(' · ')}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex h-11 items-center gap-2 rounded-lg px-4 text-xs font-semibold transition-colors whitespace-nowrap ${
                          link.primary
                            ? 'bg-[#2563EB] text-white hover:bg-[#1D4ED8]'
                            : 'border border-white/20 text-white hover:bg-white/10'
                        }`}
                      >
                        {link.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <ProjectStageVisual projectId={project.id} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <h3 className="font-display text-base font-semibold text-white">
                    01. Context &amp; Challenge
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-white">
                    02. Engineering Execution
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h3 className="font-display text-base font-semibold text-white mb-4">
                  03. Shipped Deliverables
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

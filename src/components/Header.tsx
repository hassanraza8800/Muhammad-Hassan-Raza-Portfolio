import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Craft', href: '#craft' },
  { label: 'Background', href: '#background' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#F6F5F0]/92 backdrop-blur-md border-b border-black/10'
          : 'bg-[#F6F5F0]/80 backdrop-blur-sm border-b border-black/5'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-8 px-6 lg:px-10">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-[#111216] whitespace-nowrap shrink-0"
        >
          {PROFILE.shortName}
        </a>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="group relative py-1 text-sm font-medium text-[#4B4E57] hover:text-[#111216] transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
              <span className="absolute left-0 bottom-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#2563EB] transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#111216] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2563EB] transition-colors duration-200 whitespace-nowrap shrink-0"
          >
            Start a Project
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-[#111216] hover:bg-black/5 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="h-[2px] w-full origin-left bg-[#2563EB]"
      />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-black/10 bg-[#F6F5F0] px-6 py-5"
          >
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="py-2 text-base font-display font-semibold text-[#111216] border-b border-black/8 last:border-none"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-[#111216] px-4 text-sm font-semibold text-white"
              >
                Start a Project
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

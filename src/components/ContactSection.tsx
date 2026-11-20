import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, Phone, MessageCircle } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const ENGAGEMENT_TYPES = [
  'Web Platform / React.js',
  'Python & AI Engineering',
  'Mobile / Full-Stack App',
  'Full-Time Role / Hiring',
];

export function ContactSection() {
  const prefersReduced = useReducedMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedType, setSelectedType] = useState(ENGAGEMENT_TYPES[0]);
  const [senderName, setSenderName] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [composerFeedback, setComposerFeedback] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleComposeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${selectedType}] Inquiry from ${senderName.trim() || 'Portfolio Visitor'}`
    );
    const bodyText = `Hi Muhammad Hassan Raza,\n\nName: ${
      senderName.trim() || 'Not specified'
    }\nTopic: ${selectedType}\n\nDetails:\n${
      projectBrief.trim() || 'I would like to discuss a potential collaboration or engineering opportunity.'
    }\n`;
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${subject}&body=${encodeURIComponent(
      bodyText
    )}`;

    try {
      await navigator.clipboard.writeText(bodyText);
      setComposerFeedback(
        'Opened your email client and copied your formatted brief to the clipboard as backup.'
      );
    } catch {
      setComposerFeedback('Opened your default email client with your project brief ready to send.');
    }

    // Use window.open for better browser compatibility vs window.location.href
    window.open(mailtoUrl, '_self');
  };

  const handleWhatsApp = () => {
    const name = senderName.trim() || 'Portfolio Visitor';
    const msg = `Hi Hassan! I'm ${name}.\n\nTopic: ${selectedType}\n\n${projectBrief.trim() || "I'd like to connect with you."}`;
    window.open(`${PROFILE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#0C0D10] text-white pt-20 sm:pt-24 lg:pt-28 pb-12"
    >
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-white/12">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <p className="font-mono text-xs text-blue-400 mb-3">04. Get in Touch</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.06] tracking-tight text-white">
                Have a product to ship or a{' '}
                <span className="font-serif italic font-normal text-blue-400">
                  role to fill?
                </span>
              </h2>
              <p className="mt-5 max-w-[50ch] text-sm sm:text-base leading-[1.7] text-zinc-300">
                Available for remote, hybrid, and Lahore-based software engineering roles as well as select client web and AI builds. Reach out directly—no middlemen.
              </p>
            </div>

            <div className="mt-10 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-zinc-500">Email</p>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="mt-1 inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white hover:text-blue-400 transition-colors break-all"
                  >
                    <Mail className="h-4 w-4 text-zinc-400 shrink-0" />
                    {PROFILE.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/15 px-3.5 text-xs font-semibold text-zinc-200 hover:bg-white hover:text-[#111216] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Email
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-white/10 pt-5">
                <div>
                  <p className="font-mono text-[11px] text-zinc-500">Phone</p>
                  <a
                    href={PROFILE.phoneHref}
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors tabular-nums"
                  >
                    <Phone className="h-4 w-4 text-zinc-400 shrink-0" />
                    {PROFILE.phone}
                  </a>
                </div>

                <div>
                  <p className="font-mono text-[11px] text-zinc-500">WhatsApp</p>
                  <a
                    href={PROFILE.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#25D366] transition-colors tabular-nums"
                  >
                    <MessageCircle className="h-4 w-4 text-zinc-400 shrink-0" />
                    Message me
                  </a>
                </div>

                <div>
                  <p className="font-mono text-[11px] text-zinc-500">Social</p>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-blue-400 transition-colors"
                  >
                    LinkedIn Profile
                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <form
              onSubmit={handleComposeSubmit}
              className="rounded-2xl bg-[#15171D] border border-white/10 p-6 sm:p-8 space-y-6"
            >
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Quick Project or Hiring Brief
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Select a focus area and draft a short note to open a pre-filled email.
                </p>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-2.5">
                  Engagement Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ENGAGEMENT_TYPES.map((type) => {
                    const active = selectedType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`h-10 px-3.5 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer truncate ${
                          active
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-white/[0.05] text-zinc-300 hover:bg-white/[0.1]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-[11px] text-zinc-400 mb-1.5"
                  >
                    Your Name or Company
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Ayesha Khan · Acme Labs"
                    className="w-full h-11 rounded-lg bg-[#0C0D10] border border-white/12 px-3.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#2563EB] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-brief"
                    className="block font-mono text-[11px] text-zinc-400 mb-1.5"
                  >
                    Project Scope or Message
                  </label>
                  <textarea
                    id="contact-brief"
                    rows={4}
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Share your goals, timeline, or role details..."
                    className="w-full rounded-lg bg-[#0C0D10] border border-white/12 p-3.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#2563EB] focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-xs font-semibold text-[#111216] hover:bg-[#2563EB] hover:text-white transition-colors duration-150 cursor-pointer whitespace-nowrap"
                  >
                    Compose Email Brief
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#25D366] px-6 text-xs font-semibold text-white hover:bg-[#1ebe5d] transition-colors duration-150 cursor-pointer whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </button>
                </div>
                <span className="text-[11px] text-zinc-400">
                  Direct to {PROFILE.email}
                </span>
              </div>

              {composerFeedback && (
                <p
                  role="status"
                  className="text-xs text-emerald-400 border-t border-white/10 pt-3"
                >
                  {composerFeedback}
                </p>
              )}
            </form>
          </motion.div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-display font-semibold text-white">
              {PROFILE.fullName}
            </span>
            <span aria-hidden="true">·</span>
            <span>Lahore, Pakistan</span>
            <span aria-hidden="true">·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

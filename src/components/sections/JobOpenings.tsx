"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { jobs } from "@/data/content";

export function JobOpenings() {
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const activeJob = jobs.find((j) => j.id === openJobId) ?? null;

  return (
    <section id="openings" className="relative border-t border-white/5 bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft">
            Current Openings
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Join our core team
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {jobs.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.08}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber/30">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{job.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{job.blurb}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenJobId(job.id)}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft"
                >
                  Apply Now
                  <svg width="12" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeJob && (
          <ApplyModal job={activeJob} onClose={() => setOpenJobId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ApplyModal({
  job,
  onClose,
}: {
  job: { id: string; title: string };
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Apply for ${job.title}`}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-surface p-7 shadow-2xl"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <h3 className="font-display text-lg font-bold text-white">Apply — {job.title}</h3>

        {submitted ? (
          <p className="mt-6 rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-sm text-text-muted">
            Thanks for applying — our talent team will review your details and be in touch.
          </p>
        ) : (
          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="text"
              required
              placeholder="Full name"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
            />
            <input
              type="url"
              placeholder="LinkedIn / portfolio (optional)"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-amber py-3 font-display text-sm font-bold text-on-accent transition-transform duration-200 hover:scale-[1.01]"
            >
              Submit Application
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

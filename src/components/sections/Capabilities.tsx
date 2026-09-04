"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityIcon } from "@/components/ui/CapabilityIcon";
import { capabilities, capabilityGroups } from "@/data/content";

const SLIDE_MS = 4500;
const RESUME_AFTER_INTERACTION_MS = 9000;

const groupAccent: Record<string, { color: string; textColor: string; text: string; ring: string; glow: string }> = {
  "core-platform": {
    color: "#ff8a2b",
    textColor: "var(--color-amber-soft-text)",
    text: "text-amber-soft-text",
    ring: "ring-amber/40",
    glow: "#ff8a2b",
  },
  "payments-compliance": {
    color: "#3d8bff",
    textColor: "var(--color-azure-text)",
    text: "text-azure-text",
    ring: "ring-azure/40",
    glow: "#3d8bff",
  },
  modernization: {
    color: "#7c6cff",
    textColor: "var(--color-violet-text)",
    text: "text-violet-text",
    ring: "ring-violet/40",
    glow: "#7c6cff",
  },
  "delivery-support": {
    color: "#34e0d9",
    textColor: "var(--color-cyan-text)",
    text: "text-cyan-text",
    ring: "ring-cyan/40",
    glow: "#34e0d9",
  },
};

export function Capabilities() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hoveredRef = useRef(false);
  const interactedUntilRef = useRef(0);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = capabilities[index];
  const accent = groupAccent[active.group];
  const autoAdvanceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(el);

    const poll = window.setInterval(() => {
      if (window.innerWidth === 0 || window.innerHeight === 0) return;
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      setInView((prev) => (prev === visible ? prev : visible));
    }, 1000);

    return () => {
      observer.disconnect();
      window.clearInterval(poll);
    };
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches || paused || !inView) return;

    const id = setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % capabilities.length);
    }, SLIDE_MS);
    autoAdvanceIntervalRef.current = id;
    return () => {
      clearInterval(id);
      if (autoAdvanceIntervalRef.current === id) autoAdvanceIntervalRef.current = null;
    };
  }, [paused, inView]);

  // Marks the interaction as "just happened" so the mouseleave/auto-advance
  // effects know to stay paused, then schedules the resume. Also clears the
  // auto-advance interval synchronously — setPaused(true) alone only stops
  // the *next* effect run from creating a new interval, but a tick already
  // queued by the still-running interval can fire in the same batch as this
  // click's setIndex call, compounding into a double-advance. Clearing it
  // here closes that race.
  const markInteracted = () => {
    if (autoAdvanceIntervalRef.current !== null) {
      clearInterval(autoAdvanceIntervalRef.current);
      autoAdvanceIntervalRef.current = null;
    }
    setPaused(true);
    // Only ever runs from click handlers, never during render — this
    // Date.now() call is safe despite the lint rule's static check.
    // eslint-disable-next-line react-hooks/purity
    interactedUntilRef.current = Date.now() + RESUME_AFTER_INTERACTION_MS;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (!hoveredRef.current) setPaused(false);
    }, RESUME_AFTER_INTERACTION_MS);
  };

  // Jump to an absolute slide (progress segments, group pills). dir only
  // controls the slide-in direction, so it's fine if it's occasionally off
  // by a sign on a rapid double-click — the index itself is always exact.
  const goTo = (nextIndex: number, dir: number) => {
    markInteracted();
    setDirection(dir);
    setIndex((nextIndex + capabilities.length) % capabilities.length);
  };

  // Step relative to whatever the current slide actually is at the moment
  // the update applies, not whatever `index` this closure captured when the
  // button was rendered — otherwise two rapid clicks (or a click racing the
  // auto-advance timer) can both compute the same target and the visible
  // position skips or repeats a slide.
  const step = (delta: 1 | -1) => {
    markInteracted();
    setDirection(delta);
    setIndex((current) => (current + delta + capabilities.length) % capabilities.length);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative overflow-hidden border-t border-white/5 bg-ink-soft py-24 sm:py-32"
      onMouseEnter={() => {
        hoveredRef.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
        if (Date.now() >= interactedUntilRef.current) setPaused(false);
      }}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-25 blur-[140px] transition-colors duration-700"
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${accent.color}, transparent 60%)` }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Core Capabilities
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Thirteen capability areas, one accountable partner
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            A closer look at each area Avenza brings to your transformation program.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2">
          {capabilityGroups.map((group) => {
            const isActiveGroup = group.id === active.group;
            const groupAccentColor = groupAccent[group.id];
            const firstIndexOfGroup = capabilities.findIndex((c) => c.group === group.id);
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => goTo(firstIndexOfGroup, firstIndexOfGroup > index ? 1 : -1)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  isActiveGroup
                    ? `border-transparent text-on-accent`
                    : "border-white/10 text-text-muted hover:border-white/20 hover:text-white"
                }`}
                style={isActiveGroup ? { background: groupAccentColor.color } : undefined}
              >
                {group.label}
              </button>
            );
          })}
        </Reveal>

        <Reveal delay={0.15} className="relative mt-8">
          <div className="flex gap-1.5">
            {capabilities.map((cap, i) => (
              <button
                key={cap.id}
                type="button"
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Go to ${cap.title}`}
                aria-current={i === index}
                className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
              >
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}-${inView}`}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: accent.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: paused || !inView ? "100%" : "100%" }}
                    transition={
                      paused || !inView
                        ? { duration: 0.2 }
                        : { duration: SLIDE_MS / 1000, ease: "linear" }
                    }
                  />
                )}
                {i < index && <span className="absolute inset-0 rounded-full" style={{ background: accent.color, opacity: 0.4 }} />}
              </button>
            ))}
          </div>

          <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-surface">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60, position: "absolute" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-12"
              >
                <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-0">
                  <span
                    className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:h-16 sm:w-16"
                    style={{ background: `color-mix(in oklab, ${accent.color} 16%, transparent)`, color: accent.textColor }}
                  >
                    <CapabilityIcon id={active.id} className="h-6 w-6 sm:h-7 sm:w-7" />
                  </span>
                  <div className="sm:mt-6">
                    <p className={`text-xs font-bold uppercase tracking-widest ${accent.text}`}>
                      {capabilityGroups.find((g) => g.id === active.group)?.label}
                    </p>
                    <span className="mt-2 hidden font-display text-6xl font-extrabold text-white/10 sm:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-text-muted">
                    {active.body}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="relative flex items-center justify-between border-t border-white/10 px-6 py-4 sm:px-12">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous capability"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-text-muted transition-colors hover:border-white/30 hover:text-white"
                >
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
                    <path d="M13 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next capability"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-text-muted transition-colors hover:border-white/30 hover:text-white"
                >
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
                    <path d="M1 6H13M13 6L8 1M13 6L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <span className="font-display text-xs font-semibold text-text-dim">
                {String(index + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

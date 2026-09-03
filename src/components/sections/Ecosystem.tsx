"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { EcosystemWheel, type EcosystemNode } from "@/components/ui/EcosystemWheel";

const AUTO_ADVANCE_MS = 5000;
const RESUME_AFTER_INTERACTION_MS = 10000;

const nodes: EcosystemNode[] = [
  {
    label: "Core Banking",
    description: "The system of record — Temenos Transact at the center of every transformation.",
    color: "#ff8a2b",
    icon: "core",
  },
  {
    label: "Payments",
    description: "Real-time, resilient payment processing via Temenos Payment Hub.",
    color: "#3d8bff",
    icon: "payments",
  },
  {
    label: "Digital Channels",
    description: "Modern customer-facing experiences layered onto the transformed core.",
    color: "#ffb066",
    icon: "digital",
  },
  {
    label: "Data",
    description: "Clean, mapped, migration-ready data underpinning every decision.",
    color: "#7c6cff",
    icon: "data",
  },
  {
    label: "AI",
    description: "Intelligence applied across implementation, testing and operations.",
    color: "#34e0d9",
    icon: "ai",
  },
  {
    label: "Customer Experience",
    description: "The outcome — agile, personalized banking experiences at scale.",
    color: "#ff6a3d",
    icon: "cx",
  },
];

export function Ecosystem() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(el);

    // Backstop for environments where IntersectionObserver never
    // reports an "entering" transition — e.g. the viewport has zero
    // size when the observer is created (a not-yet-laid-out preview
    // pane) and later gets a real size without a corresponding
    // resize/intersection callback. A cheap poll catches that case
    // without depending on any particular event firing.
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
      setActive((current) => (current + 1) % nodes.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, inView]);

  const hoveredRef = useRef(false);
  const interactedUntilRef = useRef(0);

  const handleSelect = (index: number) => {
    setActive(index);
    setPaused(true);
    interactedUntilRef.current = Date.now() + RESUME_AFTER_INTERACTION_MS;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      if (!hoveredRef.current) setPaused(false);
    }, RESUME_AFTER_INTERACTION_MS);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
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
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-azure">
            Industry Expertise
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            One connected banking ecosystem
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            Select a stage of the ecosystem to see how Avenza connects it to
            everything around it.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <EcosystemWheel nodes={nodes} active={active} onSelect={handleSelect} />
        </Reveal>
      </div>
    </section>
  );
}

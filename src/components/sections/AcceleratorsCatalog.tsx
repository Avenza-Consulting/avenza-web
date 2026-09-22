"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { AcceleratorIcon } from "@/components/ui/AcceleratorIcon";
import { acceleratorCatalog, acceleratorCategories } from "@/data/content";

const categoryAccent: Record<string, { color: string; textColor: string; text: string }> = {
  Assess: { color: "#3d8bff", textColor: "var(--color-azure-text)", text: "text-azure-text" },
  Transform: { color: "#7c6cff", textColor: "var(--color-violet-text)", text: "text-violet-text" },
  Validate: { color: "#34e0d9", textColor: "var(--color-cyan-text)", text: "text-cyan-text" },
  Deploy: { color: "#ff8a2b", textColor: "var(--color-amber-soft-text)", text: "text-amber-soft-text" },
  Optimise: { color: "#ffb066", textColor: "var(--color-amber-soft-text)", text: "text-amber-soft-text" },
};

function AcceleratorCard({
  item,
  open,
  onToggle,
}: {
  item: (typeof acceleratorCatalog)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const accent = categoryAccent[item.category];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-4 p-6 text-left sm:p-7"
      >
        <span
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `color-mix(in oklab, ${accent.color} 16%, transparent)`, color: accent.textColor }}
        >
          <AcceleratorIcon id={item.id} className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-display text-base font-bold text-white sm:text-lg">{item.title}</h3>
            <span className={`text-[11px] font-bold uppercase tracking-widest ${accent.text}`}>
              {item.category}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.summary}</p>
        </div>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-text-muted transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-4 border-t border-white/10 p-4 sm:grid-cols-3 sm:p-6">
              <div className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A2 2 0 0 0 3.82 21h16.36a2 2 0 0 0 1.71-2.96L13.71 3.86a2 2 0 0 0-3.42 0Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Problem
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.problem}</p>
              </div>
              <div className="rounded-xl border border-azure/20 bg-azure/[0.06] p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-azure-text">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  How it works
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.howItWorks}</p>
              </div>
              <div className="rounded-xl border border-cyan/20 bg-cyan/[0.06] p-4">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-text">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Benefits
                </p>
                <ul className="mt-2 space-y-2">
                  {item.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <span
                        className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: `color-mix(in oklab, ${accent.color} 16%, transparent)`,
                          color: accent.textColor,
                        }}
                      >
                        <svg width="9" height="7" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AcceleratorsCatalog() {
  const [activeFilter, setActiveFilter] = useState<string | "All">("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visible =
    activeFilter === "All"
      ? acceleratorCatalog
      : acceleratorCatalog.filter((item) => item.category === activeFilter);

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-ink-soft py-16 sm:py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-text">
            The Accelerator Pipeline
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Seven accelerators, one delivery engine
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            A closer look at each accelerator Avenza brings to your transformation program.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter("All")}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              activeFilter === "All"
                ? "border-amber/60 bg-amber/15 text-white"
                : "border-white/10 text-text-muted hover:border-white/25 hover:text-text-primary"
            }`}
          >
            All
          </button>
          {acceleratorCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                activeFilter === category
                  ? "border-amber/60 bg-amber/15 text-white"
                  : "border-white/10 text-text-muted hover:border-white/25 hover:text-text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </Reveal>

        <div className="mt-10 space-y-4">
          {visible.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 6) * 0.05} distance={12}>
              <AcceleratorCard
                item={item}
                open={expandedId === item.id}
                onToggle={() => setExpandedId((current) => (current === item.id ? null : item.id))}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { acceleratorCatalog, acceleratorCategories } from "@/data/content";

const FLOW_SEGMENT_S = 0.9;
const FLOW_CYCLE_S = 3.2;

const categoryAccent: Record<string, { color: string; textColor: string; text: string }> = {
  Assess: { color: "#3d8bff", textColor: "var(--color-azure-text)", text: "text-azure-text" },
  Transform: { color: "#7c6cff", textColor: "var(--color-violet-text)", text: "text-violet-text" },
  Validate: { color: "#34e0d9", textColor: "var(--color-cyan-text)", text: "text-cyan-text" },
  Deploy: { color: "#ff8a2b", textColor: "var(--color-amber-soft-text)", text: "text-amber-soft-text" },
  Optimise: { color: "#ffb066", textColor: "var(--color-amber-soft-text)", text: "text-amber-soft-text" },
};

export function AcceleratorsCatalog() {
  const [activeId, setActiveId] = useState<string>(acceleratorCatalog[0].id);
  const active = acceleratorCatalog.find((item) => item.id === activeId)!;
  const activeAccent = categoryAccent[active.category];

  return (
    <section className="relative border-t border-white/5 bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-text">
            The Accelerator Pipeline
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Select a stage to see the tooling behind it
          </h2>
        </Reveal>

        <div className="relative mt-16 hidden overflow-x-auto sm:block">
          <div className="relative flex min-w-[900px] items-start">
            {acceleratorCategories.map((category, i) => {
              const accent = categoryAccent[category];
              const itemsInCategory = acceleratorCatalog.filter((item) => item.category === category);
              const isActiveCategory = active.category === category;

              return (
                <div key={category} className="flex flex-1 items-start last:flex-none">
                  <Reveal delay={i * 0.06} className="relative flex flex-col items-center gap-3">
                    <div className="relative z-10 flex h-4 w-4 items-center justify-center">
                      <span className="absolute h-4 w-4 rounded-full bg-ink-soft" />
                      {isActiveCategory && (
                        <motion.span
                          className="absolute h-4 w-4 rounded-full"
                          style={{ background: accent.color, opacity: 0.4 }}
                          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <span
                        className="relative h-2.5 w-2.5 rounded-full ring-4 ring-ink-soft transition-colors duration-300"
                        style={{ background: isActiveCategory ? accent.color : "rgba(255,255,255,0.25)" }}
                      />
                    </div>
                    <span
                      className={`whitespace-nowrap font-display text-sm font-semibold transition-colors duration-300 ${
                        isActiveCategory ? "text-white" : "text-text-dim"
                      }`}
                    >
                      {category}
                    </span>

                    <div className="mt-2 flex w-40 flex-col gap-2">
                      {itemsInCategory.map((item) => {
                        const isActiveItem = item.id === activeId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveId(item.id)}
                            aria-pressed={isActiveItem}
                            className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold leading-snug transition-all duration-200 ${
                              isActiveItem
                                ? "border-transparent text-on-accent"
                                : "border-white/10 bg-surface text-text-muted hover:border-white/25 hover:text-white"
                            }`}
                            style={isActiveItem ? { background: accent.color } : undefined}
                          >
                            {item.title}
                          </button>
                        );
                      })}
                    </div>
                  </Reveal>

                  {i < acceleratorCategories.length - 1 && (
                    <div className="relative mt-2 h-px flex-1">
                      <div
                        className="absolute inset-0"
                        style={{ background: "var(--color-white)", opacity: 0.12 }}
                      />
                      <motion.span
                        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                        style={{
                          background: activeAccent.color,
                          boxShadow: `0 0 8px 2px color-mix(in oklab, ${activeAccent.color} 70%, transparent)`,
                        }}
                        animate={{ left: ["0%", "97%"], opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: FLOW_SEGMENT_S,
                          repeat: Infinity,
                          repeatDelay: FLOW_CYCLE_S - FLOW_SEGMENT_S,
                          delay: i * (FLOW_CYCLE_S / acceleratorCategories.length),
                          ease: "linear",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-6 sm:hidden">
          {acceleratorCategories.map((category) => {
            const accent = categoryAccent[category];
            const itemsInCategory = acceleratorCatalog.filter((item) => item.category === category);
            return (
              <div key={category}>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: accent.color }} />
                  <span className="font-display text-sm font-semibold text-white">{category}</span>
                </div>
                <div className="mt-3 ml-[22px] flex flex-col gap-2">
                  {itemsInCategory.map((item) => {
                    const isActiveItem = item.id === activeId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveId(item.id)}
                        aria-pressed={isActiveItem}
                        className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold leading-snug transition-all duration-200 ${
                          isActiveItem
                            ? "border-transparent text-on-accent"
                            : "border-white/10 bg-surface text-text-muted hover:border-white/25 hover:text-white"
                        }`}
                        style={isActiveItem ? { background: accent.color } : undefined}
                      >
                        {item.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.1} className="relative mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16, position: "absolute" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 sm:p-12"
              >
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: activeAccent.textColor }}>
                  {active.category}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">{active.summary}</p>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-text-dim">Problem</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{active.problem}</p>
                    <p className="mt-5 text-xs font-bold uppercase tracking-widest text-text-dim">How it works</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{active.howItWorks}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-text-dim">Benefits</p>
                    <ul className="mt-2 space-y-2">
                      {active.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-sm text-text-muted">
                          <span
                            className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{
                              background: `color-mix(in oklab, ${activeAccent.color} 16%, transparent)`,
                              color: activeAccent.textColor,
                            }}
                          >
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
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
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

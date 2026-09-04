"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { acceleratorCatalog, acceleratorCategories } from "@/data/content";

const categoryAccent: Record<string, { color: string; text: string }> = {
  Assess: { color: "#3d8bff", text: "text-azure" },
  Transform: { color: "#7c6cff", text: "text-violet" },
  Validate: { color: "#34e0d9", text: "text-cyan" },
  Deploy: { color: "#ff8a2b", text: "text-amber-soft" },
  Optimise: { color: "#ffb066", text: "text-amber-soft" },
};

export function AcceleratorsCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(acceleratorCatalog[0].id);

  const visible =
    activeCategory === "All"
      ? acceleratorCatalog
      : acceleratorCatalog.filter((item) => item.category === activeCategory);

  return (
    <section className="relative border-t border-white/5 bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap gap-2">
          {["All", ...acceleratorCategories].map((cat) => {
            const isActive = cat === activeCategory;
            const accent = categoryAccent[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-transparent text-on-accent"
                    : "border-white/10 text-text-muted hover:border-white/20 hover:text-white"
                }`}
                style={isActive ? { background: accent?.color ?? "#ff8a2b" } : undefined}
              >
                {cat}
              </button>
            );
          })}
        </Reveal>

        <div className="mt-8 space-y-4">
          {visible.map((item, i) => {
            const accent = categoryAccent[item.category];
            const isOpen = openId === item.id;
            return (
              <Reveal key={item.id} delay={i * 0.05} distance={16}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors hover:border-white/20">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left sm:p-7"
                  >
                    <div>
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: accent?.color }}
                      >
                        {item.category}
                      </span>
                      <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
                        {item.summary}
                      </p>
                    </div>
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-6 border-t border-white/10 px-6 py-6 sm:grid-cols-2 sm:px-7">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-dim">
                              Problem
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.problem}</p>
                            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-text-dim">
                              How it works
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.howItWorks}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-dim">
                              Benefits
                            </p>
                            <ul className="mt-2 space-y-2">
                              {item.benefits.map((benefit) => (
                                <li key={benefit} className="flex items-start gap-3 text-sm text-text-muted">
                                  <span
                                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                                    style={{
                                      background: `color-mix(in oklab, ${accent?.color ?? "#ff8a2b"} 16%, transparent)`,
                                      color: accent?.color,
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
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

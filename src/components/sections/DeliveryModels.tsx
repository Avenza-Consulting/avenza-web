"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { deliveryModels, deliveryModelsTagline } from "@/data/content";

export function DeliveryModels() {
  const [openId, setOpenId] = useState<string>(deliveryModels[0].id);

  return (
    <section id="delivery-models" className="relative border-t border-white/5 bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Delivery Models
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Engagement flexed to how your team works
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal delay={0.06} duration={0.5} distance={14} className="flex items-center">
            <p className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
              {deliveryModelsTagline}
            </p>
          </Reveal>

          <Reveal delay={0.12} duration={0.5} distance={14}>
            <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-surface">
              {deliveryModels.map((model) => {
                const isOpen = openId === model.id;
                return (
                  <div key={model.id}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? "" : model.id)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span
                        className={`font-display text-base font-semibold transition-colors ${
                          isOpen ? "text-white" : "text-text-muted"
                        }`}
                      >
                        {model.title}
                      </span>
                      <svg
                        width="14"
                        height="8"
                        viewBox="0 0 14 8"
                        fill="none"
                        aria-hidden="true"
                        className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-soft-text" : "text-text-dim"}`}
                      >
                        <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-sm leading-relaxed text-text-muted">{model.body}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

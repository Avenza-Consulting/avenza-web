"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { acceleratorEngine } from "@/data/content";

export function AcceleratorEngine() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-violet">
              Avenza Accelerators
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              An accelerator engine built to cut time-to-market
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
              Proven methodologies, pre-filled configuration templates, and
              reusable delivery assets compound with every engagement — reducing
              risk and effort on every program that follows.
            </p>
            <ul className="mt-8 space-y-4">
              {acceleratorEngine.map((item, i) => (
                <Reveal key={item} delay={i * 0.06} as="span">
                  <li className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet/15 text-violet">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                        <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <EngineVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EngineVisual() {
  const rings = [180, 140, 100];
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
      {rings.map((r, i) => (
        <motion.div
          key={r}
          className="absolute rounded-full border border-dashed"
          style={{
            width: r * 2,
            height: r * 2,
            borderColor: i === 0 ? "rgba(124,108,255,0.35)" : i === 1 ? "rgba(61,139,255,0.3)" : "rgba(52,224,217,0.35)",
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 24 + i * 8, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
            style={{ background: i === 0 ? "#7c6cff" : i === 1 ? "#3d8bff" : "#34e0d9" }}
          />
        </motion.div>
      ))}
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-surface-raised text-center shadow-[0_0_60px_rgba(124,108,255,0.35)]">
        <span className="font-display text-xs font-bold leading-tight text-white">
          Avenza
          <br />
          Engine
        </span>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { journey } from "@/data/content";

const FLOW_SEGMENT_S = 0.9;
const FLOW_CYCLE_S = 3.2;

export function Journey() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-text">
            Transformation Journey
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            A proven path from discovery to optimization
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="hidden overflow-x-auto sm:block">
            <div className="relative flex min-w-[900px] items-center">
              {journey.map((step, i) => (
                <div key={step} className="flex flex-1 items-center last:flex-none">
                  <Reveal delay={i * 0.06} className="relative flex flex-col items-center gap-3">
                    <div className="relative z-10 flex h-4 w-4 items-center justify-center">
                      <span className="absolute h-4 w-4 rounded-full bg-ink" />
                      <motion.span
                        className="absolute h-4 w-4 rounded-full bg-amber/40"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1 + i * (FLOW_CYCLE_S / journey.length),
                        }}
                      />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-amber ring-4 ring-ink" />
                    </div>
                    <span className="whitespace-nowrap font-display text-sm font-semibold text-white">
                      {step}
                    </span>
                  </Reveal>

                  {i < journey.length - 1 && (
                    <div className="relative -mt-6 h-px flex-1">
                      <div
                        className="absolute inset-0"
                        style={{ background: "var(--color-white)", opacity: 0.12 }}
                      />
                      <motion.span
                        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                        style={{
                          background: "#ff8a2b",
                          boxShadow: "0 0 8px 2px rgba(255,138,43,0.8)",
                        }}
                        animate={{ left: ["0%", "97%"], opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: FLOW_SEGMENT_S,
                          repeat: Infinity,
                          repeatDelay: FLOW_CYCLE_S - FLOW_SEGMENT_S,
                          delay: 1 + i * (FLOW_CYCLE_S / journey.length),
                          ease: "linear",
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:hidden">
            {journey.map((step, i) => (
              <div key={step} className="relative">
                <Reveal delay={i * 0.05} className="relative z-10 flex items-center gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber/40 bg-ink-soft font-display text-xs font-bold text-amber-soft-text">
                    {i + 1}
                  </div>
                  <span className="font-medium text-white">{step}</span>
                </Reveal>

                {i < journey.length - 1 && (
                  <div className="relative ml-4 mt-1 h-6 w-px">
                    <div
                      className="absolute inset-0"
                      style={{ background: "var(--color-white)", opacity: 0.12 }}
                    />
                    <motion.span
                      className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                      style={{
                        background: "#ff8a2b",
                        boxShadow: "0 0 8px 2px rgba(255,138,43,0.8)",
                      }}
                      animate={{ top: ["0%", "90%"], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: FLOW_SEGMENT_S,
                        repeat: Infinity,
                        repeatDelay: FLOW_CYCLE_S - FLOW_SEGMENT_S,
                        delay: 1 + i * (FLOW_CYCLE_S / journey.length),
                        ease: "linear",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { journey } from "@/data/content";

export function Journey() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
            Transformation Journey
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            A proven path from discovery to optimization
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="hidden overflow-x-auto sm:block">
            <div className="relative flex min-w-[900px] items-center justify-between px-2">
              <svg className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 overflow-visible" aria-hidden="true">
                <line x1="0" y1="1" x2="100%" y2="1" stroke="var(--color-white)" strokeOpacity="0.12" strokeWidth="2" />
                <motion.line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  stroke="url(#journeyGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.line
                  x1="0"
                  y1="1"
                  x2="100%"
                  y2="1"
                  stroke="url(#journeyGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="1 220"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, strokeDashoffset: [0, -221] }}
                  viewport={{ once: true }}
                  transition={{
                    opacity: { delay: 1.4, duration: 0.4 },
                    strokeDashoffset: {
                      delay: 1.4,
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  style={{ filter: "drop-shadow(0 0 4px #ff8a2b)" }}
                />
                <defs>
                  <linearGradient id="journeyGradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#ff8a2b" />
                    <stop offset="50%" stopColor="#7c6cff" />
                    <stop offset="100%" stopColor="#34e0d9" />
                  </linearGradient>
                </defs>
              </svg>

              {journey.map((step, i) => (
                <Reveal key={step} delay={i * 0.06} className="relative flex flex-col items-center gap-3">
                  <div className="relative z-10 flex h-4 w-4 items-center justify-center">
                    <span className="absolute h-4 w-4 rounded-full bg-ink" />
                    <motion.span
                      className="absolute h-4 w-4 rounded-full bg-amber/40"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.4 + i * (3.5 / journey.length),
                      }}
                    />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-amber ring-4 ring-ink" />
                  </div>
                  <span className="font-display text-sm font-semibold text-white">{step}</span>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:hidden">
            <svg className="absolute left-[19px] top-0 h-full w-1" aria-hidden="true">
              <line x1="1" y1="0" x2="1" y2="100%" stroke="var(--color-white)" strokeOpacity="0.12" strokeWidth="2" />
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="url(#journeyGradientMobile)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="url(#journeyGradientMobile)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="1 160"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, strokeDashoffset: [0, -161] }}
                transition={{
                  opacity: { delay: 1.4, duration: 0.4 },
                  strokeDashoffset: {
                    delay: 1.4,
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                style={{ filter: "drop-shadow(0 0 4px #ff8a2b)" }}
              />
              <defs>
                <linearGradient id="journeyGradientMobile" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="#ff8a2b" />
                  <stop offset="50%" stopColor="#7c6cff" />
                  <stop offset="100%" stopColor="#34e0d9" />
                </linearGradient>
              </defs>
            </svg>
            {journey.map((step, i) => (
              <Reveal key={step} delay={i * 0.05} className="relative flex items-center gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber/40 bg-ink-soft font-display text-xs font-bold text-amber-soft">
                  {i + 1}
                </div>
                <span className="font-medium text-white">{step}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

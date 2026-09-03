"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { aiFlow } from "@/data/content";

export function AiBanking() {
  return (
    <section id="solutions" className="relative overflow-hidden border-t border-white/5 bg-ink py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 opacity-25 blur-[140px]"
        style={{ background: "radial-gradient(ellipse, #34e0d9, transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
            AI + Banking
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            AI applied across the full SDLC
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            We leverage AI for product implementation — streamlining
            documentation across the SDLC and enabling faster, more accurate
            delivery from code to deployment.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-2">
          {aiFlow.map((step, i) => (
            <div key={step} className="flex items-center gap-3 sm:gap-2">
              <Reveal delay={i * 0.08}>
                <motion.div
                  className="group relative rounded-xl border border-white/10 bg-surface px-5 py-4"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(52,224,217,0)",
                      "0 0 0 1px rgba(52,224,217,0.6)",
                      "0 0 0 0 rgba(52,224,217,0)",
                    ],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: (aiFlow.length - 1) * 0.5,
                    delay: 0.6 + i * 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <span className="font-display text-sm font-semibold text-white">{step}</span>
                  <motion.span
                    className="pointer-events-none absolute inset-0 -z-10 rounded-xl bg-cyan/10 blur-xl"
                    animate={{ opacity: [0, 0.9, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: (aiFlow.length - 1) * 0.5,
                      delay: 0.6 + i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </Reveal>
              {i < aiFlow.length - 1 && (
                <div className="relative hidden sm:block">
                  <svg width="28" height="12" viewBox="0 0 28 12" fill="none" aria-hidden="true">
                    <motion.path
                      d="M1 6H27M27 6L21 1M27 6L21 11"
                      stroke="var(--color-white)"
                      strokeOpacity="0.18"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.2 }}
                    />
                  </svg>
                  <motion.span
                    className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan"
                    style={{ boxShadow: "0 0 8px 2px rgba(52,224,217,0.8)" }}
                    animate={{ left: ["0%", "75%"], opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: (aiFlow.length - 1) * 0.5,
                      delay: 0.6 + i * 0.5,
                      ease: "linear",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

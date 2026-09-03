"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeroFlowVisual } from "@/components/ui/HeroFlowVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -left-40 top-0 h-[560px] w-[560px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7c6cff, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="animate-drift pointer-events-none absolute -right-40 top-40 h-[480px] w-[480px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #ff8a2b, transparent 70%)", animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
            Core Banking · Temenos · Payments · AI
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Transforming Core Banking.{" "}
            <span className="text-gradient-amber">Accelerating Digital Innovation.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted"
          >
            Avenza is a specialist technology partner driving timely core banking
            transformations — blending deep Temenos expertise with AI, cloud and
            advanced analytics to modernize core and payment platforms worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="#capabilities"
              className="group relative overflow-hidden rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.03]"
            >
              Explore Our Expertise
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft"
            >
              Talk to Avenza
            </Link>
            <Link
              href="#solutions"
              className="inline-flex items-center gap-1.5 px-2 py-3.5 text-sm font-semibold text-text-muted transition-colors hover:text-white"
            >
              Discover Our Solutions
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path
                  d="M1 5H13M13 5L9 1M13 5L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <HeroFlowVisual />
        </motion.div>
      </div>
    </section>
  );
}

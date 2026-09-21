"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { achievements } from "@/data/content";

const AUTO_ADVANCE_MS = 6500;

export function Achievement() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || achievements.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % achievements.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const current = achievements[index];

  return (
    <section
      id="achievements"
      className="relative border-t border-white/5 bg-ink py-16 sm:py-24"
      style={{ perspective: 1600 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative min-h-[260px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
                  {current.eyebrow}
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {current.title}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
                  {current.summary}
                </p>
                <Link
                  href={current.href}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft-text"
                >
                  Read more
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </motion.div>
            </AnimatePresence>

            {achievements.length > 1 && (
              <div className="mt-10 flex items-center gap-2">
                {achievements.map((a, i) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show achievement: ${a.title}`}
                    aria-current={i === index}
                    className="group p-1.5"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? "w-7 bg-amber" : "w-1.5 bg-white/20 group-hover:bg-white/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} distance={14} className="flex justify-center lg:justify-end">
            <div className="relative aspect-[1206/805] w-full max-w-[560px]" style={{ transformStyle: "preserve-3d" }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src={current.photo}
                    alt={current.title}
                    width={1206}
                    height={805}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { fetchAllLifePhotos, isLifePhotosSheetConfigured, type LifePhoto } from "@/lib/lifePhotosSheet";

export function LifeHighlights() {
  const [highlights, setHighlights] = useState<LifePhoto[] | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isLifePhotosSheetConfigured) return;
    let cancelled = false;
    fetchAllLifePhotos().then((result) => {
      if (cancelled || !result) return;
      const featured = Object.values(result)
        .flat()
        .filter((photo) => photo.featured);
      setHighlights(featured);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!highlights || highlights.length === 0) return null;

  const active = highlights[index];
  const goTo = (delta: 1 | -1) => setIndex((i) => (i + delta + highlights.length) % highlights.length);

  return (
    <section className="relative border-t border-white/5 bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-text">
            Life at Avenza Highlights
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            A few of our favorite moments
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-12">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-surface sm:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="(min-width: 1024px) 960px, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 sm:p-8">
                  <p className="font-display text-lg font-bold text-white sm:text-2xl">{active.caption}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {highlights.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(-1)}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition-colors hover:border-white/40 sm:left-4"
                >
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
                    <path d="M13 6H1M1 6L6 1M1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition-colors hover:border-white/40 sm:right-4"
                >
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
                    <path d="M1 6H13M13 6L8 1M13 6L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {highlights.length > 1 && (
            <div className="mt-5 flex justify-center gap-2">
              {highlights.map((photo, i) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${photo.caption || `photo ${i + 1}`}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-amber" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

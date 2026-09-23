"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { yercaudTrip } from "@/data/content";

// Every whole-company Yercaud photo we have (1..40, minus the two we skipped).
const ALL_PHOTOS = Array.from({ length: 40 }, (_, i) => i + 1)
  .filter((n) => n !== 7 && n !== 15)
  .map((n) => `/yercaud-2026-${n}.jpg`);

// SSR-stable default 10 — a spread across the trip. The client reshuffles to a
// fresh random 10 on mount (below), so every refresh shows a different set.
const DEFAULT_PHOTOS = [3, 5, 9, 16, 20, 26, 30, 33, 37, 40].map((n) => `/yercaud-2026-${n}.jpg`);

// Fisher–Yates — a genuinely new order each call. Client-only, so no hydration
// mismatch, and picking a random 10 means fresh faces on every refresh.
function pickTen(): string[] {
  const a = [...ALL_PHOTOS];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, 10);
}

// Scattered tilt per cell position, plus the rotation/offset each photo is
// "thrown" in from — the signature toss-onto-the-table entrance (index-based,
// so no hydration mismatch).
const tilt = (i: number) => ((i * 41) % 11) - 5; // -5deg .. 5deg
const throwRot = (i: number) => ((i * 53) % 37) - 18; // -18 .. 18
const throwX = (i: number) => ((i * 29) % 25) - 12; // -12 .. 12

const resortHighlights = ["🎲 Team games", "🏔️ Hilltop views", "🍽️ Amazing food", "🎧 DJ nights"];

/**
 * The whole-company Yercaud offsite: photos tumble into a rectangle that
 * surrounds the trip title (polaroid frames, resting tilt, straighten on
 * hover, replaying each time the block scrolls in), followed by an ambient
 * resort clip and a short write-up.
 */
export function YercaudCollage() {
  // SSR renders the stable default; the client swaps in a random 10 on mount.
  // Keyed by cell index (not src), so the images swap in place on refresh
  // without re-firing the tumble-in animation.
  const [photos, setPhotos] = useState<string[]>(DEFAULT_PHOTOS);

  useEffect(() => {
    setPhotos(pickTen());
  }, []);

  const front = photos.slice(0, 4); // cells before the centre title
  const back = photos.slice(4); // cells after it

  const Photo = (src: string, i: number) => (
    <motion.figure
      key={i}
      initial={{ opacity: 0, y: -90, x: throwX(i), rotate: throwRot(i), scale: 1.18 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate: tilt(i), scale: 1 }}
      viewport={{ once: false, margin: "0px 0px -8% 0px" }}
      transition={{ type: "spring", stiffness: 140, damping: 13, mass: 0.7, delay: (i % 8) * 0.05 }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 30, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      className="aspect-square overflow-hidden rounded-2xl bg-white p-2 shadow-[0_18px_44px_-18px_rgba(0,0,0,0.7)] lg:aspect-auto lg:h-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Avenza Yercaud offsite" loading="lazy" className="h-full w-full rounded-xl object-cover" />
    </motion.figure>
  );

  return (
    <section id="yercaud" className="relative border-t border-white/5 bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Photo rectangle surrounding the trip title */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:h-[700px] lg:grid-cols-4 lg:grid-rows-3">
          {front.map((s, i) => Photo(s, i))}

          <div className="col-span-2 flex items-center justify-center px-4 py-10 text-center lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:py-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="max-w-[300px]"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-soft-text">
                Just back from
              </div>
              <h2 className="mt-2 font-display text-5xl font-extrabold leading-none tracking-tight text-amber sm:text-6xl">
                Yercaud
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                Above the clouds, off the clock — the team&apos;s latest escape to the hills.
              </p>
            </motion.div>
          </div>

          {back.map((s, i) => Photo(s, i + 4))}
        </div>

        {/* Resort clip (left) + write-up (right) */}
        <div className="mt-16 grid items-center gap-8 lg:mt-24 lg:grid-cols-2 lg:gap-12">
          <TripVideo src={yercaudTrip.heroVideo} />
          <div>
            <h2 className="text-balance font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              From hilltop views to DJ nights.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Our Yercaud resort stay had the full spread — team games on the lawn, views that stopped every
              conversation mid-sentence, food we&apos;re honestly still talking about, and DJ nights that ran well past
              bedtime. Two days of proper team time, and not a single meeting in sight.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {resortHighlights.map((h) => (
                <span key={h} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-text-muted">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Ambient trip clip — autoplays muted and loops with no browser chrome; the
 * only control is a mute/unmute toggle.
 */
function TripVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) v.play().catch(() => {});
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black">
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="aspect-video w-full object-cover"
      />
      <button
        onClick={toggle}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/70"
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="m23 9-6 6M17 9l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

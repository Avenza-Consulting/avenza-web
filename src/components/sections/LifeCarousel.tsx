"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

const INTERVAL = 4000;

// Fisher–Yates — client-only, so the deck order is fresh every refresh with no
// hydration mismatch.
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const slides = [
  {
    id: "yercaud",
    emoji: "⛰️",
    title: "The whole company, one hill station",
    subtitle: "Two days in Yercaud that had nothing to do with sprints or release dates.",
    image: "/yercaud-2026-3.jpg",
  },
  {
    id: "cricket",
    emoji: "🏏",
    title: "Cleats on, laptops off",
    subtitle: "Friendly matches, unfriendly tackles — bragging rights firmly on the line.",
    image: "/sports-cricket-9.jpg",
  },
  {
    id: "avenza100",
    emoji: "💯",
    title: "Triple digits",
    subtitle: "The day we crossed 100 — cake very much included.",
    image: "/celebration-avenza100-2.jpg",
  },
  {
    id: "offsite",
    emoji: "✈️",
    title: "Out of office, fully offline",
    subtitle: "Chennai, Hyderabad, and wherever the team lands next.",
    image: "/offsite-hyderabad-4.jpg",
  },
  {
    id: "founders",
    emoji: "🎉",
    title: "Where it all began",
    subtitle: "Same dream, better snacks — the crew on Founders' Day.",
    image: "/celebration-founders-day-2.jpg",
  },
];

export function LifeCarousel() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  // SSR renders the default order; the client reshuffles the deck on mount so
  // the highlights lead with a different moment on every refresh.
  const [deck, setDeck] = useState(slides);
  const n = deck.length;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setDeck(shuffle(slides));
  }, []);

  const go = (dir: number) => setIndex((i) => (i + dir + n) % n);

  // Auto-advance — always running; resets whenever the slide changes so a
  // manual dot/arrow click restarts the 4s timer.
  useEffect(() => {
    if (reduced || n <= 1) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % n), INTERVAL);
    return () => clearTimeout(t);
  }, [index, reduced, n]);

  return (
    <section className="relative border-t border-white/5 bg-ink-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">Life @ Avenza</span>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="group relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-ink sm:aspect-[16/9]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Life at Avenza highlights"
          >
            {deck.map((slide, i) => {
              const active = i === index;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
                  aria-hidden={!active}
                >
                  <div className={`h-full w-full ${active && !reduced ? "life-kenburns" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slide.image} alt={slide.title} loading={i === 0 ? "eager" : "lazy"} className="h-full w-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                    <div className="max-w-2xl">
                      <h3 className="font-display text-2xl font-bold text-white sm:text-4xl">
                        <span aria-hidden className="mr-2">{slide.emoji}</span>
                        {slide.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm text-white sm:text-base">{slide.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 ring-1 ring-white/20 backdrop-blur transition-opacity hover:bg-black/65 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 ring-1 ring-white/20 backdrop-blur transition-opacity hover:bg-black/65 focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="absolute bottom-4 right-4 flex items-center gap-2 sm:bottom-6 sm:right-8">
              {deck.map((slide, i) => {
                const active = i === index;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to ${slide.title}`}
                    aria-current={active}
                    className={`relative h-2 overflow-hidden rounded-full transition-all ${active ? "w-9 bg-white/30" : "w-2 bg-white/50 hover:bg-white/80"}`}
                  >
                    {active &&
                      (reduced ? (
                        <span className="absolute inset-0 rounded-full bg-amber" />
                      ) : (
                        <span key={index} className="life-dotfill absolute inset-y-0 left-0 rounded-full bg-amber" />
                      ))}
                  </button>
                );
              })}
            </div>

            <style jsx>{`
              .life-kenburns {
                animation: life-kb 4500ms ease-out both;
              }
              @keyframes life-kb {
                from {
                  transform: scale(1);
                }
                to {
                  transform: scale(1.09);
                }
              }
              .life-dotfill {
                animation: life-fill 4000ms linear both;
              }
              @keyframes life-fill {
                from {
                  width: 0%;
                }
                to {
                  width: 100%;
                }
              }
            `}</style>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

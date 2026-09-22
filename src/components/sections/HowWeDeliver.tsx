"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { deliveryLifecycle } from "@/data/content";

export function HowWeDeliver() {
  const [activeId, setActiveId] = useState<string>(deliveryLifecycle[0].id);
  const activeIndex = deliveryLifecycle.findIndex((stage) => stage.id === activeId);
  const active = deliveryLifecycle[activeIndex];
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    // Treat a band around the vertical center of the viewport as the
    // "active" zone — whichever stage's row is crossing that band as the
    // page scrolls becomes the active one, driving the sticky left panel.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-stage-id");
            if (id) setActiveId(id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    for (const stage of deliveryLifecycle) {
      const el = itemRefs.current[stage.id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-we-deliver" className="relative border-t border-white/5 bg-ink-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            How We Deliver
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            A continuity-first lifecycle, from discovery to optimisation
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            Eight stages, run as one programme. Each step is proven before the
            next begins — so transformation stays measurable and go-live stays
            a non-event.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal delay={0.06} duration={0.5} distance={14} className="lg:sticky lg:top-28 lg:h-fit">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl transition-all duration-700"
                style={{ background: "radial-gradient(circle, #ff8a2b, transparent 70%)" }}
                aria-hidden="true"
              />
              <div key={active.id} className="relative">
                <div className="font-display text-6xl font-extrabold leading-none text-amber/30 sm:text-7xl">
                  {active.number}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">{active.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{active.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-8 flex gap-1.5">
                {deliveryLifecycle.map((stage, i) => (
                  <div
                    key={stage.id}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      i <= activeIndex ? "bg-amber" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} duration={0.5} distance={14}>
            <div>
              {deliveryLifecycle.map((stage) => {
                const isActive = stage.id === activeId;
                return (
                  <button
                    key={stage.id}
                    ref={(el) => {
                      itemRefs.current[stage.id] = el;
                    }}
                    data-stage-id={stage.id}
                    type="button"
                    onClick={() => setActiveId(stage.id)}
                    aria-current={isActive}
                    className={`flex w-full gap-5 border-l py-6 pl-6 text-left transition-colors duration-300 first:pt-0 ${
                      isActive ? "border-amber" : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`font-mono text-sm transition-colors duration-300 ${
                        isActive ? "text-amber-soft-text" : "text-text-dim"
                      }`}
                    >
                      {stage.number}
                    </div>
                    <div>
                      <h3
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          isActive ? "text-white" : "text-text-muted"
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-text-dim">{stage.body}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

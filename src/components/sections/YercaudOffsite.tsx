import { Reveal } from "@/components/ui/Reveal";
import { yercaudTrip } from "@/data/content";

export function YercaudOffsite() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-text">
              {yercaudTrip.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              {yercaudTrip.title}
            </h2>
            <p className="mt-4 text-sm font-semibold text-text-dim">
              {yercaudTrip.dates} &middot; {yercaudTrip.location}
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
              {yercaudTrip.description}
            </p>
          </Reveal>

          <Reveal delay={0.1} distance={14}>
            <div
              className="overflow-hidden rounded-2xl border border-white/10 shadow-lg"
              style={{ aspectRatio: `${yercaudTrip.heroPhoto.width} / ${yercaudTrip.heroPhoto.height}` }}
            >
              <video
                src={yercaudTrip.heroVideo}
                controls
                playsInline
                preload="metadata"
                poster={yercaudTrip.heroPhoto.src}
                className="h-full w-full bg-black object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

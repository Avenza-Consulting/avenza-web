import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { yercaudTrip, yercaudVideos } from "@/data/content";

export function YercaudOffsite() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-24 sm:py-32">
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
              <Image
                src={yercaudTrip.heroPhoto.src}
                alt={yercaudTrip.heroPhoto.alt}
                width={yercaudTrip.heroPhoto.width}
                height={yercaudTrip.heroPhoto.height}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {yercaudVideos.map((video, i) => (
            <Reveal key={video.id} delay={0.1 + i * 0.08} distance={14} className="w-full max-w-md">
              <video
                src={video.src}
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-2xl border border-white/10 bg-black shadow-lg"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

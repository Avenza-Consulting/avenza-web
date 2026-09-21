import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const heroPhotos = [
  { src: "/yercaud-2026-5.jpg", alt: "Sunset through the pines at Yercaud", rotate: "-rotate-6", caption: "the sunset that stopped everyone" },
  { src: "/celebration-avenza100-1.jpg", alt: "Avenza 100 associates milestone celebration cake", rotate: "rotate-4", caption: "triple digits 💯" },
  { src: "/sports-cricket-9.jpg", alt: "Avenza team cricket match moment", rotate: "-rotate-3", caption: "that winning feeling" },
  { src: "/yercaud-2026-3.jpg", alt: "Aerial view of the whole Avenza team at the Yercaud offsite", rotate: "rotate-6", caption: "the whole company, one frame" },
];

export function LifeHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -left-32 top-10 h-[440px] w-[440px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #34e0d9, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Life at Avenza
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            More than delivery.{" "}
            <span className="text-white">A team that shows up for each other.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted">
            Great transformations are built by people who genuinely enjoy
            working together. Here&apos;s a glimpse of the moments, milestones
            and everyday culture behind the work.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="relative mx-auto mt-14 max-w-4xl px-6 sm:mt-20">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:flex sm:items-start sm:justify-center sm:gap-6">
          {heroPhotos.map((photo) => (
            <div
              key={photo.src}
              className={`group relative rotate-0 rounded-sm bg-white p-2 pb-8 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:z-10 hover:rotate-0! hover:scale-105 sm:w-[220px] ${photo.rotate}`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-soft">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 220px, 45vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 truncate px-1 text-center font-display text-xs font-medium text-ink-soft">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

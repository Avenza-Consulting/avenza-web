"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { fetchAllLifePhotos, isLifePhotosSheetConfigured, type LifePhoto } from "@/lib/lifePhotosSheet";

const rotations = ["-rotate-6", "rotate-4", "-rotate-3", "rotate-6"];

export function LifeHero() {
  const [heroPhotos, setHeroPhotos] = useState<LifePhoto[] | null>(null);

  useEffect(() => {
    if (!isLifePhotosSheetConfigured) return;
    let cancelled = false;
    fetchAllLifePhotos().then((result) => {
      if (cancelled || !result) return;
      const featured = Object.values(result)
        .flat()
        .filter((photo) => photo.featured)
        .slice(0, 4);
      setHeroPhotos(featured);
    });
    return () => {
      cancelled = true;
    };
  }, []);

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

      {heroPhotos && heroPhotos.length > 0 && (
        <Reveal delay={0.15} className="relative mx-auto mt-14 max-w-4xl px-6 sm:mt-20">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:flex sm:items-start sm:justify-center sm:gap-6">
            {heroPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className={`group relative rotate-0 rounded-sm bg-white p-2 pb-8 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:z-10 hover:rotate-0! hover:scale-105 sm:w-[220px] ${rotations[i % rotations.length]}`}
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
      )}
    </section>
  );
}

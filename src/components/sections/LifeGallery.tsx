"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { celebrationPhotos, sportsPhotos, offsitePhotos, yercaudPhotos } from "@/data/content";

type Photo = { id: string; src: string; alt: string; width: number; height: number };
type Category = { id: string; label: string; photos: readonly Photo[] };

const achievementPhoto: Photo = {
  id: "techdays-2026",
  src: "/achievement-techdays-2026.jpg",
  alt: "Avenza team celebrating the Shark Tank win at Temenos TechDays 2026",
  width: 1206,
  height: 805,
};

const categories: Category[] = [
  { id: "yercaud", label: "Yercaud 2026", photos: yercaudPhotos },
  { id: "celebrations", label: "Celebrations", photos: [achievementPhoto, ...celebrationPhotos] },
  { id: "sports", label: "Sports & Games", photos: sportsPhotos },
  { id: "offsites", label: "Team Offsites", photos: offsitePhotos },
];

const allPhotos: Photo[] = categories.flatMap((c) => c.photos);

export function LifeGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visiblePhotos = useMemo(
    () => (activeCategory === "all" ? allPhotos : categories.find((c) => c.id === activeCategory)!.photos),
    [activeCategory]
  );

  const totalCount = allPhotos.length;

  return (
    <section className="relative border-t border-white/5 bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Moments Worth Sharing
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            From the team, for the team
          </h2>
        </Reveal>

        <Reveal delay={0.06} className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
              activeCategory === "all"
                ? "border-transparent bg-amber text-on-accent"
                : "border-white/10 text-text-muted hover:border-white/20 hover:text-white"
            }`}
          >
            All ({totalCount})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "border-transparent bg-amber text-on-accent"
                  : "border-white/10 text-text-muted hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.label} ({cat.photos.length})
            </button>
          ))}
        </Reveal>

        <div className="mt-10 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
          {visiblePhotos.map((photo, i) => {
            const isStory = photo.id === "techdays-2026";
            const tile = (
              <div
                className="group relative mb-3 block w-full overflow-hidden rounded-2xl border border-white/10 sm:mb-4"
                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {isStory && (
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-white">
                      Shark Tank Win
                    </span>
                    <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold text-white">
                      Read the story &rarr;
                    </span>
                  </span>
                )}
              </div>
            );

            return (
              <Reveal key={photo.id} delay={Math.min(i, 8) * 0.04} distance={12} className="break-inside-avoid">
                {isStory ? (
                  <Link href="/achievements/temenos-techdays-2026-shark-tank" className="block">
                    {tile}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(visiblePhotos.indexOf(photo))}
                    aria-label={`View photo: ${photo.alt}`}
                    className="block w-full text-left"
                  >
                    {tile}
                  </button>
                )}
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-text-dim">
          More photos from the team coming soon.
        </p>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={visiblePhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}

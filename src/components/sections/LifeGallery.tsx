"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { celebrationPhotos, sportsPhotos, offsitePhotos, yercaudPhotos } from "@/data/content";

type Photo = { id: string; src: string; alt: string; width: number; height: number; caption?: string };
type Category = { id: string; emoji: string; label: string; tagline: string; photos: readonly Photo[] };

const achievementPhoto: Photo = {
  id: "techdays-2026",
  src: "/achievement-techdays-2026.jpg",
  alt: "Avenza team celebrating the Shark Tank win at Temenos TechDays 2026",
  width: 1206,
  height: 805,
  caption: "the Shark Tank win 🦈",
};

const categories: Category[] = [
  {
    id: "yercaud",
    emoji: "⛰️",
    label: "Yercaud 2026",
    tagline: "The whole company took the hills for a weekend.",
    photos: yercaudPhotos,
  },
  {
    id: "celebrations",
    emoji: "🎂",
    label: "Cake & Celebrations",
    tagline: "We'll find a reason to celebrate. There's always a reason.",
    photos: [achievementPhoto, ...celebrationPhotos],
  },
  {
    id: "sports",
    emoji: "🏏",
    label: "Cricket & Chaos",
    tagline: "Deadlines pause, the scoreboard doesn't.",
    photos: sportsPhotos,
  },
  {
    id: "offsites",
    emoji: "✈️",
    label: "On the Road",
    tagline: "Chennai, Hyderabad, and wherever the team lands next.",
    photos: offsitePhotos,
  },
];

export function LifeGallery() {
  const [lightbox, setLightbox] = useState<{ categoryId: string; index: number } | null>(null);

  return (
    <section className="relative border-t border-white/5 bg-ink-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Moments Worth Sharing
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            From the team, for the team
          </h2>
        </Reveal>

        <div className="mt-14 space-y-16 sm:mt-16 sm:space-y-20">
          {categories.map((cat) => (
            <div key={cat.id}>
              <Reveal className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-[26px]">
                    <span aria-hidden="true">{cat.emoji}</span> {cat.label}
                  </h3>
                  <p className="mt-1.5 text-sm text-text-muted">{cat.tagline}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">
                  {cat.photos.length} photos
                </span>
              </Reveal>

              <div className="mt-6 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
                {cat.photos.map((photo, i) => {
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
                        <span className="absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/70 to-transparent p-3">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-white">
                            Shark Tank Win
                          </span>
                          <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold text-white">
                            Read the story &rarr;
                          </span>
                        </span>
                      )}
                      {photo.caption && (
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-8 text-xs font-medium text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {photo.caption}
                        </span>
                      )}
                    </div>
                  );

                  return (
                    <Reveal
                      key={photo.id}
                      delay={Math.min(i, 8) * 0.03}
                      distance={12}
                      className="break-inside-avoid"
                    >
                      {isStory ? (
                        <Link href="/achievements/temenos-techdays-2026-shark-tank" className="block">
                          {tile}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setLightbox({ categoryId: cat.id, index: i })}
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
            </div>
          ))}
        </div>

        <p className="mt-16 text-center text-xs text-text-dim">
          More photos from the team coming soon.
        </p>
      </div>

      {lightbox !== null && (
        <Lightbox
          images={categories.find((c) => c.id === lightbox.categoryId)!.photos}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox({ categoryId: lightbox.categoryId, index })}
        />
      )}
    </section>
  );
}

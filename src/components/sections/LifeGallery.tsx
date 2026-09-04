"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { celebrationPhotos, sportsPhotos, offsitePhotos } from "@/data/content";

type Photo = { id: string; src: string; alt: string };

const placeholderTiles = [
  { id: "festivals", label: "Festival Get-Togethers", color: "#ffb066" },
] as const;

function PhotoStackTile({
  label,
  photos,
  onOpen,
}: {
  label: string;
  photos: readonly Photo[];
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${photos.length} photos from ${label}`}
      className="group relative h-full w-full text-left"
    >
      {photos.slice(0, 3).map((photo, i) => (
        <Image
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          width={400}
          height={400}
          className="absolute inset-0 h-full w-full rounded-2xl border border-white/10 object-cover shadow-lg transition-transform duration-300 group-hover:-translate-y-1"
          style={{
            transform: `rotate(${(i - 1) * 4}deg) translate(${(i - 1) * 6}px, ${i * 2}px)`,
            zIndex: 3 - i,
          }}
        />
      ))}
      <span className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between rounded-b-2xl bg-gradient-to-t from-black/70 to-transparent p-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-white">{label}</span>
        <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold text-white">
          +{photos.length}
        </span>
      </span>
    </button>
  );
}

export function LifeGallery() {
  const [activeGallery, setActiveGallery] = useState<readonly Photo[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openGallery = (photos: readonly Photo[]) => {
    setActiveGallery(photos);
    setLightboxIndex(0);
  };

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

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <Reveal className="group relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-2xl border border-white/10 sm:aspect-auto">
            <Link href="/achievements/temenos-techdays-2026-shark-tank" className="block h-full w-full">
              <Image
                src="/achievement-techdays-2026.jpg"
                alt="Avenza team celebrating the Shark Tank win at Temenos TechDays 2026"
                width={1206}
                height={805}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-white">
                  Shark Tank Win &middot; TechDays &apos;26
                </span>
                <span className="rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold text-white">
                  Read the story &rarr;
                </span>
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.06} className="aspect-square overflow-hidden rounded-2xl">
            <PhotoStackTile
              label="Celebrations"
              photos={celebrationPhotos}
              onOpen={() => openGallery(celebrationPhotos)}
            />
          </Reveal>

          <Reveal delay={0.12} className="aspect-square overflow-hidden rounded-2xl">
            <PhotoStackTile
              label="Sports & Games"
              photos={sportsPhotos}
              onOpen={() => openGallery(sportsPhotos)}
            />
          </Reveal>

          <Reveal delay={0.18} className="aspect-square overflow-hidden rounded-2xl">
            <PhotoStackTile
              label="Team Offsites"
              photos={offsitePhotos}
              onOpen={() => openGallery(offsitePhotos)}
            />
          </Reveal>

          {placeholderTiles.map((tile, i) => (
            <Reveal key={tile.id} delay={(i + 4) * 0.06} className="aspect-square overflow-hidden rounded-2xl border border-white/10">
              <div
                className="relative flex h-full w-full items-center justify-center bg-surface"
                style={{ background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, ${tile.color} 25%, transparent), transparent 70%)` }}
              >
                <div className="bg-grid absolute inset-0 opacity-10" aria-hidden="true" />
                <span className="relative px-3 text-center text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {tile.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-text-dim">
          More photos from the team coming soon.
        </p>
      </div>

      {activeGallery && (
        <Lightbox
          images={activeGallery}
          index={lightboxIndex}
          onClose={() => setActiveGallery(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}

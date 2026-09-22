"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import {
  fetchAllLifePhotos,
  isLifePhotosSheetConfigured,
  type LifePhoto,
  type LifePhotoCategory,
} from "@/lib/lifePhotosSheet";

const achievementPhoto: LifePhoto = {
  id: "techdays-2026",
  src: "/achievement-techdays-2026.jpg",
  alt: "Avenza team celebrating the Shark Tank win at Temenos TechDays 2026",
  caption: "the Shark Tank win 🦈",
  featured: false,
};

const categoryMeta: Record<LifePhotoCategory, { emoji: string; label: string; tagline: string }> = {
  yercaud: {
    emoji: "⛰️",
    label: "Yercaud 2026",
    tagline: "The whole company took the hills for a weekend.",
  },
  celebrations: {
    emoji: "🎂",
    label: "Cake & Celebrations",
    tagline: "We'll find a reason to celebrate. There's always a reason.",
  },
  cricket: {
    emoji: "🏏",
    label: "Cricket & Chaos",
    tagline: "Deadlines pause, the scoreboard doesn't.",
  },
  "team-outing": {
    emoji: "✈️",
    label: "On the Road",
    tagline: "Chennai, Hyderabad, and wherever the team lands next.",
  },
};

const categoryOrder: LifePhotoCategory[] = ["yercaud", "celebrations", "cricket", "team-outing"];

const vibeTags = [
  "☕ Coffee & code",
  "🎉 Celebrations",
  "🏏 Friday cricket",
  "🎓 Cert wins",
  "🧠 Always learning",
  "🤝 Giving back",
  "✈️ Offsites",
  "🎮 Game nights",
];

// Deterministic pseudo-random rotation per photo (avoids SSR/CSR hydration
// mismatch that Math.random() would cause, while still looking scattered).
function rotationFor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  const degrees = (Math.abs(hash) % 900) / 100 - 4.5; // -4.5deg .. 4.5deg
  return `${degrees.toFixed(2)}deg`;
}

function PolaroidTile({
  photo,
  isStory,
  onOpen,
}: {
  photo: LifePhoto;
  isStory: boolean;
  onOpen: () => void;
}) {
  const rotation = rotationFor(photo.id);
  const tile = (
    <figure
      className="group relative mb-4 break-inside-avoid rounded-[3px] bg-white p-2 pb-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:z-10 hover:-rotate-0! hover:scale-105"
      style={{ transform: `rotate(${rotation})` }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-soft">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 45vw"
          className="object-cover"
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
      </div>
      {photo.caption && (
        <figcaption className="font-hand mt-1 truncate px-1 text-center text-lg text-ink-soft">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );

  if (isStory) {
    return (
      <Link href="/achievements/temenos-techdays-2026-shark-tank" className="block">
        {tile}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onOpen} aria-label={`View photo: ${photo.alt}`} className="block w-full text-left">
      {tile}
    </button>
  );
}

export function LifeGallery() {
  const [photosByCategory, setPhotosByCategory] = useState<Record<LifePhotoCategory, LifePhoto[]> | null>(null);
  const [lightbox, setLightbox] = useState<{ categoryId: string; index: number } | null>(null);
  const [activeFilter, setActiveFilter] = useState<LifePhotoCategory | "all">("all");

  useEffect(() => {
    if (!isLifePhotosSheetConfigured) return;
    let cancelled = false;
    fetchAllLifePhotos().then((result) => {
      if (cancelled || !result) return;
      setPhotosByCategory(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = categoryOrder.map((id) => {
    const meta = categoryMeta[id];
    const sheetPhotos = photosByCategory?.[id] ?? [];
    const photos = id === "celebrations" ? [achievementPhoto, ...sheetPhotos] : sheetPhotos;
    return { id, ...meta, photos };
  });

  const visibleCategories = activeFilter === "all" ? categories : categories.filter((c) => c.id === activeFilter);

  return (
    <section className="relative border-t border-white/5 bg-ink-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Moments Worth Sharing
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Serious about banking. Not so serious about ourselves.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            We build critical banking technology — and we have a good time doing it. Here&apos;s a look at
            the people, the moments and the mischief behind Avenza.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
          {vibeTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-text-muted"
            >
              {tag}
            </span>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              activeFilter === "all"
                ? "border-amber/60 bg-amber/15 text-white"
                : "border-white/10 text-text-muted hover:border-white/25 hover:text-text-primary"
            }`}
          >
            All
          </button>
          {categoryOrder.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveFilter(id)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                activeFilter === id
                  ? "border-amber/60 bg-amber/15 text-white"
                  : "border-white/10 text-text-muted hover:border-white/25 hover:text-text-primary"
              }`}
            >
              {categoryMeta[id].label}
            </button>
          ))}
        </Reveal>

        {photosByCategory === null ? (
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl border border-white/10 bg-surface" />
            ))}
          </div>
        ) : (
          <div className="mt-14 space-y-16 sm:mt-16 sm:space-y-20">
            {visibleCategories.map((cat) => (
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

                <div className="mt-8 columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5">
                  {cat.photos.map((photo, i) => (
                    <Reveal key={photo.id} delay={Math.min(i, 8) * 0.03} distance={12} className="break-inside-avoid">
                      <PolaroidTile
                        photo={photo}
                        isStory={photo.id === "techdays-2026"}
                        onOpen={() => setLightbox({ categoryId: cat.id, index: i })}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

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

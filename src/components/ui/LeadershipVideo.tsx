"use client";

import { useEffect, useRef } from "react";

/**
 * A "living portrait": the leadership headshot as a short, silent, looping
 * clip. It stays paused on the poster (the original photo) under
 * prefers-reduced-motion, so it degrades gracefully to the still image.
 * Muted is forced in JS because React can miss the `muted` attribute, which
 * would otherwise block autoplay.
 */
export function LeadershipVideo({
  src,
  poster,
  name,
}: {
  src: string;
  poster: string;
  name: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${name}, Avenza leadership`}
      className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
    />
  );
}

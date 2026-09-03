"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently most in view, for
 * highlighting the matching nav link. Only runs on "/" — the only route
 * with in-page section anchors; other routes rely on pathname matching
 * instead (see Header.tsx).
 */
export function useActiveSection(sectionIds: string[], enabled: boolean) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const NAV_OFFSET = 96;

    // Primary: IntersectionObserver, cheap and event-driven.
    const visibleRatios = new Map<string, number>();
    const computeBest = () => {
      let bestId: string | null = null;
      let bestRatio = 0;
      for (const [id, ratio] of visibleRatios) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }
      return bestRatio > 0 ? bestId : null;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        setActiveId(computeBest());
      },
      { rootMargin: `-${NAV_OFFSET}px 0px -60% 0px`, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => observer.observe(el));

    // Backstop: IntersectionObserver can miss the "entering" transition
    // after an instant (non-smooth) scroll jump — e.g. browser back/
    // forward with scroll restoration, or a hash deep link. A cheap
    // scroll-driven recompute keeps the highlight correct regardless.
    const recomputeFromScroll = () => {
      const probeY = NAV_OFFSET + 1;
      let bestId: string | null = null;
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          bestId = el.id;
          break;
        }
      }
      setActiveId((prev) => (bestId === prev ? prev : bestId));
    };
    recomputeFromScroll();
    window.addEventListener("scroll", recomputeFromScroll, { passive: true });
    window.addEventListener("resize", recomputeFromScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", recomputeFromScroll);
      window.removeEventListener("resize", recomputeFromScroll);
    };
  }, [sectionIds, enabled]);

  return activeId;
}

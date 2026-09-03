"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  distance = 28,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const variants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  };
  const MotionTag = as === "span" ? motion.span : motion.div;
  const ref = useRef<HTMLDivElement | HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const el = ref.current;
    if (!el) return;

    const reveal = () => setRevealed(true);

    // Backstop for environments where the IntersectionObserver never
    // reports an "entering" transition — e.g. the element is already
    // inside the viewport at mount time (deep links, restored scroll
    // position, programmatic scroll jumps), or the tab is backgrounded
    // (Chromium suppresses IntersectionObserver callbacks while
    // document.hidden). Without this, whileInView can leave content
    // permanently at opacity: 0.
    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible || document.hidden) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);

    const onVisibilityChange = () => {
      if (document.hidden) reveal();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [revealed]);

  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial="hidden"
      animate={revealed ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

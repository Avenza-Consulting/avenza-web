"use client";

import { useEffect, useRef, useState } from "react";

// Interactive banking ecosystem — ported from the earlier Avenza site's hero
// animation: Avenza at the nucleus, capability nodes orbiting on spokes as one
// rigid ring (SMIL-driven, with each label counter-rotating so it stays
// upright), and a static outer ring. The whole diagram parallaxes toward the
// cursor and the nearest spoke lights up as you sweep across it. Fully still
// under prefers-reduced-motion.

const SIZE = 680;
const CENTER = SIZE / 2;
const R_INNER = 168; // inner ring — capabilities orbiting on spokes
const R_OUTER = 262; // outer concentric ring — supporting capabilities

const SPIN_INNER = 60; // seconds per revolution (inner ring)

type Node = { id: string; label: string; x: number; y: number; dy: number };

const innerItems = [
  { id: "core", label: "Core Banking" },
  { id: "payments", label: "Payments" },
  { id: "channels", label: "Digital Channels" },
  { id: "fcm", label: "FCM" },
  { id: "datahub", label: "Data Hub" },
] as const;

const outerItems = [
  { id: "integration", label: "System Integration" },
  { id: "cloud", label: "Cloud" },
  { id: "ai", label: "AI" },
  { id: "migration", label: "Data Migration" },
] as const;

function ring(items: readonly { id: string; label: string }[], radius: number, startDeg: number): Node[] {
  const n = items.length;
  return items.map((it, i) => {
    const rad = ((startDeg + (360 / n) * i) * Math.PI) / 180;
    const y = CENTER + radius * Math.sin(rad);
    return { id: it.id, label: it.label, x: CENTER + radius * Math.cos(rad), y, dy: y < CENTER ? -20 : 28 };
  });
}

export function SolarOrbitVisual() {
  const inner = ring(innerItems, R_INNER, -90);
  const outer = ring(outerItems, R_OUTER, -45);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<string | null>(null);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        setParallax({ x: nx * 26, y: ny * 26 });
        // Nearest inner node — measured from the LIVE (revolving) positions.
        let best: string | null = null;
        let bestD = Infinity;
        el.querySelectorAll<SVGGElement>("[data-node]").forEach((g) => {
          const b = g.getBoundingClientRect();
          const d = (b.left + b.width / 2 - e.clientX) ** 2 + (b.top + b.height / 2 - e.clientY) ** 2;
          if (d < bestD) {
            bestD = d;
            best = g.dataset.node ?? null;
          }
        });
        setActive(best);
      });
    };
    const onLeave = () => {
      setParallax({ x: 0, y: 0 });
      setActive(null);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  // A label that counter-rotates so it stays upright while its ring revolves.
  const Label = (n: Node, spin: number, dir: 1 | -1) => (
    <text
      key={`t-${n.id}`}
      x={n.x}
      y={n.y + n.dy}
      textAnchor="middle"
      fontFamily="var(--font-mono, monospace)"
      style={{ fontSize: 12, letterSpacing: "0.03em" }}
      fill="var(--color-text-muted)"
      paintOrder="stroke"
      stroke="var(--color-ink)"
      strokeWidth="4"
    >
      {!reduced && (
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from={`0 ${n.x} ${n.y}`}
          to={`${-dir * 360} ${n.x} ${n.y}`}
          dur={`${spin}s`}
          repeatCount="indefinite"
        />
      )}
      {n.label}
    </text>
  );

  return (
    <div ref={wrapRef} className="relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden="true">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,138,43,0.26), transparent 70%)" }}
      />
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="relative h-full w-full overflow-visible"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          transition: reduced ? undefined : "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <defs>
          <radialGradient id="solarHub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="100%" stopColor="#c96e00" />
          </radialGradient>
          <linearGradient id="solarFlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34e0d9" stopOpacity="0" />
            <stop offset="50%" stopColor="#34e0d9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff8a2b" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Static orbit guides */}
        <circle cx={CENTER} cy={CENTER} r={R_INNER} fill="none" stroke="var(--color-text-muted)" strokeOpacity="0.12" strokeWidth="1" />
        <circle cx={CENTER} cy={CENTER} r={R_OUTER} fill="none" stroke="var(--color-text-muted)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 7" />

        {/* Inner ring — capabilities, revolving clockwise as one rigid unit */}
        <g>
          {!reduced && (
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from={`0 ${CENTER} ${CENTER}`}
              to={`360 ${CENTER} ${CENTER}`}
              dur={`${SPIN_INNER}s`}
              repeatCount="indefinite"
            />
          )}
          {inner.map((n, i) => (
            <g key={`spoke-${n.id}`}>
              <line
                x1={CENTER}
                y1={CENTER}
                x2={n.x}
                y2={n.y}
                stroke={active === n.id ? "#ffc78f" : "var(--color-text-dim)"}
                strokeOpacity={active === n.id ? 1 : 0.3}
                strokeWidth={active === n.id ? 2 : 1}
                style={{ transition: "stroke 0.25s, stroke-width 0.25s, stroke-opacity 0.25s" }}
              />
              {!reduced && (
                <line
                  x1={CENTER}
                  y1={CENTER}
                  x2={n.x}
                  y2={n.y}
                  stroke="url(#solarFlow)"
                  strokeWidth="2.5"
                  strokeDasharray="14 190"
                  className="avz-flow"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              )}
            </g>
          ))}
          {inner.map((n) => (
            <g key={`n-${n.id}`} data-node={n.id}>
              {/* soft halo */}
              <circle cx={n.x} cy={n.y} r={20} fill="#ff8a2b" opacity={0.18} />
              {/* solid amber ball */}
              <circle
                cx={n.x}
                cy={n.y}
                r={11}
                fill="#ff8a2b"
                stroke="#ffc78f"
                strokeWidth={active === n.id ? 3 : 1.5}
                strokeOpacity={active === n.id ? 1 : 0.55}
                style={{ transition: "stroke-width 0.25s, stroke-opacity 0.25s" }}
              />
            </g>
          ))}
          {inner.map((n) => Label(n, SPIN_INNER, 1))}
        </g>

        {/* Outer ring — supporting capabilities, static at the four corners */}
        <g>
          {outer.map((n) => (
            <circle key={`c-${n.id}`} cx={n.x} cy={n.y} r={5} fill="var(--color-ink)" stroke="#34e0d9" strokeWidth="1.5" strokeOpacity={0.85} />
          ))}
          {outer.map((n) => (
            <text
              key={`ct-${n.id}`}
              x={n.x}
              y={n.y + n.dy}
              textAnchor="middle"
              fontFamily="var(--font-mono, monospace)"
              style={{ fontSize: 11.5, letterSpacing: "0.03em" }}
              fill="var(--color-text-muted)"
            >
              {n.label}
            </text>
          ))}
        </g>

        {/* Hub — with concentric ripples emanating outward */}
        {!reduced &&
          [0, 1].map((i) => (
            <circle
              key={`ripple-${i}`}
              cx={CENTER}
              cy={CENTER}
              r="46"
              fill="none"
              stroke="#ffb066"
              strokeWidth="1"
              className="avz-ripple"
              style={{ animationDelay: `${i * 2}s` }}
            />
          ))}
        <circle cx={CENTER} cy={CENTER} r="46" fill="url(#solarHub)" />
        <circle cx={CENTER} cy={CENTER} r="46" fill="none" stroke="#ffc78f" strokeOpacity="0.4" strokeWidth="1" />
        <text x={CENTER} y={CENTER + 5} textAnchor="middle" fontFamily="var(--font-display)" style={{ fontSize: 18, fontWeight: 700 }} fill="#161b26">
          Avenza
        </text>
      </svg>

      <style jsx>{`
        .avz-flow {
          animation: avz-dash 3s linear infinite;
        }
        @keyframes avz-dash {
          from {
            stroke-dashoffset: 204;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .avz-ripple {
          transform-origin: center;
          animation: avz-ripple 4s ease-out infinite;
        }
        @keyframes avz-ripple {
          0% {
            r: 46px;
            opacity: 0.22;
          }
          100% {
            r: 140px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

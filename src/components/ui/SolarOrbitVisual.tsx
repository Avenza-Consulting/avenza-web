"use client";

import { useRef, useState } from "react";

// A "solar system" hero diagram inspired by the reference site
// (avenza-website.vercel.app): a fixed Avenza hub at the centre, with the
// five inner capability nodes — Core Banking, Payments, Digital Channels,
// FCM, Data Hub — orbiting around it as a single rigid unit (spokes,
// travelling light, node and label all rotate together, so a label can
// never separate from its own node). The four smaller outer nodes stay
// fixed, matching the reference site. Ripple rings pulse from the hub, and
// the whole diagram tilts slightly toward the cursor on hover.

const CENTER = 340;
const INNER_R = 168;
const OUTER_R = 262;
const INNER_NODE_R = 11;
const INNER_GLOW_R = 20;
const OUTER_NODE_R = 5;
const HUB_R = 46;

const innerNodes = [
  { id: "core", label: "Core Banking", angleDeg: -90 },
  { id: "payments", label: "Payments", angleDeg: -18 },
  { id: "channels", label: "Digital Channels", angleDeg: 54 },
  { id: "fcm", label: "FCM", angleDeg: 126 },
  { id: "datahub", label: "Data Hub", angleDeg: 198 },
] as const;

const outerNodes = [
  { id: "integration", label: "System Integration", angleDeg: -45 },
  { id: "cloud", label: "Cloud", angleDeg: 45 },
  { id: "ai", label: "AI", angleDeg: 135 },
  { id: "migration", label: "Data Migration", angleDeg: 225 },
] as const;

function pointOnRing(angleDeg: number, radius: number) {
  const angle = (angleDeg * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) };
}

// Places a label a short distance further out along the same radial line
// as its node, in the node's own local (pre-rotation) frame. Since the
// label lives inside the same rotating group as its node, this radial
// offset rotates together with it — so the label always sits hugging the
// node on the side away from the hub, at any point in the orbit, instead
// of a fixed vertical offset that reads as a diagonal gap once rotated.
function radialLabelPoint(angleDeg: number, nodeRadius: number, gap: number) {
  const angle = (angleDeg * Math.PI) / 180;
  const r = nodeRadius + gap;
  return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) };
}

export function SolarOrbitVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredHub, setHoveredHub] = useState(false);

  const inner = innerNodes.map((n) => ({ ...n, ...pointOnRing(n.angleDeg, INNER_R) }));
  const outer = outerNodes.map((n) => ({ ...n, ...pointOnRing(n.angleDeg, OUTER_R) }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = wrapRef.current?.getBoundingClientRect();
    if (!box) return;
    const dx = (e.clientX - (box.left + box.width / 2)) / box.width;
    const dy = (e.clientY - (box.top + box.height / 2)) / box.height;
    setTilt({ x: dx * -12, y: dy * -12 });
  };

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[560px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        className="animate-pulse-glow pointer-events-none absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,138,43,0.26), transparent 70%)" }}
      />
      <svg
        viewBox="0 0 680 680"
        className="relative h-full w-full overflow-visible"
        style={{
          transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)`,
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
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

        <circle cx={CENTER} cy={CENTER} r={INNER_R} fill="none" stroke="var(--color-text-muted)" strokeOpacity="0.12" strokeWidth="1" />
        <circle cx={CENTER} cy={CENTER} r={OUTER_R} fill="none" stroke="var(--color-text-muted)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 7" />

        {/* ripple rings pulsing outward from the hub, under the orbiting ring */}
        <circle cx={CENTER} cy={CENTER} r={HUB_R} fill="none" stroke="#ffb066" style={{ animation: "hub-ripple 4s ease-out infinite" }} />
        <circle cx={CENTER} cy={CENTER} r={HUB_R} fill="none" stroke="#ffb066" style={{ animation: "hub-ripple 4s ease-out 2s infinite" }} />

        {/* inner ring: orbits as one rigid unit — each spoke, node and its
            label rotate together, so a label can never drift off its node.
            Plain CSS animation (not Framer's `animate` prop) because Framer
            normalizes SVG transform-origin to a percentage of the element's
            own bounding box, which breaks the counter-rotation below —
            CSS animation respects a literal pixel transform-origin as-is. */}
        <g style={{ animation: "orbit-spin 60s linear infinite", transformOrigin: `${CENTER}px ${CENTER}px` }}>
          {inner.map((n) => {
            const isHovered = hoveredId === n.id || hoveredHub;
            return (
              <line
                key={`line-${n.id}`}
                x1={CENTER}
                y1={CENTER}
                x2={n.x}
                y2={n.y}
                stroke={isHovered ? "#ffc78f" : "var(--color-text-dim)"}
                strokeOpacity={isHovered ? 1 : 0.3}
                strokeWidth={isHovered ? 2.5 : 1}
                style={{ transition: "stroke 0.2s, stroke-width 0.2s, stroke-opacity 0.2s" }}
              />
            );
          })}

          {inner.map((n, i) => (
            <line
              key={`flow-${n.id}`}
              x1={CENTER}
              y1={CENTER}
              x2={n.x}
              y2={n.y}
              stroke="url(#solarFlow)"
              strokeWidth="3"
              strokeDasharray="14 154"
              style={{ animation: "dash-flow 3s linear infinite", animationDelay: `${i * 0.5}s` }}
            />
          ))}

          {inner.map((n) => {
            const label = radialLabelPoint(n.angleDeg, INNER_R, 26);
            const isHovered = hoveredId === n.id || hoveredHub;
            return (
              <g
                key={n.id}
                onMouseEnter={() => setHoveredId(n.id)}
                onMouseLeave={() => setHoveredId((cur) => (cur === n.id ? null : cur))}
                style={{ cursor: "pointer" }}
              >
                <circle cx={n.x} cy={n.y} r={INNER_GLOW_R} fill="#ff8a2b" opacity="0.18" />
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={INNER_NODE_R}
                  fill="#ff8a2b"
                  stroke="#ffc78f"
                  strokeWidth={isHovered ? 3 : 1.5}
                  strokeOpacity={isHovered ? 1 : 0.55}
                  style={{ transition: "stroke-width 0.2s, stroke-opacity 0.2s" }}
                />
                {/* counter-rotate so the label stays horizontal and readable
                    while still moving with its node — safe here because
                    only this one ring rotates (the outer ring is fixed), so
                    there's no second independently-moving ring for a label
                    to sweep across */}
                <g
                  style={{
                    animation: "orbit-spin-reverse 60s linear infinite",
                    transformOrigin: `${label.x}px ${label.y}px`,
                  }}
                >
                  <text
                    x={label.x}
                    y={label.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="var(--font-mono, monospace)"
                    style={{ fontSize: "12px", letterSpacing: "0.03em" }}
                    fill="var(--color-text-muted)"
                    paintOrder="stroke"
                    stroke="var(--color-ink)"
                    strokeWidth="4"
                  >
                    {n.label}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        {outer.map((n) => (
          <circle key={n.id} cx={n.x} cy={n.y} r={OUTER_NODE_R} fill="var(--color-ink)" stroke="#34e0d9" strokeWidth="1.5" strokeOpacity="0.85" />
        ))}
        {outer.map((n) => {
          const label = radialLabelPoint(n.angleDeg, OUTER_R, 20);
          return (
            <text
              key={`label-${n.id}`}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono, monospace)"
              style={{ fontSize: "11.5px", letterSpacing: "0.03em" }}
              fill="var(--color-text-muted)"
            >
              {n.label}
            </text>
          );
        })}

        <g
          onMouseEnter={() => setHoveredHub(true)}
          onMouseLeave={() => setHoveredHub(false)}
          style={{ cursor: "pointer" }}
        >
          <circle cx={CENTER} cy={CENTER} r={HUB_R} fill="url(#solarHub)" />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={HUB_R}
            fill="none"
            stroke="#ffc78f"
            strokeOpacity={hoveredHub ? 0.9 : 0.4}
            strokeWidth={hoveredHub ? 2.5 : 1}
            style={{ transition: "stroke-width 0.2s, stroke-opacity 0.2s" }}
          />
          <text
            x={CENTER}
            y={CENTER + 5}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            style={{ fontSize: "18px", fontWeight: 700 }}
            fill="#161b26"
          >
            Avenza
          </text>
        </g>
      </svg>
    </div>
  );
}

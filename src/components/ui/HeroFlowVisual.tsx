"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// angleDeg is measured clockwise from straight up (12 o'clock = -90 in
// standard math convention). Payments & FCM is placed close to Digital
// Banking & Journey Manager, and Wealth & Islamic Banking close to Data Hub
// & Treasury, so the two related pairs read as grouped around the hub.
// icon: a small glyph representing what flows toward the hub from that
// product area — a bank building for core banking, mobile journeys, card
// payments, wealth balances, or a database stack for data hub & treasury —
// drawn in a shared 24x24 box centered on the origin so it can be scaled
// and placed without per-icon offsets.
// Outer ring = the Temenos platform, so it reads in a single cohesive blue
// family (subtle shade variation keeps it alive without going multi-color).
// The Avenza hub stays orange and the outcomes amber, so the story is:
// blue Temenos products flow IN → orange Avenza → amber outcomes flow OUT.
const products = [
  { id: "core", lines: ["Core Banking"], color: "#4a90ff", angleDeg: -90, icon: "bank" },
  { id: "digital", lines: ["Digital Banking"], color: "#3d8bff", angleDeg: -18, icon: "mobile" },
  { id: "payments", lines: ["Payments & FCM"], color: "#5b9dff", angleDeg: 40, icon: "payment" },
  { id: "wealth", lines: ["Wealth &", "Islamic Banking"], color: "#2e79f0", angleDeg: 140, icon: "wallet" },
  { id: "datahub", lines: ["Data Hub &", "Treasury"], color: "#6aa8ff", angleDeg: 198, icon: "database" },
] as const;

const FLOW_ICONS: Record<(typeof products)[number]["icon"], string> = {
  // classical bank building — pediment roof, columns, base plinth
  bank:
    "M-9,-4 L0,-9 L9,-4 Z M-8,-4 L8,-4 M-7,-4 L-7,4 M-3.5,-4 L-3.5,4 M3.5,-4 L3.5,4 M7,-4 L7,4 M-9,4 L9,4 M-9,7.5 L9,7.5 M-9,4 L-9,7.5 M9,4 L9,7.5",
  // cylinder / database stack
  database:
    "M-6,-6.5 C-6,-8 -3.3,-9 0,-9 C3.3,-9 6,-8 6,-6.5 C6,-5 3.3,-4 0,-4 C-3.3,-4 -6,-5 -6,-6.5 Z M-6,-6.5 L-6,6.5 C-6,8 -3.3,9 0,9 C3.3,9 6,8 6,6.5 L6,-6.5 M-6,0 C-6,1.5 -3.3,2.5 0,2.5 C3.3,2.5 6,1.5 6,0",
  // phone with a small screen dot
  mobile:
    "M-4,-9 L4,-9 C5,-9 5.5,-8.5 5.5,-7.5 L5.5,7.5 C5.5,8.5 5,9 4,9 L-4,9 C-5,9 -5.5,8.5 -5.5,7.5 L-5.5,-7.5 C-5.5,-8.5 -5,-9 -4,-9 Z M-2,-6.5 L2,-6.5 M0,6 L0.01,6",
  // card with a swipe line and transfer arrows
  payment:
    "M-9,-5.5 L9,-5.5 C9.8,-5.5 10.4,-4.9 10.4,-4.1 L10.4,4.1 C10.4,4.9 9.8,5.5 9,5.5 L-9,5.5 C-9.8,5.5 -10.4,4.9 -10.4,4.1 L-10.4,-4.1 C-10.4,-4.9 -9.8,-5.5 -9,-5.5 Z M-10.4,-1.8 L10.4,-1.8 M-6,2 L-2,2",
  // wallet with a coin
  wallet:
    "M-9,-5 L6,-5 C7.7,-5 9,-3.7 9,-2 L9,5 C9,6.7 7.7,8 6,8 L-9,8 C-9,8 -9,-5 -9,-5 Z M-9,-5 C-9,-6.7 -7.7,-8 -6,-8 L4,-8 M3,1.5 A2,2 0 1 0 3,1.4",
};

const outcomes = [
  { id: "modernized", label: "Modernized Core", icon: "upgrade" },
  { id: "integration", label: "Seamless Integration", icon: "puzzle" },
  { id: "time-to-market", label: "Faster Time-to-Market", icon: "speed" },
  { id: "compliance", label: "Regulatory Compliance", icon: "shield" },
] as const;

const OUTCOME_ICONS: Record<(typeof outcomes)[number]["icon"], string> = {
  // upward step-chart with a rising arrow
  upgrade:
    "M-9,8 L-9,2 L-4,2 L-4,-2 L1,-2 L1,-6 L6,-6 M2,-9 L6,-6 L2,-3",
  // two interlocking puzzle pieces
  puzzle:
    "M-9,-2 L-9,-7 C-9,-8 -8,-8.5 -7.2,-8 C-6.7,-7.7 -6.7,-7 -7.2,-6.6 C-7.8,-6.1 -7.8,-5.2 -7,-4.8 C-6.3,-4.4 -5.5,-4.9 -5.5,-5.7 C-5.5,-6.3 -5.9,-6.6 -6.2,-6.9 C-6.7,-7.4 -6.6,-8.2 -6,-8.5 C-5.2,-9 -4.2,-8.4 -4.2,-7.5 L-4.2,-2 L2,-2 M2,-2 L7,-2 L7,3 C7,3.8 6.4,4.2 5.7,3.7 C5.3,3.4 4.6,3.5 4.3,4 C3.9,4.7 4.5,5.5 5.3,5.5 C5.9,5.5 6.2,5.1 6.5,4.8 C7,4.3 7.8,4.4 8.1,5 C8.6,5.8 8,6.8 7.1,6.8 L2,6.8 Z",
  // speedometer / gauge with a fast-forward needle
  speed:
    "M-8,4 A8,8 0 1 1 8,4 M0,4 L4,-3 M-8,4 L-6,4 M8,4 L6,4 M0,-8 L0,-6",
  // shield with a checkmark
  shield:
    "M0,-9 L7,-6.5 L7,0.5 C7,4.5 4,7.5 0,9 C-4,7.5 -7,4.5 -7,0.5 L-7,-6.5 Z M-3.3,0 L-1,2.5 L3.3,-2.5",
};

const CENTER_X = 300;
const CENTER_Y = 248;
const RING_R = 168;
const NODE_R = 42;
const HUB_R = 62;
const LABEL_GAP = 20;
const OUTCOME_Y = 525;
const OUTCOME_W = 112;
const OUTCOME_H = 48;
const OUTCOME_SPREAD = 118;

function pointOnRing(angleDeg: number, radius: number) {
  const angle = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER_X + radius * Math.cos(angle),
    y: CENTER_Y + radius * Math.sin(angle),
    angle,
  };
}

/**
 * Places each label outward along the same radial angle as its node —
 * a fixed offset isn't enough, since it has to clear the node's own
 * circle in every direction: a node at the top of the ring needs the
 * label pushed up past NODE_R, one at dead-left/right needs it pushed
 * sideways past NODE_R, not just by a flat pixel gap either way.
 */
function labelPosition(x: number, y: number, angle: number, lineCount: number) {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const extraForWrap = lineCount > 1 ? 10 : 0;
  const offset = NODE_R + LABEL_GAP + extraForWrap;
  const labelX = x + dx * offset;
  const labelY = y + dy * offset + (Math.abs(dy) < 0.5 ? 4 : 0);
  const textAnchor: "start" | "end" | "middle" = dx > 0.35 ? "start" : dx < -0.35 ? "end" : "middle";
  return { labelX, labelY, textAnchor };
}

// Expanding rings that emanate from a point while its element is hovered.
// Staggered so there's always one mid-flight, giving a continuous ripple.
function Ripples({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  return (
    <>
      {[0, 1, 2].map((k) => (
        <motion.circle
          key={k}
          cx={cx}
          cy={cy}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          initial={{ r, opacity: 0.5 }}
          animate={{ r: r + 46, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, delay: k * 0.53, ease: "easeOut" }}
          style={{ pointerEvents: "none" }}
        />
      ))}
    </>
  );
}

export function HeroFlowVisual() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [hoveredOutcome, setHoveredOutcome] = useState<string | null>(null);
  const [hoveredHub, setHoveredHub] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const productGeo = products.map((p) => {
    const { x, y, angle } = pointOnRing(p.angleDeg, RING_R);
    return { ...p, x, y, angle, ...labelPosition(x, y, angle, p.lines.length) };
  });

  const outcomeGeo = outcomes.map((o, i) => ({
    ...o,
    targetX: CENTER_X + (i - (outcomes.length - 1) / 2) * OUTCOME_SPREAD,
    i,
  }));

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <svg
        viewBox="0 0 628 622"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Interactive diagram showing five grouped Temenos product areas — Core Banking, Digital Banking and Journey Manager, Payments and Financial Crime Mitigation, Wealth Management and Islamic Banking, and Data Hub and Treasury — flowing into Avenza's services hub and out to delivery outcomes: modernized core, seamless integration, faster time-to-market and regulatory compliance"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8a2b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff8a2b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hubFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb066" />
            <stop offset="55%" stopColor="#ff8a2b" />
            <stop offset="100%" stopColor="#e0680f" />
          </linearGradient>
        </defs>

        {/* connectors: product -> hub, with a traveling icon along each */}
        {productGeo.map((p, i) => {
          const lineId = `edge-${p.id}`;
          const isOn = hoveredProduct === p.id || hoveredHub;
          const isDim = hoveredProduct !== null && hoveredProduct !== p.id;
          return (
            <g key={lineId} style={{ pointerEvents: "none" }}>
              <motion.g animate={{ opacity: isDim ? 0.2 : 1 }} transition={{ duration: 0.3 }}>
                <path
                  id={lineId}
                  d={`M ${p.x} ${p.y} L ${CENTER_X} ${CENTER_Y}`}
                  fill="none"
                  stroke={p.color}
                  strokeOpacity="0.45"
                  strokeWidth="3.5"
                  strokeDasharray="6 7"
                  className="animate-dash-flow"
                />
                <g opacity="0">
                  <animateMotion dur="3.12s" begin={`${i * 0.35}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                    <mpath href={`#${lineId}`} />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.12s" begin={`${i * 0.35}s`} repeatCount="indefinite" fill="freeze" />
                  <circle r="11" fill="var(--color-surface)" stroke={p.color} strokeWidth="1.5" />
                  <path
                    d={FLOW_ICONS[p.icon]}
                    transform="scale(0.68)"
                    fill="none"
                    stroke={p.color}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </motion.g>
              {/* highlighted overlay — a solid, glowing line on hover */}
              <motion.path
                d={`M ${p.x} ${p.y} L ${CENTER_X} ${CENTER_Y}`}
                fill="none"
                stroke={p.color}
                strokeWidth={5}
                strokeLinecap="round"
                initial={false}
                animate={{ opacity: isOn ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ filter: `drop-shadow(0 0 6px ${p.color})`, pointerEvents: "none" }}
              />
            </g>
          );
        })}

        {/* connectors: hub -> outcomes, terminating exactly at each outcome card */}
        {outcomeGeo.map((o) => {
          const pathId = `edge-out-${o.id}`;
          const d = `M ${CENTER_X} ${CENTER_Y + HUB_R} C ${CENTER_X} ${CENTER_Y + HUB_R + 95}, ${o.targetX} ${OUTCOME_Y - 50}, ${o.targetX} ${OUTCOME_Y - OUTCOME_H / 2 - 2}`;
          const isOn = hoveredOutcome === o.id || hoveredHub;
          const isDim = hoveredOutcome !== null && hoveredOutcome !== o.id;
          return (
            <g key={pathId} style={{ pointerEvents: "none" }}>
              <motion.g animate={{ opacity: isDim ? 0.2 : 1 }} transition={{ duration: 0.3 }}>
                <path
                  id={pathId}
                  d={d}
                  fill="none"
                  stroke="#ffb066"
                  strokeOpacity="0.65"
                  strokeWidth="3.5"
                  strokeDasharray="6 7"
                  className="animate-dash-flow"
                />
                <g opacity="0">
                  <animateMotion dur="3.36s" begin={`${1.6 + o.i * 0.3}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.36s" begin={`${1.6 + o.i * 0.3}s`} repeatCount="indefinite" fill="freeze" />
                  <circle r="11" fill="var(--color-surface)" stroke="#ffb066" strokeWidth="1.5" />
                  <path
                    d={OUTCOME_ICONS[o.icon]}
                    transform="scale(0.68)"
                    fill="none"
                    stroke="#ffb066"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </motion.g>
              <motion.path
                d={d}
                fill="none"
                stroke="#ffb066"
                strokeWidth={5}
                strokeLinecap="round"
                initial={false}
                animate={{ opacity: isOn ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ filter: "drop-shadow(0 0 6px #ffb066)", pointerEvents: "none" }}
              />
            </g>
          );
        })}

        {/* product nodes (interactive) */}
        {productGeo.map((p, i) => {
          const isHovered = hoveredProduct === p.id;
          const isDim = hoveredProduct !== null && !isHovered;
          const growsUpward = Math.sin(p.angle) < -0.85 && p.lines.length > 1;
          return (
            <motion.g
              key={p.id}
              onMouseEnter={() => setHoveredProduct(p.id)}
              onMouseLeave={() => setHoveredProduct((cur) => (cur === p.id ? null : cur))}
              animate={{ opacity: isDim ? 0.4 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ cursor: "pointer" }}
            >
              {isHovered && !reduced && <Ripples cx={p.x} cy={p.y} r={NODE_R} color={p.color} />}

              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R + 8}
                fill={p.color}
                opacity="0.1"
                className="animate-pulse-glow"
                style={{ animationDelay: `${i * 0.25}s`, pointerEvents: "none" }}
              />
              {/* node base — the hit target; grows and glows on hover */}
              <motion.circle
                cx={p.x}
                cy={p.y}
                fill="var(--color-surface)"
                stroke={p.color}
                initial={false}
                animate={{ r: isHovered ? NODE_R + 4 : NODE_R, strokeWidth: isHovered ? 3 : 1.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ filter: isHovered ? `drop-shadow(0 0 11px ${p.color})` : "none" }}
              />
              <path
                d={FLOW_ICONS[p.icon]}
                transform={`translate(${p.x} ${p.y}) scale(1.15)`}
                fill="none"
                stroke={p.color}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pointerEvents: "none" }}
              />
              <text
                x={p.labelX}
                y={p.labelY}
                textAnchor={p.textAnchor}
                fontSize="11"
                fontWeight={isHovered ? "700" : "600"}
                fill={isHovered ? p.color : "var(--color-text-muted)"}
                fontFamily="var(--font-body)"
                style={{ pointerEvents: "none", transition: "fill 0.2s" }}
              >
                {(growsUpward ? [...p.lines].reverse() : p.lines).map((line, li) => (
                  <tspan key={li} x={p.labelX} dy={li === 0 ? 0 : growsUpward ? -14 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>
            </motion.g>
          );
        })}

        {/* Avenza hub (interactive — hovering it lights the whole system) */}
        <motion.g
          onMouseEnter={() => setHoveredHub(true)}
          onMouseLeave={() => setHoveredHub(false)}
          style={{ cursor: "pointer" }}
        >
          {hoveredHub && !reduced && <Ripples cx={CENTER_X} cy={CENTER_Y} r={HUB_R} color="#ff8a2b" />}
          <circle cx={CENTER_X} cy={CENTER_Y} r={HUB_R + 26} fill="url(#hubGlow)" style={{ pointerEvents: "none" }} />
          <motion.circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={HUB_R}
            fill="url(#hubFill)"
            stroke="#ffc78f"
            initial={false}
            animate={{ strokeWidth: hoveredHub ? 3 : 2 }}
            transition={{ duration: 0.3 }}
            style={{ filter: hoveredHub ? "drop-shadow(0 0 18px #ff8a2b)" : "drop-shadow(0 0 10px rgba(255,138,43,0.5))" }}
          />
          <circle cx={CENTER_X} cy={CENTER_Y} r={HUB_R - 12} fill="none" stroke="#06070a" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 4" style={{ pointerEvents: "none" }}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${CENTER_X} ${CENTER_Y}`}
              to={`360 ${CENTER_X} ${CENTER_Y}`}
              dur="14s"
              repeatCount="indefinite"
            />
          </circle>
          <text x={CENTER_X} y={CENTER_Y - 2} textAnchor="middle" fontSize="17" fontWeight="800" fill="#0a0a0a" fontFamily="var(--font-display)" style={{ pointerEvents: "none" }}>
            Avenza
          </text>
          <text x={CENTER_X} y={CENTER_Y + 18} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#06070a" fillOpacity="0.7" fontFamily="var(--font-body)" style={{ pointerEvents: "none" }}>
            Services Hub
          </text>
        </motion.g>

        {/* outcome cards — native SVG so the connector lines visibly land on them */}
        {outcomeGeo.map((o) => {
          const isHovered = hoveredOutcome === o.id;
          const isDim = hoveredOutcome !== null && !isHovered;
          const lines = o.label.split(" ").reduce<string[]>((acc, word) => {
            const last = acc[acc.length - 1];
            if (last && (last + " " + word).length <= 12) {
              acc[acc.length - 1] = last + " " + word;
            } else {
              acc.push(word);
            }
            return acc;
          }, []);
          const startY = OUTCOME_Y + 4 - ((lines.length - 1) * 13) / 2;
          const dotDur = 3.36;
          const dotBegin = 1.6 + o.i * 0.3;
          const arrivalOffset = dotDur * 0.85;
          return (
            <motion.g
              key={o.id}
              onMouseEnter={() => setHoveredOutcome(o.id)}
              onMouseLeave={() => setHoveredOutcome((cur) => (cur === o.id ? null : cur))}
              animate={{ opacity: isDim ? 0.4 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ cursor: "pointer" }}
            >
              {isHovered && !reduced && (
                <motion.rect
                  x={o.targetX - OUTCOME_W / 2}
                  y={OUTCOME_Y - OUTCOME_H / 2}
                  width={OUTCOME_W}
                  height={OUTCOME_H}
                  rx="10"
                  fill="none"
                  stroke="#ff8a2b"
                  strokeWidth={1.5}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.35, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  style={{ transformOrigin: `${o.targetX}px ${OUTCOME_Y}px`, transformBox: "fill-box", pointerEvents: "none" } as React.CSSProperties}
                />
              )}
              <motion.rect
                x={o.targetX - OUTCOME_W / 2}
                y={OUTCOME_Y - OUTCOME_H / 2}
                width={OUTCOME_W}
                height={OUTCOME_H}
                rx="10"
                fill="color-mix(in oklab, #ff8a2b 10%, var(--color-surface))"
                stroke="#ff8a2b"
                initial={false}
                animate={{ strokeOpacity: isHovered ? 1 : 0.5, strokeWidth: isHovered ? 2.5 : 1.5 }}
                transition={{ duration: 0.25 }}
                className={isHovered ? undefined : "animate-pulse-glow"}
                style={{ animationDelay: `${o.i * 0.3 + 1}s`, filter: isHovered ? "drop-shadow(0 0 10px #ff8a2b)" : "none" }}
              >
                {!isHovered && (
                  <>
                    <animate
                      attributeName="stroke-opacity"
                      values="0.5;1;0.5"
                      keyTimes="0;0.3;1"
                      dur={`${dotDur}s`}
                      begin={`${dotBegin + arrivalOffset}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-width"
                      values="1.5;3.5;1.5"
                      keyTimes="0;0.3;1"
                      dur={`${dotDur}s`}
                      begin={`${dotBegin + arrivalOffset}s`}
                      repeatCount="indefinite"
                    />
                  </>
                )}
              </motion.rect>
              <text
                x={o.targetX}
                y={startY}
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="700"
                fill="#ffb066"
                fontFamily="var(--font-body)"
                style={{ pointerEvents: "none" }}
              >
                {lines.map((line, li) => (
                  <tspan key={li} x={o.targetX} dy={li === 0 ? 0 : 13}>
                    {line}
                  </tspan>
                ))}
              </text>
            </motion.g>
          );
        })}

        <text
          x={CENTER_X}
          y={OUTCOME_Y + OUTCOME_H / 2 + 30}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#c9a06a"
          fontFamily="var(--font-body)"
          letterSpacing="1.5"
        >
          DELIVERED OUTCOMES
        </text>
      </svg>
    </div>
  );
}

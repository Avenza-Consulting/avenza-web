"use client";

import { motion } from "framer-motion";

export type EcosystemNode = {
  label: string;
  description: string;
  color: string;
  icon: string;
};

const CENTER = 260;
const RADIUS = 190;
const NODE_R = 44;

function pointOnCircle(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
    angle,
  };
}

export function EcosystemWheel({
  nodes,
  active,
  onSelect,
}: {
  nodes: EcosystemNode[];
  active: number;
  onSelect: (index: number) => void;
}) {
  const activeNode = nodes[active];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-xl">
      <svg viewBox="0 0 520 520" className="h-full w-full overflow-visible" role="img" aria-label="Interactive diagram of Avenza's connected banking ecosystem">
        <defs>
          <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-azure)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--color-azure)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CENTER} cy={CENTER} r={RADIUS + 40} fill="url(#wheelGlow)" />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--color-white)"
          strokeOpacity="0.08"
          strokeWidth="1"
          strokeDasharray="2 6"
        />

        {nodes.map((node, i) => {
          const { x, y } = pointOnCircle(i, nodes.length);
          const isActive = i === active;
          return (
            <line
              key={`spoke-${node.label}`}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke={isActive ? node.color : "var(--color-white)"}
              strokeOpacity={isActive ? 0.6 : 0.1}
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: "stroke-opacity 300ms ease, stroke-width 300ms ease" }}
            />
          );
        })}

        <foreignObject x={CENTER - 100} y={CENTER - 100} width="200" height="200">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-[200px] w-[200px] flex-col items-center justify-center rounded-full border p-6 text-center"
            style={{
              background: "var(--color-surface)",
              borderColor: `color-mix(in oklab, ${activeNode.color} 40%, transparent)`,
              boxShadow: `0 0 40px -8px color-mix(in oklab, ${activeNode.color} 35%, transparent)`,
            }}
          >
            <span className="font-display text-sm font-bold leading-snug text-text-primary sm:text-base">
              {activeNode.label}
            </span>
            <span className="mt-2 text-[11px] leading-snug text-text-muted sm:text-xs">
              {activeNode.description}
            </span>
          </motion.div>
        </foreignObject>

        {nodes.map((node, i) => {
          const { x, y } = pointOnCircle(i, nodes.length);
          const isActive = i === active;
          const labelBelow = y > CENTER + RADIUS * 0.3;
          const labelAbove = y < CENTER - RADIUS * 0.3;
          const labelY = labelBelow ? y + NODE_R + 22 : labelAbove ? y - NODE_R - 14 : y + 5;

          return (
            <g key={node.label}>
              <motion.circle
                cx={x}
                cy={y}
                r={NODE_R + 8}
                fill={node.color}
                opacity={isActive ? 0.16 : 0}
                animate={isActive ? { opacity: [0.16, 0.3, 0.16] } : { opacity: 0 }}
                transition={{ duration: 2.4, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
              />
              <circle
                cx={x}
                cy={y}
                r={NODE_R}
                fill="var(--color-surface)"
                stroke={node.color}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeOpacity={isActive ? 1 : 0.5}
                style={{ transition: "stroke-width 300ms ease, stroke-opacity 300ms ease" }}
              />
              <foreignObject x={x - NODE_R} y={y - NODE_R} width={NODE_R * 2} height={NODE_R * 2}>
                <button
                  type="button"
                  onClick={() => onSelect(i)}
                  aria-pressed={isActive}
                  aria-label={node.label}
                  className="flex h-full w-full items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ outlineColor: node.color }}
                >
                  <EcosystemIcon icon={node.icon} color={node.color} active={isActive} />
                </button>
              </foreignObject>
              <text
                x={x}
                y={labelY}
                textAnchor="middle"
                fontSize="13"
                fontWeight={isActive ? 700 : 600}
                fill={isActive ? node.color : "var(--color-text-muted)"}
                fontFamily="var(--font-display)"
                style={{ transition: "fill 300ms ease" }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const iconPaths: Record<string, string> = {
  core: "M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4",
  payments: "M3 9h18M6 6h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z M7 15h4",
  digital: "M7 4h10v16H7V4Z M10 18h4",
  data: "M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Z M4 6v12c0 1.1 3.6 2 8 2s8-.9 8-2V6 M4 12c0 1.1 3.6 2 8 2s8-.9 8-2",
  ai: "M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  cx: "M12 21s-7-4.35-9.5-8.5C1 9 2.5 5.5 6 5c2-.3 3.7.8 4.5 2.2C11.3 5.8 13 4.7 15 5c3.5.5 5 4 3.5 7.5C16 16.65 12 21 12 21Z",
};

function EcosystemIcon({ icon, color, active }: { icon: string; color: string; active: boolean }) {
  const d = iconPaths[icon];
  if (!d) return null;
  return (
    <svg width={active ? 22 : 18} height={active ? 22 : 18} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transition: "width 300ms ease, height 300ms ease" }}>
      <path d={d} stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

"use client";

const nodes = [
  { id: "core", label: "Core Banking", x: 60, y: 260, color: "#ff8a2b" },
  { id: "api", label: "APIs", x: 200, y: 120, color: "#3d8bff" },
  { id: "payments", label: "Payments", x: 200, y: 400, color: "#3d8bff" },
  { id: "cloud", label: "Cloud", x: 360, y: 60, color: "#7c6cff" },
  { id: "ai", label: "AI", x: 360, y: 460, color: "#34e0d9" },
  { id: "digital", label: "Digital Channels", x: 500, y: 260, color: "#ffb066" },
];

const edges: [string, string][] = [
  ["core", "api"],
  ["core", "payments"],
  ["api", "cloud"],
  ["api", "digital"],
  ["payments", "ai"],
  ["payments", "digital"],
  ["cloud", "digital"],
  ["ai", "digital"],
];

function nodeById(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function HeroFlowVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <svg
        viewBox="0 0 560 520"
        className="h-full w-full"
        role="img"
        aria-label="Diagram showing data flowing from Core Banking through APIs and Payments to Cloud, AI and Digital Channels"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-white)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-white)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {edges.map(([from, to], i) => {
          const a = nodeById(from);
          const b = nodeById(to);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#nodeGlow)"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              className="animate-dash-flow"
              style={{ stroke: "var(--color-white)", strokeOpacity: 0.18 }}
            />
          );
        })}

        {nodes.map((n, i) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="46" fill={n.color} opacity="0.12" className="animate-pulse-glow" style={{ animationDelay: `${i * 0.4}s` }} />
            <circle cx={n.x} cy={n.y} r="30" fill="var(--color-surface)" stroke={n.color} strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r="4" fill={n.color} />
          </g>
        ))}

        {nodes.map((n) => (
          <text
            key={`${n.id}-label`}
            x={n.x}
            y={n.y + 52}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--color-text-primary)"
            fontFamily="var(--font-body)"
          >
            {n.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

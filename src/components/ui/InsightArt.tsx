import type { ReactNode } from "react";

const artByTag: Record<string, (gradientId: string) => ReactNode> = {
  "Core Modernization": (gradientId) => (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8a2b" />
          <stop offset="100%" stopColor="#7c6cff" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={110}
          y={40 + i * 28}
          width={100}
          height={20}
          rx={5}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.6"
          strokeOpacity={0.9 - i * 0.15}
        />
      ))}
      <circle cx={122} cy={50} r={2.5} fill="#ff8a2b" />
      <circle cx={122} cy={78} r={2.5} fill="#ffb066" />
      <circle cx={122} cy={106} r={2.5} fill="#7c6cff" />
      <path d="M60 50H108M60 78H108M60 106H108" stroke="var(--color-white)" strokeOpacity="0.15" strokeWidth="1.2" strokeDasharray="3 4" />
      <circle cx={54} cy={50} r={4} fill="none" stroke="var(--color-white)" strokeOpacity="0.3" />
      <circle cx={54} cy={78} r={4} fill="none" stroke="var(--color-white)" strokeOpacity="0.3" />
      <circle cx={54} cy={106} r={4} fill="none" stroke="var(--color-white)" strokeOpacity="0.3" />
      <path d="M212 50H260M212 78H244M212 106H252" stroke="var(--color-white)" strokeOpacity="0.15" strokeWidth="1.2" strokeDasharray="3 4" />
    </svg>
  ),
  Cloud: (gradientId) => (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3d8bff" />
          <stop offset="100%" stopColor="#34e0d9" />
        </linearGradient>
      </defs>
      <path
        d="M100 100c-14 0-24-10-24-22 0-11 8-20 19-22 3-14 16-24 31-24 16 0 29 11 32 26 13 1 23 12 23 25 0 14-11 25-25 25H100z"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
      />
      <path d="M160 108v28M160 108l-16 16M160 108l16 16" stroke="var(--color-white)" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={60} cy={40} r={2} fill="#34e0d9" opacity="0.8" />
      <circle cx={250} cy={50} r={2} fill="#3d8bff" opacity="0.8" />
      <circle cx={230} cy={120} r={2} fill="#34e0d9" opacity="0.6" />
      <circle cx={80} cy={120} r={2} fill="#3d8bff" opacity="0.6" />
    </svg>
  ),
  Automation: (gradientId) => (
    <svg viewBox="0 0 320 160" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#34e0d9" />
          <stop offset="100%" stopColor="#ff8a2b" />
        </linearGradient>
      </defs>
      <line x1="50" y1="80" x2="270" y2="80" stroke={`url(#${gradientId})`} strokeWidth="1.6" strokeDasharray="5 6" />
      {[50, 120, 190, 260].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={80} r={9} fill="var(--color-surface)" stroke={i % 2 === 0 ? "#34e0d9" : "#ff8a2b"} strokeWidth="1.6" />
          <circle cx={x} cy={80} r={2.5} fill={i % 2 === 0 ? "#34e0d9" : "#ff8a2b"} />
        </g>
      ))}
      <path d="M50 80c0-18 12-30 30-30M270 80c0 18-12 30-30 30" stroke="var(--color-white)" strokeOpacity="0.15" strokeWidth="1.2" fill="none" />
    </svg>
  ),
};

export function InsightArt({ tag }: { tag: string }) {
  const gradientId = `insight-grad-${tag.replace(/\s+/g, "-").toLowerCase()}`;
  const render = artByTag[tag];
  return render ? render(gradientId) : null;
}

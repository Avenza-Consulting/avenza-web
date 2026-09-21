const paths: Record<string, string> = {
  // clock with a trailing progress arc
  experience: "M12 4a8 8 0 1 1-5.66 2.34 M12 7v5l3.5 2 M4 4v4h4",
  // stacked service layers
  "service-lines": "M12 3 3 8l9 5 9-5-9-5Z M3 12l9 5 9-5 M3 16l9 5 9-5",
  // grid of product tiles
  "product-lines": "M4 4h6v6H4V4Z M14 4h6v6h-6V4Z M4 14h6v6H4v-6Z M14 14h6v6h-6v-6Z",
  // flexible / branching paths converging
  engagement: "M4 6h4l6 12h6 M4 18h4l6-12h6",
};

export function StatIcon({ id, className = "h-5 w-5" }: { id: string; className?: string }) {
  const d = paths[id];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

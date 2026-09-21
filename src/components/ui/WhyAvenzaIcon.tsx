const paths: Record<string, string> = {
  // medal / credential badge with ribbon
  credentials: "M12 3l2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7L12 3Z",
  // people / talent pool
  talent: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M3 20c0-3 2.7-5 6-5s6 2 6 5 M16.5 8.5a2.5 2.5 0 1 0 0-5 M17 20c0-2.5-.9-4.2-2.5-5.2 M21 20c0-2.5-1.3-4.3-3.5-5",
  // open book / thought leadership
  "thought-leadership": "M12 5c-1.8-1.2-4.2-1.6-6.5-1v13c2.3-.6 4.7-.2 6.5 1 1.8-1.2 4.2-1.6 6.5-1V4c-2.3-.6-4.7-.2-6.5 1Z M12 5v13",
  // lightning bolt / accelerators
  accelerators: "M13 2 4 14h6l-1 8 9-12h-6l1-8Z",
};

export function WhyAvenzaIcon({ id, className = "h-5 w-5" }: { id: string; className?: string }) {
  const d = paths[id];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

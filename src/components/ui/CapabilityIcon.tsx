const paths: Record<string, string> = {
  "core-banking": "M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4",
  "temenos-transact": "M6 4h9l3 3v13H6V4Z M9 9h6M9 13h6M9 17h3",
  "digital-banking": "M7 4h10v16H7V4Z M10 18h4",
  "temenos-payments": "M3 9h18M6 6h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z M7 15h4",
  "temenos-fcm": "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z M9.5 12l1.8 1.8L15 10",
  "system-integration": "M5 6h4v4H5V6Z M15 6h4v4h-4V6Z M5 14h4v4H5v-4Z M15 14h4v4h-4v-4Z M9 8h6M9 16h6M12 8v8",
  cloud: "M7 17a4 4 0 0 1-1-7.87 5.5 5.5 0 0 1 10.7-1.4A4.5 4.5 0 0 1 17 17H7Z",
  data: "M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Z M4 6v12c0 1.1 3.6 2 8 2s8-.9 8-2V6 M4 12c0 1.1 3.6 2 8 2s8-.9 8-2",
  "ai-automation": "M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  testing: "M9 3h6v4l4 10a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3l4-10V3Z M9 3h6 M8.5 14h7",
  migration: "M4 7h9l3 3v7H4V7Z M13 7v3h3 M8 17v-4l2 2 2-2v4",
  upgrades: "M12 20V4M12 4l-5 5M12 4l5 5",
  "application-support": "M12 5a7 7 0 0 0-7 7v2h2v-2a5 5 0 0 1 10 0v2h2v-2a7 7 0 0 0-7-7Z M5 14h2v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z M19 14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4h2Z",
};

export function CapabilityIcon({ id, className = "h-5 w-5" }: { id: string; className?: string }) {
  const d = paths[id];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

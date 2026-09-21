const paths: Record<string, string> = {
  "migration-toolkit": "M4 7h9l3 3v7H4V7Z M13 7v3h3 M8 17v-4l2 2 2-2v4",
  "configuration-templates": "M5 4h14v4H5V4Z M5 10h6v10H5V10Z M13 10h6v4h-6v-4Z M13 16h6v4h-6v-4Z",
  "data-mapping-utilities": "M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Z M4 6v5c0 1.1 3.6 2 8 2M20 11v-5 M14 15l4 4m0-4-4 4",
  "test-automation-framework": "M9 3h6v4l4 10a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3l4-10V3Z M9 3h6 M8.5 14h7",
  "deployment-automation": "M12 20V4M12 4l-5 5M12 4l5 5 M5 20h14",
  "documentation-automation": "M7 3h7l4 4v14H7V3Z M14 3v4h4 M9 12h6M9 15h6M9 18h3",
  "ai-implementation-tools": "M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
};

export function AcceleratorIcon({ id, className = "h-5 w-5" }: { id: string; className?: string }) {
  const d = paths[id];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

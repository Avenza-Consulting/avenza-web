import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Avenza Consulting — home"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        aria-hidden="true"
      >
        <path d="M0 0L22 10L0 20L6.5 10L0 0Z" fill="currentColor" />
      </svg>
      <span className="font-display text-xl font-extrabold tracking-tight lowercase">
        avenza
      </span>
    </Link>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -left-32 top-10 h-[440px] w-[440px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7c6cff, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="animate-drift pointer-events-none absolute -right-32 bottom-0 h-[440px] w-[440px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #ff8a2b, transparent 70%)", animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <span className="font-display text-7xl font-extrabold text-gradient-amber sm:text-8xl">
          404
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
          This page didn&apos;t make it through the transformation.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-text-muted">
          The page you&apos;re looking for may have moved, changed, or never
          existed. Let&apos;s get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-amber px-8 py-3.5 text-sm font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.03]"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

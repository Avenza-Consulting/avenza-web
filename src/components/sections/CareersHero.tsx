import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function CareersHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-20 sm:pb-28 sm:pt-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -left-32 top-10 h-[440px] w-[440px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #ff8a2b, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft">Careers</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            We Don&apos;t Just Build Banking Solutions.{" "}
            <span className="text-gradient-amber">We Build Careers That Matter.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted">
            We believe in a workplace that&apos;s transparent, ethical, and truly
            people-first. Here, you&apos;re more than just an employee — you&apos;re
            at the core of our business. Your ideas matter, your growth is our
            priority, and your voice is always valued.
          </p>
          <div className="mt-9">
            <Link
              href="#openings"
              className="inline-block rounded-full bg-amber px-8 py-3.5 text-sm font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.03]"
            >
              View Open Roles
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

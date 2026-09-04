import { Reveal } from "@/components/ui/Reveal";

export function AcceleratorsHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-20 sm:pb-20 sm:pt-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -right-32 top-10 h-[440px] w-[440px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7c6cff, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft">
            Accelerator Lab &middot; Our IP
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Proprietary accelerators,{" "}
            <span className="text-gradient-amber">built from real programmes</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted">
            Reusable frameworks, templates and tooling that take the effort and
            risk out of the most repetitive, error-prone work in a
            transformation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

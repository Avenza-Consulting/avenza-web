import { Reveal } from "@/components/ui/Reveal";

export function LifeHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-20 sm:pb-20 sm:pt-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -left-32 top-10 h-[440px] w-[440px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #34e0d9, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Life at Avenza
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            More than delivery.{" "}
            <span className="text-gradient-amber">A team that shows up for each other.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted">
            Great transformations are built by people who genuinely enjoy
            working together. Here&apos;s a glimpse of the moments, milestones
            and everyday culture behind the work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

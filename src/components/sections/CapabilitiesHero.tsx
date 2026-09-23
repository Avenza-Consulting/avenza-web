import { Reveal } from "@/components/ui/Reveal";

export function CapabilitiesHero() {
  return (
    <section className="relative overflow-hidden bg-ink pb-12 pt-14 sm:pb-16 sm:pt-20">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -left-32 top-10 h-[440px] w-[440px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #ff8a2b, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Capabilities
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Specialised across{" "}
            <span className="text-white">the banking-platform lifecycle</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted">
            Thirteen capabilities that span the whole transformation — deep
            enough to trust with a critical programme, joined up enough to run
            as one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

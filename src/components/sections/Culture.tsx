import { Reveal } from "@/components/ui/Reveal";
import { cultureValues } from "@/data/content";

export function Culture() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Be Part of Our Mission
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Our culture shapes more than our work
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            We&apos;re looking for passionate individuals to join us on our
            mission. We believe in flat hierarchies, clear communication, and a
            culture of ownership and accountability.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cultureValues.map((value, i) => (
            <Reveal key={value.id} delay={i * 0.08} duration={0.5} distance={14}>
              <div className="h-full rounded-2xl border border-white/10 bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber/30">
                <h3 className="font-display text-lg font-bold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

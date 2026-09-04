import { Reveal } from "@/components/ui/Reveal";
import { lifeHighlights } from "@/data/content";

export function LifeHighlights() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-text">
            What Makes Us, Us
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Work that&apos;s meaningful, balanced by life that is too
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lifeHighlights.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08} duration={0.5} distance={14}>
              <div className="h-full rounded-2xl border border-white/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30">
                <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

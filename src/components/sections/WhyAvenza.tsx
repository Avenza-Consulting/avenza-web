import { Reveal } from "@/components/ui/Reveal";
import { whyAvenza } from "@/data/content";

export function WhyAvenza() {
  return (
    <section id="why-avenza" className="relative border-t border-white/5 bg-ink-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Why Avenza?
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Delivering tech-enabled, state-of-the-art core banking and SI services
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyAvenza.map((panel, i) => (
            <Reveal key={panel.id} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber/30">
                <span className="font-display text-3xl font-extrabold text-white/10 transition-colors group-hover:text-amber/30">
                  {panel.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{panel.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {panel.points.map((point) => (
                    <li key={point} className="text-sm leading-snug text-text-muted">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

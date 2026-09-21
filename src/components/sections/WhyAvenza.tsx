import { Reveal } from "@/components/ui/Reveal";
import { WhyAvenzaIcon } from "@/components/ui/WhyAvenzaIcon";
import { whyAvenza } from "@/data/content";

const panelAccent: Record<string, { color: string; textColor: string }> = {
  credentials: { color: "#ff8a2b", textColor: "var(--color-amber-soft-text)" },
  talent: { color: "#3d8bff", textColor: "var(--color-azure-text)" },
  "thought-leadership": { color: "#7c6cff", textColor: "var(--color-violet-text)" },
  accelerators: { color: "#34e0d9", textColor: "var(--color-cyan-text)" },
};

export function WhyAvenza() {
  return (
    <section id="why-avenza" className="relative overflow-hidden border-t border-white/5 bg-ink-soft py-16 sm:py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -right-32 top-0 h-[440px] w-[440px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #7c6cff, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Why Avenza?
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Delivering tech-enabled, state-of-the-art core banking and SI services
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyAvenza.map((panel, i) => {
            const accent = panelAccent[panel.id];
            return (
              <Reveal key={panel.id} delay={i * 0.08}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                  <span
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
                    style={{ background: accent.color }}
                    aria-hidden="true"
                  />
                  <span
                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `color-mix(in oklab, ${accent.color} 16%, transparent)`, color: accent.textColor }}
                  >
                    <WhyAvenzaIcon id={panel.id} className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-4 font-display text-lg font-bold text-white">{panel.title}</h3>
                  <ul className="relative mt-4 space-y-2.5">
                    {panel.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm leading-snug text-text-muted">
                        <span
                          className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: accent.color }}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

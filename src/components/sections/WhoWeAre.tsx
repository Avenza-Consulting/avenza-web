import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { StatIcon } from "@/components/ui/StatIcon";
import { stats } from "@/data/content";

const statAccent: Record<string, { color: string; textColor: string }> = {
  experience: { color: "#ff8a2b", textColor: "var(--color-amber-soft-text)" },
  "service-lines": { color: "#3d8bff", textColor: "var(--color-azure-text)" },
  "product-lines": { color: "#7c6cff", textColor: "var(--color-violet-text)" },
  engagement: { color: "#34e0d9", textColor: "var(--color-cyan-text)" },
};

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="relative overflow-hidden border-t border-white/5 bg-ink py-16 sm:py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #ff8a2b, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="animate-drift pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #3d8bff, transparent 70%)", animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
              Who We Are
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              A specialist technology and banking transformation partner
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
              Where technology and knowledge meet results. Avenza blends Temenos
              expertise with AI, digital and advanced analytics to deliver
              future-proof core banking solutions — creating a unique value
              proposition for customers worldwide.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => {
              const accent = statAccent[stat.id];
              return (
                <Reveal key={stat.label} delay={i * 0.05} duration={0.5} distance={14}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                    <span
                      className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                      style={{ background: accent.color }}
                      aria-hidden="true"
                    />
                    <div className="relative flex items-center justify-between gap-3">
                      <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <span
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: `color-mix(in oklab, ${accent.color} 16%, transparent)`, color: accent.textColor }}
                      >
                        <StatIcon id={stat.icon} className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="relative mt-3 text-sm leading-snug text-text-muted">{stat.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

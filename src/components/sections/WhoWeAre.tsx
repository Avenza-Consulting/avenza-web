import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/data/content";

export function WhoWeAre() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.05} duration={0.5} distance={14}>
                <div className="h-full rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-amber/30">
                  <p className="font-display text-4xl font-extrabold text-gradient-amber sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-sm leading-snug text-text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

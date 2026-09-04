import { Reveal } from "@/components/ui/Reveal";
import { deliveryModels } from "@/data/content";

export function DeliveryModels() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Delivery Models
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Engagement flexed to how your team works
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {deliveryModels.map((model, i) => (
            <Reveal key={model.id} delay={i * 0.06} duration={0.5} distance={14}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <div
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                  aria-hidden="true"
                />
                <span className="font-display text-4xl font-extrabold text-amber/25">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{model.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{model.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

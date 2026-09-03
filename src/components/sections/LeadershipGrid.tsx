import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { leadership } from "@/data/content";

export function LeadershipGrid() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person, i) => (
            <Reveal key={person.id} delay={i * 0.08}>
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-amber/30">
                <div className="relative aspect-square overflow-hidden bg-surface-raised">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(6,7,10,0.55) 0%, rgba(6,7,10,0) 40%)",
                    }}
                    aria-hidden="true"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-white">{person.name}</h3>
                  <p className="mt-1 text-sm font-medium text-amber-soft">{person.title}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

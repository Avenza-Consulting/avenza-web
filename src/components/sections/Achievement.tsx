import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { achievement } from "@/data/content";

export function Achievement() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
              {achievement.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              {achievement.title}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
              {achievement.summary}
            </p>
            <Link
              href={achievement.href}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft-text"
            >
              Read more
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>

          <Reveal delay={0.1} distance={14} className="flex justify-center lg:justify-end">
            <div className="aspect-[1206/805] w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/10 shadow-lg">
              <Image
                src={achievement.photo}
                alt={achievement.title}
                width={1206}
                height={805}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

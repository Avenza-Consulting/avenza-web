import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function LifeCta() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-surface p-10 text-center sm:p-14">
            <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Like what you see?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted">
              If this looks like your kind of place, come build banking technology with people who
              actually enjoy the work — and each other.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/careers"
                className="rounded-full bg-amber px-8 py-3.5 text-sm font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.03]"
              >
                View Open Roles
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft"
              >
                Why Avenza
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

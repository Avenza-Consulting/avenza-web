import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function AcceleratorsCta() {
  return (
    <section className="relative border-t border-white/5 bg-ink py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Want these working on <span className="text-gradient-amber">your programme?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted">
            Our accelerators are deployed within a delivery engagement —
            configured to your platform and your data.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-amber px-8 py-3.5 text-sm font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.03]"
            >
              Start a Conversation
            </Link>
            <Link
              href="/careers"
              className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft"
            >
              Explore Careers
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

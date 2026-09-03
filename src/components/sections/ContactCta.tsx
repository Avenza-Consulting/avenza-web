import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function ContactCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-ink-soft py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-25 blur-[140px]"
        style={{ background: "radial-gradient(ellipse, #ff8a2b, transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
            Let&apos;s Transform Banking <span className="text-gradient-amber">Together</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted">
            Whether you&apos;re planning a core transformation, exploring Temenos,
            or building your team — we&apos;d like to hear from you.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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

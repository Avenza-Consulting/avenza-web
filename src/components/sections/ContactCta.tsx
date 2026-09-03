import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { clientLogos } from "@/data/content";

export function ContactCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-ink-soft py-20 sm:py-28">
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
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted">
            Whether you&apos;re planning a core transformation, exploring Temenos,
            or building your team — we&apos;d like to hear from you.
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

        <Reveal delay={0.1} duration={0.5} distance={12} className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-dim">
            Trusted by leading banks and technology partners
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {clientLogos.map((client) => (
              <div
                key={client.id}
                className="flex h-20 w-40 items-center justify-center rounded-xl border p-3 shadow-md transition-transform duration-200 hover:scale-105 sm:h-24 sm:w-48"
                style={{ background: "#ffffff", borderColor: "rgba(10, 10, 10, 0.1)" }}
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={200}
                  height={133}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

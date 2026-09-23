import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Ecosystem() {
  return (
    <section id="industry-expertise" className="relative overflow-hidden border-t border-white/5 bg-ink-soft py-16 sm:py-24">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-azure-text">
            Industry Expertise
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            One connected banking ecosystem
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            From digital channels through the Temenos product suite to data,
            cloud and banking technology transformation — see how
            Avenza&apos;s services span the entire ecosystem.
          </p>
          <p className="mt-3 text-sm text-text-dim lg:hidden">Scroll the diagram sideways to read every label &rarr;</p>
        </Reveal>
      </div>

      {/* The diagram is dense, so it renders close to its native size (bigger,
          legible labels) inside a wider container and scrolls horizontally on
          narrower screens rather than shrinking every label to fit. */}
      <div className="relative mx-auto mt-14 max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.1} className="overflow-x-auto rounded-2xl border border-white/10 shadow-lg">
          <Image
            src="/temenos-ecosystem-diagram.svg"
            alt="Temenos Banking Technology Ecosystem and Avenza Services diagram, showing digital channels connecting through an API integration layer to Temenos core banking, payments, and data products, with Avenza service capabilities mapped around the ecosystem."
            width={1600}
            height={2000}
            className="h-auto w-full min-w-[1200px]"
          />
        </Reveal>
      </div>
    </section>
  );
}

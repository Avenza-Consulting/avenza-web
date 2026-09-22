"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { LeadershipVideo } from "@/components/ui/LeadershipVideo";
import { leadership } from "@/data/content";

export function LeadershipGrid() {
  return (
    <section id="leadership" className="relative border-t border-white/5 bg-ink py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Leadership
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            The team behind Avenza&apos;s transformation story
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">
            Deep banking domain expertise, proven Temenos delivery experience,
            and a shared commitment to timely, tech-enabled core banking
            transformation.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {leadership.map((person, i) => (
            <Reveal key={person.id} delay={i * 0.08} duration={0.5} distance={14}>
              <div className="group h-full rounded-2xl border border-white/10 bg-surface p-8 text-center transition-colors duration-300 hover:border-white/20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mx-auto h-64 w-64 overflow-hidden rounded-xl bg-surface-raised ring-1 ring-inset ring-white/5 transition-all duration-300 group-hover:ring-2 group-hover:ring-amber/30 group-hover:shadow-[0_0_34px_-8px_rgba(255,138,43,0.45)]"
                >
                  <LeadershipVideo src={person.video} poster={person.photo} name={person.name} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>
                <h3 className="mt-6 font-display text-lg font-bold text-white">{person.name}</h3>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-amber-soft-text">
                  {person.title}
                </p>
                <div className="mx-auto mt-4 h-px w-10 bg-white/15" aria-hidden="true" />
                <p className="mx-auto mt-4 max-w-[22ch] text-sm leading-relaxed text-text-muted">
                  {person.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

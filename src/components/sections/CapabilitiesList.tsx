"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityIcon } from "@/components/ui/CapabilityIcon";
import { capabilities, capabilityGroups } from "@/data/content";

const groupAccent: Record<string, { color: string; textColor: string; text: string }> = {
  "core-platform": { color: "#ff8a2b", textColor: "var(--color-amber-soft-text)", text: "text-amber-soft-text" },
  "payments-compliance": { color: "#3d8bff", textColor: "var(--color-azure-text)", text: "text-azure-text" },
  modernization: { color: "#7c6cff", textColor: "var(--color-violet-text)", text: "text-violet-text" },
  "delivery-support": { color: "#34e0d9", textColor: "var(--color-cyan-text)", text: "text-cyan-text" },
};

export function CapabilitiesList() {
  return (
    <section className="relative border-t border-white/5 bg-ink-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {capabilityGroups.map((group, groupIndex) => {
          const accent = groupAccent[group.id];
          const items = capabilities.filter((c) => c.group === group.id);
          return (
            <div key={group.id} className={groupIndex > 0 ? "mt-16" : undefined}>
              <Reveal className="flex items-center gap-3">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: accent.color }}
                  aria-hidden="true"
                />
                <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {group.label}
                </h2>
              </Reveal>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((cap, i) => (
                  <Reveal key={cap.id} delay={Math.min(i, 6) * 0.05} distance={12}>
                    <Link
                      href={`/capabilities/${cap.id}`}
                      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                    >
                      <span
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: `color-mix(in oklab, ${accent.color} 16%, transparent)`, color: accent.textColor }}
                      >
                        <CapabilityIcon id={cap.id} className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-display text-lg font-bold text-white">{cap.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                        {cap.body.slice(0, 140).trimEnd()}
                        {cap.body.length > 140 ? "…" : ""}
                      </p>
                      <span
                        className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${accent.text}`}
                      >
                        Learn more
                        <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                          &rarr;
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

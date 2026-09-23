import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CapabilityIcon } from "@/components/ui/CapabilityIcon";
import { CapabilitiesCta } from "@/components/sections/CapabilitiesCta";
import { capabilities, capabilityGroups } from "@/data/content";

const groupAccent: Record<string, { color: string; textColor: string; text: string }> = {
  "core-platform": { color: "#ff8a2b", textColor: "var(--color-amber-soft-text)", text: "text-amber-soft-text" },
  "payments-compliance": { color: "#3d8bff", textColor: "var(--color-azure-text)", text: "text-azure-text" },
  modernization: { color: "#7c6cff", textColor: "var(--color-violet-text)", text: "text-violet-text" },
  "delivery-support": { color: "#34e0d9", textColor: "var(--color-cyan-text)", text: "text-cyan-text" },
};

export function generateStaticParams() {
  return capabilities.map((cap) => ({ slug: cap.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cap = capabilities.find((c) => c.id === slug);
  if (!cap) return {};

  return {
    title: `${cap.title} | Avenza Consulting`,
    description: cap.body,
    openGraph: {
      title: `${cap.title} | Avenza Consulting`,
      description: cap.body,
      url: `https://www.avenza-consulting.com/capabilities/${cap.id}`,
      siteName: "Avenza Consulting",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cap.title} | Avenza Consulting`,
      description: cap.body,
    },
  };
}

export default async function CapabilityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cap = capabilities.find((c) => c.id === slug);
  if (!cap) notFound();

  const accent = groupAccent[cap.group];
  const groupLabel = capabilityGroups.find((g) => g.id === cap.group)?.label;
  const related = capabilities.filter((c) => c.group === cap.group && c.id !== cap.id).slice(0, 3);

  return (
    <>
      <section className="relative border-t border-white/5 bg-ink py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href="/capabilities"
              className="text-sm font-semibold text-text-muted transition-colors hover:text-amber-soft-text"
            >
              &larr; All capabilities
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <span
                className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: `color-mix(in oklab, ${accent.color} 16%, transparent)`, color: accent.textColor }}
              >
                <CapabilityIcon id={cap.id} className="h-6 w-6" />
              </span>
              <span className={`text-xs font-bold uppercase tracking-widest ${accent.text}`}>
                {groupLabel}
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              {cap.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
            {cap.highlights.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-text-muted"
              >
                {tag}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-10 space-y-5 text-base leading-relaxed text-text-muted">
            <p>{cap.body}</p>
          </Reveal>

          <Reveal delay={0.18} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] p-5">
              <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-rose-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 9v4m0 4h.01M10.29 3.86l-8.18 14.18A2 2 0 0 0 3.82 21h16.36a2 2 0 0 0 1.71-2.96L13.71 3.86a2 2 0 0 0-3.42 0Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                The Challenge
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{cap.problem}</p>
            </div>
            <div className="rounded-xl border border-azure/20 bg-azure/[0.06] p-5">
              <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-azure-text">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                How We Deliver It
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{cap.howItWorks}</p>
            </div>
            <div className="rounded-xl border border-cyan/20 bg-cyan/[0.06] p-5">
              <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-cyan-text">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Outcomes
              </p>
              <ul className="mt-3 space-y-2">
                {cap.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-text-muted">
                    <span
                      className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: `color-mix(in oklab, ${accent.color} 16%, transparent)`,
                        color: accent.textColor,
                      }}
                    >
                      <svg width="9" height="7" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 text-sm font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.03]"
            >
              Start a Conversation
            </Link>
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft-text"
            >
              &larr; All capabilities
            </Link>
          </Reveal>

          {related.length > 0 && (
            <Reveal delay={0.25} className="mt-16 border-t border-white/10 pt-10">
              <p className="text-xs font-bold uppercase tracking-widest text-text-dim">
                Related in {groupLabel}
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/capabilities/${r.id}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-surface p-4 transition-colors hover:border-white/20"
                  >
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `color-mix(in oklab, ${accent.color} 16%, transparent)`, color: accent.textColor }}
                    >
                      <CapabilityIcon id={r.id} className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-amber-soft-text">
                      {r.title}
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CapabilitiesCta />
    </>
  );
}

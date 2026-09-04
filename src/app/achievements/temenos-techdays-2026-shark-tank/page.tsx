import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ContactCta } from "@/components/sections/ContactCta";
import { achievement } from "@/data/content";

export const metadata: Metadata = {
  title: "Avenza wins Shark Tank at Temenos TechDays '26 | Avenza Consulting",
  description: achievement.summary,
  openGraph: {
    title: "Avenza wins Shark Tank at Temenos TechDays '26",
    description: achievement.summary,
    url: "https://www.avenza-consulting.com/achievements/temenos-techdays-2026-shark-tank",
    siteName: "Avenza Consulting",
    type: "article",
    images: [{ url: achievement.photo, width: 1206, height: 805, alt: achievement.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avenza wins Shark Tank at Temenos TechDays '26",
    description: achievement.summary,
    images: [achievement.photo],
  },
};

export default function AchievementPage() {
  return (
    <>
      <section className="relative border-t border-white/5 bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href="/"
              className="text-sm font-semibold text-text-muted transition-colors hover:text-amber-soft-text"
            >
              &larr; Back to home
            </Link>

            <span className="mt-8 block text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
              {achievement.eyebrow}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              {achievement.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1} distance={14} className="mt-10 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
            <Image
              src={achievement.photo}
              alt={achievement.title}
              width={1206}
              height={805}
              className="h-auto w-full object-cover"
              priority
            />
          </Reveal>

          <Reveal delay={0.15} className="mt-10 space-y-5 text-base leading-relaxed text-text-muted">
            <p>
              Temenos TechDays is Temenos&apos; annual developer and innovation
              conference, bringing together employees, delivery partners, and
              clients to explore what&apos;s next in core banking technology.
              TechDays &apos;26 was held March 3&ndash;5 at The Leela Palace in
              Chennai, and for the first time ran as a hybrid edition, connecting
              on-site attendees with partners and innovators joining virtually
              from around the world.
            </p>
            <p>
              A highlight of the conference was the Shark Tank innovation
              session, where teams pitched forward-looking propositions in
              front of a live audience and a panel of judges. Avenza took the
              stage to present our thinking on helping banks move faster on
              Temenos &mdash; and came away as the Shark Tank winner, taking
              home the top recognition for the session.
            </p>
            <p>
              It&apos;s a moment we&apos;re proud of, and one that reflects the
              same approach we bring to every client engagement: deep Temenos
              expertise paired with a genuine drive to innovate. Thank you to
              the Temenos team for putting together another excellent TechDays,
              and to everyone who cheered us on.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 text-sm font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.03]"
            >
              Start a Conversation
            </Link>
            <Link
              href="/life-at-avenza"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft-text"
            >
              See More of Life at Avenza
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </>
  );
}

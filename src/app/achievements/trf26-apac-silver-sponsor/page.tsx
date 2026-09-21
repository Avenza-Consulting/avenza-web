import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ContactCta } from "@/components/sections/ContactCta";
import { achievements } from "@/data/content";

const achievement = achievements.find((a) => a.id === "trf26-apac-silver-sponsor")!;

export const metadata: Metadata = {
  title: "Avenza is a Silver Sponsor at TRF'26 APAC | Avenza Consulting",
  description: achievement.summary,
  openGraph: {
    title: "Avenza is a Silver Sponsor at TRF'26 APAC",
    description: achievement.summary,
    url: "https://www.avenza-consulting.com/achievements/trf26-apac-silver-sponsor",
    siteName: "Avenza Consulting",
    type: "article",
    images: [{ url: achievement.photo, width: 1206, height: 805, alt: achievement.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avenza is a Silver Sponsor at TRF'26 APAC",
    description: achievement.summary,
    images: [achievement.photo],
  },
};

export default function TrfAchievementPage() {
  return (
    <>
      <section className="relative border-t border-white/5 bg-ink py-16 sm:py-24">
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
              The Temenos Regional Forum (TRF) APAC brought together more than
              300 senior banking executives, technology leaders, and partners
              from across Asia-Pacific for two days of conversation on AI,
              cloud, and core modernization, under the theme &ldquo;Trust.
              Modernize. Transcend.&rdquo; TRF&apos;26 APAC was held August
              25&ndash;26, 2026 at the JW Marriott in Hanoi, with Temenos Global
              CEO Takis Spiliopoulos joining in person.
            </p>
            <p>
              Avenza took part as a Silver Sponsor, hosting a booth alongside
              the main sessions to talk through what timely, on-budget core
              transformation actually looks like in practice &mdash; from
              flexible engagement models to proprietary accelerators that
              shorten delivery timelines on Temenos Transact and the wider
              product suite.
            </p>
            <p>
              It was a great couple of days of conversation with banking
              leaders from across the region, and a chance to reconnect with
              the broader Temenos community. Thank you to the Temenos team for
              hosting, and to everyone who stopped by our booth in Hanoi.
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

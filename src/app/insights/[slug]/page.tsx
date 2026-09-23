import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { InsightArt } from "@/components/ui/InsightArt";
import { insights } from "@/data/content";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Avenza Consulting`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://www.avenza-consulting.com/insights/${post.slug}`,
      siteName: "Avenza Consulting",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section className="relative border-t border-white/5 bg-ink py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href="/insights"
              className="text-sm font-semibold text-text-muted transition-colors hover:text-amber-soft-text"
            >
              &larr; All insights
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-text-muted">
                {post.type}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-cyan-text">
                {post.tag}
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm font-semibold text-text-dim">
              {formatDate(post.date)} &middot; {post.readTime}
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            distance={14}
            className="relative mt-10 flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-soft to-surface-raised sm:h-64"
          >
            <div className="bg-grid absolute inset-0 opacity-20" aria-hidden="true" />
            <div
              className="absolute inset-0 opacity-40"
              style={{ background: "radial-gradient(circle at 30% 30%, #7c6cff, transparent 60%)" }}
              aria-hidden="true"
            />
            <div className="relative w-2/3">
              <InsightArt tag={post.tag} />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 space-y-5 text-base leading-relaxed text-text-muted">
            <p className="text-lg text-text-primary">{post.summary}</p>
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft-text"
            >
              &larr; All insights
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

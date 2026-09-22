"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { InsightArt } from "@/components/ui/InsightArt";
import { insights, insightCategories } from "@/data/content";

const ALL = "All";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function InsightsList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(ALL);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return insights.filter((post) => {
      if (category !== ALL && post.tag !== category) return false;
      if (!query) return true;
      return (
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.tag.toLowerCase().includes(query)
      );
    });
  }, [search, category]);

  return (
    <section className="relative border-t border-white/5 bg-ink-soft py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative max-w-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim"
          >
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search insights…"
            aria-label="Search insights"
            className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
          />
        </Reveal>

        <Reveal delay={0.05} className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(ALL)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              category === ALL
                ? "border-amber/60 bg-amber/15 text-white"
                : "border-white/10 text-text-muted hover:border-white/25 hover:text-text-primary"
            }`}
          >
            All
          </button>
          {insightCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                category === cat
                  ? "border-amber/60 bg-amber/15 text-white"
                  : "border-white/10 text-text-muted hover:border-white/25 hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-14 text-sm text-text-muted">
            No insights match your search — try a different term or clear the filter.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {filtered.map((post, i) => (
              <Reveal key={post.id} delay={Math.min(i, 6) * 0.08}>
                <Link href={`/insights/${post.slug}`} className="block h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-ink-soft to-surface-raised">
                      <div className="bg-grid absolute inset-0 opacity-20" aria-hidden="true" />
                      <div
                        className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
                        style={{ background: "radial-gradient(circle at 30% 30%, #7c6cff, transparent 60%)" }}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <InsightArt tag={post.tag} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-text-muted">
                          {post.type}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-cyan-text">
                          {post.tag}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white">
                        {post.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{post.summary}</p>
                      <p className="mt-4 text-xs font-semibold text-text-dim">
                        {formatDate(post.date)} · {post.readTime}
                      </p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

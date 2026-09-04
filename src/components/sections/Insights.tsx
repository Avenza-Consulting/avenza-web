import { Reveal } from "@/components/ui/Reveal";
import { InsightArt } from "@/components/ui/InsightArt";
import { insights } from "@/data/content";

export function Insights() {
  return (
    <section id="insights" className="relative border-t border-white/5 bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-text">
            Thought Leadership
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Perspectives on banking technology and transformation
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {insights.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.1}>
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
                  <span className="text-xs font-semibold uppercase tracking-wide text-cyan-text">
                    {post.tag}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{post.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

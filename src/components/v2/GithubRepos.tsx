import { ArrowUpRight, Star } from "lucide-react";
import { getRepos } from "@/lib/github";
import { profile } from "@/lib/data";
import { GithubIcon } from "@/components/icons/BrandIcons";

const langColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#663399",
  "Jupyter Notebook": "#DA5B0B",
};
const colorOf = (l: string | null) => (l && langColor[l]) || "#4169e1";

function ago(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return months < 12 ? `${months}mo ago` : `${Math.floor(months / 12)}y ago`;
}

export default async function GithubRepos() {
  const repos = await getRepos();

  // language share across all public repos, for the breakdown bar
  const counts = new Map<string, number>();
  for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  const langs = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const totalLang = langs.reduce((s, [, n]) => s + n, 0) || 1;
  const stars = repos.reduce((s, r) => s + r.stars, 0);

  return (
    <section id="github" className="relative py-24 sm:py-36 px-5 sm:px-16 overflow-hidden">
      <div aria-hidden="true" className="aurora w-[520px] h-[520px] -left-60 top-40 bg-accent/10" />
      <div className="relative max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="inline-flex items-center gap-3 text-xs tracking-[0.35em] font-semibold text-ink-faint mb-5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-70" />
                <span className="relative w-2 h-2 rounded-full bg-accent" />
              </span>
              LIVE FROM GITHUB
            </p>
            <h2 className="font-display font-bold tracking-[-0.02em] text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
              Open-source <span className="font-serif italic font-normal text-accent-2">repos</span>
            </h2>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 pl-4 pr-1.5 py-1.5 text-sm font-semibold hover:border-accent transition-colors"
          >
            <GithubIcon size={16} /> @{profile.github.split("/").pop()}
            <span className="grid place-items-center w-8 h-8 rounded-full bg-accent text-white transition-transform group-hover:rotate-45">
              <ArrowUpRight size={14} />
            </span>
          </a>
        </div>

        {repos.length === 0 ? (
          <p className="text-ink-dim">
            GitHub couldn&apos;t be reached right now —{" "}
            <a href={profile.github} className="text-accent link-underline">
              browse the repos directly
            </a>
            .
          </p>
        ) : (
          <>
            {/* summary: big numbers + language split */}
            <div className="grid grid-cols-3 border-y border-line divide-x divide-line mb-2">
              {[
                [repos.length, "Public repos"],
                [langs.length, "Languages"],
                [repos.filter((r) => r.homepage).length, "Live demos"],
              ].map(([n, l]) => (
                <div key={l} className="py-5 sm:py-7 px-3 sm:px-6 first:pl-0">
                  <p className="font-display text-3xl sm:text-5xl font-bold text-gradient">{n}</p>
                  <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-ink-faint">{l}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 py-4 mb-6">
              {langs.map(([l, n]) => (
                <span key={l} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-ink-dim">
                  <span className="w-2 h-2 rounded-full" style={{ background: colorOf(l) }} />
                  {l} <span className="text-ink-faint">{Math.round((n / totalLang) * 100)}%</span>
                </span>
              ))}
              {stars > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-ink-dim">
                  <Star size={12} /> {stars}
                </span>
              )}
            </div>

            {/* index list: one row per repo, accent bar + arrow slide in on hover */}
            <ol className="border-t border-line">
              {repos.map((r, i) => (
                <li key={r.name} className="group relative border-b border-line">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 bottom-0 w-0.5 origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                    style={{ background: colorOf(r.language) }}
                  />
                  <div className="grid grid-cols-[auto_1fr_auto] items-start sm:items-center gap-x-4 sm:gap-x-8 py-6 sm:py-7 pl-4 sm:pl-6 pr-1 transition-colors duration-300 group-hover:bg-surface/40">
                    <span className="font-mono text-xs text-ink-faint pt-1.5 sm:pt-0">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-display font-bold tracking-tight text-xl sm:text-2xl transition-colors group-hover:text-accent-2 after:absolute after:inset-0"
                        >
                          {r.name}
                        </a>
                        {r.homepage && (
                          <a
                            href={r.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-accent/40 text-accent-2 px-2.5 py-0.5 text-[11px] font-semibold hover:bg-accent hover:text-white hover:border-accent transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live
                          </a>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm text-ink-dim leading-relaxed line-clamp-2 max-w-2xl">{r.description ?? "No description yet."}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-ink-faint">
                        {r.language && (
                          <span className="flex items-center gap-1.5 text-ink-dim">
                            <span className="w-2 h-2 rounded-full" style={{ background: colorOf(r.language) }} />
                            {r.language}
                          </span>
                        )}
                        {r.stars > 0 && (
                          <span className="flex items-center gap-1">
                            <Star size={12} /> {r.stars}
                          </span>
                        )}
                        <span>Updated {ago(r.pushedAt)}</span>
                      </div>
                    </div>
                    <span className="grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-line text-ink-faint transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:rotate-45">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}

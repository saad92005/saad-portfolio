import { ArrowUpRight, FolderGit2, Star } from "lucide-react";
import { getRepos } from "@/lib/github";
import { profile } from "@/lib/data";
import { GithubIcon } from "@/components/icons/BrandIcons";
import SpotlightCard from "./SpotlightCard";

const langColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#663399",
  "Jupyter Notebook": "#DA5B0B",
};
const colorOf = (l: string | null) => (l && langColor[l]) || "#c8ff3d";

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
      <div aria-hidden="true" className="aurora w-[520px] h-[520px] -left-60 top-40 bg-accent-3/15" />
      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="inline-flex items-center gap-3 text-xs tracking-[0.35em] font-semibold text-ink-dim mb-5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-70" />
                <span className="relative w-2 h-2 rounded-full bg-accent" />
              </span>
              LIVE FROM GITHUB
            </p>
            <h2 className="font-display font-bold tracking-[-0.02em] text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
              Open-source <span className="font-serif italic font-normal text-accent">repos</span>
            </h2>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] pl-4 pr-1.5 py-1.5 text-sm font-semibold hover:border-accent transition-colors"
          >
            <GithubIcon size={16} /> @{profile.github.split("/").pop()}
            <span className="grid place-items-center w-8 h-8 rounded-full bg-accent text-[#050507] transition-transform group-hover:rotate-45">
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
            {/* summary strip */}
            <div className="rounded-2xl border border-line bg-white/[0.02] p-5 sm:p-6 mb-4">
              <div className="flex flex-wrap gap-x-10 gap-y-3 mb-5">
                {[
                  [repos.length, "public repos"],
                  [langs.length, "languages"],
                  [stars, "stars"],
                ].map(([n, l]) => (
                  <p key={l} className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-gradient">{n}</span>
                    <span className="text-xs text-ink-faint tracking-wide">{l}</span>
                  </p>
                ))}
              </div>
              <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                {langs.map(([l, n]) => (
                  <span key={l} style={{ width: `${(n / totalLang) * 100}%`, background: colorOf(l) }} />
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-dim">
                {langs.map(([l, n]) => (
                  <span key={l} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: colorOf(l) }} />
                    {l} <span className="text-ink-faint">{Math.round((n / totalLang) * 100)}%</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((r, i) => (
                <SpotlightCard key={r.name} color={colorOf(r.language)} className={i === 0 ? "lg:col-span-2" : ""}>
                  <div className="relative flex flex-col h-full p-6">
                    <span aria-hidden="true" className="absolute top-0 left-6 right-6 h-px opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${colorOf(r.language)}, transparent)` }} />
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid place-items-center w-10 h-10 rounded-xl border border-line bg-white/[0.03] text-ink-dim group-hover:text-[var(--c)] transition-colors">
                        <FolderGit2 size={18} />
                      </span>
                      <span className="grid place-items-center w-9 h-9 rounded-full border border-line text-ink-faint transition-all duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-[#050507] group-hover:border-accent">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`mt-5 font-display font-bold tracking-tight after:absolute after:inset-0 ${i === 0 ? "text-2xl" : "text-lg"}`}
                    >
                      {r.name}
                    </a>
                    <p className="mt-2 text-sm text-ink-dim leading-relaxed line-clamp-3 flex-1">{r.description ?? "No description yet."}</p>
                    <div className="mt-5 pt-4 border-t border-line flex items-center gap-4 text-xs text-ink-faint">
                      {r.language && (
                        <span className="flex items-center gap-1.5 text-ink-dim">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: colorOf(r.language) }} />
                          {r.language}
                        </span>
                      )}
                      {r.stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star size={12} /> {r.stars}
                        </span>
                      )}
                      <span>{ago(r.pushedAt)}</span>
                      {r.homepage && (
                        <a
                          href={r.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="relative z-10 ml-auto rounded-full bg-accent/10 text-accent px-2.5 py-1 font-semibold hover:bg-accent hover:text-[#050507] transition-colors"
                        >
                          Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

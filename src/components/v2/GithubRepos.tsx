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
};

function ago(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return months < 12 ? `${months}mo ago` : `${Math.floor(months / 12)}y ago`;
}

export default async function GithubRepos() {
  const repos = await getRepos();

  return (
    <section id="github" className="relative py-24 sm:py-32 px-5 sm:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-accent text-sm tracking-[0.4em] font-semibold mb-4">LIVE FROM GITHUB</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight">
              Open-source <span className="text-accent">repos</span>
            </h2>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-line-strong px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
          >
            <GithubIcon size={16} /> @{profile.github.split("/").pop()}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((r) => (
              <div
                key={r.name}
                className="group relative flex flex-col rounded-2xl border border-line bg-white/[0.02] p-6 hover:border-accent/60 hover:bg-accent/[0.04] transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <a href={r.url} target="_blank" rel="noreferrer" className="font-display text-lg font-medium hover:text-accent transition-colors after:absolute after:inset-0">
                    {r.name}
                  </a>
                  <ArrowUpRight size={18} className="shrink-0 text-ink-faint group-hover:text-accent transition-colors" />
                </div>
                <p className="mt-3 text-sm text-ink-dim leading-relaxed line-clamp-3 flex-1">
                  {r.description ?? "No description yet."}
                </p>
                <div className="mt-5 flex items-center gap-4 text-xs text-ink-faint">
                  {r.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColor[r.language] ?? "#b18cff" }} />
                      {r.language}
                    </span>
                  )}
                  {r.stars > 0 && (
                    <span className="flex items-center gap-1">
                      <Star size={12} /> {r.stars}
                    </span>
                  )}
                  <span>Updated {ago(r.pushedAt)}</span>
                  {r.homepage && (
                    <a
                      href={r.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="relative z-10 ml-auto text-accent font-semibold hover:text-white transition-colors"
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

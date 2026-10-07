import { ArrowUpRight } from "lucide-react";
import { getRepos } from "@/lib/github";
import { profile } from "@/lib/data";
import { Fade, SectionHead } from "./Reveal";

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
    <section id="github" className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <SectionHead index="04" label="Open source" title={["Recent", <em key="c">code</em>]} />

        <div className="mt-16 grid md:grid-cols-[200px_1fr] gap-6 md:gap-10">
          <div>
            <p className="text-sm text-ink-dim leading-relaxed">Pulled live from GitHub and refreshed every hour.</p>
            <a href={profile.github} target="_blank" rel="noreferrer" className="link-line inline-flex items-center gap-1 mt-4 text-sm">
              @{profile.github.split("/").pop()} <ArrowUpRight size={14} />
            </a>
          </div>

          {repos.length === 0 ? (
            <p className="text-ink-dim">
              GitHub couldn&apos;t be reached right now —{" "}
              <a href={profile.github} className="link-line text-ink">
                browse the repos directly
              </a>
              .
            </p>
          ) : (
            <div className="border-t border-line">
              {repos.map((r, i) => (
                <Fade key={r.name} delay={i * 0.05}>
                  <div className="group relative grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-8 py-6 border-b border-line">
                    <div>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg font-medium group-hover:text-accent transition-colors after:absolute after:inset-0"
                      >
                        {r.name}
                      </a>
                      <p className="mt-1 text-sm text-ink-dim leading-relaxed max-w-2xl">{r.description ?? "No description yet."}</p>
                    </div>
                    <div className="flex sm:flex-col sm:items-end gap-4 sm:gap-1 text-xs text-ink-faint">
                      {r.language && <span>{r.language}</span>}
                      <span>Updated {ago(r.pushedAt)}</span>
                      {r.homepage && (
                        <a href={r.homepage} target="_blank" rel="noreferrer" className="relative z-10 text-accent hover:text-ink transition-colors">
                          Live site ↗
                        </a>
                      )}
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

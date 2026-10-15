import type { IconType } from "react-icons";
import {
  SiAndroid,
  SiDart,
  SiFastapi,
  SiFastify,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithub,
  SiHuggingface,
  SiJavascript,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiSqlalchemy,
  SiSupabase,
  SiTailwindcss,
  SiTauri,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Bot, Brain, FileSpreadsheet, Workflow } from "lucide-react";

type Tool = { name: string; icon: IconType | typeof Bot; color: string; url: string };

// color = the tool's own brand color, shown on hover; url = its official site
const stack: Tool[] = [
  { name: "Python", icon: SiPython, color: "#3776AB", url: "https://www.python.org" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", url: "https://www.typescriptlang.org" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Dart", icon: SiDart, color: "#0175C2", url: "https://dart.dev" },
  { name: "React", icon: SiReact, color: "#61DAFB", url: "https://react.dev" },
  { name: "Next.js", icon: SiNextdotjs, color: "#F4F6FC", url: "https://nextjs.org" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", url: "https://tailwindcss.com" },
  { name: "Framer Motion", icon: SiFramer, color: "#BB4BFF", url: "https://motion.dev" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", url: "https://nodejs.org" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688", url: "https://fastapi.tiangolo.com" },
  { name: "Fastify", icon: SiFastify, color: "#F4F6FC", url: "https://fastify.dev" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", url: "https://pytorch.org" },
  { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E", url: "https://huggingface.co" },
  { name: "LLMs & RAG", icon: Brain, color: "#C084FC", url: "https://en.wikipedia.org/wiki/Retrieval-augmented_generation" },
  { name: "AI Agents", icon: Bot, color: "#22D3EE", url: "https://en.wikipedia.org/wiki/Intelligent_agent" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", url: "https://www.postgresql.org" },
  { name: "SQLAlchemy", icon: SiSqlalchemy, color: "#D71F00", url: "https://www.sqlalchemy.org" },
  { name: "Prisma", icon: SiPrisma, color: "#5A67D8", url: "https://www.prisma.io" },
  { name: "Supabase", icon: SiSupabase, color: "#3FCF8E", url: "https://supabase.com" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", url: "https://firebase.google.com" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B", url: "https://flutter.dev" },
  { name: "Android", icon: SiAndroid, color: "#3DDC84", url: "https://developer.android.com" },
  { name: "Tauri", icon: SiTauri, color: "#FFC131", url: "https://tauri.app" },
  { name: "n8n", icon: SiN8N, color: "#EA4B71", url: "https://n8n.io" },
  { name: "Automation", icon: Workflow, color: "#F472B6", url: "https://n8n.io/workflows" },
  { name: "Git", icon: SiGit, color: "#F05032", url: "https://git-scm.com" },
  { name: "GitHub", icon: SiGithub, color: "#F4F6FC", url: "https://github.com" },
  { name: "Vercel", icon: SiVercel, color: "#F4F6FC", url: "https://vercel.com" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", url: "https://www.figma.com" },
  { name: "Excel", icon: FileSpreadsheet, color: "#217346", url: "https://www.microsoft.com/microsoft-365/excel" },
];

// three orbits: core languages inside, frameworks in the middle, everything else outside
const rings = [
  { items: stack.slice(0, 6), r: 19, dur: 40 },
  { items: stack.slice(6, 16), r: 30.5, dur: 60 },
  { items: stack.slice(16), r: 42, dur: 85 },
];

function Tile({ t, size }: { t: Tool; size: string }) {
  const Icon = t.icon;
  return (
    <a
      href={t.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${t.name} — official website`}
      title={t.name}
      style={{ ["--brand" as string]: t.color }}
      className={`group/t stack-tile grid place-items-center ${size} rounded-2xl border border-line bg-gradient-to-b from-surface to-bg-2 text-ink-dim shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(143,184,255,0.15)] hover:!border-[var(--brand)] hover:!bg-[color-mix(in_srgb,var(--brand)_16%,var(--surface))] hover:shadow-[0_0_30px_-4px_var(--brand)]`}
    >
      <Icon className="w-[45%] h-[45%] transition-all duration-300 group-hover/t:scale-110 group-hover/t:text-[var(--brand)] group-hover/t:drop-shadow-[0_0_10px_var(--brand)]" />
    </a>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="relative py-24 sm:py-36 overflow-hidden">
      <div aria-hidden="true" className="aurora w-[700px] h-[700px] left-1/2 top-1/3 -translate-x-1/2 bg-accent/15" />
      <div className="relative text-center px-5">
        <p className="inline-flex items-center gap-3 text-xs tracking-[0.35em] font-semibold text-ink-faint mb-5">
          <span className="w-8 h-px bg-accent" /> TECH STACK <span className="w-8 h-px bg-accent" />
        </p>
        <h2 className="font-display font-bold tracking-[-0.02em] text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
          Tools I <span className="font-serif italic font-normal text-accent-2">build</span> with
        </h2>
        <p className="mt-4 text-sm text-ink-faint">
          <span className="hidden md:inline">Hover to light up · </span>Tap to visit · {stack.length} tools
        </p>
      </div>

      {/* 3D orbit system: rings lie on a tilted plane, icons counter-rotate to face you; hover pauses it */}
      <div className="group/o relative mx-auto mt-10 hidden md:block w-[min(760px,calc(100%-4rem))] aspect-[16/11] [perspective:1100px]">
        {/* glowing core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[22%] aspect-square">
          <div aria-hidden="true" className="absolute -inset-1/2 rounded-full bg-accent/30 blur-3xl animate-pulse" />
          <div className="relative w-full h-full rounded-full grid place-items-center border border-accent-2/30 bg-[radial-gradient(circle_at_30%_25%,#2a4fbf,#111d35_55%,#080b12)] shadow-[0_0_80px_-10px_var(--accent),inset_0_0_30px_rgba(143,184,255,0.25)] animate-[float-y_6s_ease-in-out_infinite]">
            <span className="font-display font-extrabold text-[clamp(1.4rem,2.6vw,2rem)] shine">AI+</span>
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 w-[92%] aspect-square -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
          <div className="absolute inset-0 [transform-style:preserve-3d] animate-[sway_14s_ease-in-out_infinite_alternate] group-hover/o:[animation-play-state:paused]" style={{ transform: "rotateX(60deg)" }}>
            {rings.map((ring, ri) => (
              <div key={ri} className="absolute inset-0 [transform-style:preserve-3d]">
                <div
                  aria-hidden="true"
                  className="absolute rounded-full border border-accent-2/20 shadow-[0_0_30px_-8px_rgba(65,105,225,0.5)]"
                  style={{ inset: `${50 - ring.r}%` }}
                />
                <div
                  className="absolute inset-0 [transform-style:preserve-3d] group-hover/o:[animation-play-state:paused]"
                  style={{ animation: `orbit ${ring.dur}s linear infinite ${ri % 2 ? "reverse" : ""}` }}
                >
                  {ring.items.map((t, i) => {
                    const a = (i / ring.items.length) * Math.PI * 2 + ri * 0.4;
                    return (
                      <div
                        key={t.name}
                        className="absolute [transform-style:preserve-3d]"
                        style={{ left: `${50 + ring.r * Math.cos(a)}%`, top: `${50 + ring.r * Math.sin(a)}%` }}
                      >
                        {/* undo the orbit spin, then stand the tile back up off the tilted plane */}
                        <div
                          className="[transform-style:preserve-3d] group-hover/o:[animation-play-state:paused]"
                          style={{ animation: `counter-orbit ${ring.dur}s linear infinite ${ri % 2 ? "reverse" : ""}` }}
                        >
                          <div className="-translate-x-1/2 -translate-y-full" style={{ transform: "rotateX(-60deg)", transformOrigin: "50% 100%" }}>
                            <Tile t={t} size="w-12 h-12 lg:w-14 lg:h-14" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* phones: the orbit is too small to read, so show a labelled grid instead */}
      <div className="md:hidden relative mt-10 px-5">
        <div className="grid grid-cols-4 min-[420px]:grid-cols-5 gap-x-2 gap-y-5 max-w-md mx-auto">
          {stack.map((t) => {
            const Icon = t.icon;
            return (
              <a
                key={t.name}
                href={t.url}
                target="_blank"
                rel="noreferrer"
                style={{ ["--brand" as string]: t.color }}
                className="group/t flex flex-col items-center gap-2 text-center"
              >
                <span className="grid place-items-center w-14 h-14 rounded-2xl border border-line bg-gradient-to-b from-surface to-bg-2 shadow-[inset_0_1px_0_rgba(143,184,255,0.15)] transition-colors active:border-[var(--brand)]">
                  <Icon className="w-6 h-6" style={{ color: t.color }} />
                </span>
                <span className="text-[10.5px] leading-tight text-ink-dim">{t.name}</span>
              </a>
            );
          })}
        </div>
      </div>

    </section>
  );
}

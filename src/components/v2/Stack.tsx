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
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", url: "https://nextjs.org" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", url: "https://tailwindcss.com" },
  { name: "Framer Motion", icon: SiFramer, color: "#BB4BFF", url: "https://motion.dev" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", url: "https://nodejs.org" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688", url: "https://fastapi.tiangolo.com" },
  { name: "Fastify", icon: SiFastify, color: "#FFFFFF", url: "https://fastify.dev" },
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
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF", url: "https://github.com" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF", url: "https://vercel.com" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", url: "https://www.figma.com" },
  { name: "Excel", icon: FileSpreadsheet, color: "#217346", url: "https://www.microsoft.com/microsoft-365/excel" },
];

// three orbits: core languages inside, frameworks in the middle, everything else outside
const rings = [
  { items: stack.slice(0, 6), r: 21, dur: 40 },
  { items: stack.slice(6, 16), r: 33.5, dur: 60 },
  { items: stack.slice(16), r: 46, dur: 85 },
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
      className={`group/t stack-tile grid place-items-center ${size} rounded-2xl border border-line bg-[#0c0c11]/90 backdrop-blur text-ink-dim hover:!border-[var(--brand)] hover:!bg-[color-mix(in_srgb,var(--brand)_16%,#0c0c11)] hover:shadow-[0_0_30px_-4px_var(--brand)]`}
    >
      <Icon className="w-[45%] h-[45%] transition-all duration-300 group-hover/t:scale-110 group-hover/t:text-[var(--brand)] group-hover/t:drop-shadow-[0_0_10px_var(--brand)]" />
    </a>
  );
}

function Row({ items, reverse }: { items: Tool[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className="flex w-max hover:[animation-play-state:paused]"
        style={{ animation: `${reverse ? "marquee-right" : "marquee-left"} 45s linear infinite` }}
      >
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 gap-3 pr-3" aria-hidden={k === 1}>
            {items.map((t) => {
              const Icon = t.icon;
              return (
                <a
                  key={t.name}
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={k === 1 ? -1 : undefined}
                  style={{ ["--brand" as string]: t.color }}
                  className="group/t stack-tile flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] pl-3 pr-4 py-2 text-sm text-ink-dim whitespace-nowrap hover:!border-[var(--brand)] hover:!bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] hover:shadow-[0_0_24px_-6px_var(--brand)]"
                >
                  <Icon className="w-4 h-4 group-hover/t:text-[var(--brand)] transition-colors" />
                  <span className="group-hover/t:text-white transition-colors">{t.name}</span>
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  return (
    <section className="relative py-24 sm:py-36 overflow-hidden">
      <div aria-hidden="true" className="aurora w-[700px] h-[700px] left-1/2 top-1/3 -translate-x-1/2 bg-accent-2/20" />
      <div className="relative text-center px-5">
        <p className="inline-flex items-center gap-3 text-xs tracking-[0.35em] font-semibold text-ink-dim mb-5">
          <span className="w-8 h-px bg-accent" /> TECH STACK <span className="w-8 h-px bg-accent" />
        </p>
        <h2 className="font-display font-bold tracking-[-0.02em] text-[clamp(2.2rem,5vw,4rem)] leading-[1.02]">
          Tools I <span className="font-serif italic font-normal text-accent">build</span> with
        </h2>
        <p className="mt-4 text-sm text-ink-faint">Hover to light up · click to visit · {stack.length} tools</p>
      </div>

      {/* orbit system; hovering anywhere pauses it so icons are easy to click */}
      <div className="group/o relative mx-auto mt-10 sm:mt-14 w-[min(640px,94vw)] aspect-square">
        <div aria-hidden="true" className="absolute inset-[38%] rounded-full bg-gradient-to-br from-accent via-accent-3 to-accent-2 blur-2xl opacity-40 animate-pulse" />
        <div className="absolute inset-[40%] rounded-full border border-line-strong bg-[#08080c] grid place-items-center shadow-[0_0_60px_-10px_var(--accent)]">
          <span className="font-display font-extrabold text-[clamp(1.1rem,3.4vw,1.9rem)] shine">AI+</span>
        </div>
        {rings.map((ring, ri) => (
          <div key={ri}>
            <div aria-hidden="true" className="absolute rounded-full border border-line" style={{ inset: `${50 - ring.r}%` }} />
            <div
              className="absolute inset-0 group-hover/o:[animation-play-state:paused]"
              style={{ animation: `orbit ${ring.dur}s linear infinite ${ri % 2 ? "reverse" : ""}` }}
            >
              {ring.items.map((t, i) => {
                const a = (i / ring.items.length) * Math.PI * 2 + ri * 0.4;
                return (
                  <div
                    key={t.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + ring.r * Math.cos(a)}%`, top: `${50 + ring.r * Math.sin(a)}%` }}
                  >
                    {/* counter-rotate so icons stay upright */}
                    <div
                      className="group-hover/o:[animation-play-state:paused]"
                      style={{ animation: `counter-orbit ${ring.dur}s linear infinite ${ri % 2 ? "reverse" : ""}` }}
                    >
                      <Tile t={t} size="w-10 h-10 sm:w-14 sm:h-14" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 sm:mt-16 space-y-3">
        <Row items={stack.slice(0, 15)} />
        <Row items={stack.slice(15)} reverse />
      </div>
    </section>
  );
}

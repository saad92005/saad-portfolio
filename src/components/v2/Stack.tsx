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

export default function Stack() {
  return (
    <section className="relative py-24 sm:py-36 px-5 sm:px-16 overflow-hidden">
      <div aria-hidden="true" className="glow w-[900px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <h2 className="relative font-display text-center text-[clamp(2.4rem,6vw,4.5rem)] font-light tracking-tight text-gradient mb-4">
        TECH STACK
      </h2>
      <p className="relative text-center text-sm text-ink-faint mb-12">Hover to light up · click to visit</p>
      <ul className="relative max-w-5xl mx-auto flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {stack.map(({ name, icon: Icon, color, url }) => (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} — official website`}
              style={{ ["--brand" as string]: color }}
              className="group stack-tile w-[78px] h-[78px] sm:w-[104px] sm:h-[104px] rounded-2xl border border-line bg-white/[0.03] backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-ink-dim hover:!border-[var(--brand)] hover:!bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] hover:shadow-[0_0_30px_-6px_var(--brand)]"
            >
              <Icon className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--brand)] group-hover:drop-shadow-[0_0_10px_var(--brand)]" />
              <span className="text-[9px] sm:text-[11px] text-center leading-tight px-1 group-hover:text-white transition-colors">{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

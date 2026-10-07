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

const stack: { name: string; icon: IconType | typeof Bot }[] = [
  { name: "Python", icon: SiPython },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Dart", icon: SiDart },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Fastify", icon: SiFastify },
  { name: "PyTorch", icon: SiPytorch },
  { name: "Hugging Face", icon: SiHuggingface },
  { name: "LLMs & RAG", icon: Brain },
  { name: "AI Agents", icon: Bot },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "SQLAlchemy", icon: SiSqlalchemy },
  { name: "Prisma", icon: SiPrisma },
  { name: "Supabase", icon: SiSupabase },
  { name: "Firebase", icon: SiFirebase },
  { name: "Flutter", icon: SiFlutter },
  { name: "Android", icon: SiAndroid },
  { name: "Tauri", icon: SiTauri },
  { name: "n8n", icon: SiN8N },
  { name: "Automation", icon: Workflow },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Vercel", icon: SiVercel },
  { name: "Figma", icon: SiFigma },
  { name: "Excel", icon: FileSpreadsheet },
];

export default function Stack() {
  return (
    <section className="relative py-24 sm:py-36 px-5 sm:px-16 overflow-hidden">
      <div aria-hidden="true" className="glow w-[900px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <h2 className="relative font-display text-center text-[clamp(2.4rem,6vw,4.5rem)] font-light tracking-tight text-gradient mb-14">
        TECH STACK
      </h2>
      <ul className="relative max-w-5xl mx-auto flex flex-wrap justify-center gap-3">
        {stack.map(({ name, icon: Icon }) => (
          <li
            key={name}
            className="stack-tile w-[92px] h-[92px] sm:w-[104px] sm:h-[104px] rounded-2xl border border-line bg-white/[0.03] backdrop-blur-sm flex flex-col items-center justify-center gap-2.5 text-ink-dim"
          >
            <Icon size={26} />
            <span className="text-[11px] text-center leading-tight px-1">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiAndroid,
  SiDart,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlutter,
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
  SiSupabase,
  SiTailwindcss,
  SiTauri,
  SiTypescript,
  SiVercel,
  SiFastify,
  SiFramer,
} from "react-icons/si";
import { Bot, Brain, Workflow, Database } from "lucide-react";
import { capabilities } from "@/lib/data";
import { Fade, SectionHead } from "./Reveal";

const icons: { name: string; Icon: IconType | typeof Bot; color: string }[] = [
  { name: "Python", Icon: SiPython, color: "#4B8BBE" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "PyTorch", Icon: SiPytorch, color: "#EE4C2C" },
  { name: "Hugging Face", Icon: SiHuggingface, color: "#FFD21E" },
  { name: "FastAPI", Icon: SiFastapi, color: "#05998B" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Flutter", Icon: SiFlutter, color: "#54C5F8" },
  { name: "Dart", Icon: SiDart, color: "#0175C2" },
  { name: "Android", Icon: SiAndroid, color: "#3DDC84" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Prisma", Icon: SiPrisma, color: "#ffffff" },
  { name: "Tauri", Icon: SiTauri, color: "#FFC131" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "n8n", Icon: SiN8N, color: "#EA4B71" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
  { name: "Vercel", Icon: SiVercel, color: "#ffffff" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Fastify", Icon: SiFastify, color: "#ffffff" },
  { name: "Framer Motion", Icon: SiFramer, color: "#BB4BFF" },
  { name: "LLMs", Icon: Brain, color: "#c084fc" },
  { name: "AI Agents", Icon: Bot, color: "#22d3ee" },
  { name: "Automation", Icon: Workflow, color: "#f472b6" },
  { name: "Databases", Icon: Database, color: "#a3e635" },
];

// Icons placed on a Fibonacci sphere and rotated in 3D with CSS transforms.
function Sphere() {
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const n = icons.length;
    const pts = icons.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      return [Math.cos(t) * r, y, Math.sin(t) * r];
    });
    let ax = 0.3,
      ay = 0,
      vx = 0.0025,
      vy = 0.004,
      raf = 0;
    const el = box.current!;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      vy = ((e.clientX - r.left) / r.width - 0.5) * 0.03;
      vx = -((e.clientY - r.top) / r.height - 0.5) * 0.03;
    };
    el.addEventListener("pointermove", onMove);

    const frame = () => {
      ax += vx;
      ay += vy;
      const R = el.clientWidth * 0.4;
      const [sx, cx, sy, cy] = [Math.sin(ax), Math.cos(ax), Math.sin(ay), Math.cos(ay)];
      pts.forEach(([x, y, z], i) => {
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        const node = items.current[i];
        if (!node) return;
        const s = (z2 + 2) / 3;
        node.style.transform = `translate(-50%, -50%) translate3d(${x1 * R}px, ${y2 * R}px, 0) scale(${s})`;
        node.style.opacity = String(0.25 + ((z2 + 1) / 2) * 0.75);
        node.style.zIndex = String(Math.round((z2 + 1) * 100));
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={box} className="relative w-full max-w-[520px] aspect-square mx-auto">
      <div className="absolute inset-[10%] rounded-full border border-line" />
      <div className="absolute inset-[30%] rounded-full border border-line" />
      {icons.map(({ name, Icon, color }, i) => (
        <div
          key={name}
          ref={(n) => {
            items.current[i] = n;
          }}
          className="absolute left-1/2 top-1/2 group"
          title={name}
          style={{ ["--brand" as string]: color }}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-bg-3 border border-line flex flex-col items-center justify-center gap-1 text-ink group-hover:text-[var(--brand)] group-hover:border-[var(--brand)] transition-colors">
            <Icon size={22} />
            <span className="text-[8px] sm:text-[9px] text-ink-dim whitespace-nowrap">{name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <SectionHead index="02" label="Capabilities" title={["What I work", <em key="w">with</em>]} />
        <div className="mt-16 grid lg:grid-cols-2 gap-14 items-center">
          <div className="border-t border-line">
            {capabilities.map((c, i) => (
              <Fade key={c.title} delay={i * 0.06} className="grid grid-cols-[48px_1fr] gap-4 py-6 border-b border-line">
                <span className="label pt-2">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="serif text-3xl">{c.title}</h3>
                  <p className="mt-2 text-sm text-ink-dim">{c.items.join(", ")}</p>
                </div>
              </Fade>
            ))}
          </div>
          <div>
            <Sphere />
            <p className="label text-center mt-4">Drag your cursor across to spin</p>
          </div>
        </div>
      </div>
    </section>
  );
}

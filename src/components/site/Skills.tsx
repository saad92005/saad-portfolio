"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
import SectionTitle from "./SectionTitle";

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
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35),rgba(34,211,238,0.1)_50%,transparent_70%)] blur-2xl" />
      <div className="absolute inset-[10%] rounded-full border border-white/5" />
      {icons.map(({ name, Icon, color }, i) => (
        <div
          key={name}
          ref={(n) => {
            items.current[i] = n;
          }}
          className="absolute left-1/2 top-1/2 group"
          title={name}
        >
          <div className="glass w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center gap-1">
            <Icon size={24} style={{ color }} />
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
      <div className="blob w-[600px] h-[600px] bg-violet/20 left-1/2 top-1/3 -translate-x-1/2" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-10 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <SectionTitle kicker="Toolbox" title="Skills &" accent="tech stack" />
          <p className="mt-6 text-ink-dim max-w-lg leading-relaxed">
            From model fine-tuning to production deploys — the tools I reach for to take an idea all the way to a
            live product. Move your cursor over the sphere to spin it.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="glass ring-aurora rounded-2xl p-5"
              >
                <h3 className="font-display font-bold">{c.title}</h3>
                <p className="mt-2 text-xs text-ink-dim leading-relaxed">{c.items.join(" · ")}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <Sphere />
      </div>
    </section>
  );
}

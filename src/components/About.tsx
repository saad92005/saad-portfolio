"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import KineticHeading from "./KineticHeading";
import { bio } from "@/lib/data";

const toneVar: Record<string, string> = {
  teal: "var(--teal)",
  accent: "var(--accent)",
  violet: "var(--violet)",
};

function KeywordPill({
  label,
  tone,
  index,
}: {
  label: string;
  tone: "teal" | "accent" | "violet";
  index: number;
}) {
  const color = toneVar[tone];
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.35 + index * 0.035, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -3,
        rotate: index % 2 === 0 ? -2 : 2,
        scale: 1.05,
        boxShadow: `0 10px 26px -10px color-mix(in srgb, ${color} 65%, transparent)`,
      }}
      className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[12.5px] font-mono tracking-wide backdrop-blur-md border cursor-default select-none"
      style={{
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        borderColor: `color-mix(in srgb, ${color} 32%, transparent)`,
        color: `color-mix(in srgb, ${color} 85%, white)`,
      }}
    >
      {label}
    </motion.span>
  );
}

function DualityCard({
  icon: Icon,
  tone,
  title,
  items,
  className = "",
}: {
  icon: LucideIcon;
  tone: "teal" | "accent";
  title: string;
  items: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const color = toneVar[tone];

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        background: `linear-gradient(160deg, color-mix(in srgb, ${color} 10%, var(--bg-raised)), color-mix(in srgb, var(--bg-raised) 90%, black))`,
        borderColor: `color-mix(in srgb, ${color} 28%, var(--line))`,
      }}
      className={`relative w-full max-w-[280px] rounded-2xl border backdrop-blur-xl p-6 transition-transform duration-200 will-change-transform ${className}`}
    >
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-4"
        style={{
          background: `color-mix(in srgb, ${color} 16%, transparent)`,
          color,
        }}
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <h3 className="font-serif text-lg mb-3" style={{ color }}>
        {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-[13px] text-ink-dim flex items-center gap-2">
            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-16 lg:gap-10 items-center">
          {/* left — narrative */}
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[11px] tracking-[0.2em] uppercase mb-4 text-accent"
            >
              Who I am
            </motion.p>

            <KineticHeading
              text="Engineering with a problem-first mindset."
              as="h2"
              gradientTail={2}
              className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02] mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <span className="absolute -left-6 sm:-left-10 -top-8 font-serif text-[7rem] leading-none text-accent/10 select-none pointer-events-none">
                &ldquo;
              </span>
              <p className="font-serif italic text-2xl sm:text-3xl leading-[1.35] text-ink relative">
                {bio.lead}
              </p>
            </motion.div>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {bio.keywords.map((k, i) => (
                <KeywordPill key={k.label} label={k.label} tone={k.tone} index={i} />
              ))}
            </div>

            <div className="mt-8 space-y-4 text-ink-dim leading-[1.75] border-t border-line pt-6">
              {bio.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          {/* right — AI systems / business operations duality widget */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center lg:items-end gap-6 py-6"
          >
            <div
              className="hidden lg:block absolute -z-10 w-[360px] h-[360px] rounded-full"
              style={{
                right: "-8%",
                top: "50%",
                transform: "translateY(-50%)",
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--teal) 26%, transparent) 0%, color-mix(in srgb, var(--accent) 16%, transparent) 45%, transparent 72%)",
                filter: "blur(50px)",
              }}
            />
            <div
              className="hidden lg:block absolute -z-10 w-[250px] h-[250px] rounded-full border border-dashed border-line orbit-spin"
              style={{ right: "6%", top: "50%", transform: "translateY(-50%)" }}
            />

            <DualityCard
              icon={Cpu}
              tone="teal"
              title="AI Systems"
              items={["LLMs & RAG", "NLP & Prompt Engineering", "AI Agents & Assistants"]}
              className="lg:mr-10"
            />
            <DualityCard
              icon={Briefcase}
              tone="accent"
              title="Business Operations"
              items={["Dashboards & Reporting", "Workflow & Process Improvement", "Client Requirements"]}
              className="lg:ml-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

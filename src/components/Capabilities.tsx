"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Workflow, Smartphone, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { capabilities } from "@/lib/data";

type Tone = "teal" | "violet" | "accent" | "rose";

const ICONS: Record<string, LucideIcon> = {
  "AI Engineering": Cpu,
  "Software Engineering": Code2,
  "AI Automation": Workflow,
  "Web & Mobile": Smartphone,
  "Data & Operations": BarChart3,
};

const TONES: Record<string, Tone> = {
  "AI Engineering": "teal",
  "Software Engineering": "violet",
  "AI Automation": "accent",
  "Web & Mobile": "rose",
  "Data & Operations": "teal",
};

const toneVar: Record<Tone, string> = {
  teal: "var(--teal)",
  violet: "var(--violet)",
  accent: "var(--accent)",
  rose: "var(--rose)",
};

function CapabilityPill({ label, color, index }: { label: string; color: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: 0.25 + index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 3, color: `color-mix(in srgb, ${color} 92%, white)` }}
      className="inline-flex items-center gap-2 text-[13px] font-mono cursor-default select-none text-ink-dim"
    >
      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: color }} />
      {label}
    </motion.span>
  );
}

function CapabilityCard({
  title,
  items,
  index,
  featured = false,
  className = "",
}: {
  title: string;
  items: string[];
  index: number;
  featured?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const Icon = ICONS[title] ?? Cpu;
  const tone = TONES[title] ?? "teal";
  const color = toneVar[tone];

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor-hover
        style={{
          background: `radial-gradient(140% 100% at 100% 0%, color-mix(in srgb, ${color} 9%, transparent), transparent 55%), linear-gradient(180deg, color-mix(in srgb, var(--bg-raised) 92%, transparent), color-mix(in srgb, var(--bg-raised) 78%, black))`,
          borderColor: hovered ? `color-mix(in srgb, ${color} 50%, transparent)` : "var(--line)",
          boxShadow: hovered
            ? `0 30px 60px -26px color-mix(in srgb, ${color} 40%, transparent)`
            : "0 20px 40px -30px rgba(0, 0, 0, 0.6)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
        }}
        className={`relative overflow-hidden rounded-2xl border transition-[transform,box-shadow,border-color] duration-300 ${
          featured ? "p-8 sm:p-10" : "p-7"
        }`}
      >
        {/* large ghost icon watermark, not a feature-tile badge */}
        <Icon
          aria-hidden="true"
          size={featured ? 116 : 84}
          strokeWidth={1}
          className="pointer-events-none absolute -top-3 -right-3 opacity-[0.08]"
          style={{ color, transform: "rotate(-8deg)" }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(${
              featured ? 420 : 300
            }px circle at ${spot.x}% ${spot.y}%, color-mix(in srgb, ${color} 12%, transparent), transparent 65%)`,
          }}
        />

        <div className="relative">
          <span
            className="block font-mono text-[10px] tracking-[0.2em] uppercase mb-3"
            style={{ color: `color-mix(in srgb, ${color} 75%, var(--ink-faint))` }}
          >
            0{index + 1}
          </span>

          <h3
            className={`font-serif mb-5 pb-4 border-b border-line ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}
            style={{ color }}
          >
            {title}
          </h3>

          <div className="flex flex-col gap-2.5">
            {items.map((item, i) => (
              <CapabilityPill key={item} label={item} color={color} index={i} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-28 overflow-hidden">
      <div className="wash wash-teal" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What I build"
          title="Capabilities, not a checklist."
          tone="teal"
          gradientTail={1}
          gradientStyle="linear-gradient(100deg, var(--ink) 0%, var(--teal) 100%)"
          glow
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {capabilities.map((c, i) => (
            <CapabilityCard
              key={c.title}
              title={c.title}
              items={c.items}
              index={i}
              featured={i === 0}
              className={i === 0 || i === 1 || i === 2 ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-1"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

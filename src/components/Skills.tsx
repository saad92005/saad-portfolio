"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Workflow, Smartphone, BarChart3 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useTilt } from "@/lib/useTilt";
import { capabilities, type Capability } from "@/lib/data";

const icons: Record<string, typeof Brain> = {
  "AI Engineering": Brain,
  "Software Engineering": Code2,
  "AI Automation": Workflow,
  "Web & Mobile": Smartphone,
  "Data & Operations": BarChart3,
};

function CapabilityCard({ cap, index }: { cap: Capability; index: number }) {
  const Icon = icons[cap.title] ?? Brain;
  const { ref, tiltStyle, glowStyle, onMouseMove, onMouseLeave } = useTilt(7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
    >
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
        className="card card-glow relative overflow-hidden p-6 h-full"
      >
        <motion.div className="absolute inset-0 pointer-events-none" style={glowStyle} aria-hidden="true" />

        <motion.div
          whileHover={{ rotate: -8, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-accent"
          style={{ background: "var(--accent-soft)" }}
        >
          <Icon size={20} strokeWidth={1.75} />
        </motion.div>
        <h3 className="font-display font-semibold text-lg tracking-tight mb-4">{cap.title}</h3>
        <div className="flex flex-wrap gap-2">
          {cap.items.map((item, j) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (index % 3) * 0.08 + j * 0.03 }}
              className="chip px-2.5 py-1 text-xs font-medium"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28 bg-surface-soft overflow-hidden">
      <div className="orb w-[420px] h-[420px] -top-40 -left-32" style={{ background: "var(--gradient-2)", opacity: 0.5 }} aria-hidden="true" />
      <div className="orb w-[380px] h-[380px] -bottom-48 -right-24" style={{ background: "var(--gradient-1)", opacity: 0.5 }} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Capabilities" title="What I build." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

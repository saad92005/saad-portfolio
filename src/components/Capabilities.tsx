"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, Workflow, Smartphone, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { capabilities } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  "AI Engineering": Cpu,
  "Software Engineering": Code2,
  "AI Automation": Workflow,
  "Web & Mobile": Smartphone,
  "Data & Operations": BarChart3,
};

function CapabilityCard({ title, items, index }: { title: string; items: string[]; index: number }) {
  const Icon = ICONS[title] ?? Cpu;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="card card-hover p-7"
    >
      <div className="w-11 h-11 rounded-full bg-surface-soft flex items-center justify-center mb-5 text-accent border border-line">
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <h3 className="font-display font-extrabold text-lg mb-4 text-ink">{title}</h3>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-ink-dim">
            <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Capabilities" title="What I build." />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((c, i) => (
            <CapabilityCard key={c.title} title={c.title} items={c.items} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

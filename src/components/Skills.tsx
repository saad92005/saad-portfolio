"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Workflow, Smartphone, BarChart3 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { capabilities } from "@/lib/data";

const icons: Record<string, typeof Brain> = {
  "AI Engineering": Brain,
  "Software Engineering": Code2,
  "AI Automation": Workflow,
  "Web & Mobile": Smartphone,
  "Data & Operations": BarChart3,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28 bg-surface-soft overflow-hidden">
      <div className="orb w-[420px] h-[420px] -top-40 -left-32" style={{ background: "var(--gradient-2)", opacity: 0.5 }} aria-hidden="true" />
      <div className="orb w-[380px] h-[380px] -bottom-48 -right-24" style={{ background: "var(--gradient-1)", opacity: 0.5 }} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Capabilities" title="What I build." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => {
            const Icon = icons[cap.title] ?? Brain;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="card card-hover card-glow p-6"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-accent"
                  style={{ background: "var(--accent-soft)" }}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="font-black text-lg tracking-tight mb-4">{cap.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cap.items.map((item) => (
                    <span key={item} className="chip px-2.5 py-1 text-xs font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

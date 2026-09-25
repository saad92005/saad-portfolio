"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { aiLab } from "@/lib/data";

function PipelineStrip({ pipeline }: { pipeline: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-line opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {pipeline.map((stage, i) => (
        <span key={stage} className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wide text-violet">{stage}</span>
          {i < pipeline.length - 1 && <span className="text-ink-faint text-[10px]">→</span>}
        </span>
      ))}
    </div>
  );
}

export default function AiLab() {
  return (
    <section id="ai-lab" className="relative py-28 overflow-hidden">
      <div className="wash wash-violet" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="AI lab" title="Where I experiment with AI systems." tone="violet" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiLab.map((m, i) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group panel panel-hover p-7"
            >
              <h3 className="font-serif text-xl mb-2 text-violet">{m.title}</h3>
              <p className="text-sm text-ink-dim leading-relaxed">{m.description}</p>
              <PipelineStrip pipeline={m.pipeline} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

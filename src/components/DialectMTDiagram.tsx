"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BASELINE = ["Arabic Dialect", "Char Embedding", "GRU Encoder", "GRU Decoder", "English"];
const ENHANCED = ["Arabic Dialect", "AraBERT Tokenizer", "AraBERT Encoder", "Linear Projection", "GRU Decoder", "English"];

// straight from the project's own README dialect table — real examples, not invented
const DIALECTS = [
  { code: "MA", name: "Moroccan", script: "كيداير" },
  { code: "LEV", name: "Levantine", script: "كيفك" },
  { code: "GLF", name: "Gulf", script: "كيف حالك" },
  { code: "TUN", name: "Tunisian", script: "شنوة احوالك" },
];

function Row({ label, stages, tone, inView, delayBase }: { label: string; stages: string[]; tone: string; inView: boolean; delayBase: number }) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: tone }}>
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2 mt-2">
        {stages.map((stage, i) => (
          <div key={stage} className="flex items-center gap-1">
            <span
              className="font-mono text-[10.5px] rounded-full border px-2.5 py-1 whitespace-nowrap"
              style={{ borderColor: `color-mix(in srgb, ${tone} 35%, var(--line))`, color: "var(--ink-dim)" }}
            >
              {stage}
            </span>
            {i < stages.length - 1 && (
              <motion.span
                initial={{ opacity: 0.3 }}
                animate={inView ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
                transition={{ duration: 2, repeat: inView ? Infinity : 0, delay: delayBase + i * 0.2, ease: "easeInOut" }}
                className="text-xs px-0.5"
                style={{ color: tone }}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DialectMTDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/9.2] rounded-2xl border border-line-strong bg-bg-raised overflow-hidden shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] flex flex-col justify-center gap-4 px-5 sm:px-7 py-5"
    >
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(245,243,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(245,243,238,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
        <span>Model architecture</span>
        <span className="accent">●</span>
      </div>

      <div className="relative">
        <Row label="Baseline — the problem" stages={BASELINE} tone="var(--ink-faint)" inView={inView} delayBase={0} />
      </div>
      <div className="relative">
        <Row label="AraBERT-enhanced — the solution" stages={ENHANCED} tone="var(--accent)" inView={inView} delayBase={0.4} />
      </div>

      <div className="relative flex flex-wrap items-center gap-2 pt-3 mt-1 border-t border-line">
        <span className="font-mono text-[9.5px] uppercase tracking-widest text-ink-faint mr-1">Dialects covered</span>
        {DIALECTS.map((d) => (
          <span
            key={d.code}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-line bg-bg/60 text-[11px]"
          >
            <span className="font-mono text-[9.5px] text-accent">{d.code}</span>
            <span dir="rtl" className="font-serif text-ink">
              {d.script}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

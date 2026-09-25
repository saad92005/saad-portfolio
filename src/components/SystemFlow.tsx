"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SystemFlow({ stages, dense = false }: { stages: string[]; dense?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  // gate the pulsing arrows to viewport — see SkillConstellation/HeroGraph for
  // why unconditional repeat:Infinity animations are worth avoiding
  const inView = useInView(ref, { margin: "200px 0px" });

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-2xl border border-line-strong bg-bg-raised overflow-hidden shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] ${
        dense ? "aspect-[16/9.2]" : ""
      }`}
    >
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(245,243,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(245,243,238,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)" }}
      />

      <div className={`relative flex flex-col ${dense ? "h-full justify-center px-6" : "px-6 py-10"}`}>
        <div className="flex items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-dim">
          <span>System flow</span>
          <span className="accent">●</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-1 gap-y-3">
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center gap-1">
              <span className="font-mono text-[11px] sm:text-xs rounded-full border border-line px-3 py-1.5 text-ink-dim whitespace-nowrap">
                {stage}
              </span>
              {i < stages.length - 1 && (
                <motion.span
                  initial={{ opacity: 0.3 }}
                  animate={inView ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
                  transition={{ duration: 2, repeat: inView ? Infinity : 0, delay: i * 0.25, ease: "easeInOut" }}
                  className="accent text-xs px-0.5"
                >
                  →
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

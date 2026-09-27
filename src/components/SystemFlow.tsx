"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SystemFlow({ stages, dense = false }: { stages: string[]; dense?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-2xl border border-line bg-surface-soft overflow-hidden ${
        dense ? "aspect-[16/9.2] flex items-center" : ""
      }`}
    >
      <div className={`relative flex flex-col ${dense ? "px-6" : "px-6 py-8"}`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-3">System flow</p>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-3">
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center gap-1">
              <span className="text-xs sm:text-sm rounded-full border border-line-strong bg-surface px-3 py-1.5 text-ink-dim whitespace-nowrap">
                {stage}
              </span>
              {i < stages.length - 1 && (
                <motion.span
                  initial={{ opacity: 0.3 }}
                  animate={inView ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
                  transition={{ duration: 2, repeat: inView ? Infinity : 0, delay: i * 0.25, ease: "easeInOut" }}
                  className="accent text-sm px-0.5"
                  aria-hidden="true"
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

"use client";

import { motion } from "framer-motion";
import IdBadge from "./IdBadge";
import KineticHeading from "./KineticHeading";
import { cornerLabels, profile } from "@/lib/data";

const cornerClasses: Record<string, string> = {
  "top-left": "top-20 left-4 sm:top-28 sm:left-8 text-left",
  "top-right": "top-20 right-4 sm:top-28 sm:right-8 text-right",
  "bottom-left": "bottom-4 left-4 sm:bottom-10 sm:left-8 text-left",
  "bottom-right": "bottom-4 right-4 sm:bottom-10 sm:right-8 text-right",
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col items-center justify-center gradient-wash overflow-hidden px-4 pt-20 pb-8 sm:pt-28 sm:pb-16"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {cornerLabels.map((c, i) => (
          <motion.span
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute font-black uppercase tracking-tight text-ink/10 leading-none select-none ${cornerClasses[c.position]}`}
            style={{ fontSize: "clamp(1.25rem, 4.5vw, 3.25rem)" }}
          >
            {c.label}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <IdBadge />
      </motion.div>

      <div className="relative z-10 mt-4 sm:mt-12 max-w-2xl mx-auto text-center">
        <KineticHeading
          as="h1"
          text={profile.headline}
          delayStart={0.5}
          className="font-display font-semibold tracking-tight leading-[1.03] text-[clamp(1.9rem,7vw,4.5rem)] text-balance"
          lastWordClassName="italic accent"
        />
        <p className="mt-3 sm:mt-5 text-ink-dim text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          {profile.subheadline}
        </p>

        <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#work" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold">
            View my work
            <span aria-hidden="true">→</span>
          </a>
          <a href="#contact" className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold">
            Let&apos;s connect
          </a>
        </div>

        <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-ink-faint">
          {profile.metaLine.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true">·</span>}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.65, 0, 0.35, 1] as const;

// Text slides up from behind a mask, line by line. The observer sits on the
// visible wrapper: the masked lines themselves start fully clipped, so they
// would never register as "in view".
export function Lines({ lines, className = "", delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  return (
    <motion.span
      className={`block ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            variants={{ hidden: { y: "105%" }, shown: { y: 0 } }}
            transition={{ duration: 1, ease }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// Block that wipes in from the bottom edge.
export function Wipe({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 1.2, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Fade({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ index, label, title }: { index: string; label: string; title: ReactNode[] }) {
  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-6 border-t border-line pt-8">
      <p className="label">
        ({index}) {label}
      </p>
      <h2 className="serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95]">
        <Lines lines={title} />
      </h2>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function SectionTitle({
  kicker,
  title,
  accent,
  center,
}: {
  kicker: string;
  title: string;
  accent: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-cyan ${center ? "justify-center" : ""}`}
      >
        <span className="w-6 h-px bg-cyan" /> {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-display font-bold tracking-tight text-[clamp(2.4rem,6vw,4.5rem)] leading-[1]"
      >
        {title} <span className="text-aurora">{accent}</span>
      </motion.h2>
    </div>
  );
}

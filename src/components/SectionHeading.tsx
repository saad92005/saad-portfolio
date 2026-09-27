"use client";

import { motion } from "framer-motion";
import KineticHeading from "./KineticHeading";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use light (white-on-ink) treatment for sections on a dark or gradient surface. */
  light?: boolean;
}) {
  return (
    <div className={`mb-14 sm:mb-16 ${align === "center" ? "text-center mx-auto" : ""} max-w-3xl`}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className={`font-mono text-[11px] tracking-[0.2em] uppercase mb-4 ${light ? "text-white/70" : "text-accent"}`}
      >
        {eyebrow}
      </motion.p>
      <KineticHeading
        text={title}
        as="h2"
        className={`font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.03] ${
          light ? "text-white" : "text-ink"
        }`}
      />
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-5 max-w-lg leading-relaxed ${light ? "text-white/75" : "text-ink-dim"} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

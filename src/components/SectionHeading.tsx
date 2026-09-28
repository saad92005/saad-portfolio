"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import KineticHeading from "./KineticHeading";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: ElementType;
}) {
  return (
    <div className={`mb-14 ${align === "center" ? "text-center mx-auto" : ""} max-w-2xl`}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.15em] accent mb-4"
      >
        <span className="w-6 h-px bg-accent" aria-hidden="true" />
        {eyebrow}
      </motion.p>
      <KineticHeading
        text={title}
        as={as}
        className="font-display font-semibold tracking-tight leading-[1.05] text-[clamp(2rem,4.8vw,3.25rem)] text-balance"
      />
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`mt-5 text-ink-dim max-w-lg leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

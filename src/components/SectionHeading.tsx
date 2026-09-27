"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

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
  const Heading = as;
  return (
    <div className={`mb-14 ${align === "center" ? "text-center mx-auto" : ""} max-w-2xl`}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-sm font-semibold uppercase tracking-[0.15em] accent mb-4"
      >
        {eyebrow}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <Heading className="font-black tracking-tight leading-[1.05] text-[clamp(1.9rem,4.5vw,3rem)]">
          {title}
        </Heading>
      </motion.div>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className={`mt-5 text-ink-dim max-w-lg leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

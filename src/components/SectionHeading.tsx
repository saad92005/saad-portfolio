"use client";

import { motion } from "framer-motion";
import KineticHeading from "./KineticHeading";

const toneClass: Record<string, string> = {
  amber: "text-accent",
  violet: "text-violet",
  teal: "text-teal",
  rose: "text-rose",
};

const toneGlow: Record<string, string> = {
  amber: "var(--accent)",
  violet: "var(--violet)",
  teal: "var(--teal)",
  rose: "var(--rose)",
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "amber",
  align = "left",
  gradientTail = 0,
  gradientStyle,
  glow = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "amber" | "violet" | "teal" | "rose";
  align?: "left" | "center";
  /** Number of trailing words in the title to render with the gradient accent treatment. */
  gradientTail?: number;
  /** CSS `background` value for the gradient words; falls back to the shared accent gradient. */
  gradientStyle?: string;
  /** Adds a subtle ambient text-glow to the eyebrow label, in the section's tone color. */
  glow?: boolean;
}) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center mx-auto" : ""} max-w-3xl`}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className={`font-mono text-[11px] tracking-[0.2em] uppercase mb-4 ${toneClass[tone]}`}
        style={glow ? { textShadow: `0 0 18px color-mix(in srgb, ${toneGlow[tone]} 55%, transparent)` } : undefined}
      >
        {eyebrow}
      </motion.p>
      <KineticHeading
        text={title}
        as="h2"
        gradientTail={gradientTail}
        gradientStyle={gradientStyle}
        className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.02]"
      />
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-5 text-ink-dim max-w-lg leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

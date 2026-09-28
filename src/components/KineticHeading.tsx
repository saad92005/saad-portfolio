"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

const wordVariants = {
  hidden: { y: "115%", rotate: 3 },
  show: { y: "0%", rotate: 0 },
};

// precomputed so the motion component identity is stable across renders —
// motion(as) inline would create a new component type (and remount) every render
const motionTags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const;

/** Word-by-word mask reveal on scroll-into-view — the Linear/Apple "type in motion" pattern. */
export default function KineticHeading({
  text,
  as = "h2",
  className,
  delayStart = 0,
  lastWordClassName,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delayStart?: number;
  /** Extra classes applied only to the final word (e.g. an italic accent treatment). */
  lastWordClassName?: string;
}) {
  const Tag = motionTags[as as keyof typeof motionTags] ?? motion.h2;
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px", amount: 0.3 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05, delayChildren: delayStart } },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom mr-[0.26em] last:mr-0">
          <motion.span
            className={`inline-block ${i === words.length - 1 && lastWordClassName ? lastWordClassName : ""}`}
            variants={wordVariants}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

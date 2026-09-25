"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

export default function KineticHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  gradientTail = 0,
  gradientStyle,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Number of trailing words to render with the gradient accent treatment. */
  gradientTail?: number;
  /** CSS `background` value for the gradient words; falls back to the shared .text-gradient class. */
  gradientStyle?: string;
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          const isGradient = i >= words.length - gradientTail;
          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] mr-[0.25em] align-bottom">
              <motion.span
                className={`inline-block ${isGradient && !gradientStyle ? "text-gradient" : ""}`}
                style={
                  isGradient && gradientStyle
                    ? {
                        background: gradientStyle,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }
                    : undefined
                }
                initial={{ y: "110%", rotate: 4 }}
                whileInView={{ y: "0%", rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + i * 0.06,
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Tag>
  );
}

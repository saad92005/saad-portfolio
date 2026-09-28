"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useTilt } from "@/lib/useTilt";
import { experience, type ExperienceEntry } from "@/lib/data";

function EntryCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const { ref, tiltStyle, glowStyle, onMouseMove, onMouseLeave } = useTilt(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring", stiffness: 300, damping: 15 }}
        className="absolute -left-[34px] sm:-left-[42px] top-6 w-7 h-7 rounded-full bg-accent ring-4 ring-surface flex items-center justify-center"
        aria-hidden="true"
      >
        <Briefcase size={13} color="#fff" strokeWidth={2} />
      </motion.span>

      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
        className="card card-glow relative overflow-hidden p-6 sm:p-7 ml-4"
      >
        <motion.div className="absolute inset-0 pointer-events-none" style={glowStyle} aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-2">{entry.period}</p>
        <h3 className="font-display font-semibold text-xl sm:text-2xl tracking-tight">{entry.role}</h3>
        <p className="accent font-semibold mt-1">
          {entry.org} <span className="text-ink-faint font-normal">— {entry.orgSubtitle}</span>
        </p>
        {entry.note && <p className="text-sm text-ink-faint mt-1 italic">{entry.note}</p>}

        <ul className="mt-4 space-y-2.5">
          {entry.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-ink-dim leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.75", "end 0.4"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-24 sm:py-28 bg-surface">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Experience" title="Where I've worked." />

        <div ref={trackRef} className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
          <motion.div
            className="absolute left-[7px] sm:left-[9px] top-2 w-px origin-top"
            style={{ height: lineHeight, background: "linear-gradient(var(--accent), var(--accent-2))" }}
            aria-hidden="true"
          />

          <div className="space-y-14">
            {experience.map((entry, i) => (
              <EntryCard key={entry.role + entry.org} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

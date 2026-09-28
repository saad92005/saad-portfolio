"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useTilt } from "@/lib/useTilt";
import { education, certifications } from "@/lib/data";

function BadgeCard({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  meta,
  index,
}: {
  icon: typeof GraduationCap;
  eyebrow: string;
  title: string;
  subtitle?: string;
  meta?: string;
  index: number;
}) {
  const { ref, tiltStyle, glowStyle, onMouseMove, onMouseLeave } = useTilt(8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
        className="card card-glow group relative overflow-hidden p-6 h-full"
      >
        <motion.div className="absolute inset-0 pointer-events-none" style={glowStyle} aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(115deg, transparent 30%, color-mix(in srgb, var(--accent) 10%, transparent) 50%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <motion.div
          whileHover={{ rotate: 8, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-accent relative"
          style={{ background: "var(--accent-soft)" }}
        >
          <Icon size={20} strokeWidth={1.75} />
        </motion.div>

        <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-faint mb-1.5">{eyebrow}</p>
        <h3 className="font-display font-semibold text-lg tracking-tight leading-snug">{title}</h3>
        {subtitle && <p className="text-sm text-ink-dim mt-1.5">{subtitle}</p>}
        {meta && <p className="text-xs text-ink-faint mt-2">{meta}</p>}
      </motion.div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-28 bg-surface">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Foundations" title="Education & certifications." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <BadgeCard
            icon={GraduationCap}
            eyebrow="Education"
            title={education.degree}
            subtitle={education.school}
            meta={`${education.location} · ${education.period}`}
            index={0}
          />
          {certifications.map((cert, i) => (
            <BadgeCard
              key={cert.title}
              icon={Award}
              eyebrow="Certification"
              title={cert.issuer}
              subtitle={cert.title}
              index={i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

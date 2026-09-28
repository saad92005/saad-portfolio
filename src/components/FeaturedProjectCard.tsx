"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";
import { PhoneFrame, BrowserFrame, FrameImage } from "./DeviceFrame";
import { useTilt } from "@/lib/useTilt";
import KineticHeading from "./KineticHeading";

export default function FeaturedProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const Frame = project.frame === "phone" ? PhoneFrame : BrowserFrame;
  const { ref, tiltStyle, glowStyle, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="card card-glow relative overflow-hidden mb-6 grid lg:grid-cols-[1.15fr_0.85fr]"
    >
      <div className="relative order-2 lg:order-1 p-6 sm:p-9 flex flex-col justify-center">
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span
            className="relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white overflow-hidden"
            style={{ background: "linear-gradient(120deg, var(--accent), var(--accent-2))" }}
          >
            <motion.span
              className="absolute inset-0"
              style={{ background: "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)" }}
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <span className="relative">★ Featured</span>
          </span>
          <span className="chip px-3 py-1 text-xs font-medium">{project.category}</span>
        </div>

        <KineticHeading
          text={project.title}
          className="font-display font-semibold text-3xl sm:text-4xl tracking-tight mb-2 text-balance"
        />
        <p className="text-sm text-ink-faint mb-4">{project.subtitle}</p>
        <p className="text-ink-dim leading-relaxed mb-6 max-w-lg">{project.description}</p>

        <ul className="space-y-2.5 mb-6">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-3 text-sm text-ink-dim">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-7">
          {project.stack.slice(0, 5).map((t) => (
            <span key={t} className="chip px-2.5 py-1 text-[11px] font-medium">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
          >
            View case study
            <span aria-hidden="true">→</span>
          </button>
          {project.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
            >
              {l.label}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </div>

      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        type="button"
        onClick={() => onOpen(project)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        aria-label={`View case study: ${project.title}`}
        style={{ transformStyle: "preserve-3d" }}
        className="group order-1 lg:order-2 relative bg-surface-soft p-6 sm:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-l border-line overflow-hidden"
      >
        <motion.div className="absolute inset-0 pointer-events-none z-10" style={glowStyle} aria-hidden="true" />
        <motion.div style={tiltStyle} whileHover={{ scale: 1.02 }} className="w-full">
          {project.images[0] ? (
            <Frame>
              <FrameImage {...project.images[0]} crop={project.frame === "phone"} />
            </Frame>
          ) : null}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

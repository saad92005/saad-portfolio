"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";
import { PhoneFrame, BrowserFrame, FrameImage } from "./DeviceFrame";

export default function FeaturedProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const Frame = project.frame === "phone" ? PhoneFrame : BrowserFrame;

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
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ background: "linear-gradient(120deg, var(--accent), #8a4fc2)" }}
          >
            ★ Featured
          </span>
          <span className="chip px-3 py-1 text-xs font-medium">{project.category}</span>
        </div>

        <h3 className="font-display font-semibold text-3xl sm:text-4xl tracking-tight mb-2 text-balance">
          {project.title}
        </h3>
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

      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`View case study: ${project.title}`}
        className="group order-1 lg:order-2 relative bg-surface-soft p-6 sm:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-l border-line"
      >
        <div className="w-full transition-transform duration-500 group-hover:scale-[1.02]">
          {project.images[0] ? (
            <Frame>
              <FrameImage {...project.images[0]} crop={project.frame === "phone"} />
            </Frame>
          ) : null}
        </div>
      </button>
    </motion.div>
  );
}

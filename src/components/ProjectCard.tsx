"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import { PhoneFrame, BrowserFrame, FrameImage } from "./DeviceFrame";
import SystemFlow from "./SystemFlow";
import OmniraVisual from "./OmniraVisual";
import DialectMTDiagram from "./DialectMTDiagram";

function Preview({ project }: { project: Project }) {
  if (project.frame === "phone" && project.images[0]) {
    return (
      <div className="w-[190px] shrink-0 mx-auto">
        <PhoneFrame>
          <FrameImage {...project.images[0]} crop />
        </PhoneFrame>
      </div>
    );
  }
  if (project.frame === "browser" && project.images[0]) {
    return (
      <BrowserFrame>
        <FrameImage {...project.images[0]} />
      </BrowserFrame>
    );
  }
  if (project.slug === "omnira") {
    return (
      <BrowserFrame>
        <OmniraVisual />
      </BrowserFrame>
    );
  }
  if (project.slug === "arabic-dialect-mt") {
    return <DialectMTDiagram />;
  }
  return <SystemFlow stages={project.system} dense />;
}

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={() => onOpen(project)}
        aria-label={`View case study: ${project.name}`}
        className="card card-hover group w-full text-left overflow-hidden flex flex-col h-full"
      >
        <div className="relative flex items-center justify-center px-6 pt-8 pb-6 bg-surface-soft min-h-[220px] overflow-hidden">
          <div className="w-full transition-transform duration-500 group-hover:scale-[1.03]">
            <Preview project={project} />
          </div>
        </div>

        <div className="p-6 sm:p-7 flex flex-col flex-1">
          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
            <span className="tag inline-block px-3 py-1 text-[11px] font-mono uppercase tracking-widest">
              {project.tag}
            </span>
            {project.status && (
              <span className="flex items-center gap-1.5 text-xs accent font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {project.status}
              </span>
            )}
          </div>

          <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight mb-1 text-ink">
            {project.name}
          </h3>
          <p className="text-sm text-ink-faint mb-4">{project.category}</p>
          <p className="text-ink-dim leading-relaxed text-sm mb-5">{project.approach}</p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.technology.slice(0, 4).map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono text-ink-faint border border-line"
              >
                {t}
              </span>
            ))}
          </div>

          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-accent transition-colors">
            <span className="link-underline">View case study</span>
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </span>
        </div>
      </button>
    </motion.div>
  );
}

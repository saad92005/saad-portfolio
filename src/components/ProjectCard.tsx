"use client";

import type { Project } from "@/lib/data";
import { PhoneFrame, BrowserFrame, FrameImage } from "./DeviceFrame";
import SystemFlow from "./SystemFlow";
import { OmniraThumbnail, ArabicMtThumbnail } from "./ProjectThumbnails";
import { motion } from "framer-motion";

function Preview({ project }: { project: Project }) {
  if (project.frame === "phone" && project.images[0]) {
    return (
      <div className="w-[160px] mx-auto">
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
  if (project.slug === "omnira") return <OmniraThumbnail />;
  if (project.slug === "arabic-mt") return <ArabicMtThumbnail />;
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
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="card card-hover card-glow group text-left w-full overflow-hidden flex flex-col"
      aria-label={`View case study: ${project.title}`}
    >
      <div className="p-5 sm:p-6 pb-0">
        <div className="rounded-xl overflow-hidden bg-surface-soft p-5 flex items-center justify-center min-h-[220px]">
          <div className="w-full transition-transform duration-500 group-hover:scale-[1.03]">
            <Preview project={project} />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="chip px-3 py-1 text-xs font-medium">{project.category}</span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-ink-faint">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            {project.status}
          </span>
        </div>

        <h3 className="font-display font-semibold text-xl sm:text-2xl tracking-tight mb-1">{project.title}</h3>
        <p className="text-sm text-ink-faint mb-3">{project.subtitle}</p>
        <p className="text-ink-dim text-sm leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          {project.stack.slice(0, 4).map((t) => (
            <span key={t} className="chip px-2.5 py-1 text-[11px] font-medium">
              {t}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-1.5 text-sm font-semibold accent mt-5">
          View case study
          <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </motion.button>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import { PhoneFrame, BrowserFrame, FrameImage } from "./DeviceFrame";
import SystemFlow from "./SystemFlow";
import OmniraVisual from "./OmniraVisual";
import DialectMTDiagram from "./DialectMTDiagram";

function Preview({ project }: { project: Project }) {
  if (project.frame === "phone" && project.images[0]) {
    return (
      <div className="w-[240px] shrink-0 mx-auto">
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
  // no product screenshots exist yet for these — illustrative diagrams instead,
  // built from the projects' own docs rather than a fabricated UI screenshot
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
  const reverse = index % 2 === 1;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-20 lg:py-24 border-b border-line"
    >
      <div className={`relative ${reverse ? "lg:order-2" : ""}`}>
        <span
          className="font-serif absolute -top-12 -left-2 text-[7rem] leading-none select-none pointer-events-none"
          style={{
            WebkitTextStroke: "1.5px color-mix(in srgb, var(--ink) 24%, transparent)",
            color: "transparent",
            textShadow: "0 0 44px color-mix(in srgb, var(--accent) 22%, transparent)",
          }}
        >
          0{index + 1}
        </span>
        <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[360px]">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            onClick={() => onOpen(project)}
            data-cursor-hover
            data-cursor-text="View"
            style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            className="relative w-full cursor-pointer will-change-transform transition-transform duration-200 drop-shadow-[0_20px_40px_rgba(255,77,35,0.08)]"
          >
            <Preview project={project} />
          </div>
        </div>
      </div>

      <div className={reverse ? "lg:order-1" : ""}>
        <div className="flex items-center gap-3 mb-4">
          <span className="tag inline-block px-3 py-1 text-[11px] font-mono uppercase tracking-widest">
            {project.tag}
          </span>
          {project.status && (
            <span className="flex items-center gap-1.5 text-xs accent font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {project.status}
            </span>
          )}
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl tracking-tight mb-1.5">{project.name}</h3>
        <p className="text-sm text-ink-faint mb-5">{project.category}</p>
        <p className="text-ink-dim leading-relaxed mb-6 max-w-md">{project.approach}</p>

        <ul className="space-y-2.5 mb-6">
          {project.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-ink-dim">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-7">
          {project.technology.map((t) => (
            <span
              key={t}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono text-ink-faint border border-line"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() => onOpen(project)}
          data-cursor-hover
          className="group/cta inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
        >
          <span className="link-underline">View case study</span>
          <span className="inline-block transition-transform duration-300 ease-out group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1">
            ↗
          </span>
        </button>
      </div>
    </motion.div>
  );
}

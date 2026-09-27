"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";
import { PhoneFrame, BrowserFrame, FrameImage } from "./DeviceFrame";
import SystemFlow from "./SystemFlow";

function Gallery({ project }: { project: Project }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (project.images.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % project.images.length), 3200);
    return () => clearInterval(id);
  }, [project.images.length]);

  if (project.images.length === 0) return null;

  const Frame = project.frame === "browser" ? BrowserFrame : PhoneFrame;

  return (
    <div className="group">
      <div className={project.frame === "phone" ? "max-w-[220px] mx-auto" : ""}>
        <Frame>
          <AnimatePresence mode="wait">
            <motion.div
              key={project.images[active].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <FrameImage {...project.images[active]} crop={project.frame === "phone"} />
            </motion.div>
          </AnimatePresence>
        </Frame>
      </div>
      {project.images.length > 1 && (
        <div className="flex gap-2 justify-center mt-4">
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${project.images.length}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-accent" : "w-1.5 bg-line-strong"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-5 border-b border-line">
      <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-2.5">{label}</p>
      {children}
    </div>
  );
}

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="card relative w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute top-5 right-5 w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-dim hover:text-accent hover:border-accent transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-5 flex-wrap pr-10">
              <span className="chip px-3 py-1 text-xs font-medium">{project.category}</span>
              <span className="flex items-center gap-1.5 text-xs font-medium accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {project.status}
              </span>
            </div>

            <h3 className="font-black text-2xl sm:text-3xl tracking-tight mb-1">{project.title}</h3>
            <p className="text-sm text-ink-faint mb-7">{project.subtitle}</p>

            {project.images.length > 0 && (
              <div className="mb-7">
                <Gallery key={project.slug} project={project} />
              </div>
            )}

            <Field label="Overview">
              <p className="text-ink-dim leading-relaxed">{project.description}</p>
            </Field>

            <Field label="System">
              <SystemFlow stages={project.system} />
            </Field>

            <Field label="Highlights">
              <ul className="space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-ink-dim">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Field>

            <Field label="Result">
              <p className="text-ink-dim leading-relaxed">{project.result}</p>
            </Field>

            <Field label="Technology">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span key={t} className="chip px-2.5 py-1 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </Field>

            {project.links && (
              <div className="flex flex-wrap gap-3 pt-6">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
                  >
                    {l.label}
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

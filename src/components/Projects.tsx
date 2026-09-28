"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import FeaturedProjectCard from "./FeaturedProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/lib/data";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="relative py-24 sm:py-28 bg-surface">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Real products, shipped and in production."
          description="AI systems, automation, and full-stack apps — not demos."
        />

        {featured && <FeaturedProjectCard project={featured} onOpen={setSelected} />}

        <div className="grid sm:grid-cols-2 gap-6">
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

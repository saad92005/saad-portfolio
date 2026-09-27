"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { capabilities } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28 bg-surface-soft">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Capabilities" title="What I build." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card card-hover p-6"
            >
              <h3 className="font-black text-lg tracking-tight mb-4">{cap.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cap.items.map((item) => (
                  <span key={item} className="chip px-2.5 py-1 text-xs font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

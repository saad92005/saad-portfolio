"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { education, certifications } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-28 bg-surface">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Foundations" title="Education & certifications." />

        <div className="grid sm:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="card p-6"
          >
            <GraduationCap size={22} className="accent mb-4" strokeWidth={1.75} />
            <h3 className="font-black text-lg tracking-tight mb-1.5">{education.degree}</h3>
            <p className="text-sm text-ink-dim">{education.school}</p>
            <p className="text-xs text-ink-faint mt-2">
              {education.location} · {education.period}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="card p-6"
          >
            <Award size={22} className="accent mb-4" strokeWidth={1.75} />
            <h3 className="font-black text-lg tracking-tight mb-3">Certifications</h3>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert.title} className="text-sm text-ink-dim leading-relaxed">
                  <span className="font-semibold text-ink">{cert.issuer}</span> — {cert.title}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

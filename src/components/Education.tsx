"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { education, certifications } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Foundations" title="Education & certifications." tone="teal" />

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="panel panel-hover p-8"
          >
            <div className="w-11 h-11 rounded-full bg-bg flex items-center justify-center mb-5 text-teal border border-line">
              <GraduationCap size={18} strokeWidth={1.75} />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-teal mb-2">Education</p>
            <h3 className="font-serif text-xl mb-2">{education.degree}</h3>
            <p className="text-sm text-ink-dim mb-1">
              {education.school}, {education.location}
            </p>
            <p className="text-xs text-ink-faint font-mono">{education.period}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="panel panel-hover p-8"
          >
            <div className="w-11 h-11 rounded-full bg-bg flex items-center justify-center mb-5 text-teal border border-line">
              <Award size={18} strokeWidth={1.75} />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-teal mb-4">
              Certifications
            </p>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-ink-dim">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function Differentiator() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="wash wash-rose" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-rose mb-6">
            Technical thinking <span className="text-ink-faint">+</span> business understanding
          </p>
          <p className="font-serif italic text-3xl sm:text-4xl md:text-5xl leading-[1.15]">
            &ldquo;I build technology with the problem behind the technology in mind.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";
import { stats } from "@/lib/data";

export default function Stats() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="panel panel-hover px-6 py-8"
          >
            <p className="font-serif text-4xl sm:text-5xl text-gradient">
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="text-xs text-ink-dim mt-3 leading-snug max-w-[16ch]">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

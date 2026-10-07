"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

const stats = [
  { value: 8, suffix: "+", label: "Projects built" },
  { value: 5, suffix: "", label: "Apps live in production" },
  { value: 3, suffix: "", label: "Languages in my AI tutor" },
  { value: 105, suffix: "", label: "Backend tests in ThinkDesk" },
];

const marquee = [
  "Retrieval-Augmented Generation",
  "LLM Apps",
  "AI Agents",
  "Next.js",
  "FastAPI",
  "Flutter",
  "Supabase",
  "PWA",
  "Automation",
  "NLP Research",
];

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative">
      <div className="border-y border-line bg-bg-2/60 py-5 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {marquee.map((m) => (
                <span key={m} className="flex items-center gap-6 px-6 font-display text-lg sm:text-xl text-ink-dim whitespace-nowrap">
                  {m} <span className="text-aurora text-2xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30, rotateX: 30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 800 }}
            className="glass ring-aurora rounded-3xl p-6 sm:p-8"
          >
            <div className="font-display text-4xl sm:text-5xl font-bold text-aurora">
              <Count to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm text-ink-dim">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

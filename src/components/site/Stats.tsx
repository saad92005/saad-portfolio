"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Fade } from "./Reveal";

const stats = [
  { value: 8, suffix: "+", label: "Projects built end to end" },
  { value: 5, suffix: "", label: "Apps live in production" },
  { value: 3, suffix: "", label: "Languages my AI tutor teaches in" },
  { value: 105, suffix: "", label: "Backend tests behind ThinkDesk" },
];

const words = ["RAG systems", "LLM products", "AI agents", "Web apps", "Android apps", "Automation", "NLP research"];

function Count({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
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
      <div className="border-y border-line py-6 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {words.map((w) => (
                <span key={w} className="serif italic text-4xl sm:text-5xl px-8 whitespace-nowrap text-ink-dim">
                  {w}
                  <span className="not-italic text-accent ml-16">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Fade
            key={s.label}
            delay={i * 0.08}
            className="py-12 pr-6 border-b lg:border-b-0 border-line lg:[&:not(:last-child)]:border-r lg:[&:not(:first-child)]:pl-8"
          >
            <div className="serif text-6xl sm:text-7xl">
              <Count to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-3 text-sm text-ink-dim max-w-[16ch]">{s.label}</p>
          </Fade>
        ))}
      </div>
    </section>
  );
}

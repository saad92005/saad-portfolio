"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["AI ENGINEER", "FULL-STACK DEVELOPER", "AI ENGINEER", "FULL-STACK DEVELOPER"];
const ease = [0.76, 0, 0.24, 1] as const;

// Four triangles meeting at the centre; on exit each flies off its own edge.
const panels = [
  { clip: "polygon(0 0, 100% 0, 50% 50%)", to: { y: "-100%" } },
  { clip: "polygon(100% 0, 100% 100%, 50% 50%)", to: { x: "100%" } },
  { clip: "polygon(0 100%, 100% 100%, 50% 50%)", to: { y: "100%" } },
  { clip: "polygon(0 0, 0 100%, 50% 50%)", to: { x: "-100%" } },
];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"load" | "split" | "done">("load");

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    let raf = 0;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        t1 = setTimeout(() => setPhase("split"), 250);
        t2 = setTimeout(() => setPhase("done"), 1450);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;
  const split = phase === "split";

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden" aria-hidden="true">
      {panels.map((p, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-accent"
          style={{ clipPath: p.clip }}
          animate={split ? p.to : { x: 0, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
        />
      ))}

      <AnimatePresence>
        {!split && (
          <motion.div
            key="content"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col text-[#050507]"
          >
            <div className="flex items-center justify-between px-6 sm:px-8 py-6 text-sm font-semibold">
              <span className="font-display font-bold">SaadShahid</span>
              <span className="flex gap-1.5 items-end h-6">
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[2px] bg-[#050507]"
                    animate={{ height: ["40%", "100%", "40%"] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
              </span>
            </div>
            <div className="flex-1 flex items-center">
              <div className="marquee-track">
                {[0, 1].map((k) => (
                  <div key={k} className="flex shrink-0">
                    {words.map((w, i) => (
                      <span key={i} className="font-display font-extrabold tracking-tight text-[clamp(3rem,9vw,7.5rem)] whitespace-nowrap px-8">
                        {w} <span className="px-6">✦</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the pill sits on top; the panels open out from behind it */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 flex items-center gap-8 rounded-full bg-[#050507] text-white px-10 py-5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]"
        style={{ x: "-50%", y: "-50%" }}
        animate={split ? { scale: 0.6, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: split ? 0.35 : 0 }}
      >
        <span className="text-sm font-medium tracking-wide">LOADING</span>
        <span className="text-sm tabular-nums text-accent w-12 text-right">{progress}%</span>
      </motion.div>
    </div>
  );
}

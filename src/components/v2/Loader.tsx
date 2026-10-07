"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["AI ENGINEER", "FULL-STACK DEVELOPER", "AI ENGINEER", "FULL-STACK DEVELOPER"];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[150] flex flex-col bg-lavender text-[#0b0710] overflow-hidden"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="flex items-center justify-between px-6 sm:px-8 py-6 text-sm font-semibold">
            <span>SaadShahid</span>
            <span className="flex gap-1.5 items-end h-6">
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[2px] bg-[#0b0710]"
                  animate={{ height: ["40%", "100%", "40%"] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </span>
          </div>

          <div className="flex-1 flex items-center relative">
            <div className="marquee-track">
              {[0, 1].map((k) => (
                <div key={k} className="flex shrink-0">
                  {words.map((w, i) => (
                    <span
                      key={i}
                      className="font-display font-bold tracking-tight text-[clamp(3rem,9vw,7.5rem)] whitespace-nowrap px-8"
                    >
                      {w} <span className="px-6">•</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8 rounded-full bg-[#050407] text-white px-10 py-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] border-t-2 border-accent-2/80">
              <span className="text-sm font-medium tracking-wide">LOADING</span>
              <span className="text-sm tabular-nums text-white/70 w-12 text-right">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

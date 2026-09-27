"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
  useReducedMotion,
} from "framer-motion";
import { profile } from "@/lib/data";

export default function HeroBadge() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  // swing: one motion value drives both the sideways drift and, derived from it,
  // the rotation — an underdamped spring on `x` alone reads as a pendulum settling
  const x = useMotionValue(0);
  const swingRotate = useTransform(x, [-90, 90], [-16, 16]);

  // independent subtle 3D tilt toward the cursor, on the card itself
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 14 });
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 14 });

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(x, [-30, 0], {
      type: "spring",
      stiffness: 42,
      damping: 4.2,
      mass: 1,
      delay: 0.5,
    });
    return () => controls.stop();
  }, [reduceMotion, x]);

  function handlePointerMove(e: React.PointerEvent) {
    if (reduceMotion) return;
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 10);
    tiltX.set(py * -8);
  }

  function handlePointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <div className="relative flex flex-col items-center select-none" style={{ paddingTop: 56 }}>
      <div className="absolute top-0 w-11 h-6 rounded-md lanyard-clip z-10" />

      <motion.div
        style={{
          x: reduceMotion ? 0 : x,
          rotate: reduceMotion ? 0 : swingRotate,
          transformOrigin: "top center",
        }}
        drag={reduceMotion ? false : "x"}
        dragConstraints={{ left: -85, right: 85 }}
        dragElastic={0.35}
        dragSnapToOrigin
        transition={{ type: "spring", stiffness: 46, damping: 4.5 }}
        whileDrag={{ cursor: "grabbing" }}
        className="flex flex-col items-center"
      >
        <div className="w-[3px] h-14 mx-auto" style={{ background: "linear-gradient(180deg, #8f8f9b, var(--ink))" }} />

        <div
          ref={wrapRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative cursor-grab active:cursor-grabbing"
          style={{ perspective: 900 }}
        >
          <motion.div
            style={{
              rotateX: reduceMotion ? 0 : springTiltX,
              rotateY: reduceMotion ? 0 : springTiltY,
            }}
            className="relative w-[248px] sm:w-[276px] rounded-[26px] bg-white p-4 pt-6 shadow-[0_35px_70px_-25px_rgba(20,18,26,0.45)] border border-line"
          >
            {/* punch hole for the clip */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-[color-mix(in_srgb,var(--ink)_12%,white)]" />

            <div className="flex items-center justify-between mb-3">
              <span className="font-display font-extrabold text-[13px] tracking-tight text-ink">
                SAAD<span className="accent">/</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink-faint">
                ID · 2026
              </span>
            </div>

            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-soft mb-4">
              <Image
                src="/images/headshot.png"
                alt={`${profile.name} headshot`}
                fill
                sizes="280px"
                className="object-cover"
                priority
              />
            </div>

            <p className="font-display font-extrabold text-xl leading-tight text-ink">{profile.name}</p>
            <p className="text-[13px] text-ink-dim mt-1 leading-snug">{profile.role}</p>
            <p className="font-mono text-[11px] text-ink-faint mt-2">Based in {profile.locationShort}</p>

            <div className="mt-4 pt-3 border-t border-dashed border-line-strong">
              <div className="barcode h-6 w-full" aria-hidden="true" />
              <p className="font-mono text-[9px] text-ink-faint mt-1 tracking-widest text-center">
                SAAD-SHAHID-AI-ENG
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

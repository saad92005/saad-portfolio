"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from "framer-motion";
import { profile } from "@/lib/data";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const noopSubscribe = () => () => {};

// mirrors the server snapshot (false) until the client takes over, so the
// first client render matches SSR exactly and avoids a hydration mismatch.
function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export default function IdBadge() {
  const prefersReducedMotion = useReducedMotion();
  const rotate = useMotionValue(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [settled, setSettled] = useState(false);
  const mounted = useMounted();

  // avoids a hydration mismatch: useReducedMotion() can only resolve the real
  // media-query value after mount, so drag/className stay in their SSR state
  // until then and pick up the real value on the next render, not during hydration.
  const reduceMotion = mounted && !!prefersReducedMotion;

  useEffect(() => {
    if (prefersReducedMotion) return;
    rotate.set(16);
    const controls = animate(rotate, 0, {
      type: "spring",
      stiffness: 32,
      damping: 5.5,
      mass: 1,
      onComplete: () => setSettled(true),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  function handleDrag(_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    rotate.set(clamp(info.offset.x / 5, -20, 20));
  }

  function handleDragStart() {
    draggingRef.current = true;
  }

  function handleDragEnd() {
    draggingRef.current = false;
    animate(rotate, 0, { type: "spring", stiffness: 260, damping: 18 });
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (draggingRef.current || !settled || prefersReducedMotion) return;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    animate(rotate, clamp(relX, -1, 1) * 6, { type: "spring", stiffness: 120, damping: 14 });
  }

  function handlePointerLeave() {
    if (draggingRef.current || prefersReducedMotion) return;
    animate(rotate, 0, { type: "spring", stiffness: 120, damping: 14 });
  }

  return (
    <div ref={wrapperRef} className="relative mx-auto w-[260px] sm:w-[290px] select-none">
      <div className="mx-auto w-3 h-3 rounded-full bg-ink/60 relative z-10" aria-hidden="true" />

      <motion.div
        style={{ rotate, transformOrigin: "50% 0%" }}
        drag={!reduceMotion}
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={0.55}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 16 }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={reduceMotion ? "" : "cursor-grab active:cursor-grabbing touch-none"}
        role="img"
        aria-label={`ID badge for ${profile.name}, ${profile.role}. Draggable.`}
      >
        <div
          className="mx-auto h-24 sm:h-28 rounded-full"
          style={{ width: 10, background: "linear-gradient(180deg, var(--accent), var(--accent-2))" }}
        />
        <div className="mx-auto -mt-1 w-9 h-5 rounded-md bg-ink/85 relative z-10" />

        <div className="card mt-1 w-full p-4 sm:p-5 relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-6">
            <span className="w-2 h-2 rounded-full bg-surface border border-line-strong" />
            <span className="w-2 h-2 rounded-full bg-surface border border-line-strong" />
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[4/5] relative bg-gradient-2/40 mb-4">
            <Image
              src="/images/headshot.png"
              alt={`Portrait photo of ${profile.name}`}
              fill
              sizes="270px"
              className="object-cover object-top"
              priority
            />
          </div>

          <p className="font-black text-lg leading-tight tracking-tight">{profile.name}</p>
          <p className="text-sm accent font-semibold mt-0.5">{profile.role}</p>
          <p className="text-xs text-ink-faint mt-1">Based in Lahore, PK</p>

          <div className="flex gap-[2px] mt-4 h-5" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
              <span
                key={i}
                className="bg-ink"
                style={{ width: i % 4 === 0 ? 2.5 : 1.5 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

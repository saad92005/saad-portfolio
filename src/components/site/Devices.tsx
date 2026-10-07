"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Wraps children in a perspective container that tilts toward the pointer.
export function Tilt({ children, className = "", max = 10 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.22), transparent 50%)`,
  );

  function onMove(e: React.PointerEvent) {
    const r = ref.current!.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={className} style={{ perspective: 1200 }}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative w-full h-full">
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
}

export function Browser({ src, alt, url, priority }: { src: string; alt: string; url?: string; priority?: boolean }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0f1c] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        {url && (
          <span className="ml-3 flex-1 max-w-xs truncate rounded-md bg-white/5 px-3 py-1 text-[11px] text-ink-faint">{url}</span>
        )}
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 720px, 100vw" className="object-cover object-top" />
      </div>
    </div>
  );
}

export function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`relative rounded-[2.2rem] p-[7px] bg-gradient-to-b from-[#3a3d52] to-[#14151f] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="relative rounded-[1.8rem] overflow-hidden aspect-[9/19.5] bg-black">
        <Image src={src} alt={alt} fill sizes="260px" className="object-cover object-top" />
        <span className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-black" />
      </div>
    </div>
  );
}

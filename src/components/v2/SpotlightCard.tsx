"use client";

import { useRef, type ReactNode } from "react";

// Card with a soft light that follows the mouse, plus a lit border under it.
export default function SpotlightCard({ children, className = "", color = "#4169e1" }: { children: ReactNode; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      style={{ ["--c" as string]: color }}
      className={`group relative rounded-2xl border border-line bg-surface/50 overflow-hidden transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(65,105,225,0.45)] hover:border-[color-mix(in_srgb,var(--c)_45%,transparent)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(380px circle at var(--mx) var(--my), color-mix(in srgb, var(--c) 14%, transparent), transparent 50%)" }}
      />
      {children}
    </div>
  );
}

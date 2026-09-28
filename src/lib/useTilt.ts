"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/** Cursor-driven 3D tilt + spotlight glow, the Awwwards-style "3D tilt card" pattern. */
export function useTilt(intensity = 8) {
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), {
    stiffness: 300,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), {
    stiffness: 300,
    damping: 28,
  });
  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return {
    ref,
    tiltStyle: { rotateX, rotateY, transformPerspective: 900 },
    glowStyle: { background: useTransform([glowX, glowY], ([gx, gy]) =>
      `radial-gradient(320px circle at ${gx} ${gy}, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)`
    ) },
    onMouseMove,
    onMouseLeave,
  };
}

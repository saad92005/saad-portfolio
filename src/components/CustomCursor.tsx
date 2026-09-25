"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [clicked, setClicked] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest<HTMLElement>("a, button, [data-cursor-hover]");
      setHovering(!!hoverEl);
      setLabel(hoverEl?.dataset.cursorText ?? "");
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = hovering ? (label ? 66 : 46) : 30;

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hovering ? 0 : 1,
        }}
        animate={{ scale: clicked ? 0.8 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className={`cursor-ring ${hovering ? "is-active" : ""}`}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
        }}
        animate={{ scale: clicked ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <span className="cursor-ring-label" style={{ opacity: label ? 1 : 0 }}>
          {label}
        </span>
      </motion.div>
    </>
  );
}

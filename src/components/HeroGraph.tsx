"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; color: string; r: number };

const PALETTE = [
  "rgba(255, 77, 35, 0.9)",
  "rgba(255, 184, 0, 0.85)",
  "rgba(139, 92, 246, 0.85)",
  "rgba(45, 212, 191, 0.85)",
];

export default function HeroGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / 18000);
      nodes = Array.from({ length: Math.max(18, Math.min(42, count)) }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        color: PALETTE[i % PALETTE.length],
        r: i % 7 === 0 ? 3.2 : 1.6,
      }));
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          n.x += (dx / (dist || 1)) * force * 0.8;
          n.y += (dy / (dist || 1)) * force * 0.8;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 22500) {
            const dist = Math.sqrt(distSq);
            const nearMouse = Math.min(
              Math.hypot(a.x - mouse.x, a.y - mouse.y),
              Math.hypot(b.x - mouse.x, b.y - mouse.y)
            );
            const proximity = Math.max(0, 1 - nearMouse / 240);
            const alpha = (1 - dist / 150) * (0.08 + proximity * 0.35);
            ctx.strokeStyle = `rgba(255, 200, 160, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // ctx.shadowBlur forces a real blur pass per shape — one of the most
      // expensive Canvas2D operations. A cheap two-layer fill fakes the same
      // soft glow at a fraction of the per-frame cost across ~60 nodes.
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = n.color.replace(/[\d.]+\)$/, "0.18)");
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      }

      if (!reduceMotion && visible) raf = requestAnimationFrame(tick);
      else raf = 0;
    }

    // the Hero canvas only occupies the first viewport — pause the O(n^2) tick
    // loop entirely once it's scrolled out of view instead of running it forever.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf && !reduceMotion) raf = requestAnimationFrame(tick);
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(canvas);

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

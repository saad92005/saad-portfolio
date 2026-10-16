"use client";

import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiAndroid,
  SiClaude,
  SiCloudflare,
  SiDart,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHuggingface,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";

/* ============================================================================
 * EDIT YOUR STACK HERE. One array per ring (inner -> outer). Add or remove tools freely;
 * the orbit spaces them evenly. `color` is the brand color shown on hover, `url` is the
 * official site the icon opens.
 * ========================================================================== */
type Tech = { name: string; icon: IconType; color: string; url: string };

const RINGS: Tech[][] = [
  // inner ring: languages & AI
  [
    { name: "Python", icon: SiPython, color: "#3776AB", url: "https://www.python.org" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", url: "https://www.typescriptlang.org" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", url: "https://developer.mozilla.org/docs/Web/JavaScript" },
    { name: "Claude", icon: SiClaude, color: "#D97757", url: "https://www.anthropic.com/claude" },
    { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E", url: "https://huggingface.co" },
    { name: "Gemini", icon: SiGooglegemini, color: "#8E75B2", url: "https://gemini.google.com" },
  ],
  // middle ring: frameworks (rotates the opposite way)
  [
    { name: "React", icon: SiReact, color: "#61DAFB", url: "https://react.dev" },
    { name: "Next.js", icon: SiNextdotjs, color: "#F4F6FC", url: "https://nextjs.org" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", url: "https://tailwindcss.com" },
    { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", url: "https://nodejs.org" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688", url: "https://fastapi.tiangolo.com" },
    { name: "Flutter", icon: SiFlutter, color: "#54C5F8", url: "https://flutter.dev" },
    { name: "Dart", icon: SiDart, color: "#0175C2", url: "https://dart.dev" },
    { name: "Vite", icon: SiVite, color: "#A855F7", url: "https://vite.dev" },
  ],
  // outer ring: data, automation, platforms
  [
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", url: "https://www.postgresql.org" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", url: "https://supabase.com" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28", url: "https://firebase.google.com" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", url: "https://www.mongodb.com" },
    { name: "n8n", icon: SiN8N, color: "#EA4B71", url: "https://n8n.io" },
    { name: "LangChain", icon: SiLangchain, color: "#1C9C7C", url: "https://www.langchain.com" },
    { name: "Docker", icon: SiDocker, color: "#2496ED", url: "https://www.docker.com" },
    { name: "Android", icon: SiAndroid, color: "#3DDC84", url: "https://developer.android.com" },
    { name: "Git", icon: SiGit, color: "#F05032", url: "https://git-scm.com" },
    { name: "GitHub", icon: SiGithub, color: "#F4F6FC", url: "https://github.com" },
    { name: "Vercel", icon: SiVercel, color: "#F4F6FC", url: "https://vercel.com" },
    { name: "Cloudflare", icon: SiCloudflare, color: "#F38020", url: "https://www.cloudflare.com" },
  ],
];

const CORE_LABEL = "AI+";

/* ---------------------------------------------------------------- geometry */
// Per ring: radius (fraction of the scene's half-width), rotation speed (rad/s; negative =
// opposite direction), and the in-plane tilt of the ellipse in radians.
const RING_GEOMETRY = [
  { r: 0.34, speed: 0.2, tilt: -0.16 },
  { r: 0.61, speed: -0.13, tilt: 0.1 },
  { r: 0.9, speed: 0.08, tilt: -0.05 },
];
const INTRO_MS = 1800;
const HOVER_SLOWDOWN = 0.12; // orbit speed multiplier while something is focused

type Item = Tech & { ring: number; base: number };
const ITEMS: Item[] = RINGS.flatMap((ring, ri) =>
  ring.map((t, i) => ({ ...t, ring: ri, base: (i / ring.length) * Math.PI * 2 + ri * 0.7 })),
);

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

export default function TechStackOrbit() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const tiltEl = tiltRef.current;
    const canvas = canvasRef.current;
    const tip = tipRef.current;
    const ctx = canvas?.getContext("2d");
    if (!scene || !tiltEl || !canvas || !ctx || !tip) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--accent").trim() || "#4169e1";
    const accent2 = css.getPropertyValue("--accent-2").trim() || "#8fb8ff";

    // ---- mutable animation state (refs/closures only: no React re-renders) ----
    let w = 0;
    let h = 0;
    let dpr = 1;
    let angle = 0; // shared clock for all rings
    let speedMul = 1;
    let introStart = reduced ? -Infinity : 0; // 0 = not started yet
    let visible = false;
    let raf = 0;
    let last = 0;
    let active = -1; // hovered / focused / tapped icon index
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    let stars: { x: number; y: number; r: number; p: number }[] = [];

    const ringRadii = (ri: number) => {
      const g = RING_GEOMETRY[ri];
      const rx = (w / 2) * g.r * 0.92;
      const flat = w < 640 ? 0.78 : 0.36; // flatter ellipses on wide screens, rounder on (square) phones
      return { rx, ry: rx * flat, tilt: g.tilt };
    };

    const pointOn = (ri: number, a: number, radiusScale = 1) => {
      const { rx, ry, tilt: t } = ringRadii(ri);
      const x0 = Math.cos(a) * rx * radiusScale;
      const y0 = Math.sin(a) * ry * radiusScale;
      return {
        x: w / 2 + x0 * Math.cos(t) - y0 * Math.sin(t),
        y: h / 2 + x0 * Math.sin(t) + y0 * Math.cos(t),
        depth: Math.sin(a), // +1 = front (closest to viewer), -1 = back
      };
    };

    function resize() {
      const rect = scene!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.2,
        p: Math.random() * Math.PI * 2,
      }));
      // stars are drawn once into an offscreen layer; each frame just blits it
      const sc = starRef.current ?? (starRef.current = document.createElement("canvas"));
      sc.width = canvas!.width;
      sc.height = canvas!.height;
      const sctx = sc.getContext("2d")!;
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.fillStyle = accent2;
      for (const s of stars) {
        sctx.globalAlpha = 0.2 + 0.35 * ((Math.sin(s.p) + 1) / 2);
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        sctx.fill();
      }
      draw(performance.now());
    }

    function draw(now: number) {
      const intro = reduced ? 1 : introStart ? easeOut(Math.min((now - introStart) / INTRO_MS, 1)) : 0;
      ctx!.clearRect(0, 0, w, h);

      // starfield: one blit of the prerendered layer, with a slow shared twinkle
      if (starRef.current) {
        ctx!.globalAlpha = reduced ? 0.9 : 0.75 + 0.25 * Math.sin(now / 1400);
        ctx!.drawImage(starRef.current, 0, 0, w, h);
      }
      ctx!.globalAlpha = 1;

      // orbit rings + a comet on each
      RING_GEOMETRY.forEach((g, ri) => {
        const { rx, ry, tilt: t } = ringRadii(ri);
        ctx!.save();
        ctx!.translate(w / 2, h / 2);
        ctx!.rotate(t);
        ctx!.scale(intro, intro);
        ctx!.strokeStyle = accent2;
        ctx!.globalAlpha = 0.16;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.restore();
        if (!reduced) {
          const ca = angle * g.speed * 2.4 + ri * 2;
          for (let k = 0; k < 14; k++) {
            const p = pointOn(ri, ca - k * 0.035 * Math.sign(g.speed), intro);
            ctx!.globalAlpha = (1 - k / 14) * 0.55 * intro;
            ctx!.fillStyle = k === 0 ? "#ffffff" : accent2;
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, Math.max(0.4, 2 - k * 0.12), 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      });
      ctx!.globalAlpha = 1;

      // icons (DOM): position, fake 3D depth, z-order
      const half = (iconRefs.current[0]?.offsetWidth ?? 0) / 2;
      ITEMS.forEach((it, i) => {
        const el = iconRefs.current[i];
        if (!el) return;
        const g = RING_GEOMETRY[it.ring];
        const spiral = (1 - intro) * Math.PI * 1.5; // spiral in from the center
        const a = it.base + angle * g.speed + spiral;
        const p = pointOn(it.ring, a, intro);
        const front = (p.depth + 1) / 2; // 0 back … 1 front
        const isActive = i === active;
        const scale = (0.66 + 0.44 * front) * (isActive ? 1.25 : 1) * (0.4 + 0.6 * intro);
        const dim = active >= 0 && !isActive ? 0.3 : 1;
        el.style.transform = `translate3d(${(p.x - half).toFixed(2)}px, ${(p.y - half).toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = ((0.4 + 0.6 * front) * dim * Math.min(1, intro * 1.4)).toFixed(3);
        el.style.zIndex = String(isActive ? 60 : p.depth > 0 ? 30 + Math.round(front * 20) : 1 + Math.round(front * 10));
        el.dataset.active = isActive ? "true" : "false";

        if (isActive) {
          // dashed beam from the core to the active icon
          ctx!.save();
          ctx!.setLineDash([6, 6]);
          ctx!.lineDashOffset = reduced ? 0 : -now / 40;
          const grad = ctx!.createLinearGradient(w / 2, h / 2, p.x, p.y);
          grad.addColorStop(0, accent);
          grad.addColorStop(1, it.color);
          ctx!.strokeStyle = grad;
          ctx!.lineWidth = 1.6;
          ctx!.globalAlpha = 0.9;
          ctx!.beginPath();
          ctx!.moveTo(w / 2, h / 2);
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();
          ctx!.restore();
          tip!.textContent = it.name;
          tip!.style.transform = `translate(-50%, -100%) translate(${p.x}px, ${p.y - 34 * scale}px)`;
          tip!.style.opacity = "1";
        }
      });
      if (active < 0) tip!.style.opacity = "0";

      // mouse parallax: ease toward the target tilt
      tilt.x += (tilt.tx - tilt.x) * 0.06;
      tilt.y += (tilt.ty - tilt.y) * 0.06;
      tiltEl!.style.transform = `translate3d(${tilt.y.toFixed(2)}px, ${(-tilt.x).toFixed(2)}px, 0)`;
    }

    function frame(now: number) {
      const dt = last ? Math.min(now - last, 50) / 1000 : 0;
      last = now;
      speedMul += ((active >= 0 ? HOVER_SLOWDOWN : 1) - speedMul) * (1 - Math.exp(-dt * 5));
      angle += dt * speedMul;
      draw(now);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (reduced || raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    // In reduced-motion mode nothing loops; we redraw only when something changes.
    const redraw = () => reduced && draw(performance.now());

    // ---- observers & listeners ----
    const ro = new ResizeObserver(resize);
    ro.observe(scene);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && introStart === 0) introStart = performance.now();
        if (visible) start();
        else stop();
      },
      { threshold: 0.15 },
    );
    io.observe(scene);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduced) return;
      const r = scene.getBoundingClientRect();
      tilt.ty = ((e.clientX - r.left) / r.width - 0.5) * 18;
      tilt.tx = -((e.clientY - r.top) / r.height - 0.5) * 12;
    };
    const onPointerLeave = () => {
      tilt.tx = 0;
      tilt.ty = 0;
    };
    scene.addEventListener("pointermove", onPointerMove);
    scene.addEventListener("pointerleave", onPointerLeave);

    // icon interactions: hover (mouse), focus (keyboard), tap toggles (touch)
    const cleanups: (() => void)[] = [];
    iconRefs.current.forEach((el, i) => {
      if (!el) return;
      const on = () => {
        active = i;
        redraw();
      };
      const off = () => {
        if (active === i) active = -1;
        redraw();
      };
      const enter = (e: PointerEvent) => e.pointerType === "mouse" && on();
      const leave = (e: PointerEvent) => e.pointerType === "mouse" && off();
      // mouse clicks open the site; on touch the first tap lights it up, the second opens it
      let lastPointer = "mouse";
      const down = (e: PointerEvent) => (lastPointer = e.pointerType);
      const tap = (e: MouseEvent) => {
        if (lastPointer === "mouse" || active === i) return;
        e.preventDefault();
        on();
      };
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      el.addEventListener("focus", on);
      el.addEventListener("blur", off);
      el.addEventListener("click", tap);
      el.addEventListener("pointerdown", down);
      cleanups.push(() => {
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
        el.removeEventListener("focus", on);
        el.removeEventListener("blur", off);
        el.removeEventListener("click", tap);
      });
    });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerleave", onPointerLeave);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="tech-orbit relative mx-auto w-[min(960px,calc(100%-2rem))] aspect-square sm:aspect-[16/10] lg:aspect-[16/9] touch-pan-y select-none"
    >
      <div ref={tiltRef} className="absolute inset-0 will-change-transform">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />

        {/* glowing core: pulse + spinning ring + ripple (CSS keyframes, disabled for reduced motion) */}
        <div className="absolute left-1/2 top-1/2 z-[20] -translate-x-1/2 -translate-y-1/2 w-[clamp(54px,13%,120px)] aspect-square pointer-events-none">
          <span aria-hidden="true" className="orbit-glow absolute -inset-[90%] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_45%,transparent)_0%,transparent_65%)]" />
          <span aria-hidden="true" className="orbit-ripple absolute inset-0 rounded-full border border-accent-2/50" />
          <span aria-hidden="true" className="orbit-spin absolute -inset-[10%] rounded-full border-2 border-transparent border-t-accent-2/80 border-r-accent/60" />
          <div className="relative grid h-full w-full place-items-center rounded-full border border-accent-2/30 bg-[radial-gradient(circle_at_30%_25%,#2a4fbf,var(--surface)_55%,var(--bg))] shadow-[0_0_80px_-10px_var(--accent),inset_0_0_30px_rgba(143,184,255,0.25)]">
            <span className="font-display font-extrabold text-[clamp(1.1rem,2.6vw,2rem)] shine">{CORE_LABEL}</span>
          </div>
        </div>

        {ITEMS.map((t, i) => {
          const Icon = t.icon;
          return (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              title={t.name}
              ref={(el) => {
                iconRefs.current[i] = el;
              }}
              aria-label={`${t.name} (opens official site)`}
              style={{ ["--brand" as string]: t.color }}
              className="orbit-icon absolute left-0 top-0 grid place-items-center w-[clamp(30px,7.6vw,54px)] aspect-square rounded-xl sm:rounded-2xl border border-line bg-gradient-to-b from-surface to-bg-2 text-ink-dim shadow-[0_8px_20px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(143,184,255,0.15)] opacity-0 outline-none focus-visible:ring-2 focus-visible:ring-accent-2"
            >
              <Icon className="w-[50%] h-[50%]" aria-hidden="true" />
            </a>
          );
        })}

        <div
          ref={tipRef}
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute left-0 top-0 z-[70] whitespace-nowrap rounded-md border border-line-strong bg-bg-2/90 px-2.5 py-1 text-xs font-semibold text-ink opacity-0 backdrop-blur transition-opacity duration-150"
        />
      </div>
    </div>
  );
}

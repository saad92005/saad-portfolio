import Image from "next/image";
import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[260px] select-none group/frame">
      <div className="relative rounded-[2rem] bg-[#1c1b20] p-[10px] border border-black/40 shadow-[0_40px_80px_-20px_rgba(20,18,26,0.55)] transition-shadow duration-500 group-hover/frame:shadow-[0_50px_100px_-24px_rgba(20,18,26,0.65),0_0_0_1px_color-mix(in_srgb,var(--accent)_25%,transparent)]">
        <div className="absolute left-1/2 top-[10px] -translate-x-1/2 z-10 w-16 h-4 rounded-full bg-[#1c1b20] border border-white/10" />
        <div className="relative rounded-[1.4rem] overflow-hidden aspect-[9/19.5] bg-black">
          {children}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 30%)" }}
          />
        </div>
      </div>
    </div>
  );
}

export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full select-none group/frame">
      <div className="relative rounded-2xl border border-black/30 bg-[#1c1b20] shadow-[0_40px_80px_-20px_rgba(20,18,26,0.55)] overflow-hidden transition-shadow duration-500 group-hover/frame:shadow-[0_50px_100px_-24px_rgba(20,18,26,0.65),0_0_0_1px_color-mix(in_srgb,var(--accent)_25%,transparent)]">
        <div className="flex items-center gap-1.5 px-3.5 py-3 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="relative aspect-[16/9.2] bg-black">
          {children}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 30%)" }}
          />
        </div>
      </div>
    </div>
  );
}

export function FrameImage({
  src,
  alt,
  crop = false,
}: {
  src: string;
  alt: string;
  crop?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] ${
        crop ? "scale-[1.1] -translate-y-[3%]" : ""
      }`}
      sizes="520px"
    />
  );
}

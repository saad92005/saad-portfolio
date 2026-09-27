import Image from "next/image";
import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[220px] select-none">
      <div className="relative rounded-[2rem] bg-ink p-[8px] shadow-[0_30px_60px_-20px_rgba(20,18,26,0.35)]">
        <div className="absolute left-1/2 top-[8px] -translate-x-1/2 z-10 w-14 h-3.5 rounded-full bg-ink border border-white/10" />
        <div className="relative rounded-[1.4rem] overflow-hidden aspect-[9/19.5] bg-surface">{children}</div>
      </div>
    </div>
  );
}

export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full select-none">
      <div className="relative rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-20px_rgba(20,18,26,0.25)] overflow-hidden">
        <div className="flex items-center gap-1.5 px-3.5 py-3 border-b border-line bg-surface-soft">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="relative aspect-[16/9.2] bg-surface">{children}</div>
      </div>
    </div>
  );
}

export function FrameImage({ src, alt, crop = false }: { src: string; alt: string; crop?: boolean }) {
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

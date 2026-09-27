import {
  SiPython,
  SiPytorch,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiAndroid,
  SiN8N,
  SiHuggingface,
  SiTailwindcss,
  SiGithub,
  SiFigma,
  SiVercel,
} from "react-icons/si";
import { FileSpreadsheet, Zap } from "lucide-react";
import type { IconType } from "react-icons";
import type { ComponentType } from "react";

export const toolIcons: Record<
  string,
  IconType | ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>
> = {
  Python: SiPython,
  PyTorch: SiPytorch,
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  Android: SiAndroid,
  n8n: SiN8N,
  "Hugging Face": SiHuggingface,
  Groq: Zap,
  "Tailwind CSS": SiTailwindcss,
  GitHub: SiGithub,
  Figma: SiFigma,
  Vercel: SiVercel,
  "Microsoft Excel": FileSpreadsheet,
};

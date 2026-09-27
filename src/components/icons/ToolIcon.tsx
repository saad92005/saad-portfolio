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
import { Zap, FileSpreadsheet } from "lucide-react";
import type { IconType } from "react-icons";
import type { MarqueeTool } from "@/lib/data";

const siMap: Record<string, IconType> = {
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
};

const lucideMap = {
  Zap,
  FileSpreadsheet,
};

export default function ToolIcon({ tool, size = 22 }: { tool: MarqueeTool; size?: number }) {
  if (tool.icon === "si") {
    const Icon = siMap[tool.id];
    return Icon ? <Icon size={size} aria-hidden="true" /> : null;
  }
  const Icon = lucideMap[tool.id as keyof typeof lucideMap];
  return Icon ? <Icon size={size} strokeWidth={1.75} aria-hidden="true" /> : null;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile, stack, projects } from "@/lib/data";

type Line = { type: "input" | "output"; text: string };

const COMMANDS = ["help", "skills", "projects", "contact", "about", "clear"];

function runCommand(cmd: string): string[] {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "help":
      return [
        "Available commands:",
        "  help       Show this list",
        "  about      Who is Saad Shahid?",
        "  skills     List technical skills",
        "  projects   List featured projects",
        "  contact    Show contact details",
        "  clear      Clear the terminal",
      ];
    case "about":
      return [
        `${profile.name} — ${profile.role}`,
        "Based in Lahore, Pakistan. BSCS @ UMT (2023-2027).",
        "Builds AI agents, RAG pipelines & production web/mobile apps.",
      ];
    case "skills":
      return stack.flatMap((s) => [`${s.category}:`, `  ${s.items.join(", ")}`]);
    case "projects":
      return projects.map((p, i) => `${i + 1}. ${p.name} — ${p.category}`);
    case "contact":
      return [
        `Email:    ${profile.email}`,
        `WhatsApp: ${profile.whatsappDisplay}`,
        `LinkedIn: ${profile.linkedin.replace("https://www.", "")}`,
        `Location: ${profile.location}`,
      ];
    case "":
      return [];
    case "clear":
      return ["__CLEAR__"];
    default:
      return [`command not found: ${c}`, `type "help" to see available commands`];
  }
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: `Welcome to ${profile.name}'s terminal.` },
    { type: "output", text: 'Type "help" to get started.' },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function submit(raw: string) {
    const result = runCommand(raw);
    if (result[0] === "__CLEAR__") {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev,
      { type: "input", text: raw },
      ...result.map((text) => ({ type: "output" as const, text })),
    ]);
    if (raw.trim()) setHistory((h) => [...h, raw]);
    setHistoryIdx(null);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submit(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = historyIdx === null ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(null);
        setValue("");
      } else {
        setHistoryIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(value.trim().toLowerCase()));
      if (match) setValue(match);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => inputRef.current?.focus()}
      className="panel overflow-hidden w-full max-w-md"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-white/[0.02]">
        <span className="font-mono text-[11px] tracking-wide text-ink-dim">saad@portfolio — zsh</span>
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      </div>

      <div
        ref={scrollRef}
        className="font-mono text-[12.5px] leading-relaxed px-4 py-3.5 h-56 overflow-y-auto"
      >
        {lines.map((l, i) => (
          <div key={i} className={l.type === "input" ? "text-ink" : "text-ink-dim"}>
            {l.type === "input" ? (
              <span>
                <span className="accent">saad@portfolio</span>
                <span className="text-ink-dim">:~$ </span>
                {l.text}
              </span>
            ) : (
              <span className="whitespace-pre-wrap">{l.text}</span>
            )}
          </div>
        ))}

        <div className="flex items-center gap-1">
          <span className="accent">saad@portfolio</span>
          <span className="text-ink-dim">:~$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Portfolio terminal input"
            className="flex-1 bg-transparent outline-none text-ink caret-accent min-w-0"
          />
        </div>
      </div>
    </motion.div>
  );
}

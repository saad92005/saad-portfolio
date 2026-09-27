import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import { Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 bg-surface">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-black text-lg tracking-tight">
            saad<span className="accent">.</span>
          </p>
          <p className="text-sm text-ink-faint mt-1.5">
            AI Engineer / Software Engineer — Lahore, Pakistan · Build · Ship · Iterate
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3">
          <div className="flex items-center gap-4 text-ink-dim">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
            >
              <GithubIcon size={15} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
            >
              <LinkedinIcon size={15} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
            >
              <Mail size={15} strokeWidth={1.75} />
            </a>
            <a
              href="#top"
              className="w-9 h-9 rounded-full border border-line flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={15} strokeWidth={1.75} />
            </a>
          </div>
          <p className="text-xs text-ink-faint">© 2026 {profile.brand}</p>
        </div>
      </div>
    </footer>
  );
}

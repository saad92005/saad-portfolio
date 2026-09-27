import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display font-extrabold text-[15px] tracking-tight text-ink">
            {profile.name}
          </p>
          <p className="text-[13px] text-ink-faint mt-1.5">
            AI Engineer / Software Engineer — Lahore, Pakistan
          </p>
          <p className="text-[13px] text-ink-faint mt-0.5">Build · Ship · Iterate</p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3">
          <div className="flex items-center gap-5 text-ink-dim">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent transition-colors"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-accent transition-colors"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="hover:text-accent transition-colors"
            >
              <Mail size={16} strokeWidth={1.75} />
            </a>
            <a
              href="#top"
              className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-dim hover:border-accent hover:text-accent transition-colors"
              aria-label="Back to top"
            >
              ↑
            </a>
          </div>
          <p className="text-[13px] text-ink-faint">© 2026 {profile.name}</p>
        </div>
      </div>
    </footer>
  );
}

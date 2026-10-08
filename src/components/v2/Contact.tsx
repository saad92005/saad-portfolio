"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AlertCircle, ArrowUp, ArrowUpRight, Check, CheckCircle2, Copy, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schema";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

const channels = [
  { label: "LinkedIn", value: "Connect professionally", href: profile.linkedin },
  { label: "GitHub", value: `@${profile.github.split("/").pop()}`, href: profile.github },
  { label: "WhatsApp", value: "Quick chat", href: `https://wa.me/${profile.whatsapp}` },
];

const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Repos", href: "#github" },
  { label: "Contact", href: "#contact" },
];

function LahoreTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      setT(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Karachi", hour: "2-digit", minute: "2-digit" }));
    const first = setTimeout(fmt, 0);
    const id = setInterval(fmt, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span className="tabular-nums">{t || "--:--"}</span>;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError("root", { message: json.error ?? "Something went wrong. Please try again." });
        return;
      }
      reset();
    } catch {
      setError("root", { message: "Network error — please try again or email me directly." });
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  const label = "block text-[11px] tracking-[0.18em] text-ink-faint mb-2";
  const field =
    "w-full bg-transparent border-0 border-b border-line-strong px-0 py-2.5 text-ink placeholder:text-ink-faint/70 focus:outline-none focus:border-accent transition-colors";

  return (
    <section id="contact" className="relative border-t border-line bg-bg-2">
      <div className="max-w-6xl mx-auto px-5 sm:px-16 pt-24 sm:pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="inline-flex items-center gap-3 text-xs tracking-[0.35em] font-semibold text-ink-dim">
            <span className="w-8 h-px bg-accent" /> CONTACT
          </p>
          <h2 className="mt-6 font-display font-bold tracking-[-0.03em] text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.98]">
            Let&apos;s work <span className="font-serif italic font-normal text-gradient">together.</span>
          </h2>
          <p className="mt-6 text-ink-dim max-w-xl leading-relaxed">
            Open to internships, full-time roles and freelance projects in AI engineering and full-stack development. I usually reply within a day.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20">
          {/* direct channels */}
          <div>
            <button
              type="button"
              onClick={copyEmail}
              className="group w-full flex items-center justify-between gap-4 border-y border-line py-6 text-left"
            >
              <span>
                <span className={label}>EMAIL</span>
                <span className="font-display font-semibold text-lg sm:text-2xl break-all group-hover:text-accent transition-colors">{profile.email}</span>
              </span>
              <span className="flex items-center gap-2 text-xs text-ink-dim shrink-0">
                {copied ? "Copied" : "Copy"}
                <span className="grid place-items-center w-9 h-9 rounded-full border border-line-strong group-hover:border-accent group-hover:text-accent transition-colors">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </span>
              </span>
            </button>
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-line py-5"
              >
                <span className="flex items-baseline gap-6">
                  <span className="w-24 text-[11px] tracking-[0.18em] text-ink-faint">{c.label.toUpperCase()}</span>
                  <span className="text-ink-dim group-hover:text-ink transition-colors">{c.value}</span>
                </span>
                <ArrowUpRight size={18} className="text-ink-faint transition-all duration-300 group-hover:text-accent group-hover:rotate-45" />
              </a>
            ))}
            <div className="flex items-baseline gap-6 py-5">
              <span className="w-24 text-[11px] tracking-[0.18em] text-ink-faint">LOCATION</span>
              <span className="text-ink-dim">
                {profile.locationShort} · <LahoreTime /> PKT
              </span>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-3xl border border-line bg-white/60 p-6 sm:p-10 space-y-7">
            <div className="grid sm:grid-cols-2 gap-7">
              <div>
                <label className={label} htmlFor="c-name">NAME</label>
                <input id="c-name" {...register("name")} placeholder="Your full name" className={field} />
                {errors.name && <p className="text-danger text-xs mt-1.5">{errors.name.message}</p>}
              </div>
              <div>
                <label className={label} htmlFor="c-email">EMAIL</label>
                <input id="c-email" {...register("email")} type="email" placeholder="you@company.com" className={field} />
                {errors.email && <p className="text-danger text-xs mt-1.5">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label className={label} htmlFor="c-subject">SUBJECT</label>
              <input id="c-subject" {...register("subject")} placeholder="Role, project or question" className={field} />
              {errors.subject && <p className="text-danger text-xs mt-1.5">{errors.subject.message}</p>}
            </div>
            <div>
              <label className={label} htmlFor="c-brief">MESSAGE</label>
              <textarea id="c-brief" {...register("brief")} rows={4} placeholder="Tell me a little about it" className={`${field} resize-none`} />
              {errors.brief && <p className="text-danger text-xs mt-1.5">{errors.brief.message}</p>}
            </div>

            {errors.root && (
              <p className="flex items-center gap-2 text-danger text-sm">
                <AlertCircle size={16} /> {errors.root.message}
              </p>
            )}
            {isSubmitSuccessful && !errors.root && (
              <p className="flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle2 size={16} /> Thanks — your message is on its way. I&apos;ll reply soon.
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-3 rounded-full bg-accent text-white font-semibold pl-7 pr-2 py-2 hover:bg-ink transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send message"}
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white text-accent transition-transform group-hover:rotate-[-20deg]">
                <Send size={14} />
              </span>
            </button>
          </form>
        </div>
      </div>

      <footer className="border-t border-line">
        <div className="max-w-6xl mx-auto px-5 sm:px-16 py-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="font-display font-bold text-lg">
              Saad Shahid<span className="text-accent">.</span>
            </p>
            <p className="text-xs text-ink-faint mt-1">AI Engineer &amp; Full-Stack Developer</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-underline text-ink-dim hover:text-ink">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {[
              { l: "GitHub", h: profile.github, I: GithubIcon },
              { l: "LinkedIn", h: profile.linkedin, I: LinkedinIcon },
            ].map(({ l, h, I }) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" aria-label={l} className="grid place-items-center w-10 h-10 rounded-full border border-line text-ink-dim hover:text-accent hover:border-accent transition-colors">
                <I size={15} />
              </a>
            ))}
            <a href="#top" aria-label="Back to top" className="grid place-items-center w-10 h-10 rounded-full bg-accent text-white hover:-translate-y-1 transition-transform">
              <ArrowUp size={15} />
            </a>
          </div>
        </div>
        <div className="border-t border-line">
          <p className="max-w-6xl mx-auto px-5 sm:px-16 py-5 text-xs text-ink-faint">
            © {new Date().getFullYear()} {profile.brand}. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}

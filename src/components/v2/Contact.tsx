"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { AlertCircle, ArrowUp, ArrowUpRight, Check, CheckCircle2, Copy, Mail, MessageCircle, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schema";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

const socials = [
  { label: "GitHub", href: profile.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon },
  { label: "WhatsApp", href: `https://wa.me/${profile.whatsapp}`, icon: MessageCircle },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

const nav = [
  { label: "Home", href: "#top" },
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

  const field = "input text-sm !rounded-xl !bg-white/[0.03]";

  return (
    <section id="contact" className="relative border-t border-line overflow-hidden">
      <div aria-hidden="true" className="aurora w-[600px] h-[600px] -right-60 -top-40 bg-accent-2/30" />
      <div aria-hidden="true" className="aurora w-[500px] h-[500px] -left-60 bottom-20 bg-accent/10 [animation-delay:-8s]" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-16 pt-24 sm:pt-36 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.04] px-4 py-1.5 text-xs text-ink-dim">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-accent" />
            </span>
            Open to new opportunities
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 font-display font-bold tracking-[-0.03em] text-[clamp(2.6rem,6vw,5rem)] leading-[0.98]"
          >
            Have an idea?
            <br />
            Let&apos;s build it <span className="font-serif italic font-normal shine">together.</span>
          </motion.h2>
          <p className="mt-6 text-ink-dim max-w-md leading-relaxed">
            Internships, full-time roles and freelance work in AI engineering and full-stack development. I usually reply within a day.
          </p>

          <button
            type="button"
            onClick={copyEmail}
            className="group mt-10 w-full sm:w-auto flex items-center justify-between gap-6 rounded-2xl border border-line-strong bg-white/[0.03] px-5 py-4 text-left hover:border-accent transition-colors"
          >
            <span>
              <span className="block text-[11px] tracking-[0.2em] text-ink-faint">EMAIL</span>
              <span className="block mt-1 font-display font-semibold text-base sm:text-lg break-all">{profile.email}</span>
            </span>
            <span className="grid place-items-center w-10 h-10 shrink-0 rounded-full bg-accent text-[#050507]">
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </span>
          </button>
          <p className="mt-2 h-4 text-xs text-accent">{copied ? "Copied to clipboard" : ""}</p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink-dim hover:text-[#050507] hover:bg-accent hover:border-accent transition-colors"
              >
                <Icon size={15} /> {label}
                <ArrowUpRight size={13} className="transition-transform group-hover:rotate-45" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="spin-border rounded-3xl bg-[#0a0a0e]/80 backdrop-blur p-6 sm:p-8 space-y-4 self-start">
          <p className="font-display font-bold text-xl">Send a message</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input {...register("name")} placeholder="Your name" aria-label="Your name" className={field} />
              {errors.name && <p className="text-danger text-xs mt-1.5">{errors.name.message}</p>}
            </div>
            <div>
              <input {...register("email")} type="email" placeholder="Email" aria-label="Email" className={field} />
              {errors.email && <p className="text-danger text-xs mt-1.5">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <input {...register("subject")} placeholder="Subject" aria-label="Subject" className={field} />
            {errors.subject && <p className="text-danger text-xs mt-1.5">{errors.subject.message}</p>}
          </div>
          <div>
            <textarea {...register("brief")} rows={5} placeholder="Tell me about the project or role" aria-label="Message" className={`${field} resize-none`} />
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
            className="group w-full flex items-center justify-center gap-2 rounded-full bg-accent text-[#050507] font-semibold px-7 py-3.5 hover:shadow-[0_0_40px_-6px_var(--accent)] transition-shadow disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Send message"}
            <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </button>
        </form>
      </div>

      <footer className="relative border-t border-line">
        <div className="max-w-6xl mx-auto px-5 sm:px-16 pt-14 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
            <div className="col-span-2 md:col-span-1">
              <p className="font-display font-extrabold text-xl">
                Saad<span className="text-accent">.</span>
              </p>
              <p className="mt-3 text-ink-dim leading-relaxed max-w-[16rem]">AI engineer and full-stack developer building real, shipped software.</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] text-ink-faint mb-4">NAVIGATE</p>
              <ul className="space-y-2.5">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="link-underline text-ink-dim hover:text-ink">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] text-ink-faint mb-4">CONNECT</p>
              <ul className="space-y-2.5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="link-underline text-ink-dim hover:text-ink">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] text-ink-faint mb-4">LOCAL TIME</p>
              <p className="font-display text-2xl font-bold">
                <LahoreTime />
              </p>
              <p className="text-ink-dim mt-1">{profile.locationShort} · PKT</p>
            </div>
          </div>

          {/* oversized wordmark */}
          <p
            aria-hidden="true"
            className="mt-16 font-display font-extrabold tracking-[-0.05em] leading-[0.8] text-center whitespace-nowrap text-[14.5vw] lg:text-[11.5rem] select-none bg-gradient-to-b from-white/[0.14] to-transparent bg-clip-text text-transparent hover:from-accent/60 transition-colors duration-700"
          >
            SAAD SHAHID
          </p>

          <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs text-ink-faint">
            <p>
              © {new Date().getFullYear()} {profile.brand}. Designed &amp; built from scratch.
            </p>
            <a href="#top" className="group inline-flex items-center gap-2 hover:text-accent transition-colors">
              Back to top
              <span className="grid place-items-center w-8 h-8 rounded-full border border-line group-hover:border-accent group-hover:-translate-y-1 transition-transform">
                <ArrowUp size={13} />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}

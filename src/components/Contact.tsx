"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import MagneticButton from "./MagneticButton";
import KineticHeading from "./KineticHeading";

const quickLinks = [
  { label: "Email Me", href: `mailto:${profile.email}`, icon: Mail },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: profile.github, icon: GithubIcon },
];

const badges = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: MapPin, label: profile.location, href: undefined },
  { icon: Phone, label: profile.whatsappDisplay, href: `https://wa.me/${profile.whatsapp}` },
  { icon: LinkedinIcon, label: "linkedin.com/in/saadshahidpk", href: profile.linkedin },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", brief: "" });
  const [sent, setSent] = useState(false);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Project inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.brief}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="wash wash-amber" />
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-6">
          Let&apos;s work together
        </p>

        <KineticHeading
          text="Let's build something useful."
          as="h2"
          className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.05] tracking-tight mb-6 max-w-2xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-ink-dim max-w-md mb-10"
        >
          Have a software, AI, automation, or product idea? Let&apos;s talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-16"
        >
          {quickLinks.map((l, i) => (
            <MagneticButton
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-medium ${
                i === 0 ? "btn-solid" : "btn-outline"
              }`}
            >
              <l.icon size={14} strokeWidth={1.75} />
              {l.label}
            </MagneticButton>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="panel p-7 sm:p-9 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-ink-faint mb-2">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  className="w-full rounded-xl bg-bg border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-ink-faint mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="w-full rounded-xl bg-bg border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-ink-faint mb-2">
                Subject
              </label>
              <input
                value={form.subject}
                onChange={update("subject")}
                className="w-full rounded-xl bg-bg border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-ink-faint mb-2">
                Project Brief
              </label>
              <textarea
                required
                rows={3}
                value={form.brief}
                onChange={update("brief")}
                className="w-full rounded-xl bg-bg border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell me a bit about what you're building..."
              />
            </div>

            <MagneticButton
              type="submit"
              className="btn-solid inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold"
            >
              <Send size={15} />
              Send Message
            </MagneticButton>

            {sent && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-ink-faint"
              >
                Opening your email client with this message pre-filled — send it over.
              </motion.p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="panel p-3"
          >
            {badges.map((b) => {
              const content = (
                <div className="flex items-center gap-4 px-4 py-4">
                  <b.icon size={16} strokeWidth={1.75} />
                  <span className="text-sm text-ink-dim">{b.label}</span>
                </div>
              );
              return b.href ? (
                <a
                  key={b.label}
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="block group rounded-xl hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-4 px-4 py-4 group-hover:text-accent transition-colors">
                    <b.icon size={16} strokeWidth={1.75} />
                    <span className="text-sm text-ink-dim group-hover:text-accent transition-colors">
                      {b.label}
                    </span>
                  </div>
                </a>
              ) : (
                <div key={b.label}>{content}</div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

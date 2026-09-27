"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schema";
import { profile } from "@/lib/data";
import { LinkedinIcon } from "./icons/BrandIcons";
import MagneticButton from "./MagneticButton";

const contactDetails = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: MapPin, label: profile.location, href: undefined },
  { icon: Phone, label: profile.whatsappDisplay, href: `https://wa.me/${profile.whatsapp}` },
  { icon: LinkedinIcon, label: profile.linkedinDisplay, href: profile.linkedin },
];

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

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

  return (
    <section id="contact" className="relative py-24 sm:py-32 gradient-wash overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-black tracking-tight leading-[1.05] text-[clamp(2rem,5.5vw,3.5rem)] mb-5"
          >
            Have an idea? Let&apos;s build it.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-ink-dim max-w-md mx-auto mb-8"
          >
            Have a software, AI, automation, or product idea? Let&apos;s talk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#contact-form" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold">
              Contact me
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={`mailto:${profile.email}?subject=Quote%20request`}
              className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
            >
              Get a quote
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
          <motion.form
            id="contact-form"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="card p-7 sm:p-9 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-ink-faint mb-2">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full rounded-xl bg-surface-soft border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-pink mt-1.5">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-ink-faint mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full rounded-xl bg-surface-soft border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-pink mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-widest text-ink-faint mb-2">
                Subject
              </label>
              <input
                id="subject"
                {...register("subject")}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
                className="w-full rounded-xl bg-surface-soft border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p id="subject-error" className="text-xs text-pink mt-1.5">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="brief" className="block text-xs font-semibold uppercase tracking-widest text-ink-faint mb-2">
                Project Brief
              </label>
              <textarea
                id="brief"
                rows={4}
                {...register("brief")}
                aria-invalid={!!errors.brief}
                aria-describedby={errors.brief ? "brief-error" : undefined}
                className="w-full rounded-xl bg-surface-soft border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell me a bit about what you're building..."
              />
              {errors.brief && (
                <p id="brief-error" className="text-xs text-pink mt-1.5">
                  {errors.brief.message}
                </p>
              )}
            </div>

            <MagneticButton
              type="submit"
              disabled={isSubmitting}
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold disabled:opacity-60"
            >
              <Send size={15} />
              {isSubmitting ? "Sending…" : "Send Message"}
            </MagneticButton>

            {errors.root && (
              <p role="alert" className="flex items-center gap-2 text-sm text-pink">
                <AlertCircle size={16} />
                {errors.root.message}
              </p>
            )}
            {isSubmitSuccessful && !errors.root && (
              <p role="status" className="flex items-center gap-2 text-sm accent">
                <CheckCircle2 size={16} />
                Message sent — I&apos;ll get back to you soon.
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-3"
          >
            {contactDetails.map((b) => {
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
                  className="block group rounded-xl hover:bg-surface-soft transition-colors"
                >
                  <div className="flex items-center gap-4 px-4 py-4 transition-colors">
                    <b.icon size={16} strokeWidth={1.75} className="shrink-0" />
                    <span className="text-sm text-ink-dim group-hover:text-accent transition-colors">{b.label}</span>
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

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { profile } from "@/lib/data";
import { contactSchema, type ContactInput } from "@/lib/contactSchema";
import { LinkedinIcon } from "./icons/BrandIcons";
import SectionHeading from "./SectionHeading";

const badges = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: MapPin, label: profile.location, href: undefined },
  { icon: Phone, label: profile.whatsappDisplay, href: `https://wa.me/${profile.whatsapp}` },
  { icon: LinkedinIcon, label: profile.linkedinDisplay, href: profile.linkedin },
];

type Status = "idle" | "success" | "error";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setStatusMessage(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setStatusMessage("Thanks — your message is on its way. I'll reply soon.");
      reset();
    } catch {
      setStatus("error");
      setStatusMessage("Network error — please try again, or email me directly.");
    }
  }

  return (
    <section id="contact" className="relative py-28 gradient-wash overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Get in touch"
          title="Have an idea? Let's build it."
          description="Have a software, AI, automation, or product idea? Let's talk."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 -mt-6 mb-14"
        >
          <a href="#contact-form" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold">
            Contact me
            <span aria-hidden="true">→</span>
          </a>
          <a
            href={`mailto:${profile.email}?subject=Quote request`}
            className="btn-outline inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
          >
            Get a quote
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>

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
                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-ink-faint mb-2">
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                  className="w-full rounded-xl bg-surface-soft border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-xs text-accent mt-1.5">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-ink-faint mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  className="w-full rounded-xl bg-surface-soft border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-accent mt-1.5">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-widest text-ink-faint mb-2">
                Subject
              </label>
              <input
                id="subject"
                {...register("subject")}
                className="w-full rounded-xl bg-surface-soft border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="brief" className="block text-xs font-mono uppercase tracking-widest text-ink-faint mb-2">
                Project Brief
              </label>
              <textarea
                id="brief"
                rows={4}
                {...register("brief")}
                aria-invalid={!!errors.brief}
                className="w-full rounded-xl bg-surface-soft border border-line px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell me a bit about what you're building..."
              />
              {errors.brief && <p className="text-xs text-accent mt-1.5">{errors.brief.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold disabled:opacity-60"
            >
              {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>

            {status !== "idle" && (
              <motion.p
                role="status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-xs ${status === "success" ? "text-teal" : "text-accent"}`}
              >
                {statusMessage}
              </motion.p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-3"
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
                  className="block group rounded-xl hover:bg-surface-soft transition-colors"
                >
                  <div className="flex items-center gap-4 px-4 py-4 group-hover:text-accent transition-colors">
                    <b.icon size={16} strokeWidth={1.75} />
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

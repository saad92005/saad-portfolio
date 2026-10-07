"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowUpRight, CheckCircle2, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schema";
import { profile } from "@/lib/data";

const socials = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "WhatsApp", href: `https://wa.me/${profile.whatsapp}` },
];

export default function Contact() {
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

  const field = "input text-sm";

  return (
    <section id="contact" className="relative bg-bg-2 border-t border-line overflow-hidden">
      <div aria-hidden="true" className="glow w-[600px] h-[600px] -right-72 -top-40 opacity-40" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-16 py-24 sm:py-32 grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05]">
            Have an idea?
            <br />
            <span className="text-accent">Let&apos;s build it.</span>
          </h2>
          <p className="mt-6 text-ink-dim max-w-md leading-relaxed">
            Open to internships, full-time roles and freelance work in AI engineering and full-stack development. I
            usually reply within a day.
          </p>

          <dl className="mt-12 grid sm:grid-cols-2 gap-8 text-sm">
            <div>
              <dt className="text-ink-faint text-xs mb-1.5">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="link-underline">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-faint text-xs mb-1.5">Location</dt>
              <dd>{profile.locationShort}</dd>
            </div>
            <div>
              <dt className="text-ink-faint text-xs mb-1.5">Social</dt>
              <dd className="flex flex-col gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 w-fit border-b border-line-strong pb-0.5 hover:text-accent hover:border-accent transition-colors"
                  >
                    {s.label} <ArrowUpRight size={13} />
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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
            <textarea {...register("brief")} rows={6} placeholder="Tell me about the project or role" aria-label="Message" className={`${field} resize-none`} />
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
            className="flex items-center gap-2 rounded-lg bg-accent text-[#0b0710] font-semibold px-7 py-3.5 hover:bg-white transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Send message"} <Send size={16} />
          </button>
        </form>
      </div>

      <footer className="relative border-t border-line">
        <div className="max-w-6xl mx-auto px-5 sm:px-16 py-10 flex flex-wrap items-end justify-between gap-6">
          <p className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium tracking-tight">SAAD SHAHID</p>
          <p className="text-sm text-ink-dim text-right">
            Designed and developed by <span className="text-accent">{profile.brand}</span>
            <br />© {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </section>
  );
}

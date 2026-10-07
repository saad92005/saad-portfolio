"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schema";
import { profile } from "@/lib/data";
import { Lines } from "./Reveal";

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

  return (
    <section id="contact" className="relative pt-24 sm:pt-32 bg-accent text-[#120a06]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        <p className="text-xs tracking-[0.14em] uppercase opacity-70">(05) Contact</p>
        <h2 className="serif mt-6 text-[clamp(3.4rem,11vw,10rem)] leading-[0.88] tracking-tight">
          <Lines lines={["Let's make", <em key="s">something good.</em>]} />
        </h2>

        <div className="mt-16 grid lg:grid-cols-[1fr_1.2fr] gap-16 pb-24">
          <div className="space-y-8 text-sm">
            <div>
              <p className="opacity-60 mb-2">Email</p>
              <a href={`mailto:${profile.email}`} className="link-line serif text-3xl sm:text-4xl">
                {profile.email}
              </a>
            </div>
            <div>
              <p className="opacity-60 mb-2">Based in</p>
              <p className="text-lg">{profile.location}</p>
            </div>
            <div className="flex gap-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-line inline-flex items-center gap-1 text-base">
                  {s.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2 [&_.field]:border-[#120a06]/30 [&_.field]:text-[#120a06] [&_.field]:placeholder:text-[#120a06]/50 [&_.field:focus]:border-[#120a06]">
            <div className="grid sm:grid-cols-2 gap-x-8">
              <div>
                <input {...register("name")} placeholder="Your name" aria-label="Your name" className="field" />
                {errors.name && <p className="text-xs mt-1.5 font-medium">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register("email")} type="email" placeholder="Email" aria-label="Email" className="field" />
                {errors.email && <p className="text-xs mt-1.5 font-medium">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <input {...register("subject")} placeholder="Subject" aria-label="Subject" className="field" />
              {errors.subject && <p className="text-xs mt-1.5 font-medium">{errors.subject.message}</p>}
            </div>
            <div>
              <textarea {...register("brief")} rows={4} placeholder="Tell me about the project or role" aria-label="Message" className="field resize-none" />
              {errors.brief && <p className="text-xs mt-1.5 font-medium">{errors.brief.message}</p>}
            </div>

            {errors.root && <p className="text-sm font-medium pt-2">{errors.root.message}</p>}
            {isSubmitSuccessful && !errors.root && <p className="text-sm font-medium pt-2">Thanks — your message is on its way. I&apos;ll reply soon.</p>}

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-[#120a06] text-[#ece7de] px-7 py-4 text-sm font-medium hover:bg-[#ece7de] hover:text-[#120a06] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Send message"} <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="border-t border-[#120a06]/20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 py-6 flex flex-wrap justify-between gap-4 text-xs opacity-75">
          <span>© {new Date().getFullYear()} {profile.brand}</span>
          <span>Designed &amp; built by me, in Lahore.</span>
          <a href="#top" className="link-line">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}

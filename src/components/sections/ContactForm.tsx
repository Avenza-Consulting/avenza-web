"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { contactInfo } from "@/data/content";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -right-32 top-0 h-[440px] w-[440px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(circle, #ff8a2b, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Contact
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Let&apos;s Transform Banking{" "}
            <span className="text-gradient-amber">Together</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted">
            At Avenza, we&apos;re committed to providing you with prompt and
            professional support for all your inquiries.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-surface p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-text-dim">
                    Visit our office at
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white">{contactInfo.address}</p>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-text-dim">
                    Email us at
                  </h3>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="mt-3 block text-base font-medium text-amber-soft-text transition-colors hover:text-amber"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="mt-10 flex gap-3">
                <a
                  href="/careers"
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft-text"
                >
                  Careers CTA
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-surface p-8">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <h3 className="font-display text-xl font-bold text-white">Message sent.</h3>
                  <p className="mt-2 max-w-sm text-sm text-text-muted">
                    Thanks for reaching out — someone from our team will respond shortly.
                  </p>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="First name" name="firstName" required />
                    <Field label="Last name" name="lastName" required />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Contact Number" name="phone" type="tel" />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-text-muted">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
                      placeholder="Tell us about your transformation program"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-full bg-amber px-8 py-3.5 text-sm font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.03]"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-text-muted">
        {label}
        {required && <span className="text-amber"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
      />
    </div>
  );
}

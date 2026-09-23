"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { contactInfo } from "@/data/content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,19}$/;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <section className="relative overflow-hidden bg-ink py-14 sm:py-20">
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
            <span className="text-white">Together</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted">
            At Avenza, we&apos;re committed to providing you with prompt and
            professional support for all your inquiries.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-surface p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-text-dim">
                    Visit our office at
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white">{contactInfo.address}</p>
                  <a
                    href={contactInfo.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Avenza office location in Google Maps"
                    className="mt-4 block overflow-hidden rounded-xl border border-white/10 transition-opacity hover:opacity-90"
                  >
                    <iframe
                      title="Avenza office location"
                      src={contactInfo.mapsEmbedUrl}
                      width="100%"
                      height="140"
                      style={{ border: 0, display: "block", pointerEvents: "none" }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                  </a>
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
                  noValidate
                  className="space-y-5"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement).value.trim();
                    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement).value.trim();
                    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
                    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
                    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

                    const nextErrors: Record<string, string> = {};
                    if (!firstName) nextErrors.firstName = "First name is required.";
                    if (!lastName) nextErrors.lastName = "Last name is required.";
                    if (!email) nextErrors.email = "Email is required.";
                    else if (!EMAIL_PATTERN.test(email)) nextErrors.email = "Enter a valid email address.";
                    // Contact number is optional — only validated when filled in.
                    if (phone && !PHONE_PATTERN.test(phone)) nextErrors.phone = "Enter a valid contact number.";
                    if (!message) nextErrors.message = "Message is required.";

                    setErrors(nextErrors);
                    setSubmitError(null);
                    if (Object.keys(nextErrors).length > 0) return;

                    setSubmitting(true);
                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ firstName, lastName, email, phone, message }),
                      });
                      if (!res.ok) {
                        const data = await res.json().catch(() => null);
                        if (data?.fieldErrors) setErrors(data.fieldErrors);
                        setSubmitError(data?.error ?? "Failed to send message. Please try again.");
                        return;
                      }
                      setSubmitted(true);
                    } catch {
                      setSubmitError("Failed to send message. Please check your connection and try again.");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="First name" name="firstName" required error={errors.firstName} />
                    <Field label="Last name" name="lastName" required error={errors.lastName} />
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" required error={errors.email} />
                    <Field label="Contact Number" name="phone" type="tel" error={errors.phone} />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-text-muted">
                      Message
                      <span className="text-amber"> *</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      aria-invalid={!!errors.message}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
                      placeholder="Tell us about your transformation program"
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-xs text-red-400">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-amber px-8 py-3.5 text-sm font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Submit"}
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
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
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
        aria-invalid={!!error}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

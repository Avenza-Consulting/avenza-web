"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { trf } from "@/data/content";

export function TrfBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  function closeModal() {
    setModalOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (dismissed) return null;

  return (
    <>
      <div
        role="region"
        aria-label="Event promotion"
        className="relative z-40 overflow-hidden border-b"
        style={{
          background:
            "linear-gradient(90deg, #1a1030 0%, #3d1f4a 30%, #7a3a3a 60%, #b8622e 100%)",
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6 lg:px-8">
          <span
            className="font-display text-[13px] font-extrabold tracking-wide"
            style={{ color: "rgba(255, 255, 255, 0.95)" }}
          >
            {trf.eyebrow}
          </span>
          <span
            className="hidden h-4 w-px sm:block"
            style={{ background: "rgba(255, 255, 255, 0.25)" }}
            aria-hidden="true"
          />
          <p className="min-w-0 flex-1 truncate text-[13px]" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            {trf.bannerText.split(trf.bannerHighlight)[0]}
            <strong className="font-semibold" style={{ color: "#ffffff" }}>{trf.bannerHighlight}</strong>
          </p>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setModalOpen(true)}
            className="ml-auto shrink-0 rounded-full bg-amber px-4 py-1.5 text-[13px] font-semibold text-on-accent transition-transform duration-200 hover:scale-[1.04] hover:bg-amber-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {trf.cta}
          </button>
          <button
            type="button"
            aria-label="Dismiss banner"
            onClick={() => setDismissed(true)}
            className="trf-dismiss shrink-0 rounded-full p-1 transition-colors"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeModal}
              aria-hidden="true"
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl sm:grid-cols-5 max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                aria-label="Close dialog"
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white/80 backdrop-blur transition-colors hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              >
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="relative min-h-[280px] overflow-hidden sm:col-span-2 sm:min-h-full">
                <Image
                  src="/gopinath-chandran.avif"
                  alt={trf.speakerName}
                  fill
                  priority
                  sizes="(min-width: 640px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,7,10,0.95) 0%, rgba(6,7,10,0.55) 42%, rgba(6,7,10,0.05) 68%, rgba(124,108,255,0.25) 100%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
                  <span className="inline-block w-fit rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-soft backdrop-blur-sm">
                    {trf.featuredLabel}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug text-white">
                      {trf.eventTitle}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">{trf.eventSubtitle}</p>
                    <p className="mt-5 font-display text-base font-bold text-white">{trf.speakerName}</p>
                    <p className="mt-1 text-xs text-white/60">{trf.eventDate}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:col-span-3 sm:p-8">
                <h2 id={titleId} className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
                  {trf.modalTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  Our COO,{" "}
                  <a
                    href={trf.speakerLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-amber-soft underline underline-offset-2 hover:text-amber"
                  >
                    @{trf.speakerName}
                  </a>
                  , {trf.modalBody.split(". ")[0]}.{" "}
                  <a
                    href={trf.eventLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-amber-soft underline underline-offset-2 hover:text-amber"
                  >
                    Temenos Regional Forum APAC 2026
                  </a>{" "}
                  {trf.modalBody.split(". ").slice(1).join(". ")}
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-xl border border-cyan/30 bg-cyan/10 p-5">
                    <p className="font-display font-semibold text-white">Thanks — we&apos;ll be in touch.</p>
                    <p className="mt-1 text-sm text-text-muted">
                      Your interest in TRF&apos;26 APAC has been noted.
                    </p>
                  </div>
                ) : (
                  <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="Name" name="name" placeholder="Your name" required />
                      <Field label="Email" name="email" type="email" placeholder="Your email" required />
                    </div>
                    <Field label="Company Name" name="company" placeholder="Your company name" required />
                    <Field label="Phone" name="phone" type="tel" placeholder="Your phone number" />
                    <button
                      type="submit"
                      className="mt-2 w-full rounded-lg bg-amber py-3 font-display text-sm font-bold text-on-accent transition-transform duration-200 hover:scale-[1.01] hover:bg-amber-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber sm:w-auto sm:px-8"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  const id = `trf-${name}`;
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
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
      />
    </div>
  );
}

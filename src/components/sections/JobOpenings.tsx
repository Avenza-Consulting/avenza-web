"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { jobs as fallbackJobs } from "@/data/content";
import { fetchJobsFromSheet, isJobsSheetConfigured, type Job } from "@/lib/jobsSheet";

const ALL = "All";

function uniqueSorted(values: (string | undefined)[] | undefined) {
  return Array.from(new Set((values ?? []).filter((v): v is string => !!v))).sort();
}

function FilterGroup({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (value: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-text-dim">{label}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[ALL, ...options].map((option) => {
          const isActive = active === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={isActive}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "border-amber bg-amber/15 text-white"
                  : "border-white/10 text-text-muted hover:text-white"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const employmentTypeLabels: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACTOR: "Contract",
  CONTRACT: "Contract",
  INTERN: "Internship",
};

// schema.org's JobPosting.employmentType only accepts CONTRACTOR, not the
// more natural "CONTRACT" a sheet editor is likely to type — normalize it
// so the structured data stays valid regardless of which one is used.
const schemaEmploymentType: Record<string, string> = {
  CONTRACT: "CONTRACTOR",
};

function formatPostedAgo(datePosted: string) {
  const posted = new Date(datePosted).getTime();
  if (Number.isNaN(posted)) return null;
  const days = Math.max(0, Math.floor((Date.now() - posted) / 86400000));
  if (days < 1) return "Today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

function jobPostingJsonLd(job: Job) {
  const posted = new Date(job.datePosted);
  const validThrough = Number.isNaN(posted.getTime())
    ? undefined
    : new Date(posted.getFullYear() + 1, posted.getMonth(), posted.getDate()).toISOString().slice(0, 10);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.blurb,
    identifier: {
      "@type": "PropertyValue",
      name: "Avenza Consulting Services",
      value: job.id,
    },
    datePosted: job.datePosted || undefined,
    validThrough,
    employmentType: schemaEmploymentType[job.employmentType] ?? job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: "Avenza Consulting Services",
      sameAs: "https://www.avenza-consulting.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "43/B, 1st Main Road, Sarakki Industrial Layout, 3rd Phase, JP Nagar",
        addressLocality: "Bengaluru",
        postalCode: "560078",
        addressCountry: "IN",
      },
    },
    directApply: false,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
  };
}

export function JobOpenings() {
  // When a sheet is configured, its data always wins over the fallback, so
  // starting from null avoids rendering the fallback jobs (with their own
  // category/level tags) only to swap them out — and the tags along with
  // them — a moment later once the real fetch resolves. With no sheet
  // configured there's nothing to wait for, so the fallback shows right away.
  const [jobs, setJobs] = useState<Job[] | null>(
    isJobsSheetConfigured ? null : (fallbackJobs as unknown as Job[])
  );
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const activeJob = jobs?.find((j) => j.id === openJobId) ?? null;

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [experience, setExperience] = useState(ALL);

  useEffect(() => {
    if (!isJobsSheetConfigured) return;
    let cancelled = false;
    fetchJobsFromSheet().then((sheetJobs) => {
      if (cancelled) return;
      setJobs(sheetJobs ?? (fallbackJobs as unknown as Job[]));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const departmentOptions = useMemo(() => uniqueSorted(jobs?.map((j) => j.category)), [jobs]);
  const locationOptions = useMemo(() => uniqueSorted(jobs?.map((j) => j.workMode)), [jobs]);
  const experienceOptions = useMemo(() => uniqueSorted(jobs?.map((j) => j.level)), [jobs]);

  const filteredJobs = useMemo(() => {
    if (!jobs) return null;
    const query = search.trim().toLowerCase();
    return jobs.filter((job) => {
      if (department !== ALL && job.category !== department) return false;
      if (location !== ALL && job.workMode !== location) return false;
      if (experience !== ALL && job.level !== experience) return false;
      if (!query) return true;
      return (
        job.title.toLowerCase().includes(query) ||
        job.blurb.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query)
      );
    });
  }, [jobs, search, department, location, experience]);

  return (
    <section id="openings" className="relative border-t border-white/5 bg-ink-soft py-16 sm:py-24">
      {jobs?.map((job) => (
        <script
          key={job.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(job)) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-soft-text">
            Current Openings
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Join our core team
          </h2>
        </Reveal>

        {jobs === null ? (
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2" aria-hidden="true">
            {[0, 1].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl border border-white/10 bg-surface" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="mt-14 text-sm text-text-muted">
            No open roles right now — check back soon, or{" "}
            <a href="/contact" className="text-amber-soft-text underline underline-offset-2">
              get in touch
            </a>{" "}
            to introduce yourself.
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[16rem_1fr] lg:gap-12">
            <Reveal className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
              <div className="relative">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-dim"
                >
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search roles, tech…"
                  aria-label="Search jobs"
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
                />
              </div>

              <FilterGroup label="Department" options={departmentOptions} active={department} onChange={setDepartment} />
              <FilterGroup label="Location" options={locationOptions} active={location} onChange={setLocation} />
              <FilterGroup label="Experience" options={experienceOptions} active={experience} onChange={setExperience} />
            </Reveal>

            <div>
              <p className="mb-5 text-sm text-text-muted">
                {filteredJobs!.length} {filteredJobs!.length === 1 ? "role" : "roles"}
              </p>

              {filteredJobs!.length === 0 ? (
                <p className="text-sm text-text-muted">
                  No roles match your filters — try clearing search or filters, or{" "}
                  <a href="/contact" className="text-amber-soft-text underline underline-offset-2">
                    get in touch
                  </a>
                  .
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {filteredJobs!.map((job, i) => {
                    const postedAgo = formatPostedAgo(job.datePosted);
                    return (
                      <Reveal key={job.id} delay={Math.min(i, 6) * 0.06}>
                        <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber/30">
                          <div>
                            {(job.category || job.level) && (
                              <div className="flex flex-wrap items-center gap-2">
                                {job.category && (
                                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-text-muted">
                                    {job.category}
                                  </span>
                                )}
                                {job.level && (
                                  <span className="rounded-full bg-amber/15 px-3 py-1 text-xs font-semibold text-amber-soft-text">
                                    {job.level}
                                  </span>
                                )}
                              </div>
                            )}
                            <h3 className="mt-3 font-display text-lg font-bold text-white">{job.title}</h3>
                            <p className="mt-1 text-xs text-text-dim">Job ID: {job.id}</p>
                            <p className="mt-2 text-sm leading-relaxed text-text-muted">{job.blurb}</p>

                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-amber-soft-text">
                              <span className="inline-flex items-center gap-1.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                  <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                                  <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                                </svg>
                                {job.workMode}
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                  <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
                                  <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.6" />
                                </svg>
                                {employmentTypeLabels[job.employmentType] ?? job.employmentType}
                              </span>
                              {job.experience && (
                                <span className="inline-flex items-center gap-1.5">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                                  </svg>
                                  {job.experience}
                                </span>
                              )}
                              {postedAgo && (
                                <span className="inline-flex items-center gap-1.5">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                                    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  {postedAgo}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setOpenJobId(job.id)}
                            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-amber/50 hover:text-amber-soft-text"
                          >
                            Apply Now
                            <svg width="12" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                              <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeJob && (
          <ApplyModal job={activeJob} onClose={() => setOpenJobId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];

function hasAllowedResumeExtension(fileName: string) {
  const lower = fileName.toLowerCase();
  return ALLOWED_RESUME_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function ApplyModal({
  job,
  onClose,
}: {
  job: { id: string; title: string };
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Apply for ${job.title}`}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-surface p-7 shadow-2xl"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <h3 className="font-display text-lg font-bold text-white">Apply — {job.title}</h3>

        {submitted ? (
          <p className="mt-6 rounded-xl border border-cyan/30 bg-cyan/10 p-4 text-sm text-text-muted">
            Thanks for applying — our talent team will review your details and be in touch.
          </p>
        ) : (
          <form
            noValidate
            className="mt-5 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value.trim();
              const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
              const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
              const linkedin = (form.elements.namedItem("linkedin") as HTMLInputElement).value.trim();

              const nextErrors: Record<string, string> = {};
              if (!fullName) nextErrors.fullName = "Full name is required.";
              if (!email) nextErrors.email = "Email is required.";
              if (!phone) nextErrors.phone = "Contact number is required.";
              if (!resumeFile) {
                nextErrors.resume = "Resume is required.";
              } else if (
                !hasAllowedResumeExtension(resumeFile.name) ||
                (resumeFile.type && !ALLOWED_RESUME_TYPES.includes(resumeFile.type))
              ) {
                nextErrors.resume = "Resume must be a PDF or Word document (.pdf, .doc, .docx).";
              }

              setErrors(nextErrors);
              setSubmitError(null);
              if (Object.keys(nextErrors).length > 0 || !resumeFile) return;

              const body = new FormData();
              body.set("jobId", job.id);
              body.set("jobTitle", job.title);
              body.set("name", fullName);
              body.set("email", email);
              body.set("phone", phone);
              body.set("linkedin", linkedin);
              body.set("resume", resumeFile);

              setSubmitting(true);
              try {
                const res = await fetch("/api/apply", { method: "POST", body });
                if (!res.ok) {
                  const data = await res.json().catch(() => null);
                  if (data?.fieldErrors) setErrors(data.fieldErrors);
                  setSubmitError(data?.error ?? "Failed to send application. Please try again.");
                  return;
                }
                setSubmitted(true);
              } catch {
                setSubmitError("Failed to send application. Please check your connection and try again.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                aria-invalid={!!errors.fullName}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
              />
              {errors.fullName && <p className="mt-1.5 text-xs text-red-400">{errors.fullName}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-invalid={!!errors.email}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Contact number"
                aria-invalid={!!errors.phone}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
              />
              {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
            </div>
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn / portfolio (optional)"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-text-dim focus:border-amber/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
            />

            <div>
              <label
                htmlFor="apply-resume"
                className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-dashed border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-text-dim transition-colors hover:border-amber/50 hover:text-white"
              >
                <span className="truncate">{resumeName ?? "Upload resume (PDF or Word)"}</span>
                <span className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white">
                  Browse
                </span>
              </label>
              <input
                id="apply-resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setResumeFile(file);
                  setResumeName(file?.name ?? null);
                  if (file && (!hasAllowedResumeExtension(file.name) || (file.type && !ALLOWED_RESUME_TYPES.includes(file.type)))) {
                    setErrors((prev) => ({ ...prev, resume: "Resume must be a PDF or Word document (.pdf, .doc, .docx)." }));
                  } else {
                    setErrors((prev) => {
                      const rest = { ...prev };
                      delete rest.resume;
                      return rest;
                    });
                  }
                }}
              />
              {errors.resume && <p className="mt-1.5 text-xs text-red-400">{errors.resume}</p>}
            </div>

            {submitError && (
              <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-xs text-red-400">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-amber py-3 font-display text-sm font-bold text-on-accent transition-transform duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit Application"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

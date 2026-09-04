"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "./useActiveSection";
import { nav } from "@/data/content";

const inPageSectionIds = ["capabilities", "solutions", "why-avenza", "insights"];

function flatNavHrefs() {
  return nav.flatMap((item) => ("items" in item ? item.items.map((sub) => sub.href) : [item.href]));
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setMobileOpenGroup(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const activeSectionId = useActiveSection(inPageSectionIds, pathname === "/");

  const activeHref = useMemo(() => {
    if (pathname !== "/") {
      // Real routes (including ones nested under a dropdown) — match by exact pathname.
      const match = flatNavHrefs().find((href) => href === pathname);
      return match ?? null;
    }
    if (activeSectionId) return `/#${activeSectionId}`;
    return "/";
  }, [pathname, activeSectionId]);

  const openGroupWithoutDelay = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenGroup(label);
  };

  const scheduleCloseGroup = () => {
    closeTimeoutRef.current = setTimeout(() => setOpenGroup(null), 150);
  };

  // Next.js <Link> is a no-op when the target URL matches the current one,
  // so clicking "Home" while already on "/" doesn't scroll anywhere on its
  // own — do it explicitly.
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`border-b border-white/5 bg-ink transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-black/30" : ""
        }`}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <Logo className="text-amber" />

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              if ("items" in item) {
                const isGroupActive = item.items.some((sub) => sub.href === activeHref);
                const isOpen = openGroup === item.label;
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => openGroupWithoutDelay(item.label)}
                    onMouseLeave={scheduleCloseGroup}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenGroup(isOpen ? null : item.label)}
                      className={`group relative flex items-center gap-1.5 text-sm font-medium transition-colors ${
                        isGroupActive ? "text-white" : "text-text-muted hover:text-white"
                      }`}
                    >
                      {item.label}
                      <svg
                        width="9"
                        height="6"
                        viewBox="0 0 9 6"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span
                        className={`absolute -bottom-1 left-0 h-px bg-amber transition-all duration-300 ${
                          isGroupActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-0 top-full z-10 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-surface-raised shadow-xl shadow-black/30"
                        >
                          <ul className="py-2">
                            {item.items.map((sub) => {
                              const isSubActive = sub.href === activeHref;
                              return (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    aria-current={isSubActive ? "page" : undefined}
                                    onClick={() => setOpenGroup(null)}
                                    className={`block px-4 py-2.5 text-sm transition-colors ${
                                      isSubActive
                                        ? "bg-amber/10 text-amber-soft"
                                        : "text-text-muted hover:bg-white/5 hover:text-white"
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              const isActive = item.href === activeHref;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={item.href === "/" ? handleHomeClick : undefined}
                    className={`group relative text-sm font-medium transition-colors ${
                      isActive ? "text-white" : "text-text-muted hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-amber transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Link
              href="/contact"
              className="rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-amber/50 hover:text-amber-soft"
            >
              Talk to Avenza
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <path
                    d="M1 1L17 13M17 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <path d="M0 1H18" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M0 7H18" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M0 13H18" stroke="currentColor" strokeWidth="1.6" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-ink-soft lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {nav.map((item) => {
                if ("items" in item) {
                  const isGroupActive = item.items.some((sub) => sub.href === activeHref);
                  const isGroupOpen = mobileOpenGroup === item.label;
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        aria-expanded={isGroupOpen}
                        onClick={() => setMobileOpenGroup(isGroupOpen ? null : item.label)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                          isGroupActive
                            ? "bg-amber/10 text-amber-soft"
                            : "text-text-primary hover:bg-white/5 hover:text-amber-soft"
                        }`}
                      >
                        {item.label}
                        <svg
                          width="11"
                          height="7"
                          viewBox="0 0 9 6"
                          fill="none"
                          aria-hidden="true"
                          className={`transition-transform duration-200 ${isGroupOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <AnimatePresence initial={false}>
                        {isGroupOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden pl-3"
                          >
                            {item.items.map((sub) => {
                              const isSubActive = sub.href === activeHref;
                              return (
                                <li key={sub.href}>
                                  <Link
                                    href={sub.href}
                                    aria-current={isSubActive ? "page" : undefined}
                                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                      isSubActive
                                        ? "bg-amber/10 text-amber-soft"
                                        : "text-text-muted hover:bg-white/5 hover:text-amber-soft"
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                const isActive = item.href === activeHref;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={item.href === "/" ? handleHomeClick : undefined}
                      className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-amber/10 text-amber-soft"
                          : "text-text-primary hover:bg-white/5 hover:text-amber-soft"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="block rounded-full bg-amber px-4 py-3 text-center text-sm font-semibold text-on-accent"
                >
                  Talk to Avenza
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

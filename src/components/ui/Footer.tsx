import Link from "next/link";
import { Logo } from "./Logo";
import { nav, contactInfo } from "@/data/content";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-soft">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo className="text-amber" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
              Delivering tech-enabled, state-of-the-art core banking implementation
              and system integration services — blending Temenos expertise with AI,
              digital and advanced analytics.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">Navigate</h3>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-muted transition-colors hover:text-amber-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-text-muted">
              <li>
                <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-amber-soft">
                  {contactInfo.email}
                </a>
              </li>
              <li className="max-w-xs leading-relaxed">{contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-text-dim">
            © {new Date().getFullYear()} Avenza Consulting Services Private Limited.
          </p>
          <div className="flex gap-6">
            <Link href="/careers" className="text-xs text-text-dim transition-colors hover:text-amber-soft">
              Careers
            </Link>
            <Link href="/contact" className="text-xs text-text-dim transition-colors hover:text-amber-soft">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

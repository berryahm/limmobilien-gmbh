
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Locale } from "@/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dictionary } from "@/i18n";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const links = [
    { href: `${base}/kaufen`, label: dict.nav.buy },
    { href: `${base}/verkaufen`, label: dict.nav.sell },
    { href: `${base}/bewirtschaftung`, label: dict.nav.manage },
    { href: `${base}/bewertung`, label: dict.nav.valuation },
    { href: `${base}/ueber-uns`, label: dict.nav.about },
    { href: `${base}/kontakt`, label: dict.nav.contact },
  ];
  const [open, setOpen] = useState(false);

  // Body-Scroll sperren, solange das Overlay offen ist
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC schließt das Overlay
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40" style={{
        backgroundColor: "rgba(26, 14, 8, 0.92)",
        backdropFilter: "saturate(140%) blur(10px)",
        WebkitBackdropFilter: "saturate(140%) blur(10px)",
        borderBottom: "1px solid rgba(196,158,87,0.18)",
      }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href={base} className="flex items-center shrink-0" aria-label={`${dict.brand} ${dict.brandSuffix}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt={`${dict.brand} ${dict.brandSuffix}`} className="h-11 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{ color: "#faf3e8" }} className="text-[0.74rem] tracking-[0.18em] uppercase font-light hover:text-[#c49e57] transition-colors duration-300">
                {l.label}
              </Link>
            ))}
            <LanguageSwitcher locale={locale} />
          </nav>

          {/* Mobile: Hamburger Button ganz rechts */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none gap-[5px]"
            aria-label="Menü öffnen"
            onClick={() => setOpen(true)}
          >
            <span style={{ display: "block", width: 24, height: 2, background: "#c49e57", borderRadius: 2 }} />
            <span style={{ display: "block", width: 24, height: 2, background: "#c49e57", borderRadius: 2 }} />
            <span style={{ display: "block", width: 24, height: 2, background: "#c49e57", borderRadius: 2 }} />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay – außerhalb des <header> damit kein Clipping */}
      {open && (
        <div
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background:
              "radial-gradient(120% 80% at 50% 0%, #2a1610 0%, #1a0e08 55%, #120904 100%)",
            color: "#faf3e8",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Top-Leiste: Logo + Schließen */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 28px",
              borderBottom: "1px solid rgba(196,158,87,0.14)",
            }}
          >
            <Link
              href={base}
              onClick={() => setOpen(false)}
              aria-label={`${dict.brand} ${dict.brandSuffix}`}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt={`${dict.brand} ${dict.brandSuffix}`} style={{ height: 40, width: "auto" }} />
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Menü schließen"
              style={{
                width: 44,
                height: 44,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "1px solid rgba(196,158,87,0.35)",
                borderRadius: 999,
                color: "#c49e57",
                cursor: "pointer",
                transition: "border-color 0.25s ease, background-color 0.25s ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "32px 28px",
              maxWidth: 520,
              width: "100%",
              margin: "0 auto",
            }}
          >
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="mobile-menu-link"
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "22px 4px",
                  borderTop: i === 0 ? "1px solid rgba(196,158,87,0.18)" : "none",
                  borderBottom: "1px solid rgba(196,158,87,0.18)",
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: 28,
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  color: "#faf3e8",
                  textDecoration: "none",
                  transition: "color 0.25s ease, padding-left 0.3s ease",
                }}
              >
                <span>{l.label}</span>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: '"Inter", system-ui, sans-serif',
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    color: "rgba(196,158,87,0.55)",
                    fontWeight: 500,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>

          {/* Sprache */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              padding: "28px 28px 40px",
              borderTop: "1px solid rgba(196,158,87,0.14)",
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c49e57",
                fontWeight: 500,
              }}
            >
              {dict.nav.language ?? "Sprache"}
            </span>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      )}
    </>
  );
}

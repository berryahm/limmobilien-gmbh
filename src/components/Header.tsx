
"use client";
import Link from "next/link";
import { useState } from "react";
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

  return (
    <>
      <header className="sticky top-0 z-40" style={{
        backgroundImage: "url('/header-texture.jpg')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        backgroundColor: "#1a0e08",
        borderBottom: "1px solid rgba(196,158,87,0.2)",
      }}>
        <div className="max-w-[1400px] mx-auto px-5 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href={base} className="flex items-center shrink-0" aria-label={`${dict.brand} ${dict.brandSuffix}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt={`${dict.brand} ${dict.brandSuffix}`} className="h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{ color: "#faf3e8" }} className="text-[0.78rem] tracking-[0.2em] uppercase hover:text-[#c49e57] transition-colors">
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
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundImage: "url('/header-texture.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto 200px",
            backgroundColor: "#1a0e08",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {/* Schließen */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Menü schließen"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              fontSize: 28,
              lineHeight: 1,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#c49e57",
              fontWeight: 300,
            }}
          >
            ✕
          </button>

          {/* Links */}
          <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 32 }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 22,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#faf3e8",
                  textDecoration: "none",
                  padding: "10px 0",
                  display: "block",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Sprache */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c49e57" }}>Sprache</span>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      )}
    </>
  );
}

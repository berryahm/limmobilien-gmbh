
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
    <header className="sticky top-0 z-40 bg-[#f5f1ea] backdrop-blur border-b border-[#e7e1d3]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={base} className="flex items-center shrink-0" aria-label={`${dict.brand} ${dict.brandSuffix}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={`${dict.brand} ${dict.brandSuffix}`} className="h-7 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[0.78rem] tracking-[0.2em] uppercase hover:text-[#b8976a] transition-colors text-[#1a1a1a]">
              {l.label}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} />
        </nav>

        {/* Mobile: Hamburger Button ganz rechts */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 focus:outline-none"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block w-6 h-[2px] bg-[#1a1a1a] transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#1a1a1a] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-[#1a1a1a] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menü Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[#f5f1ea] flex flex-col items-center justify-center gap-6 lg:hidden">
          {/* Schließen-Button oben rechts */}
          <button
            className="absolute top-5 right-6 flex flex-col justify-center items-center gap-[5px] w-10 h-10"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
          >
            <span className="block w-6 h-[2px] bg-[#1a1a1a] rotate-45 translate-y-[7px]" />
            <span className="block w-6 h-[2px] bg-[#1a1a1a] opacity-0" />
            <span className="block w-6 h-[2px] bg-[#1a1a1a] -rotate-45 -translate-y-[7px]" />
          </button>

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-serif text-2xl uppercase tracking-[0.15em] text-[#1a1a1a] hover:text-[#b8976a] transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-4 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#888]">Sprache</span>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}

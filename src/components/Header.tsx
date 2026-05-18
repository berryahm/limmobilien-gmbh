
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
    <header className="sticky top-0 z-40 bg-bone/85 backdrop-blur border-b border-[#e7e1d3]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link href={base} className="flex items-center" aria-label={`${dict.brand} ${dict.brandSuffix}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={`${dict.brand} ${dict.brandSuffix}`} className="h-7 w-auto" />
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[0.78rem] tracking-[0.2em] uppercase hover:text-bronze transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        {/* Mobile Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none"
          aria-label="Menü öffnen"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-ink mb-1" />
          <span className="block w-6 h-0.5 bg-ink mb-1" />
          <span className="block w-6 h-0.5 bg-ink" />
        </button>
        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-bone/98 flex flex-col items-center justify-start pt-20 px-2 w-full h-full overflow-y-auto font-serif">
          <nav className="flex flex-col w-full gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="uppercase tracking-[0.14em] hover:text-bronze transition-colors text-base py-2 text-center"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            className="mt-6 text-xs text-muted uppercase tracking-widest border border-muted rounded px-3 py-1 hover:bg-muted/10 transition-colors"
            onClick={() => setOpen(false)}
          >
            Menü schließen
          </button>
        </div>
      )}
    </header>
  );
}

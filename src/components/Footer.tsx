import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const base = `/${locale}`;
  return (
    <footer className="bg-brown text-bone mt-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-4 gap-12">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-light.png" alt={`${dict.brand} ${dict.brandSuffix}`} className="h-8 w-auto mb-6" />
          <p className="text-sm text-bone/60 leading-relaxed mt-4">{dict.tagline}</p>
        </div>
        <div>
          <div className="eyebrow text-bone/50 mb-4">{dict.contact.info.address}</div>
          {dict.contact.info.addressLines.map((l) => (
            <div key={l} className="text-sm text-bone/80">{l}</div>
          ))}
        </div>
        <div>
          <div className="eyebrow text-bone/50 mb-4">{dict.nav.contact}</div>
          <div className="text-sm text-bone/80">{dict.contact.info.phoneValue}</div>
          <div className="text-sm text-bone/80">{dict.contact.info.emailValue}</div>
          <div className="text-sm text-bone/80 mt-2">{dict.contact.info.hoursValue}</div>
        </div>
        <div>
          <div className="eyebrow text-bone/50 mb-4">Navigation</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href={`${base}/kaufen`} className="text-bone/80 hover:text-bone">{dict.nav.buy}</Link>
            <Link href={`${base}/verkaufen`} className="text-bone/80 hover:text-bone">{dict.nav.sell}</Link>
            <Link href={`${base}/bewirtschaftung`} className="text-bone/80 hover:text-bone">{dict.nav.manage}</Link>
            <Link href={`${base}/ueber-uns`} className="text-bone/80 hover:text-bone">{dict.nav.about}</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-bone/50 gap-3">
          <span>© {year} {dict.brand} {dict.brandSuffix}. {dict.footer.rights}</span>
          <div className="flex gap-6">
            <span>{dict.footer.privacy}</span>
            <span>{dict.footer.impressum}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

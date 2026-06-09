import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const base = `/${locale}`;
  return (
    <footer style={{ background: "#2a1610" }} className="text-bone">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-20 md:py-24 grid md:grid-cols-4 gap-12">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-light.png" alt={`${dict.brand} ${dict.brandSuffix}`} className="h-9 w-auto mb-6" />
          <p className="text-sm leading-relaxed mt-4" style={{ color: "rgba(250,243,232,0.55)" }}>{dict.tagline}</p>
        </div>
        <div>
          <div className="eyebrow mb-5" style={{ color: "rgba(196,158,87,0.85)" }}>{dict.contact.info.address}</div>
          {dict.contact.info.addressLines.map((l) => (
            <div key={l} className="text-sm" style={{ color: "rgba(250,243,232,0.75)" }}>{l}</div>
          ))}
        </div>
        <div>
          <div className="eyebrow mb-5" style={{ color: "rgba(196,158,87,0.85)" }}>{dict.nav.contact}</div>
          <div className="text-sm" style={{ color: "rgba(250,243,232,0.75)" }}>{dict.contact.info.phoneValue}</div>
          <div className="text-sm" style={{ color: "rgba(250,243,232,0.75)" }}>{dict.contact.info.emailValue}</div>
          <div className="text-sm mt-2" style={{ color: "rgba(250,243,232,0.75)" }}>{dict.contact.info.hoursValue}</div>
        </div>
        <div>
          <div className="eyebrow mb-5" style={{ color: "rgba(196,158,87,0.85)" }}>Navigation</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <Link href={`${base}/kaufen`} className="transition-colors hover:text-[#c49e57]" style={{ color: "rgba(250,243,232,0.75)" }}>{dict.nav.buy}</Link>
            <Link href={`${base}/verkaufen`} className="transition-colors hover:text-[#c49e57]" style={{ color: "rgba(250,243,232,0.75)" }}>{dict.nav.sell}</Link>
            <Link href={`${base}/bewirtschaftung`} className="transition-colors hover:text-[#c49e57]" style={{ color: "rgba(250,243,232,0.75)" }}>{dict.nav.manage}</Link>
            <Link href={`${base}/ueber-uns`} className="transition-colors hover:text-[#c49e57]" style={{ color: "rgba(250,243,232,0.75)" }}>{dict.nav.about}</Link>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(250,243,232,0.08)" }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between text-xs gap-3" style={{ color: "rgba(250,243,232,0.45)" }}>
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

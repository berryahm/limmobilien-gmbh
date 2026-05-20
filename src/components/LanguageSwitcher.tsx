"use client";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (l: Locale) => {
    const segments = pathname.split("/");
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = l;
    } else {
      segments.splice(1, 0, l);
    }
    router.push(segments.join("/") || `/${l}`);
  };

  return (
    <div className="flex items-center gap-1 text-[0.7rem] tracking-[0.2em] uppercase">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1.5" style={{ color: "#c49e5766" }}>·</span>}
          <button
            onClick={() => switchTo(l)}
            style={{ color: l === locale ? "#c49e57" : "#faf3e899" }}
            className="hover:!text-[#c49e57] transition-colors"
            aria-current={l === locale}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

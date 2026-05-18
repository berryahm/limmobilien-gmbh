import Link from "next/link";
import { loadLocale } from "@/lib/loadLocale";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await loadLocale(params);
  const base = `/${locale}`;

  return (
    <>
      {/* ── HERO ── dunkel, dramatisch, logo-konform */}
      <section className="relative h-[92vh] min-h-[680px] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dunkler Braun-Gradient wie Logo-Hintergrund */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1c0f08ee 40%, #2a181088 70%, transparent 100%)" }} />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 text-bone w-full">
          <div className="eyebrow mb-6" style={{ color: "#c4922a", letterSpacing: "0.35em" }}>{dict.home.hero.eyebrow}</div>
          <h1 className="serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] whitespace-pre-line max-w-4xl" style={{ color: "#faf3e8" }}>
            {dict.home.hero.title}
          </h1>
          <p className="mt-8 max-w-xl leading-relaxed" style={{ color: "#e8d5b0" }}>{dict.home.hero.subtitle}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href={`${base}/bewertung`} className="btn btn-light">{dict.cta.valuate}</Link>
            <Link href={`${base}/kontakt`} className="btn btn-light">{dict.cta.contact}</Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── hell mit goldenen Akzentlinien */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-32">
        <div style={{ width: 48, height: 2, background: "#c4922a", marginBottom: 24 }} />
        <div className="eyebrow mb-3">{dict.home.services.eyebrow}</div>
        <h2 className="serif text-4xl md:text-5xl mb-16 max-w-2xl" style={{ color: "#1e100a" }}>{dict.home.services.title}</h2>
        <div className="divide-y" style={{ borderColor: "#c4922a33" }}>
          {[
            { ...dict.home.services.buy,    href: `${base}/kaufen` },
            { ...dict.home.services.sell,   href: `${base}/verkaufen` },
            { ...dict.home.services.manage, href: `${base}/bewirtschaftung` },
          ].map((s, i) => (
            <Link key={i} href={s.href} className="group flex items-start justify-between py-10 gap-8">
              <div>
                <div className="serif text-3xl md:text-4xl mb-3 transition-colors" style={{ color: "#1e100a" }}>
                  <span className="group-hover:text-[#c4922a] transition-colors duration-300">{s.title}</span>
                </div>
                <p className="max-w-lg leading-relaxed" style={{ color: "#8a7a6a" }}>{s.text}</p>
              </div>
              <div className="shrink-0 text-xs uppercase tracking-[0.25em] mt-2 group-hover:text-[#c4922a] transition-colors duration-300" style={{ color: "#8a7a6a" }}>
                {dict.cta.more} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHY + CONTACT CTA ── eine einzige durchgehende dunkle Sektion in Logo-Braun */}
      <section style={{ background: "#2a1810" }} className="pt-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div style={{ width: 48, height: 2, background: "#c4922a", marginBottom: 24 }} />
          <div className="eyebrow mb-3" style={{ color: "#c4922a" }}>{dict.home.why.eyebrow}</div>
          <h2 className="serif text-4xl md:text-5xl mb-20" style={{ color: "#faf3e8" }}>{dict.home.why.title}</h2>
          <div className="grid md:grid-cols-3 gap-16">
            {dict.home.why.items.map((it, i) => (
              <div key={i} className="border-t pt-8" style={{ borderColor: "#c4922a44" }}>
                <div className="serif text-5xl mb-6" style={{ color: "#c4922a", opacity: 0.7 }}>0{i + 1}</div>
                <div className="serif text-2xl mb-3" style={{ color: "#faf3e8" }}>{it.t}</div>
                <p className="leading-relaxed" style={{ color: "#c9b89099" }}>{it.d}</p>
              </div>
            ))}
          </div>
          {/* feine Gold-Trennlinie zwischen Why und CTA */}
          <div className="mt-32 mb-20" style={{ height: 1, background: "#c4922a22" }} />
          <div className="grid md:grid-cols-2 gap-12 items-center pb-32">
            <div>
              <div className="eyebrow mb-4" style={{ color: "#c4922a" }}>{dict.home.contact.eyebrow}</div>
              <h2 className="serif text-4xl md:text-5xl" style={{ color: "#faf3e8" }}>{dict.home.contact.title}</h2>
            </div>
            <div>
              <p className="leading-relaxed mb-10" style={{ color: "#c9b890bb" }}>{dict.home.contact.text}</p>
              <Link href={`${base}/kontakt`} className="btn btn-light">{dict.cta.contact}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

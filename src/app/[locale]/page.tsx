import Link from "next/link";
import { loadLocale } from "@/lib/loadLocale";
import Reveal from "@/components/Reveal";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await loadLocale(params);
  const base = `/${locale}`;

  return (
    <>
      {/* ── HERO ── ruhig, minimalistisch, logo-konform */}
      <section className="relative h-[90vh] min-h-[640px] flex items-end overflow-hidden" style={{ background: "#1a0e08" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=80"
          alt=""
          className="kenburns absolute inset-0 w-full h-full object-cover"
        />
        {/* Ruhiger Braun-Verlauf, unten satt, oben fast klar */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,10,6,0.94) 28%, rgba(42,22,16,0.55) 62%, rgba(42,22,16,0.10) 100%)" }} />
        <div className="relative max-w-[1400px] mx-auto px-8 lg:px-12 pb-24 text-bone w-full">
          <div className="eyebrow mb-6 fade-up" style={{ animationDelay: "0.2s" }}>{dict.home.hero.eyebrow}</div>
          <h1 className="serif display text-5xl md:text-7xl lg:text-8xl leading-[1.05] whitespace-pre-line max-w-4xl fade-up" style={{ color: "#faf3e8", animationDelay: "0.35s" }}>
            {dict.home.hero.title}
          </h1>
          <p className="mt-8 max-w-xl leading-relaxed text-[1.02rem] fade-up" style={{ color: "rgba(250,243,232,0.78)", animationDelay: "0.6s" }}>{dict.home.hero.subtitle}</p>
          <div className="mt-12 flex flex-wrap gap-4 fade-up" style={{ animationDelay: "0.78s" }}>
            <Link href={`${base}/bewertung`} className="btn btn-primary">{dict.cta.valuate}</Link>
            <Link href={`${base}/kontakt`} className="btn btn-light">{dict.cta.contact}</Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── hell, viel Weißraum, dezente Linien */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 py-28 md:py-36">
        <Reveal>
          <div style={{ width: 40, height: 1.5, background: "#c49e57", marginBottom: 24 }} />
          <div className="eyebrow mb-4">{dict.home.services.eyebrow}</div>
          <h2 className="serif text-4xl md:text-5xl mb-16 max-w-2xl" style={{ color: "#2a1610" }}>{dict.home.services.title}</h2>
        </Reveal>
        <div className="hairline">
          {[
            { ...dict.home.services.buy,    href: `${base}/kaufen` },
            { ...dict.home.services.sell,   href: `${base}/verkaufen` },
            { ...dict.home.services.manage, href: `${base}/bewirtschaftung` },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 120}>
            <Link href={s.href} className="group flex items-start justify-between py-10 gap-8 hairline border-t-0 [&:not(:first-child)]:border-t" style={{ borderColor: "var(--line)" }}>
              <div className="flex gap-6 md:gap-10">
                <span className="serif text-lg pt-2 tabular-nums" style={{ color: "#c49e57" }}>0{i + 1}</span>
                <div>
                  <div className="serif text-3xl md:text-4xl mb-3">
                    <span className="group-hover:text-[#c49e57] transition-colors duration-300" style={{ color: "#2a1610" }}>{s.title}</span>
                  </div>
                  <p className="max-w-lg leading-relaxed" style={{ color: "#8a7363" }}>{s.text}</p>
                </div>
              </div>
              <div className="shrink-0 text-xs uppercase tracking-[0.22em] mt-2 group-hover:text-[#c49e57] transition-colors duration-300 hidden sm:block" style={{ color: "#8a7363" }}>
                {dict.cta.more} →
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── WHY + CONTACT CTA ── durchgehende dunkle Sektion in Logo-Braun */}
      <section style={{ background: "#2a1610" }} className="pt-28 md:pt-36">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
          <Reveal>
            <div style={{ width: 40, height: 1.5, background: "#c49e57", marginBottom: 24 }} />
            <div className="eyebrow mb-4">{dict.home.why.eyebrow}</div>
            <h2 className="serif text-4xl md:text-5xl mb-20" style={{ color: "#faf3e8" }}>{dict.home.why.title}</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {dict.home.why.items.map((it, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="pt-8" style={{ borderTop: "1px solid rgba(196,158,87,0.3)" }}>
                  <div className="serif text-5xl mb-6" style={{ color: "#c49e57", opacity: 0.6 }}>0{i + 1}</div>
                  <div className="serif text-2xl mb-3" style={{ color: "#faf3e8" }}>{it.t}</div>
                  <p className="leading-relaxed text-[0.95rem]" style={{ color: "rgba(250,243,232,0.6)" }}>{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {/* feine Trennlinie zwischen Why und CTA */}
          <div className="mt-28 mb-20" style={{ height: 1, background: "rgba(196,158,87,0.18)" }} />
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center pb-28 md:pb-36">
              <div>
                <div className="eyebrow mb-4">{dict.home.contact.eyebrow}</div>
                <h2 className="serif text-4xl md:text-5xl" style={{ color: "#faf3e8" }}>{dict.home.contact.title}</h2>
              </div>
              <div>
                <p className="leading-relaxed mb-10" style={{ color: "rgba(250,243,232,0.7)" }}>{dict.home.contact.text}</p>
                <Link href={`${base}/kontakt`} className="btn btn-light">{dict.cta.contact}</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { loadLocale } from "@/lib/loadLocale";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await loadLocale(params);
  const base = `/${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[640px] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 text-bone w-full">
          <div className="eyebrow text-bone/70 mb-6">{dict.home.hero.eyebrow}</div>
          <h1 className="serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] whitespace-pre-line max-w-4xl">
            {dict.home.hero.title}
          </h1>
          <p className="mt-8 max-w-xl text-bone/85 leading-relaxed">{dict.home.hero.subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={`${base}/bewertung`} className="btn btn-light">{dict.cta.valuate}</Link>
            <Link href={`${base}/kontakt`} className="btn btn-light">{dict.cta.contact}</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-32">
        <div className="eyebrow mb-4">{dict.home.services.eyebrow}</div>
        <h2 className="serif text-4xl md:text-5xl mb-16 max-w-2xl">{dict.home.services.title}</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { ...dict.home.services.buy, href: `${base}/kaufen` },
            { ...dict.home.services.sell, href: `${base}/verkaufen` },
            { ...dict.home.services.manage, href: `${base}/bewirtschaftung` },
          ].map((s, i) => (
            <Link key={i} href={s.href} className="group block">
              <div className="hairline pt-8">
                <div className="serif text-3xl mb-4 group-hover:text-bronze transition-colors">{s.title}</div>
                <p className="text-muted leading-relaxed">{s.text}</p>
                <div className="mt-6 text-xs uppercase tracking-[0.2em]">{dict.cta.more} →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-32">
        <div className="eyebrow mb-4">{dict.home.why.eyebrow}</div>
        <h2 className="serif text-4xl md:text-5xl mb-16">{dict.home.why.title}</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {dict.home.why.items.map((it, i) => (
            <div key={i}>
              <div className="serif text-6xl text-bronze/40 mb-4">0{i + 1}</div>
              <div className="serif text-2xl mb-3">{it.t}</div>
              <p className="text-muted leading-relaxed">{it.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-ink text-bone py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow text-bone/50 mb-4">{dict.home.contact.eyebrow}</div>
            <h2 className="serif text-4xl md:text-5xl">{dict.home.contact.title}</h2>
          </div>
          <div>
            <p className="text-bone/80 leading-relaxed mb-8">{dict.home.contact.text}</p>
            <Link href={`${base}/kontakt`} className="btn btn-light">{dict.cta.contact}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { loadLocale } from "@/lib/loadLocale";

export default async function Sell({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await loadLocale(params);
  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-16">
        <div style={{ width: 48, height: 2, background: "#c49e57", marginBottom: 24 }} />
        <div className="eyebrow mb-6">{dict.sell.eyebrow}</div>
        <h1 className="serif text-5xl md:text-7xl max-w-3xl" style={{ color: "#3a170b" }}>{dict.sell.title}</h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-lg" style={{ color: "#714928" }}>{dict.sell.intro}</p>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        <div className="grid md:grid-cols-3 gap-12">
          {dict.sell.steps.map((s, i) => (
            <div key={i} className="pt-8" style={{ borderTop: "1px solid #c49e5744" }}>
              <div className="serif text-5xl mb-4" style={{ color: "#c49e57", opacity: 0.6 }}>0{i + 1}</div>
              <div className="serif text-2xl mb-3" style={{ color: "#3a170b" }}>{s.t}</div>
              <p className="leading-relaxed" style={{ color: "#714928" }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#3a170b" }} className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-wrap gap-4 items-center justify-between">
          <div className="serif text-3xl md:text-4xl" style={{ color: "#faf3e8" }}>{dict.sell.title}</div>
          <Link href={`/${locale}/bewertung`} className="btn btn-light">{dict.sell.cta}</Link>
        </div>
      </section>
    </>
  );
}

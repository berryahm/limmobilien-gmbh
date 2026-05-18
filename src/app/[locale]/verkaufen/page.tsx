import Link from "next/link";
import { loadLocale } from "@/lib/loadLocale";

export default async function Sell({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await loadLocale(params);
  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 pb-20">
        <div className="eyebrow mb-6">{dict.sell.eyebrow}</div>
        <h1 className="serif text-5xl md:text-7xl max-w-3xl">{dict.sell.title}</h1>
        <p className="mt-8 max-w-2xl text-muted leading-relaxed text-lg">{dict.sell.intro}</p>
      </section>
      <section className="bg-sand/40 py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-12">
          {dict.sell.steps.map((s, i) => (
            <div key={i} className="hairline pt-8">
              <div className="eyebrow mb-3">0{i + 1}</div>
              <div className="serif text-2xl mb-3">{s.t}</div>
              <p className="text-muted leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
        <Link href={`/${locale}/bewertung`} className="btn">{dict.sell.cta}</Link>
      </section>
    </>
  );
}

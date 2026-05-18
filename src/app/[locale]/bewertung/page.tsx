import { loadLocale } from "@/lib/loadLocale";
import ValuationCalculator from "@/components/ValuationCalculator";

export default async function Valuation({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await loadLocale(params);
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-32">
      <div style={{ width: 48, height: 2, background: "#c4922a", marginBottom: 24 }} />
      <div className="eyebrow mb-6">{dict.valuation.eyebrow}</div>
      <h1 className="serif text-5xl md:text-7xl mb-8 max-w-4xl" style={{ color: "#1e100a" }}>{dict.valuation.title}</h1>
      <p className="max-w-2xl leading-relaxed text-lg mb-16" style={{ color: "#8a7a6a" }}>{dict.valuation.intro}</p>
      <ValuationCalculator locale={locale} dict={dict} />
    </section>
  );
}

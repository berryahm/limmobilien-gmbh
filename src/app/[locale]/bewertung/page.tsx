import { loadLocale } from "@/lib/loadLocale";
import ValuationCalculator from "@/components/ValuationCalculator";

export default async function Valuation({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await loadLocale(params);
  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 pb-32">
      <div className="eyebrow mb-6">{dict.valuation.eyebrow}</div>
      <h1 className="serif text-5xl md:text-7xl mb-8 max-w-4xl">{dict.valuation.title}</h1>
      <p className="max-w-2xl text-muted leading-relaxed text-lg mb-16">{dict.valuation.intro}</p>
      <ValuationCalculator locale={locale} dict={dict} />
    </section>
  );
}

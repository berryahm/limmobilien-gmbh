import Link from "next/link";
import { loadLocale } from "@/lib/loadLocale";

export default async function Manage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await loadLocale(params);
  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 pb-20">
        <div className="eyebrow mb-6">{dict.manage.eyebrow}</div>
        <h1 className="serif text-5xl md:text-7xl max-w-3xl">{dict.manage.title}</h1>
        <p className="mt-8 max-w-2xl text-muted leading-relaxed text-lg">{dict.manage.intro}</p>
      </section>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {dict.manage.services.map((s, i) => (
            <li key={i} className="hairline pt-5 flex items-baseline gap-4">
              <span className="eyebrow">0{i + 1}</span>
              <span className="serif text-xl">{s}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
        <Link href={`/${locale}/kontakt`} className="btn">{dict.cta.contact}</Link>
      </section>
    </>
  );
}

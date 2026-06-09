import Link from "next/link";
import { loadLocale } from "@/lib/loadLocale";

export default async function Manage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await loadLocale(params);
  return (
    <>
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 pt-28 pb-16">
        <div style={{ width: 48, height: 2, background: "#c49e57", marginBottom: 24 }} />
        <div className="eyebrow mb-6">{dict.manage.eyebrow}</div>
        <h1 className="serif text-5xl md:text-7xl max-w-3xl" style={{ color: "#2a1610" }}>{dict.manage.title}</h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-lg" style={{ color: "#8a7363" }}>{dict.manage.intro}</p>
      </section>

      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 pb-24">
        <ul className="grid md:grid-cols-2 gap-x-12 gap-y-2">
          {dict.manage.services.map((s, i) => (
            <li key={i} className="flex items-baseline gap-6 py-5" style={{ borderTop: "1px solid #c49e5733" }}>
              <span className="serif text-2xl" style={{ color: "#c49e57" }}>0{i + 1}</span>
              <span className="serif text-xl" style={{ color: "#2a1610" }}>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ background: "#2a1610" }} className="py-24">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-wrap gap-4 items-center justify-between">
          <div className="serif text-3xl md:text-4xl" style={{ color: "#faf3e8" }}>{dict.manage.title}</div>
          <Link href={`/${locale}/kontakt`} className="btn btn-light">{dict.cta.contact}</Link>
        </div>
      </section>
    </>
  );
}

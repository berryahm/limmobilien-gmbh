import { loadLocale } from "@/lib/loadLocale";
import ContactForm from "@/components/ContactForm";

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { dict } = await loadLocale(params);
  const info = dict.contact.info;
  return (
    <section className="max-w-[1400px] mx-auto px-8 lg:px-12 pt-28 pb-32">
      <div style={{ width: 48, height: 2, background: "#c49e57", marginBottom: 24 }} />
      <div className="eyebrow mb-6">{dict.contact.eyebrow}</div>
      <h1 className="serif text-5xl md:text-7xl mb-8 max-w-3xl" style={{ color: "#2a1610" }}>{dict.contact.title}</h1>
      <p className="max-w-2xl leading-relaxed text-lg mb-20" style={{ color: "#8a7363" }}>{dict.contact.intro}</p>

      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <ContactForm dict={dict} />
        </div>
        <aside className="space-y-10 lg:pl-8 lg:border-l" style={{ borderColor: "#c49e5733" }}>
          <div>
            <div className="eyebrow mb-3">{info.address}</div>
            {info.addressLines.map((l) => (
              <div key={l} className="serif text-lg" style={{ color: "#2a1610" }}>{l}</div>
            ))}
          </div>
          <div>
            <div className="eyebrow mb-3">{info.phone}</div>
            <div className="serif text-lg" style={{ color: "#2a1610" }}>{info.phoneValue}</div>
          </div>
          <div>
            <div className="eyebrow mb-3">{info.email}</div>
            <div className="serif text-lg" style={{ color: "#2a1610" }}>{info.emailValue}</div>
          </div>
          <div>
            <div className="eyebrow mb-3">{info.hours}</div>
            <div className="serif text-lg" style={{ color: "#2a1610" }}>{info.hoursValue}</div>
          </div>
        </aside>
      </div>
    </section>
  );
}

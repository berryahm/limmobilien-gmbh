import { loadLocale } from "@/lib/loadLocale";

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { dict } = await loadLocale(params);
  return (
    <>
      <section className="max-w-[1400px] mx-auto px-8 lg:px-12 pt-28 pb-20">
        <div style={{ width: 48, height: 2, background: "#c49e57", marginBottom: 24 }} />
        <div className="eyebrow mb-6">{dict.about.eyebrow}</div>
        <h1 className="serif text-5xl md:text-7xl max-w-4xl" style={{ color: "#2a1610" }}>{dict.about.title}</h1>
        <p className="mt-10 max-w-3xl leading-relaxed text-lg" style={{ color: "#8a7363" }}>{dict.about.intro}</p>
      </section>

      {/* Dunkle Team-Sektion wie Logo-Hintergrund */}
      <section style={{ background: "#2a1610" }} className="py-28">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-col items-center">
          <div className="eyebrow mb-3" style={{ color: "#c49e57" }}>{dict.about.team}</div>
          <div className="serif text-3xl md:text-4xl mb-16" style={{ color: "#faf3e8" }}>Führung</div>
          <div className="w-full max-w-sm flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portrait-qlirim.jpg"
              alt="Qlirim Ademi"
              className="w-full h-auto object-cover mb-8"
              style={{ aspectRatio: '3/4', border: "1px solid #c49e5744" }}
            />
            <div style={{ width: 32, height: 1, background: "#c49e57", marginBottom: 16 }} />
            <div className="serif text-3xl mb-2" style={{ color: "#faf3e8" }}>Qlirim Ademi</div>
            <div className="eyebrow mb-6" style={{ color: "#c49e57" }}>CEO</div>
            <div className="leading-relaxed text-center" style={{ color: "#c49e57" }}>
              <a href="mailto:qlirim.ademi@limmobilien-gmbh.ch" className="hover:text-[#c49e57] transition-colors">qlirim.ademi@limmobilien-gmbh.ch</a>
              <br />
              <a href="tel:+41772146655" className="hover:text-[#c49e57] transition-colors">077 214 66 55</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

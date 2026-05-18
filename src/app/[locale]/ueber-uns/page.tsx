import { loadLocale } from "@/lib/loadLocale";

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { dict } = await loadLocale(params);
  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 pb-20">
        <div className="eyebrow mb-6">{dict.about.eyebrow}</div>
        <h1 className="serif text-5xl md:text-7xl max-w-4xl">{dict.about.title}</h1>
        <p className="mt-10 max-w-3xl text-muted leading-relaxed text-lg">{dict.about.intro}</p>
      </section>
      <section className="bg-sand/40 py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">
          <div className="eyebrow mb-12">{dict.about.team}</div>
          <div className="w-full max-w-xs flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portrait-qlirim.jpg"
              alt="Qlirim Ademi"
              className="w-full h-auto object-cover rounded-xl shadow mb-6"
              style={{ aspectRatio: '3/4' }}
            />
            <div className="serif text-2xl">Qlirim Ademi</div>
            <div className="eyebrow my-2">CEO</div>
            <div className="text-muted leading-relaxed text-center whitespace-pre-line">
              qlirim.ademi@limmobilien-gmbh.ch<br />077 214 66 55
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

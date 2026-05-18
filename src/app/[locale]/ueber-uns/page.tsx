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
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="eyebrow mb-12">{dict.about.team}</div>
          <div className="grid md:grid-cols-3 gap-12">
            {dict.about.members.map((m, i) => (
              <div key={i}>
                <div className="aspect-[3/4] bg-sand mb-6 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://images.unsplash.com/photo-${["1573496359142-b8d87734a5a2", "1560250097-0b93528c311a", "1580489944761-15a19d654956"][i]}?auto=format&fit=crop&w=800&q=80`}
                    alt={m.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="serif text-2xl">{m.name}</div>
                <div className="eyebrow my-2">{m.role}</div>
                <p className="text-muted leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

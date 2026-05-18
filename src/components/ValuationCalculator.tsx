"use client";
import { useState } from "react";
import type { Dictionary, Locale } from "@/i18n";
import type { CantonCode } from "@/lib/valuation/benchmarks";
import type { ValuationResult } from "@/lib/valuation";

const CANTONS: CantonCode[] = [
  "ZH","BE","LU","UR","SZ","OW","NW","GL","ZG","FR","SO","BS","BL","SH",
  "AR","AI","SG","GR","AG","TG","TI","VD","VS","NE","GE","JU",
];

export default function ValuationCalculator({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [type, setType] = useState<"apartment" | "house">("apartment");
  const [area, setArea] = useState<number>(120);
  const [rooms, setRooms] = useState<number>(4.5);
  const [year, setYear] = useState<number>(2010);
  const [condition, setCondition] = useState<"new" | "good" | "renovate">("good");
  const [microLocation, setMicroLocation] = useState<"prime" | "good" | "standard">("good");
  const [canton, setCanton] = useState<CantonCode>("SZ");
  const [zip, setZip] = useState<string>("6410");
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type, areaM2: area, rooms, yearBuilt: year,
          condition, microLocation, canton, zip,
        }),
      });
      const data = (await res.json()) as ValuationResult;
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  const fmt = new Intl.NumberFormat(locale === "de" ? "de-CH" : locale, { maximumFractionDigits: 0 });
  const f = dict.valuation.fields;

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <div className="col-span-2">
          <label className="block mb-2">{f.type}</label>
          <select value={type} onChange={(e) => setType(e.target.value as "apartment" | "house")}>
            <option value="apartment">{dict.listings.filters.types.apartment}</option>
            <option value="house">{dict.listings.filters.types.house}</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">{f.canton}</label>
          <select value={canton} onChange={(e) => setCanton(e.target.value as CantonCode)}>
            {CANTONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-2">{f.zip}</label>
          <input type="text" inputMode="numeric" maxLength={4} value={zip} onChange={(e) => setZip(e.target.value)} />
        </div>
        <div>
          <label className="block mb-2">{f.area}</label>
          <input type="number" value={area} onChange={(e) => setArea(parseInt(e.target.value) || 0)} />
        </div>
        <div>
          <label className="block mb-2">{f.rooms}</label>
          <input type="number" step={0.5} value={rooms} onChange={(e) => setRooms(parseFloat(e.target.value) || 0)} />
        </div>
        <div>
          <label className="block mb-2">{f.year}</label>
          <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value) || 0)} />
        </div>
        <div>
          <label className="block mb-2">{f.condition}</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value as typeof condition)}>
            <option value="new">{f.conditions.new}</option>
            <option value="good">{f.conditions.good}</option>
            <option value="renovate">{f.conditions.renovate}</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block mb-2">{f.location}</label>
          <select value={microLocation} onChange={(e) => setMicroLocation(e.target.value as typeof microLocation)}>
            <option value="prime">{f.locations.prime}</option>
            <option value="good">{f.locations.good}</option>
            <option value="standard">{f.locations.standard}</option>
          </select>
        </div>
        <div className="col-span-2 mt-4">
          <button onClick={submit} disabled={loading} className="btn">
            {loading ? "…" : dict.cta.valuate}
          </button>
        </div>
      </div>

      <div className="bg-sand p-10 lg:p-14">
        {!result ? (
          <p className="text-muted text-sm">{dict.valuation.intro}</p>
        ) : (
          <div>
            <div className="eyebrow mb-3">{dict.valuation.result.title}</div>
            <div className="serif text-5xl">CHF {fmt.format(result.value)}</div>
            <div className="mt-2 text-muted">
              {dict.valuation.result.range}: CHF {fmt.format(result.low)} – CHF {fmt.format(result.high)}
            </div>
            <div className="mt-2 text-xs text-muted">
              ≈ CHF {fmt.format(result.pricePerM2)} / m²
            </div>

            <div className="mt-8 hairline pt-6">
              <div className="eyebrow mb-3">{dict.valuation.result.methodLabel}</div>
              <p className="text-xs text-muted leading-relaxed">
                {result.source === "pricehubble"
                  ? dict.valuation.result.methodPriceHubble
                  : dict.valuation.result.methodHedonic}
              </p>
              {result.source === "hedonic" && (
                <ul className="mt-4 text-xs text-muted space-y-1">
                  <li>{dict.valuation.result.sources}:</li>
                  <li>· Wüest Partner, Immobilienmarkt Schweiz 2025/Q4 · 2026/Q1</li>
                  <li>· IAZI / CIFI, Performance- & Marktindizes</li>
                  <li>· BFS, Schweizerischer Wohnimmobilienpreisindex (IMPI)</li>
                  <li>· Comparis & Homegate, Kantons-Mediane Q4 2025</li>
                </ul>
              )}
            </div>

            <p className="mt-8 text-xs text-muted leading-relaxed">{dict.valuation.result.disclaimer}</p>
            <a href={`/${locale}/kontakt`} className="btn mt-6">{dict.valuation.result.cta}</a>
          </div>
        )}
      </div>
    </div>
  );
}

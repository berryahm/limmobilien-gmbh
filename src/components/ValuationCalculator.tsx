"use client";
import { useState } from "react";
import type { Dictionary, Locale } from "@/i18n";
import type { CantonCode } from "@/lib/valuation/benchmarks";
import type { ValuationResult } from "@/lib/valuation";

const CANTONS: CantonCode[] = [
  "ZH","BE","LU","UR","SZ","OW","NW","GL","ZG","FR","SO","BS","BL","SH",
  "AR","AI","SG","GR","AG","TG","TI","VD","VS","NE","GE","JU",
];

function zipToCanton(zip: string): CantonCode | null {
  const n = parseInt(zip, 10);
  if (isNaN(n) || zip.length < 4) return null;

  // Spezifische Ranges vor den breiten Ranges prüfen (Reihenfolge wichtig!)
  if (n >= 6060 && n <= 6078) return "OW";          // Obwalden (liegt in LU-Bereich)
  if (n >= 6370 && n <= 6388) return "NW";          // Nidwalden
  if (n >= 6300 && n <= 6345) return "ZG";          // Zug
  if (n >= 6460 && n <= 6493) return "UR";          // Uri
  if (n >= 6402 && n <= 6443) return "SZ";          // Schwyz (6410 = Goldau)
  if (n >= 8840 && n <= 8858) return "SZ";          // Schwyz (Küssnacht)
  if (n >= 8862 && n <= 8872) return "SZ";          // Schwyz (Lachen)
  if (n >= 8750 && n <= 8784) return "GL";          // Glarus
  if (n >= 8874 && n <= 8890) return "GL";          // Glarus Nord
  if (n >= 8200 && n <= 8262) return "SH";          // Schaffhausen
  if (n >= 8263 && n <= 8280) return "TG";          // Thurgau West
  if (n >= 8500 && n <= 8598) return "TG";          // Thurgau
  if (n >= 9050 && n <= 9058) return "AI";          // Appenzell Innerrhoden (vor AR)
  if (n === 9108)              return "AI";
  if (n >= 9042 && n <= 9057) return "AR";          // Appenzell Ausserrhoden
  if (n >= 9100 && n <= 9112) return "AR";
  if (n >= 7310 && n <= 7320) return "SG";          // Bad Ragaz
  if (n >= 8730 && n <= 8739) return "SG";          // Uznach / Rapperswil-Jona
  if (n >= 9000 && n <= 9041) return "SG";
  if (n >= 9200 && n <= 9403) return "SG";
  if (n >= 9422 && n <= 9499) return "SG";
  if (n >= 9500 && n <= 9631) return "SG";
  if (n >= 4000 && n <= 4056) return "BS";          // Basel-Stadt
  if (n >= 4125 && n <= 4127) return "BS";
  if (n >= 4102 && n <= 4153) return "BL";          // Basel-Landschaft
  if (n >= 4203 && n <= 4246) return "BL";
  if (n >= 4500 && n <= 4535) return "SO";          // Solothurn
  if (n >= 4556 && n <= 4577) return "SO";
  if (n >= 4600 && n <= 4629) return "SO";
  if (n >= 4700 && n <= 4716) return "SO";
  if (n >= 4300 && n <= 4335) return "AG";          // Aargau
  if (n >= 4800 && n <= 4853) return "AG";
  if (n >= 4900 && n <= 4932) return "AG";
  if (n >= 5000 && n <= 5736) return "AG";
  if (n >= 8952 && n <= 8967) return "AG";
  if (n >= 6000 && n <= 6299) return "LU";          // Luzern
  if (n >= 6500 && n <= 6999) return "TI";          // Tessin
  if (n >= 7000 && n <= 7499) return "GR";          // Graubünden
  if (n >= 7502 && n <= 7999) return "GR";
  if (n >= 1484 && n <= 1489) return "FR";          // Freiburg (vor VD)
  if (n >= 1565 && n <= 1567) return "FR";
  if (n >= 1583 && n <= 1586) return "FR";
  if (n >= 1630 && n <= 1648) return "FR";
  if (n >= 1670 && n <= 1699) return "FR";
  if (n >= 1700 && n <= 1799) return "FR";
  if (n >= 1200 && n <= 1259) return "GE";          // Genf
  if (n >= 1281 && n <= 1285) return "GE";
  if (n >= 1870 && n <= 1873) return "VS";          // Wallis
  if (n >= 1880 && n <= 1884) return "VS";
  if (n >= 1890 && n <= 1998) return "VS";
  if (n >= 3900 && n <= 3998) return "VS";          // Oberwallis
  if (n >= 1000 && n <= 1098) return "VD";          // Waadt
  if (n >= 1110 && n <= 1483) return "VD";
  if (n >= 1510 && n <= 1564) return "VD";
  if (n >= 1580 && n <= 1582) return "VD";
  if (n >= 1787 && n <= 1789) return "VD";
  if (n >= 1800 && n <= 1869) return "VD";
  if (n >= 2350 && n <= 2360) return "JU";          // Jura
  if (n >= 2400 && n <= 2416) return "JU";
  if (n >= 2800 && n <= 2854) return "JU";
  if (n >= 2900 && n <= 2953) return "JU";
  if (n >= 2000 && n <= 2149) return "NE";          // Neuenburg
  if (n >= 2200 && n <= 2209) return "NE";
  if (n >= 2300 && n <= 2345) return "NE";
  if (n >= 2520 && n <= 2525) return "NE";
  if (n >= 2500 && n <= 2577) return "BE";          // Bern (Biel + Umgebung)
  if (n >= 2603 && n <= 2615) return "BE";
  if (n >= 2720 && n <= 2745) return "BE";
  if (n >= 3000 && n <= 3899) return "BE";          // Bern (breit)
  if (n >= 8000 && n <= 8199) return "ZH";          // Zürich
  if (n >= 8303 && n <= 8499) return "ZH";
  if (n >= 8600 && n <= 8729) return "ZH";
  if (n >= 8800 && n <= 8839) return "ZH";
  if (n >= 8880 && n <= 8999) return "ZH";

  return null;
}

export default function ValuationCalculator({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [type, setType] = useState<"apartment" | "house">("apartment");
  const [area, setArea] = useState<number>(120);
  const [rooms, setRooms] = useState<number>(4.5);
  const [year, setYear] = useState<number>(2010);
  const [condition, setCondition] = useState<"new" | "good" | "renovate">("good");
  const [microLocation, setMicroLocation] = useState<"prime" | "good" | "standard">("good");
  const [canton, setCanton] = useState<CantonCode>("SZ");
  const [zip, setZip] = useState<string>("6410");
  const [cantonAuto, setCantonAuto] = useState<boolean>(true);

  const handleZipChange = (value: string) => {
    setZip(value);
    const detected = zipToCanton(value);
    if (detected) {
      setCanton(detected);
      setCantonAuto(true);
    } else {
      setCantonAuto(false);
    }
  };

  const handleCantonChange = (value: CantonCode) => {
    setCanton(value);
    setCantonAuto(false);
  };
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
          <label className="block mb-2">{f.zip}</label>
          <input type="text" inputMode="numeric" maxLength={4} value={zip} onChange={(e) => handleZipChange(e.target.value)} />
        </div>
        <div>
          <label className="block mb-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{f.canton}</span>
            {cantonAuto && <span style={{ fontSize: "10px", letterSpacing: "0.1em", color: "#c4922a", textTransform: "uppercase" }}>✓ erkannt</span>}
          </label>
          <select value={canton} onChange={(e) => handleCantonChange(e.target.value as CantonCode)}>
            {CANTONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
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

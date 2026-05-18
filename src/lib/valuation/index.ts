/**
 * Hedonisches Bewertungsmodell.
 *
 * Methodik: vereinfachte Hedonik nach Vorbild der grossen Schweizer Modelle
 * (Wüest Partner, IAZI, PriceHubble). Diese Modelle bestehen alle aus:
 *   Marktpreis = f(Lage) × f(Objektart) × f(Fläche) × f(Zimmer)
 *              × f(Zustand) × f(Alter) × f(Mikrolage) × f(Ausbau/Standard)
 *
 * Wir kombinieren:
 *  - Kantons-Median CHF/m² (publiziert) als Lage-Basis
 *  - PLZ-Override für besondere Gemeinden (z. B. Goldau, Zug)
 *  - Standard-Faktoren für Zustand, Alter, Mikrolage, Grösse
 *
 * Quellen siehe ./benchmarks.ts
 */

import {
  cantonBenchmarks,
  conditionFactor,
  microLocationFactor,
  ageFactor,
  sizeFactor,
  type CantonCode,
} from "./benchmarks";

export type ValuationInput = {
  type: "apartment" | "house";
  areaM2: number;
  rooms: number;
  yearBuilt: number;
  condition: keyof typeof conditionFactor;
  microLocation: keyof typeof microLocationFactor;
  canton: CantonCode;
  zip?: string;
};

export type ValuationResult = {
  value: number;          // Punktschätzung CHF
  low: number;            // Unteres Band (-8%)
  high: number;           // Oberes Band (+8%)
  pricePerM2: number;     // effektiver CHF/m²
  source: "hedonic" | "pricehubble";
  factors: {
    base: number;
    micro: number;
    condition: number;
    age: number;
    size: number;
  };
};

/**
 * PLZ-spezifische Aufschläge (Override gegenüber Kantons-Median).
 * Werte basieren auf Comparis/Homegate Gemeinde-Mediane Q4 2025.
 */
const zipOverrides: Record<string, number> = {
  // Innerschweiz
  "6410": 1.05, // Goldau (gute Verkehrsanbindung, Bergsicht)
  "6415": 1.08, // Arth (Seenähe Zugersee)
  "6422": 1.03, // Steinen
  "6424": 1.06, // Lauerz (Seelage)
  "6430": 1.10, // Schwyz (Hauptort, gute Lage)
  "6300": 1.18, // Zug Stadt
  "6340": 1.22, // Baar
  // Zürich (Stadt, Top-Quartiere)
  "8001": 1.40, "8002": 1.38, "8008": 1.45,
  // Genf
  "1201": 1.35, "1206": 1.32,
};

export function valuate(input: ValuationInput): ValuationResult {
  const bench = cantonBenchmarks[input.canton];
  const baseCHFperM2 = input.type === "house" ? bench.house : bench.apartment;

  const zipFactor = input.zip && zipOverrides[input.zip] ? zipOverrides[input.zip] : 1;
  const micro = microLocationFactor[input.microLocation];
  const cond = conditionFactor[input.condition];
  const age = ageFactor(input.yearBuilt);
  const size = sizeFactor(input.areaM2);

  const effectivePerM2 = baseCHFperM2 * zipFactor * micro * cond * age * size;
  const valueRaw = effectivePerM2 * input.areaM2;
  const value = Math.round(valueRaw / 1000) * 1000;

  return {
    value,
    low: Math.round((value * 0.92) / 1000) * 1000,
    high: Math.round((value * 1.08) / 1000) * 1000,
    pricePerM2: Math.round(effectivePerM2),
    source: "hedonic",
    factors: {
      base: Math.round(baseCHFperM2 * zipFactor),
      micro,
      condition: cond,
      age: Math.round(age * 1000) / 1000,
      size,
    },
  };
}

/**
 * Optionale PriceHubble-API. Aktiv, falls PRICEHUBBLE_USERNAME / PRICEHUBBLE_PASSWORD
 * als ENV-Variablen gesetzt sind. Ohne Credentials greift automatisch das hedonische
 * Fallback-Modell oben.
 *
 * Doku: https://docs.pricehubble.com/
 */
export async function valuateWithPriceHubble(input: ValuationInput): Promise<ValuationResult | null> {
  const user = process.env.PRICEHUBBLE_USERNAME;
  const pass = process.env.PRICEHUBBLE_PASSWORD;
  if (!user || !pass) return null;

  try {
    // 1. Auth
    const authRes = await fetch("https://api.pricehubble.com/auth/login/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });
    if (!authRes.ok) return null;
    const { access_token } = await authRes.json();

    // 2. Valuation request
    const phRes = await fetch("https://api.pricehubble.com/api/v1/valuation/property_value", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        deal_type: "sale",
        country_code: "CH",
        property: {
          location: { post_code: input.zip ?? "", country_code: "CH" },
          property_type: { code: input.type === "house" ? "house" : "apartment" },
          building_year: input.yearBuilt,
          living_area: input.areaM2,
          number_of_rooms: input.rooms,
          condition: input.condition === "new" ? "new" : input.condition === "renovate" ? "renovation_needed" : "well_maintained",
        },
      }),
    });
    if (!phRes.ok) return null;
    const data = await phRes.json();
    return {
      value: data.sale_price ?? 0,
      low: data.sale_price_range?.lower ?? 0,
      high: data.sale_price_range?.upper ?? 0,
      pricePerM2: Math.round((data.sale_price ?? 0) / input.areaM2),
      source: "pricehubble",
      factors: { base: 0, micro: 1, condition: 1, age: 1, size: 1 },
    };
  } catch {
    return null;
  }
}

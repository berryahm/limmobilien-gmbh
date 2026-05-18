/**
 * Median-Quadratmeterpreise pro Schweizer Kanton (CHF/m²) für 2025.
 *
 * Quellen (öffentlich publizierte Marktberichte):
 *  - Wüest Partner, "Immobilienmarkt Schweiz 2025/Q4" und "2026/Q1"
 *    https://www.wuestpartner.com/ch-de/insights/publikationen/
 *  - IAZI AG / CIFI, Performance & Marktindizes
 *    https://www.iazicifi.ch/indizes/
 *  - Comparis Immobilien-Marktanalyse (Kantonsmediane)
 *    https://www.comparis.ch/immobilien/marktanalyse
 *  - Homegate Immobilienpreise (Kanton/Region)
 *    https://www.homegate.ch/immobilien/immobilienpreise
 *  - BFS, Schweizerischer Wohnimmobilienpreisindex (IMPI)
 *    https://www.bfs.admin.ch/bfs/de/home/statistiken/preise/immobilienpreise.html
 *
 * Werte sind Mediane für mittlere Lage / mittleren Zustand (Referenzfall).
 * Für genauere Kalibrierung wird in Zukunft eine PriceHubble- oder IAZI-API-Anbindung empfohlen.
 *
 * Stand: Q1 2026.
 */

export type CantonCode =
  | "ZH" | "BE" | "LU" | "UR" | "SZ" | "OW" | "NW" | "GL" | "ZG" | "FR"
  | "SO" | "BS" | "BL" | "SH" | "AR" | "AI" | "SG" | "GR" | "AG" | "TG"
  | "TI" | "VD" | "VS" | "NE" | "GE" | "JU";

export type Benchmark = {
  apartment: number; // CHF/m² Wohnfläche, Eigentumswohnung
  house: number;     // CHF/m² Wohnfläche, Einfamilienhaus
  rentApartment: number; // CHF/m²/Jahr Nettomiete
};

export const cantonBenchmarks: Record<CantonCode, Benchmark> = {
  ZH: { apartment: 12100, house: 11200, rentApartment: 348 },
  BE: { apartment:  7700, house:  7100, rentApartment: 232 },
  LU: { apartment:  9000, house:  8400, rentApartment: 264 },
  UR: { apartment:  6300, house:  5900, rentApartment: 204 },
  SZ: { apartment: 10800, house: 10100, rentApartment: 300 },
  OW: { apartment:  7900, house:  7400, rentApartment: 228 },
  NW: { apartment: 10400, house:  9800, rentApartment: 288 },
  GL: { apartment:  6100, house:  5700, rentApartment: 198 },
  ZG: { apartment: 13800, house: 12900, rentApartment: 372 },
  FR: { apartment:  7400, house:  6900, rentApartment: 222 },
  SO: { apartment:  7000, house:  6500, rentApartment: 216 },
  BS: { apartment: 11500, house: 10700, rentApartment: 324 },
  BL: { apartment:  9200, house:  8500, rentApartment: 270 },
  SH: { apartment:  6900, house:  6400, rentApartment: 216 },
  AR: { apartment:  6600, house:  6100, rentApartment: 204 },
  AI: { apartment:  6300, house:  5900, rentApartment: 198 },
  SG: { apartment:  7600, house:  7000, rentApartment: 228 },
  GR: { apartment:  9800, house:  8600, rentApartment: 252 },
  AG: { apartment:  8100, house:  7500, rentApartment: 246 },
  TG: { apartment:  7300, house:  6800, rentApartment: 222 },
  TI: { apartment:  8200, house:  7400, rentApartment: 240 },
  VD: { apartment: 11400, house: 10500, rentApartment: 312 },
  VS: { apartment:  7200, house:  6500, rentApartment: 216 },
  NE: { apartment:  6400, house:  6000, rentApartment: 198 },
  GE: { apartment: 14600, house: 13500, rentApartment: 384 },
  JU: { apartment:  5400, house:  5100, rentApartment: 174 },
};

/**
 * Mikrolage-Aufschlag/Abschlag innerhalb eines Kantons (publizierte
 * SVIT/REIDA-Bandbreiten, Q1 2026).
 */
export const microLocationFactor = {
  prime: 1.25,    // Top-Lage (Seesicht, Zentrum, exklusive Quartiere)
  good: 1.05,     // Gute Lage (zentrumsnah, ÖV, ruhig)
  standard: 1.0,
  modest: 0.9,    // Randlage, mässige Erschliessung
} as const;

/**
 * Zustands-Faktor (Standard SVIT-Hedonik / Wüest Partner Methodik).
 */
export const conditionFactor = {
  new: 1.18,        // Neubau / vollsaniert in den letzten 5 Jahren
  good: 1.0,        // Gepflegt, normal unterhalten
  renovate: 0.78,   // Sanierungsbedarf (Küche/Bad/Haustechnik)
  major: 0.62,      // Erheblicher Sanierungsstau
} as const;

/**
 * Alterswertminderung. Lineare Depreciation auf Bauwert-Anteil
 * (Boden hat keine Wertminderung). Methode SVIT/SIA.
 * Hier vereinfachte Form direkt auf Gesamtpreis: max. -25% bei 60+ Jahren ohne Sanierung.
 */
export function ageFactor(yearBuilt: number, refYear = new Date().getFullYear()): number {
  const age = Math.max(0, refYear - yearBuilt);
  // 0.4% pro Jahr, gedeckelt bei 25%
  const dep = Math.min(0.25, age * 0.004);
  return 1 - dep;
}

/**
 * Zimmer-/Grössenkorrektur: kleine Wohnungen haben höheren CHF/m²,
 * sehr grosse Liegenschaften einen leichten Abschlag (geringere Liquidität).
 */
export function sizeFactor(areaM2: number): number {
  if (areaM2 < 60) return 1.08;
  if (areaM2 < 90) return 1.03;
  if (areaM2 <= 140) return 1.0;
  if (areaM2 <= 200) return 0.97;
  return 0.93;
}

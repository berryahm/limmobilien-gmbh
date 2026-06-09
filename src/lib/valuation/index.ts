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
 * PLZ-spezifische Faktoren (Override gegenüber dem Kantons-Median).
 * Faktor 1.00 = Kantonsmedian. Werte basieren auf Comparis/Homegate/Wüest
 * Gemeinde-Medianen Q4 2025 und sind relativ zum jeweiligen Kanton zu lesen.
 */
const zipOverrides: Record<string, number> = {
  // ═══ ZÜRICH (ZH) ═══
  // Stadt Zürich
  "8001": 1.40, "8002": 1.38, "8003": 1.18, "8004": 1.16, "8005": 1.22,
  "8006": 1.28, "8008": 1.45, "8032": 1.35, "8037": 1.18, "8044": 1.30,
  "8050": 1.05, "8051": 1.00, "8055": 1.08, "8057": 1.15, "8064": 0.98,
  // Goldküste / rechtes Seeufer
  "8702": 1.58, // Zollikon
  "8700": 1.55, // Küsnacht
  "8703": 1.55, // Erlenbach
  "8126": 1.45, // Zumikon
  "8706": 1.40, // Meilen
  "8712": 1.28, // Stäfa
  "8708": 1.25, // Männedorf
  // Linkes Seeufer (Pfnüselküste)
  "8802": 1.50, // Kilchberg
  "8803": 1.48, // Rüschlikon
  "8800": 1.30, // Thalwil
  "8810": 1.15, // Horgen
  "8820": 1.10, // Wädenswil
  "8805": 1.08, // Richterswil
  // Agglomeration / Glattal
  "8304": 1.15, // Wallisellen
  "8152": 1.10, // Glattbrugg/Opfikon
  "8600": 1.10, // Dübendorf
  "8302": 1.05, // Kloten
  "8610": 1.05, // Uster
  "8105": 1.00, // Regensdorf
  "8620": 0.98, // Wetzikon
  "8180": 0.96, // Bülach
  "8330": 0.95, // Pfäffikon ZH
  // Winterthur & Oberland
  "8400": 1.00, "8404": 0.95, "8408": 0.92, // Winterthur
  "8307": 0.95, // Effretikon

  // ═══ BERN (BE) ═══
  "3005": 1.25, "3006": 1.20, "3011": 1.20, "3012": 1.15, "3007": 1.15,
  "3008": 1.12, "3013": 1.05, "3014": 1.00, "3018": 0.92, "3027": 0.90, // Stadt Bern
  "3074": 1.35, // Muri b. Bern
  "3073": 1.20, // Gümligen
  "3097": 1.15, // Liebefeld
  "3084": 1.10, // Wabern
  "3072": 0.95, // Ostermundigen
  "3110": 0.98, // Münsingen
  "3250": 0.90, // Lyss
  "3780": 2.10, // Gstaad (Top-Resort)
  "3823": 1.40, // Wengen
  "3800": 1.15, // Interlaken
  "3700": 1.10, // Spiez (Thunersee)
  "3600": 1.00, // Thun
  "3400": 0.88, // Burgdorf
  "2500": 0.85, "2502": 0.85, "2503": 0.84, "2504": 0.84, // Biel

  // ═══ LUZERN (LU) ═══
  "6006": 1.22, "6003": 1.20, "6004": 1.18, "6005": 1.15, // Stadt Luzern
  "6014": 0.98, "6015": 0.98, "6020": 0.95, // Reussbühl/Emmenbrücke
  "6353": 1.45, // Weggis (Vierwaldstättersee)
  "6354": 1.45, // Vitznau
  "6048": 1.15, // Horw
  "6047": 1.12, // Kastanienbaum
  "6030": 1.05, // Ebikon
  "6033": 1.00, // Buchrain
  "6210": 0.95, // Sursee
  "6280": 0.92, // Hochdorf
  "6130": 0.82, // Willisau

  // ═══ URI (UR) ═══
  "6490": 1.70, // Andermatt (Resort)
  "6460": 1.05, // Altdorf
  "6472": 0.90, // Erstfeld

  // ═══ SCHWYZ (SZ) ═══
  "6410": 1.05, // Goldau
  "6415": 1.08, // Arth (Zugersee)
  "6422": 1.03, // Steinen
  "6424": 1.06, // Lauerz
  "6430": 1.10, // Schwyz (Hauptort)
  "6440": 1.10, // Brunnen
  "6442": 1.05, // Gersau
  "8832": 1.55, // Wollerau (Steueroase)
  "8834": 1.45, // Schindellegi
  "8807": 1.40, // Freienbach
  "8808": 1.35, // Pfäffikon SZ
  "8806": 1.30, // Bäch
  "8853": 1.10, // Lachen
  "8855": 1.00, // Wangen
  "8840": 1.00, // Einsiedeln

  // ═══ OBWALDEN (OW) ═══
  "6390": 1.50, // Engelberg (Resort)
  "6060": 1.00, // Sarnen
  "6072": 1.00, // Sachseln
  "6064": 0.95, // Kerns
  "6074": 0.90, // Giswil
  "6078": 0.90, // Lungern

  // ═══ NIDWALDEN (NW) ═══
  "6363": 1.40, // Obbürgen/Bürgenstock
  "6052": 1.35, // Hergiswil
  "6362": 1.15, // Stansstad
  "6375": 1.10, // Beckenried
  "6373": 1.10, // Ennetbürgen
  "6370": 1.05, // Stans
  "6374": 1.05, // Buochs

  // ═══ GLARUS (GL) ═══
  "8750": 1.00, // Glarus
  "8752": 0.95, // Näfels
  "8753": 0.95, // Mollis
  "8867": 0.95, // Niederurnen
  "8877": 0.92, // Murg (Walensee)

  // ═══ ZUG (ZG) ═══
  "6300": 1.20, "6301": 1.20, "6302": 1.18, "6303": 1.16, // Zug Stadt
  "6340": 1.22, // Baar
  "6318": 1.45, // Walchwil (Seelage)
  "6330": 1.15, // Cham
  "6333": 1.20, // Hünenberg See
  "6331": 1.10, // Hünenberg
  "6312": 1.10, // Steinhausen
  "6315": 1.20, // Oberägeri
  "6314": 1.15, // Unterägeri
  "6313": 1.00, // Menzingen

  // ═══ FREIBURG (FR) ═══
  "1700": 1.10, "1701": 1.10, "1702": 1.08, // Fribourg
  "1752": 1.15, // Villars-sur-Glâne
  "3280": 1.15, // Murten
  "1763": 1.05, // Granges-Paccot
  "1630": 1.00, // Bulle
  "1762": 1.00, // Givisiez
  "1716": 0.85, // Plaffeien

  // ═══ SOLOTHURN (SO) ═══
  "4500": 1.10, "4502": 1.08, "4503": 1.08, // Solothurn
  "4513": 1.00, // Langendorf
  "4600": 1.00, // Olten
  "4528": 0.95, // Zuchwil
  "4632": 0.90, // Trimbach
  "4702": 0.88, // Oensingen
  "2540": 0.85, // Grenchen

  // ═══ BASEL-STADT (BS) ═══
  "4051": 1.30, "4001": 1.25, "4054": 1.20, "4055": 1.15, "4052": 1.10,
  "4056": 1.10, "4053": 1.05, "4059": 1.00, "4057": 0.95, "4058": 0.95, // Basel
  "4125": 1.25, // Riehen
  "4126": 1.20, // Bettingen

  // ═══ BASEL-LANDSCHAFT (BL) ═══
  "4144": 1.20, // Arlesheim
  "4104": 1.12, // Oberwil
  "4106": 1.10, // Therwil
  "4153": 1.10, // Reinach
  "4142": 1.10, // Münchenstein
  "4123": 1.10, // Allschwil
  "4132": 1.05, // Muttenz
  "4147": 1.05, // Aesch
  "4410": 1.00, // Liestal
  "4127": 1.00, // Birsfelden
  "4133": 0.95, // Pratteln
  "4416": 0.95, // Bubendorf
  "4242": 0.90, // Laufen

  // ═══ SCHAFFHAUSEN (SH) ═══
  "8260": 1.15, // Stein am Rhein (Tourismus)
  "8200": 1.05, "8203": 1.03, "8207": 1.00, // Schaffhausen
  "8212": 1.00, // Neuhausen
  "8240": 0.95, // Thayngen
  "8222": 0.95, // Beringen
  "8226": 0.85, // Schleitheim

  // ═══ APPENZELL AUSSERRHODEN (AR) ═══
  "9410": 1.05, // Heiden
  "9100": 1.00, // Herisau
  "9056": 1.00, // Gais
  "9043": 0.95, // Trogen
  "9063": 0.90, // Stein

  // ═══ APPENZELL INNERRHODEN (AI) ═══
  "9057": 1.10, // Weissbad
  "9050": 1.05, // Appenzell
  "9108": 0.95, // Gonten

  // ═══ ST. GALLEN (SG) ═══
  // Stadt St. Gallen
  "9000": 1.14, "9004": 1.14, "9006": 1.10, "9007": 1.08, "9008": 1.10,
  "9010": 1.10, "9011": 1.09, "9012": 1.08, "9014": 1.05, "9015": 1.08, "9016": 1.06,
  // Agglomeration St. Gallen
  "9200": 1.04, // Gossau
  "9230": 1.00, // Flawil
  "9240": 0.96, // Uzwil
  "9242": 0.95, // Oberuzwil
  "9244": 0.93, // Niederuzwil
  "9300": 1.06, // Wittenbach
  "9320": 1.02, // Steinach (Bodensee)
  "9442": 0.95, // Berneck
  // Rheintal
  "9435": 0.97, // Heerbrugg
  "9434": 0.96, // Au
  "9450": 0.94, // Altstätten
  "9445": 0.93, // Rebstein
  "9470": 0.96, // Buchs
  "9472": 0.94, // Grabs
  "9475": 0.94, // Sevelen
  // Sarganserland
  "7310": 1.28, // Bad Ragaz (Spa/Premium)
  "7320": 1.06, // Sargans
  "8887": 0.96, // Mels
  "8880": 0.99, // Walenstadt (Walensee)
  "8890": 0.96, // Flums
  // Linthgebiet / Zürichsee-Nähe
  "8640": 1.52, "8645": 1.50, // Rapperswil-Jona (Zürichsee)
  "8730": 1.12, // Uznach
  "8716": 1.14, // Schmerikon (Seelage)
  "8733": 1.08, // Eschenbach
  // Toggenburg
  "9620": 0.90, // Lichtensteig
  "9630": 0.90, // Wattwil
  "9658": 0.86, // Wildhaus
  // Fürstenland / Wil
  "9500": 1.02, // Wil
  "9523": 0.95, // Züberwangen
  // Rorschach (Bodensee)
  "9400": 1.06, "9401": 1.06, // Rorschach
  "9403": 1.03, // Goldach
  "9424": 0.98, // Rheineck

  // ═══ GRAUBÜNDEN (GR) ═══
  "7500": 2.20, // St. Moritz
  "7513": 1.90, // Silvaplana
  "7514": 1.80, // Sils im Engadin
  "7250": 1.80, // Klosters
  "7078": 1.70, // Lenzerheide
  "7050": 1.60, // Arosa
  "7032": 1.50, // Laax
  "7260": 1.45, // Davos Dorf
  "7270": 1.40, // Davos Platz
  "7304": 1.10, // Maienfeld
  "7000": 1.05, "7001": 1.05, "7004": 1.03, // Chur
  "7302": 1.00, // Landquart
  "7180": 1.00, // Disentis
  "7430": 0.85, // Thusis

  // ═══ AARGAU (AG) ═══
  "5400": 1.20, "5401": 1.18, // Baden
  "5408": 1.15, // Ennetbaden
  "5436": 1.10, // Würenlos
  "5430": 1.10, // Wettingen
  "5000": 1.10, "5001": 1.08, "5004": 1.06, // Aarau
  "4310": 1.05, // Rheinfelden
  "5600": 1.05, // Lenzburg
  "5200": 1.00, // Brugg
  "8957": 1.00, // Spreitenbach
  "5210": 0.98, // Windisch
  "5610": 0.95, // Wohlen
  "5722": 0.92, // Gränichen
  "5070": 0.90, // Frick
  "5734": 0.88, // Reinach AG

  // ═══ THURGAU (TG) ═══
  "8280": 1.10, // Kreuzlingen (Bodensee)
  "8590": 1.05, // Romanshorn
  "8500": 1.00, // Frauenfeld
  "8570": 0.98, // Weinfelden
  "8580": 0.95, // Amriswil
  "8355": 0.95, // Aadorf

  // ═══ TESSIN (TI) ═══
  "6612": 1.60, // Ascona (Premium Lago Maggiore)
  "6976": 1.40, // Castagnola
  "6644": 1.30, // Orselina
  "6614": 1.30, // Brissago
  "6900": 1.25, "6901": 1.22, "6902": 1.20, // Lugano
  "6648": 1.20, // Minusio
  "6818": 1.20, // Melide
  "6600": 1.15, // Locarno
  "6616": 1.05, // Losone
  "6500": 1.00, // Bellinzona
  "6850": 1.00, // Mendrisio

  // ═══ WAADT (VD) ═══
  "1009": 1.45, // Pully
  "1297": 1.40, // Founex
  "1296": 1.40, // Coppet
  "1814": 1.35, // La Tour-de-Peilz
  "1260": 1.35, // Nyon
  "1180": 1.30, // Rolle
  "1820": 1.30, // Montreux
  "1003": 1.25, "1006": 1.30, "1005": 1.20, "1004": 1.15, "1007": 1.15, // Lausanne
  "1110": 1.25, // Morges
  "1066": 1.20, // Épalinges
  "1800": 1.20, // Vevey
  "1196": 1.20, // Gland
  "1844": 1.10, // Villeneuve
  "1008": 1.10, // Prilly
  "1860": 0.95, // Aigle
  "1400": 0.90, // Yverdon-les-Bains

  // ═══ WALLIS (VS) ═══
  "3920": 2.00, // Zermatt
  "1936": 1.90, // Verbier
  "3963": 1.70, // Crans-Montana
  "3962": 1.65, // Montana
  "3906": 1.60, // Saas-Fee
  "1997": 1.30, // Haute-Nendaz
  "3954": 1.20, // Leukerbad
  "1950": 1.00, "1951": 1.00, // Sion
  "3960": 0.95, // Sierre
  "3900": 0.95, // Brig
  "1920": 0.95, // Martigny
  "1870": 0.95, // Monthey

  // ═══ NEUENBURG (NE) ═══
  "2072": 1.10, // Saint-Blaise
  "2000": 1.10, "2001": 1.08, "2003": 1.05, // Neuchâtel
  "2017": 0.95, // Boudry
  "2300": 0.85, // La Chaux-de-Fonds
  "2400": 0.80, // Le Locle

  // ═══ GENF (GE) ═══
  "1223": 1.70, // Cologny
  "1245": 1.55, // Collonge-Bellerive
  "1222": 1.45, // Vésenaz
  "1224": 1.45, // Chêne-Bougeries
  "1208": 1.35, "1207": 1.32, "1206": 1.32, "1201": 1.35, "1204": 1.30, // Genève centre
  "1227": 1.30, // Carouge
  "1205": 1.25, "1202": 1.20, "1203": 1.10, "1209": 1.15, // Genève
  "1290": 1.20, // Versoix
  "1234": 1.18, // Vessy
  "1218": 1.15, // Grand-Saconnex
  "1228": 1.15, // Plan-les-Ouates
  "1212": 1.10, // Grand-Lancy
  "1219": 1.05, // Châtelaine

  // ═══ JURA (JU) ═══
  "2800": 1.05, // Delémont
  "2900": 1.00, // Porrentruy
  "2350": 0.90, // Saignelégier
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

export type Property = {
  id: string;
  ref: string;
  type: "apartment" | "house" | "commercial" | "land";
  deal: "buy" | "rent";
  rooms: number;
  area: number;
  price: number; // CHF (sale price or monthly rent)
  city: string;
  zip: string;
  image: string;
  title: { de: string; en: string; fr: string; it: string };
  desc: { de: string; en: string; fr: string; it: string };
};

export const properties: Property[] = [
  {
    id: "1",
    ref: "LI-2401",
    type: "apartment",
    deal: "buy",
    rooms: 4.5,
    area: 132,
    price: 1290000,
    city: "Goldau",
    zip: "6410",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    title: {
      de: "Grosszügige 4.5-Zimmer-Wohnung mit Bergsicht",
      en: "Spacious 4.5-room apartment with mountain view",
      fr: "Vaste appartement 4,5 pièces avec vue sur les montagnes",
      it: "Ampio appartamento di 4.5 locali con vista sulle montagne",
    },
    desc: {
      de: "Neuwertige Eigentumswohnung in ruhiger Hanglage, mit grossem Balkon und unverbaubarer Aussicht auf den Rigi-Kulm.",
      en: "As-new condominium on a quiet hillside, with a large balcony and unobstructed view of the Rigi.",
      fr: "Appartement comme neuf en coteau calme, grand balcon et vue dégagée sur le Rigi.",
      it: "Appartamento come nuovo in tranquilla posizione collinare, ampio balcone e vista libera sul Rigi.",
    },
  },
  {
    id: "2",
    ref: "LI-2402",
    type: "house",
    deal: "buy",
    rooms: 6.5,
    area: 220,
    price: 2450000,
    city: "Arth",
    zip: "6415",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80",
    title: {
      de: "Einfamilienhaus am Zugersee",
      en: "Family home by Lake Zug",
      fr: "Maison familiale au bord du lac de Zoug",
      it: "Villa unifamiliare sul Lago di Zugo",
    },
    desc: {
      de: "Architektonisch klares Einfamilienhaus mit Seezugang, eigenem Bootsplatz und parkähnlichem Garten.",
      en: "Architecturally clear family home with lake access, private boat berth and park-like garden.",
      fr: "Maison à l'architecture épurée avec accès au lac, place d'amarrage et jardin arboré.",
      it: "Casa unifamiliare dall'architettura sobria con accesso al lago, posto barca e giardino curato.",
    },
  },
  {
    id: "3",
    ref: "LI-2403",
    type: "apartment",
    deal: "rent",
    rooms: 3.5,
    area: 92,
    price: 2480,
    city: "Schwyz",
    zip: "6430",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
    title: {
      de: "Helle 3.5-Zimmer-Stadtwohnung",
      en: "Bright 3.5-room city apartment",
      fr: "Appartement urbain lumineux 3,5 pièces",
      it: "Luminoso appartamento urbano di 3.5 locali",
    },
    desc: {
      de: "Moderne Mietwohnung im Zentrum von Schwyz, mit Loggia und gehobenem Innenausbau.",
      en: "Modern rental in the centre of Schwyz, with loggia and refined interior.",
      fr: "Location moderne au centre de Schwyz, avec loggia et finitions soignées.",
      it: "Affitto moderno nel centro di Svitto, con loggia e finiture raffinate.",
    },
  },
  {
    id: "4",
    ref: "LI-2404",
    type: "house",
    deal: "buy",
    rooms: 5.5,
    area: 178,
    price: 1690000,
    city: "Lauerz",
    zip: "6424",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80",
    title: {
      de: "Charmantes Riegelhaus mit Seeblick",
      en: "Charming half-timbered house with lake view",
      fr: "Charmante maison à colombages avec vue sur le lac",
      it: "Casa a graticcio con vista lago",
    },
    desc: {
      de: "Sorgsam renoviertes Riegelhaus aus dem 19. Jahrhundert, mit Cheminée und gepflegtem Umschwung.",
      en: "Carefully renovated 19th-century half-timbered house, with fireplace and well-kept grounds.",
      fr: "Maison à colombages du XIXᵉ rénovée avec soin, cheminée et jardin entretenu.",
      it: "Casa a graticcio dell'Ottocento ristrutturata con cura, camino e giardino curato.",
    },
  },
  {
    id: "5",
    ref: "LI-2405",
    type: "commercial",
    deal: "rent",
    rooms: 4,
    area: 165,
    price: 3950,
    city: "Goldau",
    zip: "6410",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    title: {
      de: "Repräsentative Büroflächen im Zentrum",
      en: "Representative office space in the centre",
      fr: "Bureaux de représentation au centre",
      it: "Uffici di rappresentanza in centro",
    },
    desc: {
      de: "Helle Bürofläche mit Empfang, vier Sitzungszimmern und drei Parkplätzen direkt am Bahnhof.",
      en: "Bright office space with reception, four meeting rooms and three parking spaces near the station.",
      fr: "Bureaux lumineux avec accueil, quatre salles de réunion et trois places de parc près de la gare.",
      it: "Ufficio luminoso con reception, quattro sale riunioni e tre posteggi vicino alla stazione.",
    },
  },
  {
    id: "6",
    ref: "LI-2406",
    type: "land",
    deal: "buy",
    rooms: 0,
    area: 980,
    price: 890000,
    city: "Steinen",
    zip: "6422",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
    title: {
      de: "Bauland in sonniger Hanglage",
      en: "Building land on a sunny slope",
      fr: "Terrain à bâtir en coteau ensoleillé",
      it: "Terreno edificabile in collina soleggiata",
    },
    desc: {
      de: "Erschlossenes Bauland mit Bauprojekt für ein Doppeleinfamilienhaus, Aussicht auf die Mythen.",
      en: "Developed building land with planning permission for a semi-detached house, view of the Mythen.",
      fr: "Terrain à bâtir équipé avec projet pour une maison jumelée, vue sur les Mythen.",
      it: "Terreno edificabile urbanizzato con progetto per bifamiliare, vista sui Mythen.",
    },
  },
];

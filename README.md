# L'Immobilien GmbH — Webseite

Mehrsprachige (DE / EN / FR / IT) Webseite für die L'Immobilien GmbH in Goldau, gebaut mit **Next.js 15 App Router**, **React 19** und **Tailwind CSS**.

## Setup

```bash
npm install
npm run dev
```

Die Seite läuft unter http://localhost:3000 und leitet automatisch auf `/de` weiter.

## Struktur

- `src/app/[locale]/` — alle Seiten pro Sprache (Start, Kaufen, Verkaufen, Bewirtschaftung, Angebote, Bewertung, Über uns, Kontakt)
- `src/i18n/dictionaries/` — Übersetzungen
- `src/components/` — Header, Footer, Sprachumschalter, PropertyCard, Suche, Bewertungsrechner, Kontaktformular, Cookie-Banner
- `src/data/properties.ts` — Beispiel-Immobilien (austauschbar)

## Sprachen

`/de` (Standard), `/en`, `/fr`, `/it`. Sprachumschalter rechts oben.

## Funktionen

- Immobiliensuche mit Filter (Objektart, Angebot, Zimmer, max. Preis)
- Online-Bewertungsrechner (Schätzung mit Fläche, Zustand, Lage etc.)
- Kontaktformular mit DSGVO-Einwilligung
- Cookie-Banner

## Anpassen

- **Texte**: `src/i18n/dictionaries/{de,en,fr,it}.ts`
- **Immobilien**: `src/data/properties.ts`
- **Farben & Schrift**: `tailwind.config.mjs` und `src/app/globals.css`
- **Logo / Brand**: aktuell als Schriftzug — Logo-Datei kann in `src/components/Header.tsx` ergänzt werden

## Build

```bash
npm run build
npm start
```

Das Projekt ist bereit für Deployment auf Vercel, Netlify oder jedem Node-Host.

export const locales = ["de", "en", "fr", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

import de from "./dictionaries/de";
import en from "./dictionaries/en";
import fr from "./dictionaries/fr";
import it from "./dictionaries/it";

export const dictionaries = { de, en, fr, it };
export type Dictionary = typeof de;

export function getDict(locale: string): Dictionary {
  return (dictionaries as Record<string, Dictionary>)[locale] ?? de;
}

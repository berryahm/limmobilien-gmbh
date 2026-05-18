import { getDict, type Locale } from "@/i18n";

export async function loadLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  return { locale: locale as Locale, dict: getDict(locale) };
}

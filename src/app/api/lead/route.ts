import { NextResponse } from "next/server";
import { Resend } from "resend";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  valuation: {
    type: "apartment" | "house";
    areaM2: number;
    rooms: number;
    yearBuilt: number;
    condition: "new" | "good" | "renovate";
    microLocation: "prime" | "good" | "standard";
    canton: string;
    zip: string;
  };
  result: {
    value: number;
    low: number;
    high: number;
    pricePerM2: number;
    source: "pricehubble" | "hedonic";
  };
};

const fmt = (n: number) => new Intl.NumberFormat("de-CH", { maximumFractionDigits: 0 }).format(n);

const labelType = (t: string) => (t === "apartment" ? "Wohnung" : "Haus");
const labelCondition = (c: string) =>
  c === "new" ? "Neuwertig" : c === "good" ? "Gepflegt" : "Renovationsbedarf";
const labelLocation = (l: string) =>
  l === "prime" ? "Top-Lage" : l === "good" ? "Gute Lage" : "Standard";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY ist nicht gesetzt");
      return NextResponse.json({ error: "Mail-Service nicht konfiguriert" }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const data = (await req.json()) as LeadPayload;
    const { name, email, phone, message, valuation: v, result: r } = data;

    if (!name || !email || !v || !r) {
      return NextResponse.json({ error: "Fehlende Pflichtfelder" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Bewertungsanfrage <kontakt@limmobilien-gmbh.ch>",
      to: "info@limmobilien-gmbh.ch",
      replyTo: email,
      subject: `Neue Bewertungsanfrage – ${labelType(v.type)} ${v.zip} · CHF ${fmt(r.value)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto; color: #2a1610;">
          <div style="background: #2a1610; padding: 24px 32px;">
            <p style="color: #c49e57; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 8px;">L'Immobilien GmbH</p>
            <h2 style="color: #faf3e8; margin: 0; font-size: 22px;">Neue Bewertungsanfrage</h2>
          </div>

          <div style="background: #faf3e8; padding: 32px; border: 1px solid #c49e57; border-top: none;">
            <p style="color: #714928; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">Geschätzter Marktwert</p>
            <p style="font-size: 28px; margin: 0 0 4px; color: #2a1610;"><strong>CHF ${fmt(r.value)}</strong></p>
            <p style="font-size: 13px; color: #714928; margin: 0 0 24px;">Spanne: CHF ${fmt(r.low)} – CHF ${fmt(r.high)} · ≈ CHF ${fmt(r.pricePerM2)} / m² · Quelle: ${r.source}</p>

            <p style="color: #714928; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin: 24px 0 8px;">Kontakt</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722; width: 140px; color: #714928;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722;"><strong>${name}</strong></td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722; color: #714928;">E-Mail</td><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722;"><a href="mailto:${email}" style="color: #c49e57;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722; color: #714928;">Telefon</td><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722;"><a href="tel:${phone}" style="color: #c49e57;">${phone}</a></td></tr>` : ""}
            </table>

            <p style="color: #714928; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin: 24px 0 8px;">Objektangaben</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722; width: 140px; color: #714928;">Objektart</td><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722;">${labelType(v.type)}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722; color: #714928;">PLZ / Kanton</td><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722;">${v.zip} · ${v.canton}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722; color: #714928;">Wohnfläche</td><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722;">${v.areaM2} m²</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722; color: #714928;">Zimmer</td><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722;">${v.rooms}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722; color: #714928;">Baujahr</td><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722;">${v.yearBuilt}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722; color: #714928;">Zustand</td><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722;">${labelCondition(v.condition)}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722; color: #714928;">Mikrolage</td><td style="padding: 8px 0; border-bottom: 1px solid #c49e5722;">${labelLocation(v.microLocation)}</td></tr>
            </table>

            ${message ? `<p style="color: #714928; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin: 24px 0 8px;">Nachricht</p><p style="white-space: pre-wrap; line-height: 1.7; margin: 0;">${message}</p>` : ""}
          </div>

          <div style="background: #2a1610; padding: 16px 32px; text-align: center;">
            <p style="color: #c49e57; font-size: 11px; margin: 0;">L'Immobilien GmbH · Im Blumenweg 10 · 6410 Goldau</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead route error:", err);
    return NextResponse.json({ error: "Versand fehlgeschlagen" }, { status: 500 });
  }
}

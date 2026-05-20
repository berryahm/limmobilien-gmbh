import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json() as {
      name: string;
      email: string;
      phone?: string;
      subject?: string;
      message: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Fehlende Pflichtfelder" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Kontaktformular <kontakt@limmobilien-gmbh.ch>",
      to: "info@limmobilien-gmbh.ch",
      replyTo: email,
      subject: subject ? `Anfrage: ${subject}` : `Neue Kontaktanfrage von ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #3a170b;">
          <div style="background: #3a170b; padding: 24px 32px; margin-bottom: 0;">
            <p style="color: #c49e57; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 8px;">L'Immobilien GmbH</p>
            <h2 style="color: #faf3e8; margin: 0; font-size: 22px;">Neue Kontaktanfrage</h2>
          </div>
          <div style="background: #faf3e8; padding: 32px; border: 1px solid #c49e57;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #c49e5722; color: #714928; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; width: 120px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #c49e5722; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #c49e5722; color: #714928; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">E-Mail</td><td style="padding: 10px 0; border-bottom: 1px solid #c49e5722;"><a href="mailto:${email}" style="color: #c49e57;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #c49e5722; color: #714928; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Telefon</td><td style="padding: 10px 0; border-bottom: 1px solid #c49e5722;">${phone}</td></tr>` : ""}
              ${subject ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #c49e5722; color: #714928; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Betreff</td><td style="padding: 10px 0; border-bottom: 1px solid #c49e5722;">${subject}</td></tr>` : ""}
            </table>
            <div style="margin-top: 24px;">
              <p style="color: #714928; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">Nachricht</p>
              <p style="white-space: pre-wrap; line-height: 1.7; margin: 0;">${message}</p>
            </div>
          </div>
          <div style="background: #3a170b; padding: 16px 32px; text-align: center;">
            <p style="color: #c49e57; font-size: 11px; margin: 0;">L'Immobilien GmbH · Im Blumenweg 10 · 6410 Goldau</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Versand fehlgeschlagen" }, { status: 500 });
  }
}

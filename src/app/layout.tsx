import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "L'Immobilien GmbH",
  description: "Immobilien Kaufen, Verkaufen und Bewirtschaftung in Goldau und der Zentralschweiz.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

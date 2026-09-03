import type { Metadata, Viewport } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nomiya-neuilly.fr"),
  title: {
    default: "Nomiya · Restaurant japonais à Neuilly-sur-Seine",
    template: "%s · Nomiya",
  },
  description:
    "Un comptoir de quartier où le poisson est tranché à la commande, les brochettes passent sur le charbon et l'on vous reconnaît à la deuxième visite. 211 bis avenue Charles de Gaulle, Neuilly-sur-Seine.",
  openGraph: {
    title: "Nomiya · Restaurant japonais à Neuilly-sur-Seine",
    description:
      "Sur place, à emporter ou en livraison. Réservation au 01 46 37 49 02.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#171310",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}

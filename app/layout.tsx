import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: "Pomar — Feira Virtual de Ivoti",
  description:
    "Marketplace hiperlocal que conecta produtores familiares de Ivoti diretamente aos moradores da região. Verduras, frutas, flores e produtos coloniais frescos, direto do produtor.",
  keywords: [
    "Ivoti",
    "produtores locais",
    "hortifruti",
    "feira colonial",
    "marketplace",
  ],
  openGraph: {
    title: "Pomar — Feira Virtual de Ivoti",
    description:
      "Compre de produtores locais de Ivoti com mais confiança, proximidade e frescor.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}

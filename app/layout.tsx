import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pomar",
  description:
    "Marketplace hiperlocal para conectar produtores locais e consumidores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

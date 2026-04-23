import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Energisa | Futuro em Energia",
  description:
    "De Norte a Sul. Quando uma luz acende, a Energisa está por trás. Presente em mais de 800 municípios.",
  keywords: [
    "energia elétrica",
    "renovável",
    "sustentável",
    "800 municípios",
    "Energisa",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={sora.variable}>
      <body>{children}</body>
    </html>
  );
}

// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Outfit, Lora } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://segurosconmaritza.com"),
  title: {
    default: "Seguros con Maritza | Asesoría en seguros en Colombia",
    template: "%s | Seguros con Maritza",
  },
  description:
    "Asesoría en seguros de vida, salud, autos, hogar y pólizas educativas. Más de 40 años de experiencia acompañando familias colombianas.",
  openGraph: {
    type: "website",
    title: "Seguros con Maritza",
    description:
      "Protección y asesoría en seguros de vida, salud, hogar y más.",
    url: "https://segurosconmaritza.com",
    siteName: "Seguros con Maritza",
    locale: "es_CO",
    images: [
      {
        url: "/src/familia.webp", // ya existe en tu /public
        width: 1200,
        height: 630,
        alt: "Familia protegida con Seguros con Maritza",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${outfit.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}

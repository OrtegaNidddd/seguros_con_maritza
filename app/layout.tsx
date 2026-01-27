// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Outfit, Lora } from "next/font/google";
import { AOSInit } from "@/components/AOSInit";

export const metadata: Metadata = {
  metadataBase: new URL("https://segurosconmaritza.com"),
  title: {
    default: "Seguros con Maritza | Asesoría de seguros en Cúcuta",
    template: "%s | Seguros con Maritza",
  },
  description:
    "Asesoría integral en seguros en Cúcuta con Maritza Cañas: pólizas de vida y salud, autos, hogar, pólizas educativas y acompañamiento financiero básico en Norte de Santander.",
  openGraph: {
    type: "website",
    title: "Seguros con Maritza | Seguros en Cúcuta",
    description:
      "Protección y asesoría de seguros en Cúcuta para familias y empresas: vida, salud, autos, hogar y pólizas educativas.",
    url: "https://segurosconmaritza.com",
    siteName: "Seguros con Maritza",
    locale: "es_CO",
    images: [
      {
        url: "/src/familia.webp", // ya existe en tu /public
        width: 1200,
        height: 630,
        alt: "Familia protegida por póliza de seguros en Cúcuta",
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Seguros con Maritza",
  description:
    "Asesoría de seguros en Cúcuta y Norte de Santander: pólizas de vida, salud, autos, hogar, pólizas educativas y asesoría financiera básica con Maritza Cañas.",
  url: "https://segurosconmaritza.com",
  telephone: "+57 315 318 3896",
  areaServed: ["Cúcuta", "Norte de Santander"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cúcuta",
    addressRegion: "Norte de Santander",
    addressCountry: "CO",
  },
  image: "https://segurosconmaritza.com/src/foto_maritza.webp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${outfit.variable} ${lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0CY412WJBF"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0CY412WJBF');
            `,
          }}
        />

      </head>
      <body>
        <AOSInit />
        {children}
      </body>
    </html>
  );
}

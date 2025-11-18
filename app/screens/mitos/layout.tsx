// app/screens/mitos/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitos y Verdades de los Seguros",
  description:
    "Descubre los mitos y verdades más comunes sobre los seguros de vida, salud, autos y hogar. Aclara dudas y evita errores al elegir tu póliza.",
};

export default function MitosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

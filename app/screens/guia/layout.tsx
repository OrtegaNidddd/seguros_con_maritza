// app/screens/guia/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guía Completa de Seguros",
  description:
    "Aprende lo esencial para escoger la mejor póliza: tipos de seguros, coberturas, beneficios y recomendaciones prácticas para proteger a tu familia.",
};

export default function GuiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

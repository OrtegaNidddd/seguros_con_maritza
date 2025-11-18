// app/screens/glosario/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glosario de seguros",
  description:
    "Glosario claro y sencillo para entender términos de seguros de vida, salud, autos, hogar y más.",
};

export default function GlosarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

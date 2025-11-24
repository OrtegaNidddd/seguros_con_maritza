import type { Metadata } from "next"
import GlossaryPageClient from "./GlossaryPageClient"

export const metadata: Metadata = {
  title: "Glosario de seguros en Cúcuta | Seguros con Maritza",
  description:
    "Glosario de seguros en Cúcuta con definiciones claras para pólizas de vida y salud, autos, hogar y pólizas educativas. Aprende con Maritza Cañas y toma decisiones informadas en Norte de Santander.",
}

export default function GlossaryPage() {
  return <GlossaryPageClient />
}

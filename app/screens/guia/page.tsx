import type { Metadata } from "next"
import GuidePageClient from "./GuidePageClient"

export const metadata: Metadata = {
  title: "Guía de seguros en Cúcuta | Seguros con Maritza",
  description:
    "Guía práctica para familias y empresas en Cúcuta y Norte de Santander: cómo elegir pólizas de vida y salud, autos, hogar y pólizas educativas con la asesora Maritza Cañas.",
}

export default function GuidePage() {
  return <GuidePageClient />
}

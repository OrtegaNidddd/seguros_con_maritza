import type { Metadata } from "next"
import HomePageClient from "@/components/HomePageClient"
import { getContent } from "@/lib/content"

export const metadata: Metadata = {
  title: "Seguros en Cúcuta | Seguros con Maritza",
  description:
    "Asesoría de seguros en Cúcuta y Norte de Santander con Maritza Cañas: pólizas de vida y salud, autos, hogar y pólizas educativas, más acompañamiento financiero básico para tu familia.",
}

export const revalidate = 0

export default async function HomePage() {
  const content = await getContent()
  return <HomePageClient content={content} />
}

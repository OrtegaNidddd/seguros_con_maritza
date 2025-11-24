import type { Metadata } from "next"
import MitosPageClient from "./MitosPageClient"

export const metadata: Metadata = {
  title: "Mitos de seguros en Cúcuta | Seguros con Maritza",
  description:
    "Desmiente mitos de seguros en Cúcuta con Maritza Cañas: pólizas de vida y salud, autos, hogar, pólizas educativas y finanzas personales para familias de Norte de Santander.",
}

export default function MitosPage() {
  return <MitosPageClient />
}

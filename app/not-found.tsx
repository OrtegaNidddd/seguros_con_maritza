import Link from "next/link"
import { ArrowLeft, Home, Phone } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-linear-to-br from-primary/5 via-background to-accent/5 text-foreground flex items-center">
      <div className="w-11/12 max-w-5xl mx-auto py-16 md:py-24">
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-10 md:p-14">
          <p className="text-sm font-semibold text-accent mb-2">Error 404</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">No encontramos esta página</h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
            Puede que el enlace haya cambiado o que la página ya no exista. Volvamos al inicio o contáctame si
            necesitas ayuda con tus seguros.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:translate-y-px transition"
            >
              <Home className="w-5 h-5" />
              Ir al inicio
            </Link>

            <Link
              href="https://wa.me/573153183896?text=Hola%20Maritza%2C%20%C2%BFc%C3%B3mo%20est%C3%A1s%3F%20Quisiera%20saber%20m%C3%A1s%20sobre%20tus%20servicios."
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border text-foreground hover:border-primary hover:text-primary transition"
            >
              <Phone className="w-5 h-5" />
              Contáctame
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver atrás
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

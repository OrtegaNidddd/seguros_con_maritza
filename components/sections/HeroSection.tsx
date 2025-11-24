import type React from "react"

type HeroSectionProps = {
  email: string
  onEmailChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isSending: boolean
  message: string | null
}

export function HeroSection({ email, onEmailChange, onSubmit, isSending, message }: HeroSectionProps) {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="space-y-6">
            <div className="inline-block bg-accent/10 px-4 py-2 rounded-full">
              <p className="text-sm font-medium text-accent">
                40 años de experiencia certificada en seguros
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-pretty">
              Seguros en Cúcuta para proteger a tu familia
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Soy Maritza Cañas, tu <span className="font-semibold">Brújula Financiera</span> hacia un futuro seguro.
              <br />
              Acompaño a familias y emprendedores en Cúcuta y Norte de Santander a proteger lo que más aman con 
              seguros de vida, salud, autos, hogar y educación diseñados a su medida.
              <br />
              <strong>Mi misión:</strong> darte tranquilidad, claridad y un acompañamiento cercano para que tus decisiones
              financieras cuiden hoy y mañana el bienestar de tu familia.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 pt-4" aria-live="polite">
              <label htmlFor="hero-email" className="sr-only">
                Correo electrónico para que pueda contactarte
              </label>

              <input
                id="hero-email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />

              <button
                type="submit"
                disabled={isSending}
                className="px-6 py-3 bg-linear-to-r from-primary to-accent rounded-lg text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/25 transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? "Enviando..." : "¡Hablemos!"}
              </button>
            </form>

            {message && <p className="text-sm text-muted-foreground">{message}</p>}
          </div>

          {/* Imagen */}
          <div className="relative sm:h-80 md:h-96 block">
            <img
              src="/src/familia.webp"
              alt="Familia protegida con seguros de vida, salud, autos y hogar en Cúcuta"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
import { CheckCircle2 } from "lucide-react"

export function AboutSection() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Sobre mí</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Soy <span className="font-semibold text-primary">Maritza Cañas</span>, asesora integral de seguros certificada con{" "}
                <span className="font-semibold">30 años de experiencia.</span>
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Mi formación:</h3>
              <ul className="space-y-2 text-muted-foreground">
                {[
                  "Técnico en Seguros (Venezuela)",
                  "Diplomado en Estrategia y Planeación Comercial - UNAB",
                  "Mercadeo Digital - Virtual Liberty Seguros",
                  "Programa Expertos en Vida y Fianzas - UNAB",
                  "Habilidades Comerciales para Expertos en Seguros - UNAB",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Mi experiencia:</h3>
              <p className="text-muted-foreground">
                Como asesora independiente, he ayudado a cientos de familias a proteger su futuro. Además, soy creadora y promotora del programa de salud mental{" "}
                <span className="font-semibold">SAMI SALUD</span>, demostrando mi compromiso con el bienestar integral.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-foreground font-semibold">Maritza Cañas</p>
                  <p className="text-sm text-muted-foreground">Asesora Certificada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

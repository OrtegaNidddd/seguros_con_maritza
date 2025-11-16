import { BookOpen, Zap, Calculator, Shield } from "lucide-react"

const educationalResources = [
  { icon: BookOpen, title: "Glosario de Seguros", desc: "Aprende los términos clave" },
  { icon: Zap, title: "Mitos Desmentidos", desc: "Verdades sobre seguros" },
  { icon: Calculator, title: "Calculadoras", desc: "Calcula tus necesidades" },
  { icon: Shield, title: "Guía Completa", desc: "Todo lo que necesitas saber" },
]

export function EducationalSection() {
  return (
    <section id="educacion" className="py-16 md:py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Empieza por entender, luego protege</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Estoy aquí para ayudarte a tomar decisiones seguras e informadas</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {educationalResources.map((item) => (
            <div key={item.title} className="group p-6 bg-background rounded-xl border border-border hover:border-primary hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

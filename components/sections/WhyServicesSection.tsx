import { Heart, Shield, Zap, CheckCircle2, BookOpen, Star } from "lucide-react"

const reasons = [
  { icon: Heart, title: "Atención Personalizada", desc: "Te conoceré personalmente y entenderé tus necesidades específicas" },
  { icon: Shield, title: "Experiencia Certificada", desc: "40 años de experiencia respaldan cada recomendación que te hago" },
  { icon: Zap, title: "Asesoría Integral", desc: "Ofrezco soluciones completas adaptadas a tu situación financiera" },
  { icon: CheckCircle2, title: "Transparencia Total", desc: "Sin sorpresas, todo claro desde el inicio del proceso" },
  { icon: BookOpen, title: "Educación Financiera", desc: "Te enseño a entender tus pólizas y tomar decisiones informadas" },
  { icon: Star, title: "Seguimiento Continuo", desc: "Estoy aquí para ti, no solo para vender, sino para acompañarte" },
]

export function WhyServicesSection() {
  return (
    <section className="py-12">
      <div className="w-11/12 mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">¿Por qué elegir mis servicios?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Yo personalmente te asesoraré en cada paso del camino</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <div key={item.title} className="p-6 bg-background rounded-xl border border-border hover:border-primary hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
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

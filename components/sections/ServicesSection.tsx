import { ChevronRight, GraduationCap, HeartPulse, Stethoscope, AlertTriangle, Building2, CarFront, PiggyBank, HomeIcon } from "lucide-react"

const services = [
  { icon: GraduationCap, title: "Pólizas Educativas", desc: "Soluciones educativas que garantizan el pago de la matrícula universitaria", color: "from-cyan-100 to-cyan-200", textColor: "text-cyan-600", borderColor: "border-cyan-600", featured: false },
  { icon: HeartPulse, title: "Seguros de Vida", desc: "Proteges el bienestar de toda la familia", color: "from-pink-200 to-pink-300", textColor: "text-pink-800", borderColor: "border-pink-800", featured: false },
  { icon: Stethoscope, title: "Seguros de Salud", desc: "Cobertura médica ilimitada para tu tranquilidad y bienestar", color: "from-red-200 to-red-300", textColor: "text-red-800", borderColor: "border-red-800", featured: false },
  { icon: AlertTriangle, title: "Accidentes Personales", desc: "Respaldo ante un accidente y proteges estabilidad económica", color: "from-fuchsia-200 to-fuchsia-300", textColor: "text-fuchsia-800", borderColor: "border-fuchsia-800", featured: false },
  { icon: Building2, title: "Seguros PYME", desc: "Protege tu patrimonio", color: "from-green-100 to-green-200", textColor: "text-green-800", borderColor: "border-green-800", featured: false },
  { icon: CarFront, title: "Seguros de Autos", desc: "Cobertura todo riesgo", color: "from-blue-100 to-blue-200", textColor: "text-blue-800", borderColor: "border-blue-800", featured: false },
  { icon: PiggyBank, title: "Pensión Voluntaria", desc: "Aseguras una pensión cierta para disfrutar en tu vejez", color: "from-amber-300 via-yellow-400 to-amber-600", textColor: "text-black", borderColor: "border-amber-400", featured: true },
  { icon: HomeIcon, title: "Seguros de Hogar", desc: "Cubre tu vivienda", color: "from-emerald-100 to-emerald-200", textColor: "text-emerald-800", borderColor: "border-emerald-800", featured: false },
]

export function ServicesSection() {
  return (
    <section id="servicios" className="py-12">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Mis servicios</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Te ofrezco soluciones de seguros integrales adaptadas a tus necesidades
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden rounded-xl border-2 ${service.borderColor ?? "border-border"} transition-all duration-300 ease-out cursor-pointer h-54 w-11/12 mx-auto flex flex-col justify-between p-5 hover:-translate-y-2 hover:shadow-2xl ${service.featured ? "bg-linear-to-br from-yellow-200/80 to-amber-300/80" : "bg-linear-to-br " + service.color}`}
            >
              <div className={`absolute inset-0 ${service.featured ? "bg-white/20" : "bg-black/10"} group-hover:${service.featured ? "bg-white/30" : "bg-black/5"} transition pointer-events-none`} />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-10 h-10 mb-4 rounded-lg bg-white/25 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/40">
                    <service.icon className={`w-6 h-6 ${service.textColor}`} />
                  </div>
                  <h3 className={`font-semibold text-xl mb-2 ${service.textColor}`}>{service.title}</h3>
                  <p className={`text-base ${service.textColor} opacity-90`}>{service.desc}</p>
                </div>
                <div className={`flex items-center gap-2 text-base ${service.textColor} opacity-80 group-hover:opacity-100 transition`}>
                  <span className="font-semibold">Conocer más</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


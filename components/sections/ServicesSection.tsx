import { ChevronRight, GraduationCap, HeartPulse, Stethoscope, AlertTriangle, Building2, CarFront, PiggyBank, HomeIcon } from "lucide-react"
import type { SiteContent } from "@/lib/content"

const iconMap = {
  graduation: GraduationCap,
  heartPulse: HeartPulse,
  stethoscope: Stethoscope,
  alert: AlertTriangle,
  building: Building2,
  car: CarFront,
  piggy: PiggyBank,
  home: HomeIcon,
} as const

type ServicesSectionProps = {
  content: SiteContent["services"]
}

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section id="servicios" className="py-12" data-aos="fade-up">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {content.items.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? GraduationCap
            return (
            <div
              key={service.title}
              style={{
                background: `linear-gradient(to bottom right, ${service.bgColorStart}, ${service.bgColorEnd})`,
                borderColor: service.borderColor,
              }}
              className="group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ease-out cursor-pointer h-54 w-11/12 mx-auto flex flex-col justify-between p-5 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`absolute inset-0 ${service.featured ? "bg-white/20" : "bg-black/10"} group-hover:${service.featured ? "bg-white/30" : "bg-black/5"} transition pointer-events-none`} />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-10 h-10 mb-4 rounded-lg bg-white/25 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/40">
                    <Icon className="w-6 h-6" style={{ color: service.textColor }} />
                  </div>
                  <h3 className="font-semibold text-xl mb-2" style={{ color: service.textColor }}>{service.title}</h3>
                  <p className="text-base opacity-90" style={{ color: service.textColor }}>{service.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-base opacity-80 group-hover:opacity-100 transition" style={{ color: service.textColor }}>
                  <span className="font-semibold">Conocer más</span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


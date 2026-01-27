import { Heart, Shield, Zap, CheckCircle2, BookOpen, Star } from "lucide-react"
import type { SiteContent } from "@/lib/content"

const iconMap = {
  heart: Heart,
  shield: Shield,
  zap: Zap,
  check: CheckCircle2,
  book: BookOpen,
  star: Star,
} as const

type WhyServicesSectionProps = {
  content: SiteContent["reasons"]
}

export function WhyServicesSection({ content }: WhyServicesSectionProps) {
  return (
    <section className="py-12" data-aos="fade-up">
      <div className="w-11/12 mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {content.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Heart
            return (
            <div key={item.title} className="p-6 bg-background rounded-xl border border-border hover:border-primary hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

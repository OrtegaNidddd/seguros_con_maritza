import Link from "next/link"
import { BookOpen, Zap, Calculator, Shield } from "lucide-react"
import type { SiteContent } from "@/lib/content"

const iconMap = {
  book: BookOpen,
  zap: Zap,
  calculator: Calculator,
  shield: Shield,
} as const

type EducationalSectionProps = {
  content: SiteContent["educational"]
}

export function EducationalSection({ content }: EducationalSectionProps) {
  return (
    <section id="educacion" className="py-12 bg-card/50" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {content.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? BookOpen
            const CardContent = (
              <>
                <div className="w-12 h-12 rounded-lg bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </>
            )

            if (item.href) {
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block p-6 bg-background rounded-xl border border-border hover:border-primary hover:shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {CardContent}
                </Link>
              )
            }

            return (
              <div
                key={item.title}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary hover:shadow-lg transition"
              >
                {CardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

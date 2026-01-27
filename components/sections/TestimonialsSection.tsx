import { Star } from "lucide-react"
import type { SiteContent } from "@/lib/content"

type TestimonialsSectionProps = {
  content: SiteContent["testimonials"]
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  return (
    <section id="testimonios" className="py-12 bg-card/50" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{content.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{content.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {content.items.map((testimonial) => (
            <div key={testimonial.name} className="p-6 bg-background rounded-xl border border-border hover:shadow-lg transition">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4 italic">"{testimonial.message}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

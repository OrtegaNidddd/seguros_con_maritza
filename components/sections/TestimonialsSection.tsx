import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Carlos Méndez",
    role: "Padre de familia",
    message: "Maritza me explicó todo de manera clara. Ahora duermo tranquilo sabiendo que mi familia está protegida.",
    rating: 5,
  },
  {
    name: "Laura Rodríguez",
    role: "Emprendedora",
    message: "Excelente profesional. Me ayudó a encontrar exactamente lo que necesitaba para mis hijos.",
    rating: 5,
  },
  {
    name: "Juan Pérez",
    role: "Ejecutivo",
    message: "40 años de experiencia se notan. Recomiendo a Maritza sin dudarlo.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-12 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Lo que mis clientes dicen</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Testimonios reales de familias que protegieron su futuro</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
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

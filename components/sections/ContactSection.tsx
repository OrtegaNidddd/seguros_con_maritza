import type React from "react"
import { Shield, CheckCircle2, Heart, Mail, Phone, MapPin } from "lucide-react"

export type ContactFormValues = {
  nombreCompleto: string
  correo: string
  celular: string
  ciudad: string
  edadHijo: string
}

export const CONTACT_FORM_INITIAL_STATE: ContactFormValues = {
  nombreCompleto: "",
  correo: "",
  celular: "",
  ciudad: "",
  edadHijo: "",
}

type ContactSectionProps = {
  formData: ContactFormValues
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isSending: boolean
  message: string | null
}

const highlights = [
  { icon: Shield, title: "¿Por qué una Poliza Educativa?", desc: "Garantiza tu tranquilidad y la de tu familia sin preocuparte de lo que pueda pasar en el futuro." },
  { icon: CheckCircle2, title: "Elige el que se adapte", desc: "Cada póliza está diseñada para diferentes posibilidades financieras y necesidades." },
  { icon: Heart, title: "Regala oportunidades", desc: "Este año brinda a tus hijos la oportunidad de crecer, aprender y seguir soñando." },
]

const COLOMBIA_CITIES = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Bucaramanga",
  "Pereira",
  "Santa Marta",
  "Manizales",
  "Pasto",
  "Villavicencio",
  "Armenia",
  "Ibagué",
  "Cúcuta",
  "Neiva",
]

export function ContactSection({ formData, onChange, onSubmit, isSending, message }: ContactSectionProps) {
  return (
    <section id="contacto" className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">¡Garantiza la educación superior de tus hijos hoy!</h2>
          <p className="text-lg text-muted-foreground mb-4">Respaldada por 30 años de experiencia, mi compromiso es acompañar el bienestar y potenciar el éxito académico de tus hijos.</p>
        </div>

        <div className="bg-background rounded-2xl p-8 border border-border mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {highlights.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 mx-auto">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="space-y-6" aria-live="polite">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Nombre completo</label>
              <input
                type="text"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={onChange}
                placeholder="Tu nombre y apellidos"
                className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={onChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Celular</label>
                <input
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={onChange}
                  placeholder="+57 300 000 0000"
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ciudad</label>
                <select
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={onChange}
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                >
                  <option value="">Selecciona una ciudad</option>
                  {COLOMBIA_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">¿Qué edad tienen tus hijos?</label>
                <input
                  type="text"
                  name="edadHijo"
                  value={formData.edadHijo}
                  onChange={onChange}
                  placeholder="Ej: 17 años"
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg text-xs text-muted-foreground">
              <p>
                Al enviar este formulario, aceptas que me ponga en contacto contigo para brindarte una asesoría personalizada. Tus datos serán tratados con confidencialidad según nuestras políticas de privacidad.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? "Enviando tu solicitud..." : "Ponte en contacto conmigo"}
              </button>
              {message && <p className="text-sm text-muted-foreground">{message}</p>}
            </div>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <Mail className="w-8 h-8 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Correo</p>
            <a href="mailto:maritza@email.com" className="font-semibold text-foreground hover:text-primary transition">
              ejemplo@gmail.com
            </a>
          </div>
          <div className="space-y-2">
            <Phone className="w-8 h-8 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Celular</p>
            <a href="tel:+573001234567" className="font-semibold text-foreground hover:text-primary transition">
              +57 300 123 4567
            </a>
          </div>
          <div className="space-y-2">
            <MapPin className="w-8 h-8 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Ubicación</p>
            <p className="font-semibold text-foreground">Colombia</p>
          </div>
        </div>
      </div>
    </section>
  )
}

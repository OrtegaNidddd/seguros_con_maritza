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
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isSending: boolean
  message: string | null
}

const COLOMBIA_CITIES = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Bucaramanga",
  "Cúcuta",
  "Pereira",
  "Santa Marta",
  "Manizales",
  "Pasto",
  "Villavicencio",
  "Armenia",
  "Ibagué",
  "Neiva",
]

export function ContactSection({ formData, onChange, onSubmit, isSending, message }: ContactSectionProps) {
  return (
    <section id="contacto" className="py-12 bg-linear-to-r from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            ¡Garantiza la educación superior de tus hijos hoy!
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Respaldada por 40 años de experiencia, mi compromiso es acompañar el bienestar y potenciar el
            éxito académico de tus hijos.
          </p>
        </div>

        <div className="bg-background rounded-2xl p-8 border border-border mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Acompañamiento especializado</p>
                <p className="text-xs text-muted-foreground">
                  Te acompaño en cada etapa del proceso, desde la planeación hasta la proyección de metas futuras.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Planes a la medida</p>
                <p className="text-xs text-muted-foreground">
                  Diseñamos un plan educativo personalizado según tu realidad financiera y tus objetivos.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Compromiso real</p>
                <p className="text-xs text-muted-foreground">
                  Más que una póliza, construimos juntos un proyecto de vida para quienes amas.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6" aria-live="polite">
            <div>
              <label htmlFor="nombreCompleto" className="block text-sm font-medium text-foreground mb-2">
                Nombre completo
              </label>
              <input
                id="nombreCompleto"
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
                <label htmlFor="correo" className="block text-sm font-medium text-foreground mb-2">
                  Correo
                </label>
                <input
                  id="correo"
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
                <label htmlFor="celular" className="block text-sm font-medium text-foreground mb-2">
                  Celular
                </label>
                <input
                  id="celular"
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
                <label htmlFor="ciudad" className="block text-sm font-medium text-foreground mb-2">
                  Ciudad
                </label>
                <select
                  id="ciudad"
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
                <label htmlFor="edadHijo" className="block text-sm font-medium text-foreground mb-2">
                  ¿Qué edad tienen tus hijos?
                </label>
                <input
                  id="edadHijo"
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

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 bg-linear-to-r from-primary to-accent rounded-xl text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/25 transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? "Enviando tu solicitud..." : "Ponte en contacto conmigo"}
              </button>
              {message && <p className="text-sm text-muted-foreground mt-2">{message}</p>}
            </div>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <Mail className="w-8 h-8 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Correo</p>
            <a
              href="mailto:maritzcanas@gmail.com"
              className="font-semibold text-foreground hover:text-primary transition"
            >
              maritzcanas@gmail.com
            </a>
          </div>

          <div className="space-y-2">
            <Phone className="w-8 h-8 text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">WhatsApp</p>
            <a
              href="https://wa.me/573153183896?text=Hola%20Maritza%2C%20%C2%BFc%C3%B3mo%20est%C3%A1s%3F%20Quisiera%20saber%20m%C3%A1s%20sobre%20tus%20servicios."
              className="font-semibold text-foreground hover:text-primary transition"
            >
              315 318 3896
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

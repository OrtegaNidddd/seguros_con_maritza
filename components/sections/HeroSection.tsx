import type React from "react"
import type { HeroContent } from "@/lib/content"

type HeroSectionProps = {
  content: HeroContent
  email: string
  onEmailChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isSending: boolean
  message: string | null
  readOnly?: boolean
}

export function HeroSection({ content, email, onEmailChange, onSubmit, isSending, message, readOnly = false }: HeroSectionProps) {
  return (
    <section className="relative py-12 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="space-y-6 max-w-xl" data-aos="fade-right">
            <div className="inline-block bg-accent/10 px-4 py-2 rounded-full">
              <p className="text-sm font-medium text-accent">{content.badge}</p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-pretty">
              {content.title}
            </h1>

            <div className="text-lg text-muted-foreground leading-relaxed space-y-3">
              {content.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 pt-4" aria-live="polite">
              <label htmlFor="hero-email" className="sr-only">
                Correo electrónico para que pueda contactarte
              </label>

              <input
                id="hero-email"
                type="email"
                placeholder={content.emailPlaceholder}
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
                disabled={readOnly}
              />

              <button
                type="submit"
                disabled={isSending || readOnly}
                className="px-6 py-3 bg-linear-to-r from-primary to-accent rounded-lg text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/25 transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? "Enviando..." : content.ctaLabel}
              </button>
            </form>

            {message && <p className="text-sm text-muted-foreground">{message}</p>}
          </div>

          {/* Imagen */}
          <div className="relative sm:h-80 md:h-112 lg:h-128" data-aos="fade-left" data-aos-delay="200">
            <div className={`flex flex-col sm:flex-row gap-4 h-full ${content.images.filter(img => img.src).length === 1 ? 'justify-center' : ''}`}>
              {content.images.filter(img => img.src).map((image, index, filteredImages) => (
                <div 
                  key={image.src} 
                  className="h-full sm:flex-1" 
                  style={{ flex: filteredImages.length === 1 ? '0 1 70%' : (index === 0 ? 0.95 : 1.05) }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

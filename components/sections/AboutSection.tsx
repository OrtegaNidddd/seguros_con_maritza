"use client"

import Image from "next/image"
import { useState } from "react"

export function AboutSection() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section id="sobre" className="px-4 py-10 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid con columna izquierda más ancha */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-stretch">
          
          {/* TEXTO */}
          <div className="flex flex-col justify-between h-full">
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Sobre mí
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Soy{" "}
                <span className="font-semibold text-primary">Maritza Cañas</span>,
                asesora integral de seguros certificada con{" "}
                <span className="font-semibold">40 años de experiencia.</span>
              </p>
            </div>

            <div className="space-y-3 mt-8">
              <h3 className="font-semibold text-foreground text-3xl">Mi experiencia:</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Como asesora independiente, he ayudado a cientos de familias
                a proteger su futuro. Además, soy creadora y promotora del programa
                de salud mental <span className="font-semibold">SAMI SALUD</span>,
                demostrando mi compromiso con el bienestar integral.
              </p>
            </div>
          </div>

          {/* IMAGEN */}
          <div className="flex justify-center">
            <div className="relative max-w-[340px] w-full h-full rounded-3xl overflow-hidden shadow-xl border border-border/60">
              <Image
                src="src/foto_maritza.webp"
                alt="Foto de Maritza Cañas"
                fill
                priority
                unoptimized
                className={`object-cover transition-all duration-700 ease-out
                  ${
                    imageLoaded
                      ? "opacity-100 translate-y-0 blur-0"
                      : "opacity-0 translate-y-3 blur-sm"
                  }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

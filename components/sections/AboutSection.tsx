import Image from "next/image"
import { useState } from "react"
import type { AboutContent } from "@/lib/content"

type AboutSectionProps = {
  content: AboutContent
}

export function AboutSection({ content }: AboutSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <section id="sobre" className="px-4 py-10 bg-card/50" data-aos="fade-up">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid con columna izquierda más ancha */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-stretch">
          {/* TEXTO */}
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">{content.title}</h2>

              <p className="text-xl text-muted-foreground leading-relaxed">{content.subtitle}</p>
            </div>

            <div className="space-y-3 mt-8">
              <h3 className="font-semibold text-foreground text-3xl">Mi experiencia:</h3>
              {content.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* IMAGEN */}
          <div className="flex justify-center">
            <div className="relative max-w-85 w-full h-full rounded-3xl overflow-hidden shadow-xl border border-border/60">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(max-width: 768px) 70vw, 340px"
                className={`object-cover transition-all duration-700 ease-out ${
                  imageLoaded ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-3 blur-sm"
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

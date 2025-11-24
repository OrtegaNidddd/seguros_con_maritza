"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "#sobre", label: "Sobre mí" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#servicios", label: "Servicios" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
]

const educationItems = [
  { href: "/screens/glosario", label: "Glosario" },
  { href: "/screens/mitos", label: "Mitos" },
  { href: "/screens/guia", label: "Guía" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEducationOpen, setIsEducationOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsEducationOpen(false)
  }
  const toggleEducation = () => setIsEducationOpen((prev) => !prev)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-6 group transition">
          <div className="w-32 h-auto rounded-lg flex items-center justify-center">
            <img
              src="/src/logo.webp"
              alt="Logo de Seguros con Maritza, asesora de seguros en Cúcuta"
              className="w-full h-full transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div>
            <p className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Maritza Cañas</p>
            <p className="text-xs text-muted-foreground">Tu Brujula Financiera</p>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition cursor-pointer"
              onClick={toggleEducation}
              aria-expanded={isEducationOpen}
            >
              Educación
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isEducationOpen ? "rotate-180" : ""}`} />
            </button>
            {isEducationOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-xl border border-border bg-background p-3 shadow-lg animate-in fade-in slide-in-from-top-2">
                {educationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition"
                    onClick={() => setIsEducationOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-foreground hover:text-primary transition">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden p-2 rounded-md border border-border text-foreground hover:text-primary hover:border-primary transition relative overflow-hidden"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">{isMenuOpen ? "Cerrar menú" : "Abrir menú"}</span>
          <div className="flex flex-col justify-center items-center gap-1.5">
            <span className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-200 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            <div className="space-y-2">
              <button
                type="button"
                className="w-full flex items-center justify-between text-sm font-medium text-foreground hover:text-primary transition"
                onClick={toggleEducation}
                aria-expanded={isEducationOpen}
              >
                Educación
                <ChevronDown className={`w-4 h-4 transition-transform ${isEducationOpen ? "rotate-180" : ""}`} />
              </button>
              {isEducationOpen && (
                <div className="pl-4 flex flex-col gap-2 border-l border-border/80">
                  {educationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="text-sm font-medium text-foreground hover:text-primary transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="w-24 h-auto rounded-lg flex items-center justify-center">
            <img src="/src/logo.png" alt="" className="w-full h-full" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">Maritza Cañas</h1>
            <p className="text-xs text-muted-foreground">Tu Brújula Financiera</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="#sobre" className="text-sm text-foreground hover:text-primary transition">
            Sobre mí
          </a>
          <a href="#servicios" className="text-sm text-foreground hover:text-primary transition">
            Servicios
          </a>
          <a href="#testimonios" className="text-sm text-foreground hover:text-primary transition">
            Testimonios
          </a>
          <a href="#contacto" className="text-sm text-foreground hover:text-primary transition">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  )
}

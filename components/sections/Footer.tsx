export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Maritza Cañas</h3>
            <p className="text-background/70">Asesora certificada en pólizas de vida, salud y recursos educativos</p>
            <p className="mt-3 text-background/80">
              Asesoría personalizada en seguros para familias y empresas en Cúcuta, Norte de Santander.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Información</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#sobre" className="hover:text-background transition">
                  Sobre mí
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-background transition">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-background transition">
                  Testimonios
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="mailto:maritzcanas@gmail.com" className="hover:text-background transition">
                  maritzacanas@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/573153183896?text=Hola%20Maritza%2C%20%C2%BFc%C3%B3mo%20est%C3%A1s%3F%20Quisiera%20saber%20m%C3%A1s%20sobre%20tus%20servicios."
                  className="hover:text-background transition"
                >
                  315 318 3896
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center text-background/60 text-sm">
          <p>&copy; 2025 Maritza Cañas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

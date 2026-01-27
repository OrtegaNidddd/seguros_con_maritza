import type { FooterContent } from "@/lib/content"

type FooterProps = {
  content: FooterContent
}

// Helper to convert email/phone to proper link
function formatContactLink(value: string): string {
  const trimmed = value.trim()
  
  // If it's already a full link, return as is
  if (trimmed.startsWith('http') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return trimmed
  }
  
  // If it contains @, it's an email
  if (trimmed.includes('@')) {
    return `mailto:${trimmed}`
  }
  
  // If it starts with +, it's likely a phone number
  if (trimmed.startsWith('+')) {
    const phoneNumber = trimmed.replace(/\s/g, '') // Remove spaces
    return `https://wa.me/${phoneNumber.replace('+', '')}`
  }
  
  // Otherwise assume it's a phone number
  const phoneNumber = trimmed.replace(/\s/g, '')
  return `tel:${phoneNumber}`
}

export function Footer({ content }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-foreground text-background py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{content.title}</h3>
            <p className="text-background/70">{content.description}</p>
            <p className="mt-3 text-background/80">{content.about}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Información</h4>
            <ul className="space-y-2 text-background/70">
              {content.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-background transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-background/70">
              {content.contact.map((link, idx) => (
                <li key={idx}>
                  <a href={formatContactLink(link.href)} className="hover:text-background transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center text-background/60 text-sm">
          <p>© {currentYear} {content.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

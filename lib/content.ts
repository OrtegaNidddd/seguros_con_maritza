import fs from "fs/promises"
import path from "path"

export type ImageContent = { src: string; alt: string }
export type HeroContent = {
  badge: string
  title: string
  description: string[]
  ctaLabel: string
  emailPlaceholder: string
  images: ImageContent[]
  note?: string
}

export type AboutContent = {
  title: string
  subtitle: string
  paragraphs: string[]
  image: ImageContent
}

export type SimpleItem = { icon: string; title: string; desc: string }
export type EducationalItem = SimpleItem & { href?: string }

export type ServiceItem = {
  icon: string
  title: string
  desc: string
  bgColorStart: string
  bgColorEnd: string
  textColor: string
  borderColor: string
  featured?: boolean
}

export type TestimonialItem = {
  name: string
  role: string
  message: string
  rating: number
}

export type ContactContent = {
  title: string
  subtitle: string
  benefits: SimpleItem[]
}

export type FooterContent = {
  title: string
  description: string
  about: string
  links: { label: string; href: string }[]
  contact: { label: string; href: string }[]
  copyright: string
}

export type SiteContent = {
  hero: HeroContent
  about: AboutContent
  reasons: { title: string; subtitle: string; items: SimpleItem[] }
  educational: { title: string; subtitle: string; items: EducationalItem[] }
  services: { title: string; subtitle: string; items: ServiceItem[] }
  testimonials: { title: string; subtitle: string; items: TestimonialItem[] }
  contact: ContactContent
  footer: FooterContent
}

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json")

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: "40 años de experiencia certificada en seguros",
    title: "Seguros en Cúcuta para proteger a tu familia",
    description: [
      "Soy Maritza Cañas, tu Brújula Financiera hacia un futuro seguro.",
      "Acompaño a familias y emprendedores en Cúcuta y Norte de Santander a proteger lo que más aman con seguros de vida, salud, autos, hogar y educación diseñados a su medida.",
      "Mi misión: darte tranquilidad, claridad y un acompañamiento cercano para que tus decisiones financieras cuiden hoy y mañana el bienestar de tu familia.",
    ],
    ctaLabel: "¡Hablemos!",
    emailPlaceholder: "tu@email.com",
    images: [
      { src: "/src/familia_vertical.webp", alt: "Familia protegida con seguros de vida, salud, autos y hogar en Cúcuta" },
      { src: "/src/20260114.png", alt: "Fotografía complementaria de familia asegurada" },
    ],
    note: "Gracias! Te escribiré pronto con novedades.",
  },
  about: {
    title: "Sobre mí",
    subtitle: "Soy Maritza Cañas, asesora de seguros en Cúcuta con 40 años de experiencia.",
    paragraphs: [
      "Como asesora independiente en Norte de Santander, he ayudado a cientos de familias a proteger su futuro con pólizas de vida y salud en Cúcuta, coberturas para autos y hogar, y pólizas educativas para los más pequeños. Además, soy creadora y promotora del programa de salud mental SAMI SALUD, demostrando mi compromiso con el bienestar integral.",
      "Ofrezco asesoría personalizada en seguros para familias y empresas en Cúcuta, Norte de Santander, y acompaño con asesoría financiera básica para que tomes decisiones claras sobre tus pólizas.",
    ],
    image: { src: "/src/foto_maritza.webp", alt: "Maritza Cañas, asesora de seguros en Cúcuta" },
  },
  reasons: {
    title: "¿Por qué elegir mis servicios?",
    subtitle: "Yo personalmente te asesoraré en cada paso del camino",
    items: [
      { icon: "heart", title: "Atención Personalizada", desc: "Te conoceré personalmente y entenderé tus necesidades específicas" },
      { icon: "shield", title: "Experiencia Certificada", desc: "40 años de experiencia respaldan cada recomendación que te hago" },
      { icon: "zap", title: "Asesoría Integral", desc: "Ofrezco soluciones completas adaptadas a tu situación financiera" },
      { icon: "check", title: "Transparencia Total", desc: "Sin sorpresas, todo claro desde el inicio del proceso" },
      { icon: "book", title: "Educación Financiera", desc: "Te enseño a entender tus pólizas y tomar decisiones informadas" },
      { icon: "star", title: "Seguimiento Continuo", desc: "Estoy aquí para ti, no solo para vender, sino para acompañarte" },
    ],
  },
  educational: {
    title: "Empieza por entender, luego protege",
    subtitle: "Estoy aquí para ayudarte a tomar decisiones seguras e informadas",
    items: [
      { icon: "book", title: "Glosario de Seguros", desc: "Aprende los términos clave", href: "/screens/glosario" },
      { icon: "zap", title: "Mitos Desmentidos", desc: "Verdades sobre seguros", href: "/screens/mitos" },
      { icon: "shield", title: "Guía Completa", desc: "Todo lo que necesitas saber", href: "/screens/guia" },
    ],
  },
  services: {
    title: "Mis servicios",
    subtitle: "Te ofrezco soluciones de seguros integrales adaptadas a tus necesidades",
    items: [
      { icon: "graduation", title: "Pólizas Educativas", desc: "Soluciones educativas que garantizan el pago de la matrícula universitaria", bgColorStart: "#cffafe", bgColorEnd: "#a5f3fc", textColor: "#0e7490", borderColor: "#0e7490" },
      { icon: "heartPulse", title: "Seguros de Vida", desc: "Proteges el bienestar de toda la familia", bgColorStart: "#fbcfe8", bgColorEnd: "#f9a8d4", textColor: "#831843", borderColor: "#831843" },
      { icon: "stethoscope", title: "Seguros de Salud", desc: "Cobertura médica ilimitada para tu tranquilidad y bienestar", bgColorStart: "#fecdd3", bgColorEnd: "#fda4af", textColor: "#881337", borderColor: "#881337" },
      { icon: "alert", title: "Accidentes Personales", desc: "Respaldo ante un accidente y proteges estabilidad económica", bgColorStart: "#f5d0fe", bgColorEnd: "#f0abfc", textColor: "#701a75", borderColor: "#701a75" },
      { icon: "building", title: "Seguros PYME", desc: "Protege tu patrimonio", bgColorStart: "#d1fae5", bgColorEnd: "#a7f3d0", textColor: "#065f46", borderColor: "#065f46" },
      { icon: "car", title: "Seguros de Autos", desc: "Cobertura todo riesgo", bgColorStart: "#dbeafe", bgColorEnd: "#bfdbfe", textColor: "#1e3a8a", borderColor: "#1e3a8a" },
      { icon: "piggy", title: "Pensión Voluntaria", desc: "Aseguras una pensión cierta para disfrutar en tu vejez", bgColorStart: "#fcd34d", bgColorEnd: "#d97706", textColor: "#000000", borderColor: "#fbbf24", featured: true },
      { icon: "home", title: "Seguros de Hogar", desc: "Cubre tu vivienda", bgColorStart: "#d1fae5", bgColorEnd: "#a7f3d0", textColor: "#065f46", borderColor: "#065f46" },
    ],
  },
  testimonials: {
    title: "Lo que mis clientes dicen",
    subtitle: "Testimonios reales de familias que protegieron su futuro",
    items: [
      { name: "Carlos Méndez", role: "Padre de familia", message: "Maritza me explicó todo de manera clara. Ahora duermo tranquilo sabiendo que mi familia está protegida.", rating: 5 },
      { name: "Laura Rodríguez", role: "Emprendedora", message: "Excelente profesional. Me ayudó a encontrar exactamente lo que necesitaba para mis hijos.", rating: 5 },
      { name: "Juan Pérez", role: "Ejecutivo", message: "40 años de experiencia se notan. Recomiendo a Maritza sin dudarlo.", rating: 5 },
    ],
  },
  contact: {
    title: "Garantiza la educación superior de tus hijos hoy!",
    subtitle: "Respaldada por 40 años de experiencia, mi compromiso es acompañar el bienestar y potenciar el éxito académico de tus hijos.",
    benefits: [
      { icon: "shield", title: "Acompañamiento especializado", desc: "Te acompaño en cada etapa del proceso, desde la planeación hasta la proyección de metas futuras." },
      { icon: "check", title: "Planes a la medida", desc: "Diseñamos un plan educativo personalizado según tu realidad financiera y tus objetivos." },
      { icon: "heart", title: "Compromiso real", desc: "Más que una póliza, construimos juntos un proyecto de vida para quienes amas." },
    ],
  },
  footer: {
    title: "Maritza Cañas",
    description: "Asesora certificada en pólizas de vida, salud y recursos educativos",
    about: "Asesoría personalizada en seguros para familias y empresas en Cúcuta, Norte de Santander.",
    links: [
      { label: "Sobre mí", href: "#sobre" },
      { label: "Servicios", href: "#servicios" },
      { label: "Testimonios", href: "#testimonios" },
    ],
    contact: [
      { label: "maritzacanas@gmail.com", href: "mailto:maritzacanas@gmail.com" },
      { label: "315 318 3896", href: "https://wa.me/573153183896?text=Hola%20Maritza%2C%20%C2%BFc%C3%B3mo%20est%C3%A1s%3F%20Quisiera%20saber%20m%C3%A1s%20sobre%20tus%20servicios." },
    ],
    copyright: "© 2025 Maritza Cañas. Todos los derechos reservados.",
  },
}

export async function getContent(): Promise<SiteContent> {
  try {
    const file = await fs.readFile(CONTENT_PATH, "utf8")
    return JSON.parse(file) as SiteContent
  } catch (error) {
    await ensureContentFile(DEFAULT_CONTENT)
    return DEFAULT_CONTENT
  }
}

export async function saveContent(content: SiteContent) {
  await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true })
  await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf8")
}

async function ensureContentFile(content: SiteContent) {
  try {
    await fs.access(CONTENT_PATH)
  } catch (_) {
    await saveContent(content)
  }
}

"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CarFront,
  GraduationCap,
  HeartPulse,
  HomeIcon,
  PiggyBank,
  Search,
  Stethoscope,
} from "lucide-react"

type MythItem = {
  myth: string
  truth: string
}

type MythCategory = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  border: string
  badge: string
  accent: string
  card: string
  featured?: boolean
  items: MythItem[]
}

const categories: MythCategory[] = [
  {
    id: "pension",
    title: "Pensión Voluntaria",
    description: "Desmiente ideas erróneas sobre el ahorro para tu retiro y sus beneficios.",
    icon: PiggyBank,
    gradient: "from-amber-300 via-yellow-400 to-amber-600",
    border: "border-amber-400/70 dark:border-amber-500",
    badge: "bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-100",
    accent: "text-amber-900 dark:text-amber-100",
    card: "bg-amber-50/80 dark:bg-amber-950/40",
    featured: true,
    items: [
      {
        myth: "Solo vale la pena cuando estoy cerca de jubilarme.",
        truth:
          "Si empiezas temprano aprovechas el interés compuesto y puedes aportar montos pequeños que crecen con el tiempo.",
      },
      {
        myth: "Los aportes quedan bloqueados y no puedo retirarlos.",
        truth:
          "Puedes programar rescates parciales o anticipos por emergencias siguiendo las reglas del plan sin cancelarlo.",
      },
      {
        myth: "No existen beneficios tributarios reales.",
        truth:
          "Una parte de tus aportes se deduce de la base gravable del impuesto a la renta, reduciendo tu carga fiscal anual.",
      },
      {
        myth: "Si la administradora baja su rendimiento pierdo mi dinero.",
        truth:
          "Puedes trasladar el ahorro a otra entidad o moverlo entre portafolios conservadores y dinámicos según tu perfil.",
      },
      {
        myth: "Es igual que una cuenta de ahorros tradicional.",
        truth:
          "Invierte en portafolios diversificados, ofrece asesoría especializada y suma coberturas de vida complementarias.",
      },
      {
        myth: "Mis beneficiarios necesitan un juicio para recibir el saldo.",
        truth:
          "Solo debes designarlos en la póliza; si falleces, reciben el capital directamente sin procesos sucesorales extensos.",
      },
    ],
  },
  {
    id: "salud",
    title: "Seguros de Salud",
    description: "Resuelve los mitos más comunes sobre tu cobertura médica y sus beneficios reales.",
    icon: Stethoscope,
    gradient: "from-red-200 to-red-300",
    border: "border-red-800/40 dark:border-red-900",
    badge: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100",
    accent: "text-red-800 dark:text-red-200",
    card: "bg-red-50/80 dark:bg-red-950/40",
    items: [
      {
        myth: "El seguro solo sirve para hospitalizaciones graves.",
        truth:
          "Los planes modernos incluyen consultas generales, laboratorios, telemedicina y programas preventivos desde el primer día.",
      },
      {
        myth: "Si tengo una preexistencia, me rechazan o pago tres veces más.",
        truth:
          "La aseguradora puede aplicar periodos de espera o exclusiones temporales, pero no te niega automáticamente ni impone recargos desproporcionados.",
      },
      {
        myth: "Los deducibles se pagan en cada cita.",
        truth:
          "Solo aplican en servicios específicos; muchas consultas virtuales, controles y programas preventivos no los requieren.",
      },
      {
        myth: "La aseguradora decide qué médico debo visitar.",
        truth:
          "Puedes elegir dentro de una red amplia o acudir a tu especialista y pedir reembolso si tu plan contempla esa modalidad.",
      },
      {
        myth: "Usar mucho mi plan hace que lo cancelen.",
        truth:
          "Los contratos son anuales; se revisan al renovar, pero no se cancelan automáticamente porque solicites atenciones frecuentes.",
      },
      {
        myth: "La salud mental nunca está cubierta.",
        truth:
          "Cada vez más pólizas incluyen psicoterapia, psiquiatría y líneas de acompañamiento emocional como parte de la cobertura básica.",
      },
    ],
  },
  {
    id: "vida",
    title: "Seguros de Vida",
    description: "Aclara ideas erróneas sobre cómo un seguro de vida protege a quienes dependen de ti.",
    icon: HeartPulse,
    gradient: "from-pink-200 to-pink-300",
    border: "border-pink-800/40 dark:border-pink-900",
    badge: "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-100",
    accent: "text-pink-800 dark:text-pink-200",
    card: "bg-pink-50/80 dark:bg-pink-950/40",
    items: [
      {
        myth: "Solo se paga si fallezco por accidente.",
        truth:
          "El beneficio principal aplica por cualquier causa cubierta, enfermedad o accidente, según lo estipulado en la póliza.",
      },
      {
        myth: "Necesito tener hijos para que tenga sentido.",
        truth:
          "Puedes designar beneficiarios como padres, pareja, hermanos o incluso una fundación; protege a cualquier persona que dependa de ti.",
      },
      {
        myth: "El valor asegurado queda congelado y pierde contra la inflación.",
        truth:
          "Puedes programar incrementos automáticos o revisar la suma asegurada cada año sin emitir una póliza nueva.",
      },
      {
        myth: "Un seguro de vida no ofrece liquidez.",
        truth:
          "Los planes con ahorro generan valor en efectivo que puedes retirar, usar como garantía o emplear para pagar futuras primas.",
      },
      {
        myth: "Solo cubre hasta los 65 años.",
        truth:
          "Existen pólizas vitalicias y temporales renovables que te acompañan más allá de esa edad mientras mantengas los pagos.",
      },
      {
        myth: "Si cambio de trabajo debo cancelarlo.",
        truth:
          "Las pólizas individuales son tuyas; basta con actualizar el medio de pago para mantenerlas vigentes.",
      },
    ],
  },
  {
    id: "autos",
    title: "Seguros de Autos",
    description: "Entiende qué sí y qué no cubre realmente el seguro de tu vehículo.",
    icon: CarFront,
    gradient: "from-blue-100 to-blue-200",
    border: "border-blue-800/40 dark:border-blue-900",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-100",
    accent: "text-blue-800 dark:text-blue-200",
    card: "bg-blue-50/80 dark:bg-blue-950/30",
    items: [
      {
        myth: "El seguro solo cubre al conductor registrado.",
        truth:
          "La póliza protege a cualquier conductor autorizado con licencia vigente; puedes listar frecuentes para mayor claridad.",
      },
      {
        myth: "Con el seguro obligatorio es suficiente.",
        truth:
          "El seguro obligatorio cubre lesiones básicas; para daños a tu vehículo, responsabilidad civil y robo necesitas un plan voluntario.",
      },
      {
        myth: "Los autos con más de diez años no se aseguran.",
        truth:
          "Existen pólizas específicas para vehículos antiguos con coberturas ajustadas a su valor comercial o de pérdida total.",
      },
      {
        myth: "El deducible se cobra aunque yo no tenga la culpa.",
        truth:
          "Solo aplica cuando tu aseguradora paga los daños; si el tercero responde, puedes recuperar el deducible desembolsado.",
      },
      {
        myth: "No necesito reportar accesorios ni modificaciones.",
        truth:
          "Blindaje, rines o equipos de sonido deben declararse para que queden protegidos e indemnicen su valor real.",
      },
      {
        myth: "Puedo reportar un siniestro cuando quiera.",
        truth:
          "Las pólizas exigen avisar en las primeras 72 horas para validar los hechos y activar la red de talleres.",
      },
    ],
  },
  {
    id: "hogar",
    title: "Seguros de Hogar",
    description: "Aclara cómo se protege tu vivienda, tus cosas y tu responsabilidad frente a terceros.",
    icon: HomeIcon,
    gradient: "from-emerald-100 to-emerald-200",
    border: "border-emerald-800/40 dark:border-emerald-900",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100",
    accent: "text-emerald-800 dark:text-emerald-200",
    card: "bg-emerald-50/80 dark:bg-emerald-950/30",
    items: [
      {
        myth: "Solo puedo asegurarme si soy propietario.",
        truth:
          "Los arrendatarios pueden proteger muebles, electrodomésticos y su responsabilidad frente al dueño del inmueble.",
      },
      {
        myth: "Estas pólizas solo cubren incendios.",
        truth:
          "Incluyen robo, daños por agua, rotura de vidrios, eventos naturales, equipos electrónicos y asistencias en casa.",
      },
      {
        myth: "Los electrodomésticos viejos no se indemnizan.",
        truth:
          "Se paga según el valor asegurado o de reposición equivalente, incluso si tienen varios años de uso comprobado.",
      },
      {
        myth: "Las asistencias demoran días en llegar.",
        truth:
          "Las aseguradoras coordinan cerrajeros, plomeros o electricistas en pocas horas gracias a redes locales.",
      },
      {
        myth: "Sin facturas guardadas no puedo reclamar.",
        truth:
          "Basta con fotografías, manuales o cotizaciones para demostrar existencia y valor aproximado de los bienes.",
      },
      {
        myth: "Si vivo en apartamento la administración ya me cubre.",
        truth:
          "La póliza del edificio protege áreas comunes; tus objetos personales y acabados internos son tu responsabilidad.",
      },
    ],
  },
  {
    id: "educacion",
    title: "Pólizas Educativas",
    description: "Mitos sobre cómo funcionan los seguros para estudios y ahorro educativo.",
    icon: GraduationCap,
    gradient: "from-cyan-100 to-cyan-200",
    border: "border-cyan-600/50 dark:border-cyan-700",
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-100",
    accent: "text-cyan-600 dark:text-cyan-200",
    card: "bg-cyan-50/80 dark:bg-cyan-950/30",
    items: [
      {
        myth: "Solo las familias con altos ingresos pueden contratarlas.",
        truth:
          "Existen planes desde montos mensuales muy bajos y puedes ajustar la meta conforme crecen tus ingresos.",
      },
      {
        myth: "Debo iniciar cuando el bebé nace o ya no sirve.",
        truth:
          "Puedes empezar en cualquier etapa académica ajustando el plazo y el aporte para llegar a la meta deseada.",
      },
      {
        myth: "Si mi hijo decide no estudiar pierdo todo el dinero.",
        truth:
          "El capital acumulado es tuyo y puedes destinarlo a intercambios, emprendimientos o retirarlo según el reglamento.",
      },
      {
        myth: "No puedo retirar antes aunque tenga una emergencia.",
        truth:
          "Muchos planes permiten rescates parciales o anticipos justificados sin cancelar la póliza.",
      },
      {
        myth: "La inflación se come todos los beneficios.",
        truth:
          "Los aportes se indexan e invierten en portafolios que históricamente superan el incremento del costo educativo.",
      },
      {
        myth: "Solo cubren universidades locales.",
        truth:
          "Puedes proyectar estudios en el exterior, elegir la moneda del ahorro y protegerte frente a devaluaciones.",
      },
    ],
  },
  {
    id: "accidentes",
    title: "Accidentes Personales",
    description: "Corrige creencias sobre los seguros que te respaldan ante un accidente.",
    icon: AlertTriangle,
    gradient: "from-fuchsia-200 to-fuchsia-300",
    border: "border-fuchsia-800/40 dark:border-fuchsia-900",
    badge: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-100",
    accent: "text-fuchsia-800 dark:text-fuchsia-200",
    card: "bg-fuchsia-50/80 dark:bg-fuchsia-950/30",
    items: [
      {
        myth: "Solo aplica para trabajos de alto riesgo.",
        truth:
          "Cubre actividades cotidianas como movilizarte en bici, cocinar, practicar deportes recreativos o viajar.",
      },
      {
        myth: "Es lo mismo que un seguro de salud.",
        truth:
          "Entrega indemnizaciones fijas para cubrir gastos diarios, salarios perdidos y apoyos adicionales tras un accidente.",
      },
      {
        myth: "Debo quedar con incapacidad permanente para recibir dinero.",
        truth:
          "Existen beneficios por días de incapacidad temporal, fracturas, quemaduras y reembolsos de gastos médicos.",
      },
      {
        myth: "No cubre actividades recreativas como senderismo o ciclismo.",
        truth:
          "Las pólizas incluyen deportes recreativos habituales; solo las modalidades extremas requieren declararse aparte.",
      },
      {
        myth: "Si ya tengo EPS o medicina prepagada no lo necesito.",
        truth:
          "Complementa deducibles, reemplaza ingresos y cubre costos que un plan médico tradicional no asume.",
      },
      {
        myth: "La protección solo aplica en horario laboral.",
        truth:
          "La cobertura es 24/7 dentro y fuera del país, estés trabajando, estudiando o de vacaciones.",
      },
    ],
  },
  {
    id: "pymes",
    title: "Seguros PYME",
    description: "Mitos frecuentes que ponen en riesgo a los negocios y emprendimientos.",
    icon: Building2,
    gradient: "from-green-100 to-green-200",
    border: "border-green-800/40 dark:border-green-900",
    badge: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-100",
    accent: "text-green-800 dark:text-green-200",
    card: "bg-green-50/80 dark:bg-green-950/30",
    items: [
      {
        myth: "Los seguros empresariales son solo para grandes corporaciones.",
        truth:
          "Hay paquetes diseñados para micro y pequeñas empresas con coberturas modulares y primas accesibles.",
      },
      {
        myth: "No cubren inventarios ni mercancía en tránsito.",
        truth:
          "Puedes asegurar stock en bodegas y durante el transporte mediante cláusulas específicas.",
      },
      {
        myth: "Si arriendo el local no puedo proteger las mejoras.",
        truth:
          "Las mejoras locativas, vidrios y equipos se aseguran aunque la infraestructura sea de un tercero.",
      },
      {
        myth: "Una reclamación dispara la prima al triple.",
        truth:
          "Las renovaciones consideran todo el historial; con planes de prevención documentados puedes mantener incrementos razonables.",
      },
      {
        myth: "No existen coberturas para ciberataques en PYMEs.",
        truth:
          "Hoy hay endosos que cubren ransomware, recuperación de datos y responsabilidad por filtración de información.",
      },
      {
        myth: "Los seguros para empleados no son deducibles.",
        truth:
          "La legislación permite registrarlos como gasto operativo y, en muchos casos, acceder a créditos fiscales.",
      },
    ],
  },
]

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

export default function MitosPageClient() {
  const [query, setQuery] = useState("")

  const filteredCategories = useMemo(() => {
    const normalizedQuery = normalize(query.trim())
    if (!normalizedQuery) return categories

    return categories
      .map((category) => {
        const matchesCategory = normalize(category.title).includes(normalizedQuery)
        const filteredItems = category.items.filter(
          (item) =>
            normalize(item.myth).includes(normalizedQuery) ||
            normalize(item.truth).includes(normalizedQuery),
        )

        if (matchesCategory) {
          return category
        }

        if (filteredItems.length) {
          return { ...category, items: filteredItems }
        }

        return null
      })
      .filter((category): category is MythCategory => Boolean(category))
  }, [query])

  const totalMyths = filteredCategories.reduce((sum, category) => sum + category.items.length, 0)

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        {/* Botón volver */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-white/15 dark:bg-slate-900/70"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>

        {/* Header con misma estructura que Gu?a/Glosario */}
        <header className="mt-8 space-y-4 text-center md:text-left">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-semibold tracking-[0.3em] uppercase">
            Mitos de seguros en Cúcuta
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Mitos y verdades de seguros en Cúcuta para tu familia
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Despeja los mitos más comunes sobre pólizas de vida y salud en Cúcuta, autos, hogar, pólizas educativas y
            finanzas personales. Maritza Cañas, asesora de seguros en Cúcuta, responde en lenguaje claro para que tomes
            decisiones seguras en Norte de Santander.
          </p>
        </header>

        {/* Buscador */}
        <div className=" mt-10 w-full rounded-3xl border border-border/70 bg-white/80 p-6 shadow-lg shadow-primary/5 backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <label htmlFor="search-myths" className="mb-2 block text-sm font-semibold text-muted-foreground">
            Busca por mito, verdad o categoría
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 dark:border-white/10 dark:bg-slate-900/60">
            <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <input
              id="search-myths"
              type="text"
              placeholder="Ej. deducible, familia, inventario..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Mostrando <span className="font-semibold text-foreground">{totalMyths}</span> mitos aclarados en{" "}
            {filteredCategories.length} categorías.
          </p>
        </div>

        {/* Contenido */}
        <div className="mt-16 space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-primary/40 bg-white/70 p-10 text-center dark:border-primary/30 dark:bg-slate-900/70">
              <p className="text-lg font-semibold text-foreground">Sin resultados para tu búsqueda.</p>
              <p className="mt-2 text-muted-foreground">Revisa la ortografía o prueba con otra palabra clave.</p>
            </div>
          ) : (
            filteredCategories.map((category) => {
              const Icon = category.icon
              const headingId = `${category.id}-heading`

              return (
                <section
                  key={category.id}
                  aria-labelledby={headingId}
                  className={`rounded-4xl border ${category.border} bg-linear-to-br ${category.gradient} p-1 shadow-xl shadow-black/5 ${
                    category.featured ? "ring-2 ring-amber-300/60" : ""
                  }`}
                >
                  <div className="rounded-[28px] bg-white/85 p-8 dark:bg-slate-950/85">
                    <div className="mb-8 flex flex-wrap items-center gap-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.card}`}>
                        <Icon className={`h-8 w-8 ${category.accent}`} aria-hidden="true" />
                      </div>
                      <div className="min-w-[250px] flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                          Categoría
                        </p>
                        <h2 id={headingId} className="text-2xl font-bold text-foreground">
                          {category.title}
                        </h2>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        {category.featured ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-400/20 dark:text-amber-200">
                            Destacado
                          </span>
                        ) : null}
                        <span className={`rounded-full px-4 py-1 text-sm font-semibold ${category.badge}`}>
                          {category.items.length} mitos aclarados
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      {category.items.map((item) => (
                        <article
                          key={`${category.id}-${item.myth.slice(0, 24)}`}
                          className={`group rounded-2xl border ${category.border} ${category.card} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
                        >
                          <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            <span>Mito</span>
                          </div>
                          <p className="mt-2 text-base font-medium text-foreground">{item.myth}</p>
                          <div className="mt-4 rounded-xl bg-background/80 p-4 text-sm shadow-inner dark:bg-slate-900/70">
                            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${category.accent}`}>
                              Verdad
                            </p>
                            <p className="mt-2 text-base text-muted-foreground">{item.truth}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>
              )
            })
          )}
        </div>
      </div>
    </main>
  )
}

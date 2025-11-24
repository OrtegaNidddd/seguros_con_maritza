"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileText,
  Lightbulb,
  PiggyBank,
  ShieldCheck,
} from "lucide-react"

type GuideBlock = {
  title: string
  content: string
  tag?: string
}

type GuideSection = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  accent: string
  borderColor: string
  badgeLabel?: string
  featured?: boolean
  blocks: GuideBlock[]
}

const guideSections: GuideSection[] = [
  {
    id: "fundamentos",
    title: "Fundamentos de los Seguros",
    description: "Antes de ver tipos de pólizas, entiende qué es un seguro y por qué existe.",
    icon: BookOpen,
    gradient: "from-sky-100 to-sky-200",
    accent: "text-sky-800 dark:text-sky-200",
    borderColor: "border-sky-700",
    badgeLabel: "Empieza aquí",
    blocks: [
      {
        title: "¿Qué es un seguro?",
        tag: "Concepto clave",
        content:
          "Es un acuerdo donde tú pagas una prima y la aseguradora asume ciertos riesgos económicos por ti si ocurre un evento cubierto.",
      },
      {
        title: "Riesgo y probabilidad",
        tag: "Contexto",
        content:
          "No se trata de si algo pasará o no, sino de qué impacto tendría en tus finanzas si ocurre. El seguro reduce ese impacto.",
      },
      {
        title: "Prima, deducible y cobertura",
        tag: "Vocabulario básico",
        content:
          "La prima es lo que pagas, el deducible lo que asumes de tu bolsillo y la cobertura son los eventos y montos que el seguro protege.",
      },
      {
        title: "No es ahorro, es protección",
        tag: "Mindset",
        content:
          "Un seguro no busca “retornos” como una inversión, sino evitar que una mala situación destruya tu estabilidad financiera.",
      },
    ],
  },
  {
    id: "elegir",
    title: "Cómo Elegir el Seguro Correcto",
    description: "No hay una póliza perfecta para todos. Hay una adecuada para tu momento de vida.",
    icon: ShieldCheck,
    gradient: "from-emerald-100 to-emerald-200",
    accent: "text-emerald-800 dark:text-emerald-200",
    borderColor: "border-emerald-700",
    badgeLabel: "Elección inteligente",
    blocks: [
      {
        title: "Define qué quieres proteger",
        tag: "Paso 1",
        content:
          "¿Tu salud, tu ingreso, tu familia, tu carro, tu casa, tu negocio, tu futuro? Empieza por priorizar riesgos, no productos.",
      },
      {
        title: "Revisa tu capacidad de pago",
        tag: "Paso 2",
        content:
          "Un buen seguro es sostenible. Mejor una cobertura realista que puedas mantener, que un plan gigante que abandonas a los meses.",
      },
      {
        title: "Compara más de una opción",
        tag: "Paso 3",
        content:
          "Pide al menos dos o tres propuestas. No todo es precio: evalúa deducibles, límites, exclusiones y calidad de la red.",
      },
      {
        title: "Lee beneficios y exclusiones",
        tag: "Clave",
        content:
          "Lo que no se menciona o aparece como exclusión no está cubierto. Asegúrate de preguntar todo lo que no entiendas.",
      },
    ],
  },
  {
    id: "contratar",
    title: "Antes de Firmar la Póliza",
    description: "Lo que deberías revisar sí o sí antes de decir “acepto”.",
    icon: FileText,
    gradient: "from-amber-100 to-amber-200",
    accent: "text-amber-800 dark:text-amber-200",
    borderColor: "border-amber-700",
    badgeLabel: "Checklist previo",
    blocks: [
      {
        title: "Verifica tus datos",
        tag: "Datos personales",
        content:
          "Nombre, documento, fechas, actividad económica y beneficiarios deben estar correctos. Errores pueden retrasar indemnizaciones.",
      },
      {
        title: "Declara tu estado real",
        tag: "Transparencia",
        content:
          "Ocultar enfermedades, hábitos o riesgos puede ser causal de rechazo en un siniestro. Es mejor ser claro desde el inicio.",
      },
      {
        title: "Confirma montos y deducibles",
        tag: "Números",
        content:
          "Pregunta: ¿cuánto es el deducible?, ¿cuál es el límite por evento?, ¿existen topes anuales? Así evitas sorpresas en el momento crítico.",
      },
      {
        title: "Solicita condiciones particulares",
        tag: "Documento clave",
        content:
          "Además del folleto, pide la póliza y sus condiciones particulares. Ese documento es el contrato real con la aseguradora.",
      },
    ],
  },
  {
    id: "uso",
    title: "Cómo Usar Bien tus Seguros",
    description: "Tener póliza no basta. Saber usarla multiplica su valor.",
    icon: CheckCircle2,
    gradient: "from-indigo-100 to-indigo-200",
    accent: "text-indigo-800 dark:text-indigo-200",
    borderColor: "border-indigo-700",
    badgeLabel: "Uso práctico",
    blocks: [
      {
        title: "Guarda todo en un solo lugar",
        tag: "Organización",
        content:
          "Conserva pólizas, certificados, números de emergencia y comprobantes de pago en una carpeta digital o física accesible.",
      },
      {
        title: "Conoce los canales de atención",
        tag: "Soporte",
        content:
          "Identifica si tu aseguradora atiende por app, línea, WhatsApp o portal. Mientras más rápido reportas, más ágil es la respuesta.",
      },
      {
        title: "Pregunta antes de asumir",
        tag: "Evita suposiciones",
        content:
          "Si no estás seguro de si algo está cubierto, consulta antes de tomar decisiones costosas por tu cuenta.",
      },
      {
        title: "Actualiza cuando tu vida cambie",
        tag: "Revisión periódica",
        content:
          "Nuevo empleo, matrimonio, hijos, crédito o negocio son señales para revisar sumas aseguradas y beneficiarios.",
      },
    ],
  },
  {
    id: "siniestro",
    title: "Qué Hacer en Caso de Siniestro",
    description: "Pasos claros para no perder la calma ni los beneficios.",
    icon: AlertTriangle,
    gradient: "from-rose-100 to-rose-200",
    accent: "text-rose-800 dark:text-rose-200",
    borderColor: "border-rose-700",
    badgeLabel: "Momento de la verdad",
    blocks: [
      {
        title: "Prioriza tu seguridad",
        tag: "Primero tú",
        content:
          "En un accidente o enfermedad, lo primero es la atención médica y la seguridad de las personas. Lo administrativo va después.",
      },
      {
        title: "Reporta lo antes posible",
        tag: "Tiempo",
        content:
          "Muchas pólizas exigen avisar en las primeras 24–72 horas. Ten a mano tu número de póliza y una breve descripción de lo ocurrido.",
      },
      {
        title: "Documenta con evidencia",
        tag: "Pruebas",
        content:
          "Toma fotos, guarda facturas, informes médicos o de tránsito. Todo esto respalda tu reclamación y acelera la respuesta.",
      },
      {
        title: "Sigue las instrucciones",
        tag: "Proceso",
        content:
          "La aseguradora te indicará si debes ir a un taller aliado, clínica en red o enviar documentos por correo o portal.",
      },
    ],
  },
  {
    id: "errores",
    title: "Errores Comunes que Debes Evitar",
    description: "Pequeños descuidos que pueden salir muy caros en el tiempo.",
    icon: PiggyBank,
    gradient: "from-slate-100 to-slate-200",
    accent: "text-slate-800 dark:text-slate-100",
    borderColor: "border-slate-700",
    badgeLabel: "Aprende del error ajeno",
    blocks: [
      {
        title: "Elegir solo por precio",
        tag: "Error típico",
        content:
          "Una prima baja con deducibles altísimos o coberturas mínimas puede dejarte igual de expuesto que si no tuvieras seguro.",
      },
      {
        title: "No leer exclusiones",
        tag: "Letras pequeñas",
        content:
          "Enterarte de lo que no cubre el seguro en medio del problema es de las experiencias más frustrantes. Revísalas antes.",
      },
      {
        title: "Dejar vencer la póliza",
        tag: "Continuidad",
        content:
          "Interrumpir pagos puede dejarte sin protección justo cuando más la necesitas. Activa recordatorios o débito automático.",
      },
      {
        title: "No contarle nada a la familia",
        tag: "Comunicación",
        content:
          "Si nadie sabe que existe el seguro, dónde está la póliza o cómo reclamar, el beneficio puede perderse o tardar demasiado.",
      },
    ],
  },
  {
    id: "tips",
    title: "Consejos Finales",
    description: "Pequeños ajustes que te ayudan a aprovechar mejor cada póliza.",
    icon: Lightbulb,
    gradient: "from-lime-100 to-lime-200",
    accent: "text-lime-800 dark:text-lime-200",
    borderColor: "border-lime-700",
    badgeLabel: "Cierre de oro",
    featured: true,
    blocks: [
      {
        title: "Construye tu mapa de seguros",
        tag: "Visión global",
        content:
          "Anota qué tienes en salud, vida, autos, hogar, pensión y empresa. Verlo junto te permite detectar vacíos y duplicidades.",
      },
      {
        title: "Revisa al menos una vez al año",
        tag: "Buen hábito",
        content:
          "Agenda una revisión anual con tu asesor: ¿sigues necesitando lo mismo?, ¿cambió tu ingreso?, ¿llegó un nuevo objetivo?",
      },
      {
        title: "Usa el seguro a tu favor",
        tag: "Mentalidad",
        content:
          "Aprovecha beneficios como chequeos preventivos, líneas de orientación médica o programas de bienestar. Están incluidos para ti.",
      },
      {
        title: "Preguntar no tiene costo",
        tag: "Acompañamiento",
        content:
          "Cuando tengas dudas, pide ejemplos concretos: “¿en qué caso sí aplica?” o “¿puedes explicarlo con un caso real?”.",
      },
    ],
  },
]

export default function CompleteGuidePage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-white/15 dark:bg-slate-900/70"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </div>

        {/* Header */}
        <header className="mt-8 space-y-4 text-center md:text-left">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-semibold tracking-[0.3em] uppercase">
            Guía completa
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Guía de seguros en Cúcuta para proteger a tu familia
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Guía completa para familias y empresas en Cúcuta y Norte de Santander. Aprende con Maritza Cañas a elegir
            pólizas de vida y salud, autos, hogar y pólizas educativas, y a ordenar tus finanzas personales sin
            complicaciones.
          </p>
        </header>

        {/* Sections */}
        <div className="mt-14 space-y-12">
          {guideSections.map((section) => {
            const Icon = section.icon
            const headingId = `${section.id}-heading`

            return (
              <section
                key={section.id}
                aria-labelledby={headingId}
                className={`rounded-4xl border ${section.borderColor} bg-linear-to-br ${section.gradient} p-1 shadow-xl shadow-black/5 ${
                  section.featured ? "ring-2 ring-amber-300/60" : ""
                }`}
              >
                <div className="rounded-[28px] bg-white/90 p-8 dark:bg-slate-950/90">
                  <div className="mb-8 flex flex-wrap items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background/70 shadow-inner dark:bg-slate-900/80">
                      <Icon className={`h-8 w-8 ${section.accent}`} aria-hidden="true" />
                    </div>
                    <div className="min-w-[250px] flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Sección
                      </p>
                      <h2 id={headingId} className="text-2xl font-bold text-foreground">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground">{section.description}</p>
                    </div>
                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      {section.badgeLabel && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-100/10 dark:text-slate-100">
                          {section.badgeLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    {section.blocks.map((block) => (
                      <article
                        key={`${section.id}-${block.title}`}
                        className="group rounded-2xl border border-border/60 bg-background/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-slate-950/70"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h3 className={`text-base font-semibold text-foreground ${section.accent}`}>
                            {block.title}
                          </h3>
                          {block.tag && (
                            <span className="inline-flex items-center rounded-full bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                              {block.tag}
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{block.content}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </main>
  )
}

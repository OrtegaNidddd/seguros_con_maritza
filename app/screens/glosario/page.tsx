"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeft,
  Stethoscope,
  HeartPulse,
  CarFront,
  HomeIcon,
  GraduationCap,
  AlertTriangle,
  Building2,
  PiggyBank,
  Search,
} from "lucide-react"

type GlossaryTerm = {
  term: string
  definition: string
}

type GlossaryCategory = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  gradient: string
  accent: string
  border: string
  badge: string
  card: string
  featured?: boolean
  terms: GlossaryTerm[]
}

const glossaryCategories: GlossaryCategory[] = [
  {
    id: "pension",
    title: "Pensión Voluntaria",
    description: "Términos esenciales para entender el ahorro voluntario para tu retiro.",
    icon: PiggyBank,
    gradient: "from-amber-300 via-yellow-400 to-amber-600",
    accent: "text-amber-900 dark:text-amber-100",
    border: "border-amber-400/70 dark:border-amber-500",
    badge: "bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-100",
    card: "bg-amber-50/80 dark:bg-amber-950/40",
    featured: true,
    terms: [
      {
        term: "Aporte voluntario",
        definition:
          "Monto flexible que decides consignar cada mes o de forma ocasional para hacer crecer tu ahorro previsional.",
      },
      {
        term: "Horizonte de inversión",
        definition: "Tiempo estimado en el que mantendrás tus aportes invertidos antes de iniciar los retiros.",
      },
      {
        term: "Beneficio tributario",
        definition:
          "Porción de tus aportes que puedes deducir de la base gravable del impuesto sobre la renta.",
      },
      {
        term: "Renta programada",
        definition:
          "Modalidad de retiro que te entrega pagos periódicos calculados con el saldo disponible.",
      },
      {
        term: "Renta vitalicia inmediata",
        definition: "Opción de convertir el capital acumulado en un pago mensual garantizado de por vida.",
      },
      {
        term: "Traslado entre administradoras",
        definition:
          "Derecho a mover tu ahorro voluntario a otra entidad para buscar mejores rendimientos.",
      },
      {
        term: "Portafolio conservador",
        definition:
          "Alternativa de inversión con activos de bajo riesgo para proteger el capital cerca de la jubilación.",
      },
      {
        term: "Rescate parcial",
        definition:
          "Retiro anticipado permitido por la póliza para cubrir emergencias sin cancelar el plan.",
      },
      {
        term: "Designación de beneficiarios",
        definition:
          "Registro de las personas que heredarán el saldo si falleces durante el periodo de ahorro.",
      },
      {
        term: "Comisión de administración",
        definition:
          "Porcentaje que cobra la administradora por gestionar tus recursos voluntarios.",
      },
    ],
  },
  {
    id: "salud",
    title: "Seguros de Salud",
    description: "Conceptos clave para entender cómo funciona tu cobertura médica y qué sí te protege.",
    icon: Stethoscope,
    gradient: "from-red-200 to-red-300",
    accent: "text-red-800 dark:text-red-200",
    border: "border-red-800/40 dark:border-red-900",
    badge: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100",
    card: "bg-red-50/80 dark:bg-red-950/40",
    terms: [
      { term: "Prima mensual", definition: "Pago fijo que realizas cada mes para mantener activa tu cobertura médica." },
      { term: "Deducible", definition: "Monto que debes pagar por tu cuenta antes de que la aseguradora cubra el resto." },
      { term: "Copago", definition: "Valor específico que pagas por cada consulta, examen o tratamiento." },
      { term: "Coaseguro", definition: "Porcentaje del costo que compartes con la aseguradora después del deducible." },
      { term: "Red de prestadores", definition: "Listado de clínicas y médicos con tarifas preferenciales para tu póliza." },
      { term: "Hospitalización", definition: "Cobertura de los gastos generados durante una estadía en clínica u hospital." },
      { term: "Atención ambulatoria", definition: "Servicios médicos que no requieren pasar la noche en un centro de salud." },
      { term: "Cobertura internacional", definition: "Protección para recibir atención médica en otros países." },
      { term: "Telemedicina", definition: "Consultas virtuales incluidas en tu póliza para atención rápida." },
      { term: "Emergencia médica", definition: "Eventos inesperados que requieren intervención inmediata y están cubiertos." },
      { term: "Preexistencia", definition: "Condición de salud diagnosticada antes de contratar el seguro." },
      { term: "Medicina especializada", definition: "Consultas con especialistas como cardiólogos o pediatras." },
      { term: "Programa de maternidad", definition: "Beneficios para controles, parto y cuidados del recién nacido." },
      { term: "Medicina preventiva", definition: "Chequeos periódicos incluidos para detectar enfermedades a tiempo." },
      { term: "Medicamentos formulados", definition: "Fármacos autorizados por el médico y cubiertos por la póliza." },
      { term: "Terapias de rehabilitación", definition: "Sesiones de fisioterapia o terapias ocupacionales cubiertas." },
      { term: "Exámenes de laboratorio", definition: "Pruebas clínicas que ayudan al diagnóstico y están incluidas." },
      { term: "Segunda opinión médica", definition: "Evaluación adicional de otro especialista para confirmar un diagnóstico." },
      { term: "Asistencia en viaje", definition: "Ayuda médica cuando te enfermas fuera de tu ciudad de residencia." },
      { term: "Cirugía ambulatoria", definition: "Procedimientos quirúrgicos que no requieren hospitalización prolongada." },
      { term: "Unidad de cuidados intensivos", definition: "Área especializada cubierta para pacientes críticos." },
      { term: "Salud mental", definition: "Sesiones de psicología o psiquiatría cubiertas por tu seguro." },
    ],
  },
  {
    id: "vida",
    title: "Seguros de Vida",
    description: "Términos básicos para entender cómo proteges el bienestar económico de tu familia.",
    icon: HeartPulse,
    gradient: "from-pink-200 to-pink-300",
    accent: "text-pink-800 dark:text-pink-200",
    border: "border-pink-800/40 dark:border-pink-900",
    badge: "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-100",
    card: "bg-pink-50/80 dark:bg-pink-950/40",
    terms: [
      { term: "Beneficiario", definition: "Persona que recibe el dinero del seguro cuando ocurre el siniestro." },
      { term: "Suma asegurada", definition: "Valor económico pactado que la aseguradora pagará al beneficiario." },
      { term: "Beneficio por fallecimiento", definition: "Monto entregado a la familia si el asegurado muere." },
      { term: "Cobertura temporal", definition: "Protección por un plazo definido como 10, 20 o 30 años." },
      { term: "Cobertura vitalicia", definition: "Seguro que te acompaña durante toda la vida del asegurado." },
      { term: "Seguro dotal", definition: "Plan que combina protección y ahorro para entregarte dinero en una fecha futura." },
      { term: "Seguro universal", definition: "Póliza flexible que permite ajustar aportes y coberturas con el tiempo." },
      { term: "Prima nivelada", definition: "Pago constante que no aumenta con el paso de los años." },
      { term: "Valor en efectivo", definition: "Ahorro acumulado dentro de la póliza que puedes retirar o usar como garantía." },
      {
        term: "Participación de utilidades",
        definition: "Ganancias adicionales que algunas aseguradoras reparten entre los asegurados.",
      },
      {
        term: "Periodo de contestabilidad",
        definition: "Tiempo en el que la aseguradora puede revisar la póliza si ocurre un siniestro.",
      },
      { term: "Exclusiones", definition: "Situaciones específicas que el seguro no cubre." },
      {
        term: "Rider de enfermedades graves",
        definition: "Beneficio extra que entrega dinero si el asegurado padece una enfermedad seria.",
      },
      {
        term: "Invalidez total y permanente",
        definition: "Cobertura que paga si el asegurado pierde su capacidad laboral de forma definitiva.",
      },
      {
        term: "Ajuste por inflación",
        definition: "Cláusula que incrementa la suma asegurada para mantener su poder adquisitivo.",
      },
      { term: "Periodo de carencia", definition: "Tiempo mínimo antes de poder reclamar ciertos beneficios." },
      {
        term: "Conversión de póliza",
        definition: "Posibilidad de transformar un seguro temporal en uno vitalicio sin nuevos exámenes.",
      },
      {
        term: "Designación revocable",
        definition: "Forma de nombrar beneficiarios que puedes cambiar en cualquier momento.",
      },
      {
        term: "Designación irrevocable",
        definition: "Nombramiento de beneficiarios que requiere su autorización para modificarse.",
      },
      {
        term: "Anticipo de beneficios",
        definition: "Porción del dinero que puedes solicitar en vida ante eventos específicos.",
      },
      {
        term: "Tabla de mortalidad",
        definition: "Estadística utilizada por las aseguradoras para calcular riesgos y costos.",
      },
      {
        term: "Seguro colectivo de vida",
        definition: "Cobertura que las empresas ofrecen a sus colaboradores como beneficio laboral.",
      },
    ],
  },
  {
    id: "autos",
    title: "Seguros de Autos",
    description: "Conceptos clave para manejar asegurado y proteger tu vehículo y tu patrimonio.",
    icon: CarFront,
    gradient: "from-blue-100 to-blue-200",
    accent: "text-blue-800 dark:text-blue-200",
    border: "border-blue-800/40 dark:border-blue-900",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-100",
    card: "bg-blue-50/80 dark:bg-blue-950/30",
    terms: [
      { term: "Responsabilidad civil", definition: "Cobertura que paga los daños que causes a otras personas o bienes." },
      { term: "Todo riesgo", definition: "Plan que cubre daños propios, a terceros, robo y desastres naturales." },
      {
        term: "Pérdida total",
        definition: "Situación en la que el vehículo no se puede reparar o el arreglo supera su valor.",
      },
      {
        term: "Pérdida parcial",
        definition: "Daños que pueden repararse sin superar el porcentaje definido en la póliza.",
      },
      { term: "Franquicia", definition: "Porción del siniestro que asumes antes de que el seguro pague." },
      {
        term: "Asistencia en carretera",
        definition: "Servicios de grúa, batería, combustible o cerrajería incluidos.",
      },
      {
        term: "Vehículo de reemplazo",
        definition: "Auto temporal que te entregan mientras reparan el tuyo.",
      },
      {
        term: "Daños a terceros",
        definition: "Indemnización a otras personas por lesiones o daños materiales causados por ti.",
      },
      {
        term: "Daños propios",
        definition: "Arreglos del vehículo asegurado cuando tú eres el afectado.",
      },
      {
        term: "Accesorios asegurados",
        definition: "Elementos adicionales como rines o pantallas cubiertos por la póliza.",
      },
      {
        term: "Gastos de remolque",
        definition: "Transporte del vehículo a un taller tras un accidente.",
      },
      {
        term: "Cobertura contra robo",
        definition: "Indemnización si el automóvil es hurtado total o parcialmente.",
      },
      {
        term: "Cobertura de vidrios",
        definition: "Reposición de panorámicos, laterales y espejos rotos.",
      },
      {
        term: "Daños por eventos naturales",
        definition: "Protección frente a granizo, inundaciones o caída de árboles.",
      },
      {
        term: "Valor comercial",
        definition: "Precio promedio del vehículo en el mercado al momento del siniestro.",
      },
      {
        term: "Valor convenido",
        definition: "Monto fijo pactado con la aseguradora para indemnizarte.",
      },
      { term: "Ajustador", definition: "Experto que inspecciona los daños y determina la indemnización." },
      {
        term: "Taller aliado",
        definition: "Centro de servicio autorizado con garantía en las reparaciones.",
      },
      {
        term: "Informe de siniestro",
        definition: "Relato oficial de lo ocurrido que respalda tu reclamación.",
      },
      {
        term: "Amparo patrimonial",
        definition: "Protección extra cuando los daños a terceros superan el límite básico.",
      },
      {
        term: "Responsabilidad extracontractual",
        definition: "Protección frente a demandas por daños ocasionados sin un contrato.",
      },
      {
        term: "Cobertura de llantas",
        definition: "Reposición de neumáticos y rines por pinchazos, golpes o robo.",
      },
    ],
  },
  {
    id: "hogar",
    title: "Seguros de Hogar",
    description: "Protege tu vivienda, tus bienes y tu responsabilidad frente a vecinos y terceros.",
    icon: HomeIcon,
    gradient: "from-emerald-100 to-emerald-200",
    accent: "text-emerald-800 dark:text-emerald-200",
    border: "border-emerald-800/40 dark:border-emerald-900",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100",
    card: "bg-emerald-50/80 dark:bg-emerald-950/30",
    terms: [
      { term: "Seguro contra incendio", definition: "Indemniza los daños que cause el fuego en tu vivienda." },
      {
        term: "Seguro de contenido",
        definition: "Protege muebles, electrodomésticos y objetos personales.",
      },
      {
        term: "Responsabilidad civil familiar",
        definition: "Cubre daños o lesiones que tú o tu familia causen a terceros.",
      },
      {
        term: "Asistencia domiciliaria",
        definition: "Servicios de plomería, electricidad o cerrajería cuando los necesitas.",
      },
      {
        term: "Cobertura de electrodomésticos",
        definition: "Repara o reemplaza equipos dañados por eventos súbitos.",
      },
      { term: "Daños por agua", definition: "Protección frente a roturas de tuberías e inundaciones internas." },
      { term: "Daños por viento", definition: "Cubre afectaciones causadas por vendavales o tormentas." },
      {
        term: "Robo con violencia",
        definition: "Indemniza cuando ladrones ingresan forzando cerraduras o ventanas.",
      },
      {
        term: "Robo sin violencia",
        definition: "Ampara hurtos sin evidencia de fuerza, como descuidos.",
      },
      {
        term: "Valor de reposición",
        definition: "Pago equivalente a comprar un artículo nuevo similar.",
      },
      {
        term: "Mejoras locativas",
        definition: "Protege remodelaciones que hiciste en una vivienda arrendada.",
      },
      {
        term: "Pérdida de alquileres",
        definition: "Compensa ingresos si tu propiedad arrendada queda inhabitable.",
      },
      {
        term: "Vivienda desocupada",
        definition: "Cláusula que mantiene la cobertura aunque no vivas allí temporalmente.",
      },
      {
        term: "Casa de vacaciones",
        definition: "Extiende el seguro a una segunda propiedad recreativa.",
      },
      { term: "Cobertura de joyas", definition: "Protege piezas de alto valor dentro del hogar." },
      {
        term: "Cobertura de obras de arte",
        definition: "Ampara cuadros, esculturas y colecciones especiales.",
      },
      {
        term: "Rotura de vidrios",
        definition: "Reemplaza ventanales y espejos dañados accidentalmente.",
      },
      {
        term: "Mascotas aseguradas",
        definition: "Incluye responsabilidad por daños causados por tus animales.",
      },
      {
        term: "Jardines y exteriores",
        definition: "Cubre pérgolas, cercas y elementos decorativos al aire libre.",
      },
      {
        term: "Daños a terceros",
        definition: "Indemniza a vecinos afectados por incidentes originados en tu casa.",
      },
      {
        term: "Cláusula de subrogación",
        definition: "Permite a la aseguradora reclamar a quien ocasionó el daño.",
      },
      {
        term: "Amparo de expensas",
        definition: "Cubre gastos de administración mientras la vivienda está dañada.",
      },
    ],
  },
  {
    id: "educativas",
    title: "Pólizas Educativas",
    description: "Herramientas financieras para asegurar el pago de estudios futuros.",
    icon: GraduationCap,
    gradient: "from-cyan-100 to-cyan-200",
    accent: "text-cyan-600 dark:text-cyan-200",
    border: "border-cyan-600/50 dark:border-cyan-700",
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-100",
    card: "bg-cyan-50/80 dark:bg-cyan-950/30",
    terms: [
      { term: "Fondo educativo", definition: "Cuenta de ahorro destinada exclusivamente a gastos de estudio." },
      {
        term: "Plan garantizado",
        definition: "Compromiso de cubrir la matrícula sin importar aumentos futuros.",
      },
      {
        term: "Ahorro programado",
        definition: "Aportes periódicos automáticos para construir el capital educativo.",
      },
      {
        term: "Bono escolar",
        definition: "Pago anual destinado a útiles, uniformes o actividades académicas.",
      },
      {
        term: "Cobertura de matrícula",
        definition: "Garantía de pago de colegiatura o semestre universitario.",
      },
      {
        term: "Cobertura de manutención",
        definition: "Recursos para alojamiento, transporte y alimentación del estudiante.",
      },
      {
        term: "Índice educativo",
        definition: "Medida que ajusta el plan según el aumento de costos escolares.",
      },
      {
        term: "Beneficiario estudiantil",
        definition: "Niño o joven que recibirá los fondos cuando los necesite.",
      },
      {
        term: "Periodo de aportes",
        definition: "Tiempo durante el cual realizas contribuciones al plan.",
      },
      {
        term: "Flexibilidad de pago",
        definition: "Posibilidad de cambiar montos o fechas de tus aportes.",
      },
      {
        term: "Rescate anticipado",
        definition: "Retiro parcial de fondos antes del objetivo si surge una emergencia.",
      },
      {
        term: "Exención de prima",
        definition: "La aseguradora sigue aportando si el tutor fallece o queda inválido.",
      },
      {
        term: "Cobertura por fallecimiento del tutor",
        definition: "Garantiza que el estudiante reciba los fondos pactados.",
      },
      {
        term: "Cobertura por invalidez del tutor",
        definition: "Mantiene el plan activo si el tutor no puede seguir aportando.",
      },
      {
        term: "Cobertura por desempleo",
        definition: "Pausa temporal de pagos cuando pierdes tu trabajo.",
      },
      {
        term: "Universidad global",
        definition: "Opción para usar el capital en instituciones fuera del país.",
      },
      {
        term: "Carta de compromiso",
        definition: "Documento que certifica la disponibilidad de fondos ante la institución educativa.",
      },
      {
        term: "Cláusula de continuidad académica",
        definition: "Garantiza la finalización de los estudios aunque falte el tutor.",
      },
      {
        term: "Rendimiento garantizado",
        definition: "Tasa mínima de interés que crecerá tu ahorro.",
      },
      {
        term: "Póliza complementaria",
        definition: "Plan adicional para cubrir posgrados o intercambios.",
      },
      {
        term: "Calendario escolar",
        definition: "Cronograma que alinea los pagos con los periodos académicos.",
      },
      { term: "Asesor educativo", definition: "Experto que te guía para escoger universidad y uso del capital." },
    ],
  },
  {
    id: "accidentes",
    title: "Accidentes Personales",
    description: "Conceptos que explican cómo un seguro te respalda tras un accidente.",
    icon: AlertTriangle,
    gradient: "from-fuchsia-200 to-fuchsia-300",
    accent: "text-fuchsia-800 dark:text-fuchsia-200",
    border: "border-fuchsia-800/40 dark:border-fuchsia-900",
    badge: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-100",
    card: "bg-fuchsia-50/80 dark:bg-fuchsia-950/30",
    terms: [
      { term: "Indemnización", definition: "Dinero que recibes después de un accidente cubierto." },
      {
        term: "Capital asegurado",
        definition: "Monto máximo que pagará la póliza por un siniestro.",
      },
      {
        term: "Muerte accidental",
        definition: "Pago a los beneficiarios si el asegurado fallece por un accidente.",
      },
      {
        term: "Invalidez parcial",
        definition: "Compensación cuando pierde funcionalidad solo una parte del cuerpo.",
      },
      {
        term: "Invalidez total",
        definition: "Pago completo si quedas imposibilitado para trabajar.",
      },
      {
        term: "Gastos médicos por accidente",
        definition: "Reembolso de tratamientos necesarios tras el evento.",
      },
      {
        term: "Hospitalización diaria",
        definition: "Renta por cada día internado debido a un accidente.",
      },
      {
        term: "Cirugía reconstructiva",
        definition: "Cobertura para procedimientos estéticos o funcionales tras lesiones.",
      },
      {
        term: "Rehabilitación",
        definition: "Terapias que te ayudan a recuperar movilidad o fuerza.",
      },
      {
        term: "Prótesis",
        definition: "Dispositivos artificiales cubiertos cuando necesitas reemplazar una parte del cuerpo.",
      },
      { term: "Ambulancia", definition: "Transporte médico de emergencia incluido en la póliza." },
      {
        term: "Cobertura 24/7",
        definition: "Protección constante sin importar la hora o el lugar.",
      },
      {
        term: "Deportes de riesgo",
        definition: "Actividades que requieren declarar cobertura adicional.",
      },
      {
        term: "Accidentes laborales",
        definition: "Hechos imprevistos ocurridos mientras trabajas.",
      },
      {
        term: "Accidentes domésticos",
        definition: "Lesiones dentro del hogar cubiertas por la póliza.",
      },
      {
        term: "Periodo de notificación",
        definition: "Tiempo máximo para reportar un accidente a la aseguradora.",
      },
      {
        term: "Beneficiario contingente",
        definition: "Persona que recibe el beneficio si el titular original no puede hacerlo.",
      },
      {
        term: "Reembolso",
        definition: "Pago posterior que se hace tras presentar facturas médicas.",
      },
      {
        term: "Convalecencia",
        definition: "Apoyo económico durante el tiempo de recuperación.",
      },
      {
        term: "Doble indemnización",
        definition: "Cláusula que duplica el pago bajo condiciones especiales.",
      },
      {
        term: "Cobertura internacional",
        definition: "Protección válida si el accidente ocurre fuera del país.",
      },
      {
        term: "Exclusiones por enfermedades",
        definition: "Aclara que solo se cubren lesiones causadas por accidentes.",
      },
    ],
  },
  {
    id: "pymes",
    title: "Seguros PYME",
    description: "Glosario para entender cómo proteger el patrimonio y la continuidad de tu negocio.",
    icon: Building2,
    gradient: "from-green-100 to-green-200",
    accent: "text-green-800 dark:text-green-200",
    border: "border-green-800/40 dark:border-green-900",
    badge: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-100",
    card: "bg-green-50/80 dark:bg-green-950/30",
    terms: [
      {
        term: "Interrupción de negocio",
        definition: "Ingreso que recibes si tu empresa debe cerrar temporalmente por un siniestro.",
      },
      {
        term: "Seguro multirriesgo",
        definition: "Póliza integral que combina daños materiales y responsabilidades.",
      },
      {
        term: "Responsabilidad civil comercial",
        definition: "Protección frente a demandas por daños ocasionados a clientes o proveedores.",
      },
      {
        term: "Cobertura de inventarios",
        definition: "Ampara las mercancías almacenadas contra robo o desastres.",
      },
      {
        term: "Maquinaria asegurada",
        definition: "Equipo industrial protegido frente a daños súbitos.",
      },
      {
        term: "Robo interno",
        definition: "Cobertura frente a hurtos cometidos por empleados.",
      },
      {
        term: "Fidelidad de empleados",
        definition: "Garantiza el reembolso cuando un colaborador causa pérdidas intencionales.",
      },
      {
        term: "Flotilla asegurada",
        definition: "Planes diseñados para asegurar varios vehículos comerciales.",
      },
      {
        term: "Transporte de mercancías",
        definition: "Protege productos mientras se trasladan entre ciudades o bodegas.",
      },
      {
        term: "Ciberriesgo",
        definition: "Cobertura contra ataques informáticos y robo de datos.",
      },
      {
        term: "Responsabilidad profesional",
        definition: "Protege asesorías o servicios que puedan generar errores u omisiones.",
      },
      {
        term: "Daños a terceros",
        definition: "Indemniza a personas o empresas afectadas por tu operación.",
      },
      {
        term: "Cláusula de ajuste automático",
        definition: "Actualiza la suma asegurada conforme crece tu negocio.",
      },
      {
        term: "Gastos extraordinarios",
        definition: "Recursos para alquiler temporal de oficinas o maquinaria.",
      },
      {
        term: "Cobertura para franquicias",
        definition: "Protección diseñada para negocios con múltiples puntos de venta.",
      },
      {
        term: "Cobertura para arrendadores",
        definition: "Protege a dueños de locales comerciales frente a daños de inquilinos.",
      },
      { term: "Seguro de crédito", definition: "Respalda las ventas a plazo y paga si un cliente no cumple." },
      {
        term: "Seguro de caución",
        definition: "Garantiza el cumplimiento de contratos ante terceros.",
      },
      {
        term: "Continuidad operativa",
        definition: "Plan que asegura recursos para retomar actividades rápidamente.",
      },
      {
        term: "Plan de contingencia",
        definition: "Guía financiada por la póliza para responder ante emergencias.",
      },
      {
        term: "Asistencia legal",
        definition: "Acceso a abogados para atender demandas asociadas al negocio.",
      },
      {
        term: "Programa de beneficios para empleados",
        definition: "Coberturas adicionales que fortalecen la retención de talento.",
      },
    ],
  },
]

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const normalizedQuery = normalize(searchQuery.trim())

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return glossaryCategories

    return glossaryCategories
      .map((category) => ({
        ...category,
        terms: category.terms.filter(
          (term) =>
            normalize(term.term).includes(normalizedQuery) ||
            normalize(term.definition).includes(normalizedQuery),
        ),
      }))
      .filter((category) => category.terms.length > 0)
  }, [normalizedQuery])

  const totalTerms = filteredCategories.reduce((acc, category) => acc + category.terms.length, 0)

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

        {/* Header con estructura tipo mitos/guía */}
        <header className="mt-8 space-y-4 text-center md:text-left">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-semibold tracking-[0.3em] uppercase">
            Glosario de Seguros
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Aprende los términos clave de tus pólizas</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explora los conceptos más importantes de cada tipo de seguro. Usa el buscador para encontrar
            rápidamente definiciones y entender mejor cómo te protege cada producto.
          </p>
        </header>

        {/* Buscador estilo mitos */}
        <div className="mt-10 w-full rounded-3xl border border-border/70 bg-white/80 p-6 shadow-lg shadow-primary/5 backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <label htmlFor="search-glossary" className="mb-2 block text-sm font-semibold text-muted-foreground">
            Busca por término o definición
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 dark:border-white/10 dark:bg-slate-900/60">
            <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <input
              id="search-glossary"
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Ej. deducible, beneficiario, inventarios..."
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {normalizedQuery
              ? `Encontramos ${totalTerms} término${totalTerms === 1 ? "" : "s"} relacionados con “${searchQuery}”.`
              : "Explora las categorías o busca un concepto específico para ver su definición."}
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
                          {category.terms.length} término{category.terms.length === 1 ? "" : "s"}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      {category.terms.map((term) => (
                        <article
                          key={`${category.id}-${term.term}`}
                          className={`group rounded-2xl border ${category.border} ${category.card} p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
                        >
                          <h3 className={`text-base font-semibold ${category.accent}`}>{term.term}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {term.definition}
                          </p>
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

import type React from "react"
import { ChevronRight } from "lucide-react"

type CalculatorSectionProps = {
  age: number
  dependents: number
  monthlyIncome: number
  onAgeChange: (value: number) => void
  onDependentsChange: (value: number) => void
  onMonthlyIncomeChange: (value: number) => void
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value || 0)

export function CalculatorSection({
  age,
  dependents,
  monthlyIncome,
  onAgeChange,
  onDependentsChange,
  onMonthlyIncomeChange,
}: CalculatorSectionProps) {
  const yearsUntilUniversity = age
  const careerDurationOptions = [4, 5, 6]
  const minCareerDuration = careerDurationOptions[0]
  const maxCareerDuration =
    careerDurationOptions[careerDurationOptions.length - 1] ?? minCareerDuration

  const careerYears = Math.min(
    Math.max(dependents || 5, minCareerDuration),
    maxCareerDuration,
  )

  const currentSemesterCost = monthlyIncome
  const annualIncreaseRate = 0.05

  let totalCareerCost = 0

  for (let year = 0; year < careerYears; year++) {
    const yearsFromToday = yearsUntilUniversity + year
    const yearCost =
      currentSemesterCost * 2 * Math.pow(1 + annualIncreaseRate, yearsFromToday)
    totalCareerCost += yearCost
  }

  const monthsUntilUniversity = Math.max(yearsUntilUniversity * 12, 12)
  const monthlySavingNeeded = Math.round(totalCareerCost / monthsUntilUniversity)

  const formattedTotalCost = formatCurrency(Math.round(totalCareerCost || 0))
  const formattedMonthlySaving = formatCurrency(monthlySavingNeeded || 0)
  const formattedSemesterCost = formatCurrency(currentSemesterCost || 0)

  const whatsappMessage = encodeURIComponent(
    [
      "Hola Maritza, acabo de usar tu calculadora educativa y estos fueron mis resultados:",
      "",
      `• Mi hijo empezaría la universidad en ${yearsUntilUniversity} años.`,
      `• La carrera duraría aproximadamente ${careerYears} años.`,
      `• Valor del semestre hoy: ${formattedSemesterCost}.`,
      `• Costo total estimado de la carrera: ${formattedTotalCost}.`,
      `• Ahorro mensual estimado: ${formattedMonthlySaving}.`,
      "",
      "¿Me ayudas a crear un plan para lograrlo?",
    ].join("\n"),
  )

  const whatsappLink = `https://wa.me/573153183896?text=${whatsappMessage}`

  const handleRangeChange =
    (handler: (value: number) => void): React.ChangeEventHandler<HTMLInputElement> =>
    (event) => handler(Number(event.target.value))

  return (
    <section id="calculadora" className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Calcula el costo de la universidad de tu hijo
          </h2>
          <p className="text-lg text-muted-foreground">
            Proyecta el valor total de la carrera y el ahorro mensual que necesitas
            para estar tranquilo desde hoy.
          </p>
        </div>

        <div className="bg-background rounded-2xl p-8 border border-border space-y-10">

          {/* ⭐ Bloque premium al inicio dentro del card */}
          <div
            className="
              relative p-5 rounded-xl border border-yellow-300/30 bg-yellow-50/40
              shadow-[inset_0_0_10px_rgba(255,220,130,0.3)]
              animate-[fadeInUp_0.8s_ease-out]
              overflow-hidden
            "
            style={{ animationFillMode: "both" }}
          >
            {/* Línea decorativa */}
            <div className="absolute left-5 right-5 top-2 h-px bg-linear-to-r from-yellow-300/0 via-yellow-400/60 to-yellow-300/0" />

            <div className="flex items-start gap-3 mt-2">
              
              <p className="text-sm md:text-base text-yellow-800 font-medium leading-relaxed">
                Una póliza educativa no es solo un seguro: es una decisión inteligente y
                amorosa que transforma la incertidumbre del futuro en seguridad,
                tranquilidad y oportunidades ilimitadas para tus hijos.
              </p>
            </div>
          </div>

          {/* Años para que empiece la U */}
          <div className="space-y-3">
            <label htmlFor="years-university" className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                Años para que tu hijo empiece la universidad:{" "}
                <span className="text-primary">{yearsUntilUniversity} años</span>
              </span>
            </label>
            <input
              id="years-university"
              type="range"
              min={1}
              max={18}
              value={age}
              onChange={handleRangeChange(onAgeChange)}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Duración estimada */}
          <div className="space-y-3">
            <label htmlFor="career-years" className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                Duración estimada de la carrera:{" "}
                <span className="text-primary">{careerYears} años</span>
              </span>
            </label>

            <input
              id="career-years"
              type="range"
              min={minCareerDuration}
              max={maxCareerDuration}
              step={1}
              value={careerYears}
              onChange={handleRangeChange(onDependentsChange)}
              list="career-years-ticks"
              aria-valuetext={`${careerYears} años`}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <datalist id="career-years-ticks">
              {careerDurationOptions.map(option => (
                <option key={option} value={option} />
              ))}
            </datalist>

            <div className="flex justify-between text-xs text-muted-foreground px-1">
              {careerDurationOptions.map(option => (
                <span
                  key={option}
                  className={option === careerYears ? "text-primary font-semibold" : undefined}
                >
                  {option} años
                </span>
              ))}
            </div>
          </div>

          {/* Valor del semestre hoy */}
          <div className="space-y-3">
            <label htmlFor="semester-cost" className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                Valor del semestre hoy (COP):{" "}
                <span className="text-primary">{formattedSemesterCost}</span>
              </span>
            </label>

            <input
              id="semester-cost"
              type="range"
              min={3000000}
              max={40000000}
              step={500000}
              value={monthlyIncome}
              onChange={handleRangeChange(onMonthlyIncomeChange)}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Resultados */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-linear-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Costo total estimado de la carrera
              </p>
              <p className="text-3xl md:text-4xl font-bold text-primary">
                {formattedTotalCost}
              </p>
              <p className="text-xs mt-2 text-muted-foreground">
                Considerando {careerYears} años de estudio, 2 semestres por año y un
                incremento anual del 5%.
              </p>
            </div>

            <div className="bg-linear-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl p-6">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Ahorro mensual estimado
              </p>
              <p className="text-3xl md:text-4xl font-bold text-primary">
                {formattedMonthlySaving}
              </p>
              <p className="text-xs mt-2 text-muted-foreground">
                Si empiezas hoy, este sería el valor aproximado a ahorrar cada mes.
              </p>
            </div>
          </div>

          {/* CTA final */}
          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Si quieres que revisemos juntos estos resultados y construyamos un plan educativo a tu medida,
              puedes enviarle este cálculo directamente a Maritza:
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 bg-linear-to-r from-primary to-accent rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition transform hover:scale-105"
            >
              Enviar resultados a Maritza
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

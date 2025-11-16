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

const formatNumber = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export function CalculatorSection({
  age,
  dependents,
  monthlyIncome,
  onAgeChange,
  onDependentsChange,
  onMonthlyIncomeChange,
}: CalculatorSectionProps) {
  const recommendedCoverage = Math.round(monthlyIncome * 12 * 10 + dependents * 50000)

  const handleRangeChange =
    (handler: (value: number) => void): React.ChangeEventHandler<HTMLInputElement> =>
    (event) =>
      handler(Number(event.target.value))

  return (
    <section id="calculadora" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Descubre cuánto necesitas proteger</h2>
          <p className="text-lg text-muted-foreground">Una calculadora simple para estimar tus necesidades</p>
        </div>
        <div className="bg-background rounded-2xl p-8 border border-border space-y-8">
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                Tu edad: <span className="text-primary">{age} años</span>
              </span>
            </label>
            <input
              type="range"
              min="18"
              max="80"
              value={age}
              onChange={handleRangeChange(onAgeChange)}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                Número de dependientes: <span className="text-primary">{dependents}</span>
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="5"
              value={dependents}
              onChange={handleRangeChange(onDependentsChange)}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="font-semibold text-foreground">
                Ingreso mensual: <span className="text-primary">${formatNumber(monthlyIncome)}</span>
              </span>
            </label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={monthlyIncome}
              onChange={handleRangeChange(onMonthlyIncomeChange)}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
            <p className="text-muted-foreground mb-2">Cobertura recomendada:</p>
            <p className="text-4xl font-bold text-primary">${formatNumber(recommendedCoverage)}</p>
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition transform hover:scale-105 flex items-center justify-center gap-2">
            Obtén una cotización precisa
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}


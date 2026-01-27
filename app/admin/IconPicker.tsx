"use client"

import {
  Heart,
  Shield,
  Zap,
  CheckCircle2,
  BookOpen,
  Star,
  GraduationCap,
  HeartPulse,
  Stethoscope,
  AlertTriangle,
  Building2,
  CarFront,
  PiggyBank,
  HomeIcon,
  Calculator,
  type LucideIcon,
} from "lucide-react"

export const ICON_MAP = {
  heart: Heart,
  shield: Shield,
  zap: Zap,
  check: CheckCircle2,
  book: BookOpen,
  star: Star,
  graduation: GraduationCap,
  heartPulse: HeartPulse,
  stethoscope: Stethoscope,
  alert: AlertTriangle,
  building: Building2,
  car: CarFront,
  piggy: PiggyBank,
  home: HomeIcon,
  calculator: Calculator,
} as const

export type IconKey = keyof typeof ICON_MAP

type IconPickerProps = {
  value: string
  onChange: (icon: IconKey) => void
  disabled?: boolean
}

export function IconPicker({ value, onChange, disabled }: IconPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-2 p-3 bg-muted/30 rounded-lg border border-border">
      {Object.entries(ICON_MAP).map(([key, Icon]) => {
        const isSelected = value === key
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key as IconKey)}
            disabled={disabled}
            className={`p-3 rounded-md border-2 transition ${
              isSelected
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background hover:border-primary/50"
            } disabled:opacity-50`}
            title={key}
          >
            <Icon className="w-6 h-6 mx-auto" />
          </button>
        )
      })}
    </div>
  )
}

"use client"

type ColorPickerProps = {
  label: string
  value: string
  onChange: (color: string) => void
  disabled?: boolean
}

export function ColorPicker({ label, value, onChange, disabled }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-2 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-12 h-10 rounded-md border border-border cursor-pointer disabled:opacity-50"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="#000000"
          className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm disabled:opacity-50"
        />
      </div>
    </div>
  )
}

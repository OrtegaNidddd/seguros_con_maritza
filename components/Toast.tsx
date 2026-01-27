"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

type ToastProps = {
  message: string
  type?: "error" | "success" | "info"
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = "info", onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = {
    error: "bg-red-600",
    success: "bg-green-600",
    info: "bg-blue-600",
  }[type]

  return (
    <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md animate-in slide-in-from-top-5 fade-in duration-300`}>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/20 rounded transition"
        aria-label="Cerrar"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

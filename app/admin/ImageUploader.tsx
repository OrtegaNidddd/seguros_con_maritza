"use client"

import { Upload, X } from "lucide-react"
import { useState } from "react"

type ImageUploaderProps = {
  src: string
  alt: string
  onSrcChange: (src: string) => void
  onAltChange: (alt: string) => void
  onUpload: (file: File) => Promise<void>
  onError?: (message: string) => void
  disabled?: boolean
  label?: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function ImageUploader({
  src,
  alt,
  onSrcChange,
  onAltChange,
  onUpload,
  onError,
  disabled,
  label = "Imagen",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
      const errorMsg = `La imagen es muy grande (${sizeMB}MB). El tamaño máximo es 5MB.`
      onError?.(errorMsg)
      e.target.value = ""
      return
    }

    setUploading(true)
    try {
      await onUpload(file)
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  return (
    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border">
      <label className="block text-sm font-medium text-foreground">{label}</label>

      {src && (
        <div className="relative group">
          <img src={src} alt={alt || "Preview"} className="w-full h-64 object-contain rounded-lg border border-border bg-muted/50" />
          <button
            type="button"
            onClick={() => onSrcChange("")}
            disabled={disabled}
            className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-lg transition disabled:opacity-50 flex items-center gap-1"
            title="Quitar imagen"
          >
            <X className="w-4 h-4" />
            <span className="text-xs font-medium">Eliminar</span>
          </button>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Descripción alternativa (alt)</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Descripción de la imagen"
          disabled={disabled}
          className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm disabled:opacity-50"
        />
      </div>

      <label
        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md border-2 border-dashed transition cursor-pointer ${
          disabled || uploading
            ? "border-border bg-muted text-muted-foreground cursor-not-allowed"
            : "border-primary/50 bg-primary/5 text-primary hover:bg-primary/10"
        }`}
      >
        <Upload className="w-5 h-5" />
        <span className="text-sm font-medium">{uploading ? "Subiendo..." : "Seleccionar nueva imagen"}</span>
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={disabled || uploading} className="hidden" />
      </label>
    </div>
  )
}

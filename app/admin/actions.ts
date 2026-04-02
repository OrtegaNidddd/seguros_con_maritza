"use server"

import { revalidatePath } from "next/cache"
import { saveContent, type SiteContent } from "@/lib/content"
import { supabaseServer } from "@/lib/supabase-server"

const ADMIN_KEY = process.env.ADMIN_KEY || process.env.NEXT_ADMIN_KEY || ""
const BUCKET_NAME = "site-images"
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3 MB

function assertKey(key: string) {
  if (!ADMIN_KEY) {
    throw new Error("Falta configurar la variable de entorno ADMIN_KEY.")
  }
  if (key !== ADMIN_KEY) {
    throw new Error("Clave incorrecta.")
  }
}

export async function saveContentAction(content: SiteContent, key: string) {
  try {
    assertKey(key)
    await saveContent(content)
    revalidatePath("/")
    revalidatePath("/admin")
    return { ok: true }
  } catch (error) {
    console.error("[saveContentAction] Error:", error)
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Error desconocido al guardar",
    }
  }
}

export async function uploadImageAction(formData: FormData) {
  try {
    const key = String(formData.get("key") || "")
    assertKey(key)

    const file = formData.get("file")
    if (!file || !(file instanceof File)) {
      throw new Error("No se recibió un archivo válido.")
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      throw new Error("Solo se permiten imágenes JPG, PNG o WEBP.")
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("La imagen no puede superar 3 MB.")
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const extension = file.name.split(".").pop()?.toLowerCase()
    if (!extension || !["jpg", "jpeg", "png", "webp"].includes(extension)) {
      throw new Error("Extensión de archivo no permitida.")
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")
    const fileName = `${Date.now()}-${safeName}`
    const filePath = `uploads/${fileName}`

    const { error: uploadError } = await supabaseServer.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      throw new Error(`Error subiendo imagen: ${uploadError.message}`)
    }

    const { data } = supabaseServer.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath)

    revalidatePath("/")
    revalidatePath("/admin")

    return { ok: true, path: data.publicUrl }
  } catch (error) {
    console.error("[uploadImageAction] Error:", error)
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Error desconocido al subir imagen",
    }
  }
}
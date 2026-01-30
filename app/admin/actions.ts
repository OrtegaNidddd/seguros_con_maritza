"use server"

import fs from "fs/promises"
import path from "path"
import { revalidatePath } from "next/cache"
import { saveContent, type SiteContent } from "@/lib/content"

const ADMIN_KEY = process.env.ADMIN_KEY || process.env.NEXT_ADMIN_KEY || ""

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
    return { ok: false, error: error instanceof Error ? error.message : "Error desconocido al guardar" }
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

    if (!file.type.startsWith("image/")) {
      throw new Error("Solo se permiten imágenes.")
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-]/g, "_")
    const fileName = `${Date.now()}-${safeName}`
    const uploadDir = path.join(process.cwd(), "public", "src")
    const filePath = path.join(uploadDir, fileName)

    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(filePath, buffer)

    // Revalidar rutas para que Next.js reconozca el nuevo archivo en producción
    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath(`/src/${fileName}`)

    return { ok: true, path: `/src/${fileName}` }
  } catch (error) {
    console.error("[uploadImageAction] Error:", error)
    return { ok: false, error: error instanceof Error ? error.message : "Error desconocido al subir imagen" }
  }
}

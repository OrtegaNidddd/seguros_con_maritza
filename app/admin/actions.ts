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
  assertKey(key)
  await saveContent(content)
  revalidatePath("/")
  return { ok: true }
}

export async function uploadImageAction(formData: FormData) {
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

  return { path: `/src/${fileName}` }
}

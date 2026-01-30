import fs from "fs/promises"
import path from "path"
import { NextResponse, type NextRequest } from "next/server"

const UPLOADS_DIR = process.env.UPLOADS_DIR

async function pathExists(targetPath: string) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

async function resolvePublicDir() {
  if (UPLOADS_DIR) {
    return UPLOADS_DIR
  }

  const cwdPublic = path.join(process.cwd(), "public")
  if (await pathExists(cwdPublic)) {
    return cwdPublic
  }

  const standalonePublic = path.resolve(process.cwd(), "..", "..", "public")
  if (await pathExists(standalonePublic)) {
    return standalonePublic
  }

  return cwdPublic
}

function getContentType(fileName: string) {
  const ext = path.extname(fileName).toLowerCase()
  switch (ext) {
    case ".png":
      return "image/png"
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".webp":
      return "image/webp"
    case ".gif":
      return "image/gif"
    case ".svg":
      return "image/svg+xml"
    default:
      return "application/octet-stream"
  }
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const resolvedParams = await params
  const fileName = decodeURIComponent(resolvedParams.file)
  if (!fileName || fileName.includes("..")) {
    return NextResponse.json({ error: "Archivo inválido" }, { status: 400 })
  }

  try {
    const publicDir = await resolvePublicDir()
    const filePath = path.join(publicDir, "src", fileName)
    const fileBuffer = await fs.readFile(filePath)
    const contentType = getContentType(fileName)

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch {
    return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 })
  }
}

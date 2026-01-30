 "use client"

import { useMemo, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import HomePageClient from "@/components/HomePageClient"
import type { SiteContent, ImageContent, ServiceItem, TestimonialItem, SimpleItem, EducationalItem } from "@/lib/content"
import { saveContentAction, uploadImageAction } from "./actions"
import { IconPicker, type IconKey } from "./IconPicker"
import { ImageUploader } from "./ImageUploader"
import { ColorPicker } from "./ColorPicker"
import { Toast } from "@/components/Toast"

const DEFAULT_ICON = "shield"

type AdminPageClientProps = {
  initialContent: SiteContent
}

export function AdminPageClient({ initialContent }: AdminPageClientProps) {
  const [draft, setDraft] = useState<SiteContent>(initialContent)
  const [adminKey, setAdminKey] = useState("")
  const [showAdminKey, setShowAdminKey] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingIndex, setUploadingIndex] = useState<string | null>(null)
  const [tab, setTab] = useState<"editar" | "preview">("editar")
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null)

  const heroDescription = useMemo(() => draft.hero.description.join("\n"), [draft.hero.description])
  const aboutParagraphs = useMemo(() => draft.about.paragraphs.join("\n"), [draft.about.paragraphs])

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("key", adminKey)
    const result = await uploadImageAction(formData)
    
    if (!result.ok) {
      throw new Error(result.error || "Error al subir imagen")
    }
    
    setStatus("Imagen subida correctamente")
    return result.path!
  }

  const handleHeroImageUpload = async (file: File, index: number) => {
    setUploadingIndex(`hero-${index}`)
    try {
      const path = await uploadImage(file)
      setDraft((prev) => {
        const nextImages = [...prev.hero.images]
        const image = nextImages[index] ?? ({ src: "", alt: "" } as ImageContent)
        nextImages[index] = { ...image, src: path }
        return { ...prev, hero: { ...prev.hero, images: nextImages } }
      })
      setToast({ message: "Imagen subida correctamente", type: "success" })
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo subir la imagen"
      setToast({ message, type: "error" })
    } finally {
      setUploadingIndex(null)
    }
  }

  const handleAboutImageUpload = async (file: File) => {
    setUploadingIndex("about")
    try {
      const path = await uploadImage(file)
      setDraft((prev) => ({ ...prev, about: { ...prev.about, image: { ...prev.about.image, src: path } } }))
      setToast({ message: "Imagen subida correctamente", type: "success" })
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo subir la imagen"
      setToast({ message, type: "error" })
    } finally {
      setUploadingIndex(null)
    }
  }

  const updateSimpleList = (_list: SimpleItem[], updater: (items: SimpleItem[]) => SimpleItem[], key: keyof SiteContent) => {
    setDraft((prev) => ({ ...prev, [key]: { ...(prev as any)[key], items: updater((prev as any)[key].items) } }))
  }

  const updateEducationalList = (updater: (items: EducationalItem[]) => EducationalItem[]) => {
    setDraft((prev) => ({ ...prev, educational: { ...prev.educational, items: updater(prev.educational.items) } }))
  }

  const updateServicesList = (updater: (items: ServiceItem[]) => ServiceItem[]) => {
    setDraft((prev) => ({ ...prev, services: { ...prev.services, items: updater(prev.services.items) } }))
  }

  const updateTestimonialsList = (updater: (items: TestimonialItem[]) => TestimonialItem[]) => {
    setDraft((prev) => ({ ...prev, testimonials: { ...prev.testimonials, items: updater(prev.testimonials.items) } }))
  }

  const updateContactBenefits = (updater: (items: SimpleItem[]) => SimpleItem[]) => {
    setDraft((prev) => ({ ...prev, contact: { ...prev.contact, benefits: updater(prev.contact.benefits) } }))
  }

  const handleSave = async () => {
    setSaving(true)
    setStatus(null)
    try {
      const result = await saveContentAction(draft, adminKey)
      
      if (result.ok) {
        setStatus("Contenido guardado y publicado")
        setToast({ message: "Contenido guardado correctamente", type: "success" })
      } else {
        setStatus(result.error || "Error al guardar")
        setToast({ message: result.error || "Error al guardar", type: "error" })
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Error al guardar"
      setStatus(errorMsg)
      setToast({ message: errorMsg, type: "error" })
      console.error("[handleSave] Error:", error)
    } finally {
      setSaving(false)
    }
  }

  const disabled = !adminKey

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Panel de contenido</h1>
            <p className="text-sm text-muted-foreground">Edita textos e imágenes. Usa la clave para guardar.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <div className="flex items-center gap-2">
              <input
                type={showAdminKey ? "text" : "password"}
                placeholder="Clave de edición"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="px-3 py-2 rounded-md border border-border bg-background text-foreground"
              />
              <button
                type="button"
                onClick={() => setShowAdminKey((prev) => !prev)}
                className="px-3 py-2 rounded-md border border-border text-sm"
                aria-label={showAdminKey ? "Ocultar clave" : "Mostrar clave"}
              >
                {showAdminKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTab("editar")}
                className={`px-3 py-2 rounded-md border ${tab === "editar" ? "border-primary text-primary" : "border-border"}`}
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => setTab("preview")}
                className={`px-3 py-2 rounded-md border ${tab === "preview" ? "border-primary text-primary" : "border-border"}`}
              >
                Previsualizar
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={disabled || saving}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
        {status && <div className="max-w-7xl mx-auto px-4 pb-3 text-sm text-muted-foreground">{status}</div>}
      </div>

      {tab === "preview" ? (
        <div className="bg-muted/30">
          <HomePageClient content={draft} isPreview />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
          {/* Hero */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <header>
              <h2 className="text-xl font-semibold">Sección Hero</h2>
              <p className="text-sm text-muted-foreground">Encabezado principal de la página con título, descripción e imágenes</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Badge superior</label>
                  <input
                    value={draft.hero.badge}
                    onChange={(e) => setDraft((prev) => ({ ...prev, hero: { ...prev.hero, badge: e.target.value } }))}
                    placeholder="Ej: 40 años de experiencia"
                    className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Título principal</label>
                  <textarea
                    value={draft.hero.title}
                    onChange={(e) => setDraft((prev) => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                    placeholder="Título grande que captura la atención"
                    rows={2}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Párrafos descriptivos</label>
                  <p className="text-xs text-muted-foreground mb-2">Escribe cada párrafo en una línea nueva</p>
                  <textarea
                    value={heroDescription}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, description: e.target.value.split("\n").filter(Boolean) },
                      }))
                    }
                    placeholder="Párrafo 1&#10;Párrafo 2&#10;Párrafo 3"
                    rows={6}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Texto del botón</label>
                    <input
                      value={draft.hero.ctaLabel}
                      onChange={(e) => setDraft((prev) => ({ ...prev, hero: { ...prev.hero, ctaLabel: e.target.value } }))}
                      placeholder="¡Hablemos!"
                      className="w-full rounded-md border border-border px-3 py-2 bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Placeholder email</label>
                    <input
                      value={draft.hero.emailPlaceholder}
                      onChange={(e) =>
                        setDraft((prev) => ({ ...prev, hero: { ...prev.hero, emailPlaceholder: e.target.value } }))
                      }
                      placeholder="tu@email.com"
                      className="w-full rounded-md border border-border px-3 py-2 bg-background"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {draft.hero.images.map((img, index) => (
                  <ImageUploader
                    key={index}
                    src={img.src}
                    alt={img.alt}
                    label={`Imagen ${index + 1} (recomendado 800×1000px)`}
                    disabled={disabled || uploadingIndex === `hero-${index}`}
                    onSrcChange={(src) =>
                      setDraft((prev) => {
                        const nextImages = [...prev.hero.images]
                        nextImages[index] = { ...img, src }
                        return { ...prev, hero: { ...prev.hero, images: nextImages } }
                      })
                    }
                    onAltChange={(alt) =>
                      setDraft((prev) => {
                        const nextImages = [...prev.hero.images]
                        nextImages[index] = { ...img, alt }
                        return { ...prev, hero: { ...prev.hero, images: nextImages } }
                      })
                    }
                    onUpload={(file) => handleHeroImageUpload(file, index)}
                    onError={(msg) => setToast({ message: msg, type: "error" })}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Sobre mí */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <header>
              <h2 className="text-xl font-semibold">Sección "Sobre mí"</h2>
              <p className="text-sm text-muted-foreground">Presentación personal con foto y descripción</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Título de la sección</label>
                  <input
                    value={draft.about.title}
                    onChange={(e) => setDraft((prev) => ({ ...prev, about: { ...prev.about, title: e.target.value } }))}
                    placeholder="Sobre mí"
                    className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subtítulo destacado</label>
                  <textarea
                    value={draft.about.subtitle}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, about: { ...prev.about, subtitle: e.target.value } }))
                    }
                    placeholder="Presentación breve"
                    rows={2}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Párrafos descriptivos</label>
                  <p className="text-xs text-muted-foreground mb-2">Escribe cada párrafo en una línea nueva</p>
                  <textarea
                    value={aboutParagraphs}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        about: { ...prev.about, paragraphs: e.target.value.split("\n").filter(Boolean) },
                      }))
                    }
                    placeholder="Párrafo 1&#10;Párrafo 2"
                    rows={8}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background font-mono text-sm"
                  />
                </div>
              </div>

              <ImageUploader
                src={draft.about.image.src}
                alt={draft.about.image.alt}
                label="Foto de perfil (recomendado 340×400px)"
                disabled={disabled || uploadingIndex === "about"}
                onSrcChange={(src) =>
                  setDraft((prev) => ({ ...prev, about: { ...prev.about, image: { ...prev.about.image, src } } }))
                }
                onAltChange={(alt) =>
                  setDraft((prev) => ({ ...prev, about: { ...prev.about, image: { ...prev.about.image, alt } } }))
                }
                onUpload={handleAboutImageUpload}
                onError={(msg) => setToast({ message: msg, type: "error" })}
              />
            </div>
          </section>

          {/* Razones */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <header>
              <h2 className="text-xl font-semibold">Sección "¿Por qué elegir?"</h2>
              <p className="text-sm text-muted-foreground">Tarjetas con iconos que destacan beneficios clave</p>
            </header>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Título de la sección</label>
                <input
                  value={draft.reasons.title}
                  onChange={(e) => setDraft((prev) => ({ ...prev, reasons: { ...prev.reasons, title: e.target.value } }))}
                  className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  placeholder="¿Por qué elegir mis servicios?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Subtítulo</label>
                <input
                  value={draft.reasons.subtitle}
                  onChange={(e) => setDraft((prev) => ({ ...prev, reasons: { ...prev.reasons, subtitle: e.target.value } }))}
                  className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  placeholder="Yo personalmente te asesoraré..."
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {draft.reasons.items.map((item, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4 space-y-3 bg-muted/20">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Título de la tarjeta</label>
                    <input
                      value={item.title}
                      onChange={(e) =>
                        updateSimpleList(draft.reasons.items, (items) => {
                          const next = [...items]
                          next[idx] = { ...item, title: e.target.value }
                          return next
                        }, "reasons")
                      }
                      placeholder="Ej: Atención Personalizada"
                      className="w-full rounded-md border border-border px-3 py-2 bg-background text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">Icono</label>
                    <IconPicker
                      value={item.icon}
                      onChange={(icon) =>
                        updateSimpleList(draft.reasons.items, (items) => {
                          const next = [...items]
                          next[idx] = { ...item, icon }
                          return next
                        }, "reasons")
                      }
                      disabled={disabled}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">Descripción</label>
                    <textarea
                      value={item.desc}
                      onChange={(e) =>
                        updateSimpleList(draft.reasons.items, (items) => {
                          const next = [...items]
                          next[idx] = { ...item, desc: e.target.value }
                          return next
                        }, "reasons")
                      }
                      placeholder="Breve descripción del beneficio"
                      rows={3}
                      className="w-full rounded-md border border-border px-3 py-2 bg-background text-sm"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      updateSimpleList(draft.reasons.items, (items) => items.filter((_, i) => i !== idx), "reasons")
                    }
                    className="w-full text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    × Eliminar tarjeta
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateSimpleList(
                    draft.reasons.items,
                    (items) => [...items, { icon: DEFAULT_ICON, title: "Nueva tarjeta", desc: "Descripción del beneficio" }],
                    "reasons",
                  )
                }
                className="border-2 border-dashed border-border rounded-lg p-4 text-sm text-muted-foreground hover:border-primary hover:text-primary transition min-h-50 flex items-center justify-center"
              >
                + Añadir tarjeta
              </button>
            </div>
          </section>

          {/* Educación */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Recursos educativos</h2>
                <p className="text-sm text-muted-foreground">Recursos fijos (glosario, mitos, guía).</p>
              </div>
            </header>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Título de la sección</label>
                <input
                  value={draft.educational.title}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, educational: { ...prev.educational, title: e.target.value } }))
                  }
                  className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  placeholder="Ej: Aprende más sobre seguros"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtítulo destacado</label>
                <input
                  value={draft.educational.subtitle}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, educational: { ...prev.educational, subtitle: e.target.value } }))
                  }
                  className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  placeholder="Ej: Recursos y guías"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {draft.educational.items.map((item, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4 space-y-3 bg-muted/20">
                  <div>
                    <label className="block text-sm font-medium mb-1">Título del recurso</label>
                    <input
                      value={item.title}
                      onChange={(e) =>
                        updateEducationalList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, title: e.target.value }
                          return next
                        })
                      }
                      className="w-full rounded-md border border-border px-3 py-2 bg-background"
                      placeholder="Ej: Glosario de seguros"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Icono</label>
                    <IconPicker
                      value={item.icon}
                      onChange={(icon) =>
                        updateEducationalList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, icon }
                          return next
                        })
                      }
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <textarea
                      value={item.desc}
                      onChange={(e) =>
                        updateEducationalList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, desc: e.target.value }
                          return next
                        })
                      }
                      className="w-full rounded-md border border-border px-3 py-2 bg-background"
                      rows={2}
                      placeholder="Descripción del recurso"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => updateEducationalList((items) => items.filter((_, i) => i !== idx))}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    × Eliminar recurso
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateEducationalList((items) => [...items, { icon: DEFAULT_ICON, title: "Nuevo recurso", desc: "", href: "/" }])
                }
                className="w-full border-2 border-dashed border-border rounded-lg p-4 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors font-medium"
              >
                + Añadir recurso
              </button>
            </div>
          </section>

          {/* Servicios */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Servicios</h2>
                <p className="text-sm text-muted-foreground">Tarjetas con icono y colores personalizables.</p>
              </div>
            </header>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Título de la sección</label>
                <input
                  value={draft.services.title}
                  onChange={(e) => setDraft((prev) => ({ ...prev, services: { ...prev.services, title: e.target.value } }))}
                  className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  placeholder="Ej: Servicios de seguros"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtítulo destacado</label>
                <input
                  value={draft.services.subtitle}
                  onChange={(e) => setDraft((prev) => ({ ...prev, services: { ...prev.services, subtitle: e.target.value } }))}
                  className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  placeholder="Ej: Protección para cada necesidad"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {draft.services.items.map((item, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4 space-y-3 bg-muted/20">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre del servicio</label>
                    <input
                      value={item.title}
                      onChange={(e) =>
                        updateServicesList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, title: e.target.value }
                          return next
                        })
                      }
                      className="w-full rounded-md border border-border px-3 py-2 bg-background"
                      placeholder="Ej: Seguro de auto"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Icono</label>
                    <IconPicker
                      value={item.icon}
                      onChange={(icon) =>
                        updateServicesList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, icon }
                          return next
                        })
                      }
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <textarea
                      value={item.desc}
                      onChange={(e) =>
                        updateServicesList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, desc: e.target.value }
                          return next
                        })
                      }
                      className="w-full rounded-md border border-border px-3 py-2 bg-background"
                      rows={2}
                      placeholder="Texto descriptivo"
                    />
                  </div>
                  <ColorPicker
                    label="Color de fondo inicial"
                    value={item.bgColorStart}
                    onChange={(color) =>
                      updateServicesList((items) => {
                        const next = [...items]
                        next[idx] = { ...item, bgColorStart: color }
                        return next
                      })
                    }
                  />
                  <ColorPicker
                    label="Color de fondo final"
                    value={item.bgColorEnd}
                    onChange={(color) =>
                      updateServicesList((items) => {
                        const next = [...items]
                        next[idx] = { ...item, bgColorEnd: color }
                        return next
                      })
                    }
                  />
                  <ColorPicker
                    label="Color de texto"
                    value={item.textColor}
                    onChange={(color) =>
                      updateServicesList((items) => {
                        const next = [...items]
                        next[idx] = { ...item, textColor: color }
                        return next
                      })
                    }
                  />
                  <ColorPicker
                    label="Color de borde"
                    value={item.borderColor}
                    onChange={(color) =>
                      updateServicesList((items) => {
                        const next = [...items]
                        next[idx] = { ...item, borderColor: color }
                        return next
                      })
                    }
                  />
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={!!item.featured}
                      onChange={(e) =>
                        updateServicesList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, featured: e.target.checked }
                          return next
                        })
                      }
                      className="w-4 h-4"
                    />
                    Servicio destacado
                  </label>
                  <button
                    type="button"
                    onClick={() => updateServicesList((items) => items.filter((_, i) => i !== idx))}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    × Eliminar servicio
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateServicesList((items) => [
                    ...items,
                    {
                      icon: DEFAULT_ICON,
                      title: "Nuevo servicio",
                      desc: "Descripción del servicio",
                      bgColorStart: "#f3f4f6",
                      bgColorEnd: "#e5e7eb",
                      textColor: "#1f2937",
                      borderColor: "#d1d5db",
                      featured: false,
                    },
                  ])
                }
                className="w-full border-2 border-dashed border-border rounded-lg p-4 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors font-medium"
              >
                + Añadir servicio
              </button>
            </div>
          </section>

          {/* Testimonios */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Testimonios</h2>
                <p className="text-sm text-muted-foreground">Opiniones y valoraciones de clientes.</p>
              </div>
            </header>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Título de la sección</label>
                <input
                  value={draft.testimonials.title}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, testimonials: { ...prev.testimonials, title: e.target.value } }))
                  }
                  className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  placeholder="Ej: Testimonios de nuestros clientes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtítulo destacado</label>
                <input
                  value={draft.testimonials.subtitle}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, testimonials: { ...prev.testimonials, subtitle: e.target.value } }))
                  }
                  className="w-full rounded-md border border-border px-3 py-2 bg-background"
                  placeholder="Ej: Lo que dicen nuestros clientes"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {draft.testimonials.items.map((item, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4 space-y-3 bg-muted/20">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nombre del cliente</label>
                    <input
                      value={item.name}
                      onChange={(e) =>
                        updateTestimonialsList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, name: e.target.value }
                          return next
                        })
                      }
                      className="w-full rounded-md border border-border px-3 py-2 bg-background"
                      placeholder="Ej: María García"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Rol/Ocupación</label>
                    <input
                      value={item.role}
                      onChange={(e) =>
                        updateTestimonialsList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, role: e.target.value }
                          return next
                        })
                      }
                      className="w-full rounded-md border border-border px-3 py-2 bg-background"
                      placeholder="Ej: Dueña de negocio"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Testimonio</label>
                    <textarea
                      value={item.message}
                      onChange={(e) =>
                        updateTestimonialsList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, message: e.target.value }
                          return next
                        })
                      }
                      className="w-full rounded-md border border-border px-3 py-2 bg-background"
                      rows={3}
                      placeholder="Opinión del cliente"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Calificación (1-5)</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={item.rating}
                      onChange={(e) =>
                        updateTestimonialsList((items) => {
                          const next = [...items]
                          next[idx] = { ...item, rating: Number(e.target.value) }
                          return next
                        })
                      }
                      className="w-full rounded-md border border-border px-3 py-2 bg-background"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => updateTestimonialsList((items) => items.filter((_, i) => i !== idx))}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    × Eliminar testimonio
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  updateTestimonialsList((items) => [...items, { name: "Nombre", role: "Rol", message: "Mensaje", rating: 5 }])
                }
                className="w-full border-2 border-dashed border-border rounded-lg p-4 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors font-medium"
              >
                + Añadir testimonio
              </button>
            </div>
          </section>

          {/* Contacto */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Contacto</h2>
                <p className="text-sm text-muted-foreground">Formulario y beneficios de contactar.</p>
              </div>
            </header>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Título de la sección</label>
                  <input
                    value={draft.contact.title}
                    onChange={(e) => setDraft((prev) => ({ ...prev, contact: { ...prev.contact, title: e.target.value } }))}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background"
                    placeholder="Ej: Contáctanos hoy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subtítulo</label>
                  <textarea
                    value={draft.contact.subtitle}
                    onChange={(e) => setDraft((prev) => ({ ...prev, contact: { ...prev.contact, subtitle: e.target.value } }))}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background"
                    rows={2}
                    placeholder="Texto descriptivo del formulario"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium">Beneficios de contactar</label>
                {draft.contact.benefits.map((item, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-3 space-y-3 bg-muted/20">
                    <div>
                      <label className="block text-sm font-medium mb-1">Título del beneficio</label>
                      <input
                        value={item.title}
                        onChange={(e) =>
                          updateContactBenefits((items) => {
                            const next = [...items]
                            next[idx] = { ...item, title: e.target.value }
                            return next
                          })
                        }
                        className="w-full rounded-md border border-border px-3 py-2 bg-background"
                        placeholder="Ej: Respuesta rápida"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Icono</label>
                      <IconPicker
                        value={item.icon}
                        onChange={(icon) =>
                          updateContactBenefits((items) => {
                            const next = [...items]
                            next[idx] = { ...item, icon }
                            return next
                          })
                        }
                        disabled={disabled}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Descripción</label>
                      <textarea
                        value={item.desc}
                        onChange={(e) =>
                          updateContactBenefits((items) => {
                            const next = [...items]
                            next[idx] = { ...item, desc: e.target.value }
                            return next
                          })
                        }
                        className="w-full rounded-md border border-border px-3 py-2 bg-background"
                        rows={2}
                        placeholder="Descripción breve"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => updateContactBenefits((items) => items.filter((_, i) => i !== idx))}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      × Eliminar beneficio
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateContactBenefits((items) => [...items, { icon: DEFAULT_ICON, title: "Nuevo beneficio", desc: "" }])
                  }
                  className="w-full border-2 border-dashed border-border rounded-lg p-4 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors font-medium"
                >
                  + Añadir beneficio
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="bg-card border border-border rounded-xl p-6 space-y-4">
            <header className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Footer</h2>
                <p className="text-sm text-muted-foreground">Información del pie de página.</p>
              </div>
            </header>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Título del footer</label>
                  <input
                    value={draft.footer.title}
                    onChange={(e) => setDraft((prev) => ({ ...prev, footer: { ...prev.footer, title: e.target.value } }))}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background"
                    placeholder="Ej: Seguros con Maritza"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descripción corta</label>
                  <textarea
                    value={draft.footer.description}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, footer: { ...prev.footer, description: e.target.value } }))
                    }
                    className="w-full rounded-md border border-border px-3 py-2 bg-background"
                    rows={2}
                    placeholder="Descripción breve de la empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Texto "Acerca de"</label>
                  <textarea
                    value={draft.footer.about}
                    onChange={(e) => setDraft((prev) => ({ ...prev, footer: { ...prev.footer, about: e.target.value } }))}
                    className="w-full rounded-md border border-border px-3 py-2 bg-background"
                    rows={2}
                    placeholder="Información adicional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Copyright</label>
                  <input
                    value={draft.footer.copyright}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, footer: { ...prev.footer, copyright: e.target.value } }))
                    }
                    className="w-full rounded-md border border-border px-3 py-2 bg-background"
                    placeholder="© 2025 Seguros con Maritza"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-2">Información de contacto</label>
                  <p className="text-xs text-muted-foreground mb-3">Solo escribe el correo o número de teléfono. Los enlaces se crearán automáticamente.</p>
                </div>
                {draft.footer.contact.map((link, idx) => (
                  <div key={idx} className="space-y-2 p-3 bg-muted/20 rounded-lg border border-border">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Etiqueta</label>
                      <input
                        value={link.label}
                        onChange={(e) =>
                          setDraft((prev) => {
                            const next = [...prev.footer.contact]
                            next[idx] = { ...link, label: e.target.value }
                            return { ...prev, footer: { ...prev.footer, contact: next } }
                          })
                        }
                        className="w-full rounded-md border border-border px-3 py-2 bg-background text-sm"
                        placeholder="Ej: Email, WhatsApp, Teléfono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Valor</label>
                      <input
                        value={link.href}
                        onChange={(e) =>
                          setDraft((prev) => {
                            const next = [...prev.footer.contact]
                            next[idx] = { ...link, href: e.target.value }
                            return { ...prev, footer: { ...prev.footer, contact: next } }
                          })
                        }
                        className="w-full rounded-md border border-border px-3 py-2 bg-background text-sm"
                        placeholder="ejemplo@email.com o +573153183896"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
      
      {/* Toast notifications */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  )
}
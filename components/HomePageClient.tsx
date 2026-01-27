"use client"

import type React from "react"
import { useState } from "react"
import emailjs from "@emailjs/browser"
import { Header } from "@/components/sections/Header"
import { HeroSection } from "@/components/sections/HeroSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { WhyServicesSection } from "@/components/sections/WhyServicesSection"
import { EducationalSection } from "@/components/sections/EducationalSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { CalculatorSection } from "@/components/sections/CalculatorSection"
import { ContactSection, CONTACT_FORM_INITIAL_STATE, type ContactFormValues } from "@/components/sections/ContactSection"
import { Footer } from "@/components/sections/Footer"
import type { SiteContent } from "@/lib/content"

type HomePageClientProps = {
  content: SiteContent
  isPreview?: boolean
}

export default function HomePageClient({ content, isPreview = false }: HomePageClientProps) {
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(8)
  const [dependents, setDependents] = useState(5)
  const [monthlyIncome, setMonthlyIncome] = useState(8_000_000)

  const [formData, setFormData] = useState<ContactFormValues>(CONTACT_FORM_INITIAL_STATE)
  const [isNewsletterSending, setIsNewsletterSending] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null)
  const [isContactSending, setIsContactSending] = useState(false)
  const [contactMessage, setContactMessage] = useState<string | null>(null)

  const emailJsConfig = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
    newsletterTemplateId: process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID ?? "",
    contactTemplateId: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  }

  const sendEmail = (templateId: string, payload: Record<string, string>) => {
    if (isPreview) {
      return Promise.resolve()
    }
    if (!emailJsConfig.serviceId || !templateId || !emailJsConfig.publicKey) {
      return Promise.reject(new Error("Falta configurar EmailJS en las variables de entorno."))
    }

    return emailjs.send(emailJsConfig.serviceId, templateId, payload, emailJsConfig.publicKey)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsNewsletterSending(true)
    setNewsletterMessage(null)

    try {
      await sendEmail(emailJsConfig.newsletterTemplateId, {
        subscriber_email: email,
      })
      setNewsletterMessage("Gracias! Te escribire pronto con novedades.")
      setEmail("")
    } catch (error) {
      console.error("Error al enviar el correo de suscripcion:", error)
      setNewsletterMessage("Hubo un problema al enviar tu informacion. Por favor, intenta nuevamente en unos minutos.")
    } finally {
      setIsNewsletterSending(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsContactSending(true)
    setContactMessage(null)
    const submissionTime = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      dateStyle: "medium",
      timeStyle: "short",
    })

    try {
      const cleanedFormData = {
        nombreHijo: formData.nombreHijo.trim(),
        fechaNacimiento: formData.fechaNacimiento,
        anioEscolar: formData.anioEscolar.trim(),
        nombreTomador: formData.nombreTomador.trim(),
        documentoTomador: formData.documentoTomador.trim(),
        correo: formData.correo.trim(),
        celular: formData.celular.trim(),
        ciudad: formData.ciudad,
      }

      await sendEmail(emailJsConfig.contactTemplateId, {
        ...cleanedFormData,
        full_name: cleanedFormData.nombreHijo,
        time: submissionTime,
      })
      setContactMessage("Gracias! Me pondre en contacto contigo muy pronto.")
      setFormData(CONTACT_FORM_INITIAL_STATE)
    } catch (error) {
      console.error("Error al enviar el formulario de contacto:", error)
      setContactMessage("Hubo un problema al enviar tu informacion. Por favor, intentalo nuevamente.")
    } finally {
      setIsContactSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted">
      <Header />
      <HeroSection
        content={content.hero}
        email={email}
        onEmailChange={setEmail}
        onSubmit={handleSubscribe}
        isSending={isNewsletterSending}
        message={newsletterMessage}
        readOnly={isPreview}
      />
      <AboutSection content={content.about} />
      <WhyServicesSection content={content.reasons} />
      <EducationalSection content={content.educational} />
      <ServicesSection content={content.services} />
      <TestimonialsSection content={content.testimonials} />
      <CalculatorSection
        age={age}
        dependents={dependents}
        monthlyIncome={monthlyIncome}
        onAgeChange={setAge}
        onDependentsChange={setDependents}
        onMonthlyIncomeChange={setMonthlyIncome}
      />
      <ContactSection
        content={content.contact}
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        isSending={isContactSending}
        message={contactMessage}
        readOnly={isPreview}
      />
      <Footer content={content.footer} />
    </div>
  )
}

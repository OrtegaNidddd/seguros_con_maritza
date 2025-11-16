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

export default function Home() {
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(30)
  const [dependents, setDependents] = useState(2)
  const [monthlyIncome, setMonthlyIncome] = useState(5000)

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
      setNewsletterMessage("¡Gracias! Te escribiré pronto con novedades.")
      setEmail("")
    } catch (error) {
      console.error("Error al enviar el correo de suscripción:", error)
      setNewsletterMessage("No pude registrar tu correo. Intenta nuevamente en unos minutos.")
    } finally {
      setIsNewsletterSending(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
      await sendEmail(emailJsConfig.contactTemplateId, {
        ...formData,
        full_name: formData.nombreCompleto.trim(),
        time: submissionTime,
      })
      setContactMessage("¡Gracias! Me pondré en contacto contigo muy pronto.")
      setFormData(CONTACT_FORM_INITIAL_STATE)
    } catch (error) {
      console.error("Error al enviar el formulario de contacto:", error)
      setContactMessage("Hubo un problema al enviar tu información. Por favor, inténtalo nuevamente.")
    } finally {
      setIsContactSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />
      <HeroSection
        email={email}
        onEmailChange={setEmail}
        onSubmit={handleSubscribe}
        isSending={isNewsletterSending}
        message={newsletterMessage}
      />
      <AboutSection />
      <WhyServicesSection />
      <EducationalSection />
      <ServicesSection />
      <TestimonialsSection />
      <CalculatorSection
        age={age}
        dependents={dependents}
        monthlyIncome={monthlyIncome}
        onAgeChange={setAge}
        onDependentsChange={setDependents}
        onMonthlyIncomeChange={setMonthlyIncome}
      />
      <ContactSection
        formData={formData}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        isSending={isContactSending}
        message={contactMessage}
      />
      <Footer />
    </div>
  )
}

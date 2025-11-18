# Seguros con Maritza

Landing y micrositio educativo para la asesora de seguros Maritza Cañas. El proyecto está construido con **Next.js (App Router)**, **TypeScript** y **Tailwind**, e incluye calculadora educativa, formularios conectados a EmailJS y un blog ligero con glosario, mitos y guía para familias.

## Tabla de contenidos
1. [Stack principal](#stack-principal)
2. [Estructura de carpetas](#estructura-de-carpetas)
3. [Scripts disponibles](#scripts-disponibles)
4. [Configuración](#configuración)
5. [Flujo de componentes](#flujo-de-componentes)
6. [Calculadora educativa](#calculadora-educativa)
7. [Contenido educativo (`/screens`)](#contenido-educativo-screens)
8. [Optimización y SEO](#optimización-y-seo)
9. [Despliegue](#despliegue)
10. [Checklist antes de subir](#checklist-antes-de-subir)

## Stack principal
- **Next.js 16** (App Router, RSC y pages en `app/`).
- **React 19** con TypeScript estricto.
- **Tailwind CSS v4** + `tailwindcss-animate` y `tw-animate-css` para microinteracciones.
- **Lucide** para iconografía.
- **EmailJS** para envío de formularios (newsletter y contacto).
- **Radix UI / shadcn** como base de componentes accesibles (acordeones, popovers, sliders, etc.).

## Estructura de carpetas
```
app/
 ├─ layout.tsx            → fuente de tipografías Outfit/Lora y metadata
 ├─ globals.css           → tokens de color/tema y estilos base
 ├─ page.tsx              → landing principal (hero, servicios, calculadora, contacto…)
 ├─ robots.ts & sitemap.ts→ SEO técnico
 └─ screens/              → rutas adicionales (glosario, mitos, guía)

components/
 └─ sections/             → secciones reutilizables de la landing
     ├─ Header            → navegación desktop + menú hamburguesa con dropdown “Educación”
     ├─ Hero/About/Why... → bloques informativos
     ├─ CalculatorSection → calculadora educativa con link a WhatsApp
     ├─ ContactSection    → formulario EmailJS
     └─ Footer            → CTA final y links sociales

public/src/               → assets optimizados (logo, fotos, OG images)
lib/                      → utilidades y hooks (si aplica)
```

### Flujo de datos general
- `app/page.tsx` controla el estado global mínimo (newsletter/contacto/calculadora) y pasa handlers a las secciones.
- Formularios usan `emailjs.send` con IDs `NEXT_PUBLIC_EMAILJS_*` para enviar correos.
- La calculadora no envía correos; genera un mensaje formateado y abre `wa.me` con los resultados.

## Scripts disponibles
```bash
npm run dev     # servidor local (http://localhost:3000)
npm run build   # build de producción
npm run start   # levanta el build
npm run lint    # ejecuta ESLint
```

## Configuración
1. **Variables de entorno** (`.env.local`):
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
   NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID=...
   NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=...
   ```
2. **Dependencias**: `npm install`
3. **Contenido**: actualizar textos e imágenes en `components/sections` y `public/src` según la campaña.

## Calculadora educativa
- Controla tres inputs (años hasta universidad, duración de carrera y costo del semestre actual).
- Simula crecimiento del costo con un 5 % anual y calcula ahorro mensual recomendado.
- El CTA abre WhatsApp con un mensaje personalizado usando `encodeURIComponent`, facilitando el contacto directo.

## Contenido educativo (`/screens`)
- Rutas estáticas en `app/screens/{glosario, mitos, guia}`.
- Navegación accesible desde el dropdown “Educación” del header (links absolutos para evitar 403 en hosting).
- Cada página puede renderizar artículos, listas o acordeones con componentes de Radix.

## Optimización y SEO
- Metadata preconfigurada en `app/layout.tsx` (OpenGraph + íconos).
- `app/robots.ts` y `app/sitemap.ts` generan archivos en runtime.
- Imágenes en `public/src` listas para `next/image` o `<img>` standard según necesidad.
- Tipografías Google (Outfit / Lora) integradas con `next/font` y variables CSS.

## Despliegue
1. `npm run build`
2. Subir `.next`, `package.json`, `next.config.ts` y `public/` al servicio (Hostinger, Vercel, etc.).
3. Ejecutar `npm run start` en el server o configurar mediante panel.
4. Verificar rutas `/screens/*` (necesitan rewrite o soporte de servidor para rutas limpias).

## Checklist antes de subir
- [ ] `.env.local` con IDs correctos de EmailJS.
- [ ] Ejecutar `npm run lint` y `npm run build` sin errores.
- [ ] Revisar textos (todos mencionan **40 años de experiencia**).
- [ ] Optimizar imágenes pesadas dentro de `public/src`.
- [ ] Probar calculadora + WhatsApp y formularios tras el deploy.

¡Listo! Este README describe la arquitectura, configuración y flujo del proyecto para facilitar mantenimiento y contribuciones.

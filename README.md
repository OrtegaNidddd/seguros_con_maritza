# Seguros con Maritza

Landing y micrositio educativo creado para la asesora de seguros **Maritza Cañas**, con un enfoque en experiencia, confianza y educación financiera. El proyecto está construido con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS**, e integra calculadora educativa, recursos descargables, formularios conectados a EmailJS y rutas de contenido (`/screens`) con glosario, mitos y guía práctica para familias.

---

## Tabla de contenidos

- [Seguros con Maritza](#seguros-con-maritza)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Visión general](#visión-general)
  - [Stack y dependencias clave](#stack-y-dependencias-clave)
  - [Arquitectura y estructura de carpetas](#arquitectura-y-estructura-de-carpetas)
  - [Secciones principales](#secciones-principales)
  - [Flujo de datos y formularios](#flujo-de-datos-y-formularios)
  - [Calculadora educativa](#calculadora-educativa)
  - [Rutas educativas en `/screens`](#rutas-educativas-en-screens)
  - [Configuración y Variables de entorno](#configuración-y-variables-de-entorno)
  - [Scripts disponibles](#scripts-disponibles)
  - [Optimización, SEO y buenas prácticas](#optimización-seo-y-buenas-prácticas)
  - [Despliegue (Hostinger/Vercel)](#despliegue-hostingervercel)
    - [Vercel](#vercel)
    - [Hostinger u otro VPS](#hostinger-u-otro-vps)
  - [Checklist previo a producción](#checklist-previo-a-producción)
  - [Roadmap sugerido](#roadmap-sugerido)

---

## Visión general

- **Objetivo**: convertir visitantes en leads calificados tanto para pólizas tradicionales como para pólizas educativas, destacando la trayectoria de 40 años de la asesora.
- **Público**: familias colombianas buscando seguros de vida, salud, educación o planes financieros de largo plazo.
- **Narrativa**: mezcla storytelling (testimonios, trayectoria) con herramientas prácticas (calculadora, glosario y guía).
- **KPIs**: generación de contactos, clics hacia WhatsApp, uso de la calculadora, tasa de apertura en EmailJS.

---

## Stack y dependencias clave

| Categoría                    | Tecnologías / librerías principales                           |
| ---------------------------- | -------------------------------------------------------------- |
| Framework                    | Next.js 16 (App Router, React Server Components)              |
| Lenguaje                     | TypeScript                                                     |
| Estilos                      | Tailwind CSS v4, `tailwindcss-animate`, `tw-animate-css`       |
| Componentes UI               | Radix UI / shadcn (acordeón, menús, sliders, popovers)         |
| Iconografía                  | `lucide-react`                                                 |
| Formularios / Validación     | React Hook Form + Zod                                          |
| Envío de emails              | EmailJS (`@emailjs/browser`)                                   |
| Charts y visualización       | Recharts (para posibles extensiones)                          |
| UX movil                     | Menú hamburguesa animado + dropdown educativo accesible        |


---

## Arquitectura y estructura de carpetas

```
app/
 ├─ layout.tsx            → root layout, tipografías Google (Outfit/Lora), metadata OG
 ├─ globals.css           → tokens de color, tipografías, estilos base
 ├─ page.tsx              → landing principal (hero, servicios, calculadora, contacto, etc.)
 ├─ robots.ts & sitemap.ts→ definición programática de robots y sitemap XML
 └─ screens/              → rutas informativas auxiliares
     ├─ glosario/         → definiciones básicas de seguros
     ├─ mitos/            → desmitificación sobre pólizas
     └─ guia/             → pasos prácticos para planear un seguro educativo

components/
 └─ sections/             → secciones aisladas con props claros
     ├─ Header            → navegación principal + dropdown Educación + menú móvil animado
     ├─ HeroSection       → CTA principal, captura de email
     ├─ AboutSection      → storytelling con foto optimizada (`onLoad`)
     ├─ WhyServicesSection→ beneficios con iconografía
     ├─ EducationalSection→ cards que enlazan a `/screens`
     ├─ ServicesSection   → ofertas principales
     ├─ TestimonialsSection→ carrusel/stack de testimonios
     ├─ CalculatorSection → calculadora educativa con redirección a WhatsApp
     ├─ ContactSection    → formulario EmailJS
     └─ Footer            → links rápidos, CTA y redes

public/src/               → assets optimizados (logo, fotos hero, OG, favicon)
lib/                      → utilidades (si se agregan helpers comunes)
```

> **Tip**: cada sección está pensada para ser portable; si se requiere reordenar o reutilizar en otras páginas, basta con importarla y pasar los props correspondientes.

---

## Secciones principales

| Sección              | Highlights                                                                 |
| -------------------- | -------------------------------------------------------------------------- |
| **Header**           | Dropdown “Educación” con Glosario/Mitos/Guía, menú mobile con animación.   |
| **Hero**             | Formulario newsletter (EmailJS) + copy orientado a tranquilidad familiar.  |
| **About**            | Foto con transición suave, narrativa de 40 años de experiencia.            |
| **Why Services**     | Íconos (lucide) y bullet points de valor diferenciador.                    |
| **Educational**      | Tarjetas con accesos a `/screens` (contenido SEO y long-tail).             |
| **Calculator**       | Slider de edad, duración y costo semestral; genera mensaje automático.     |
| **Testimonials**     | Social proof; mensajes destacan resultados y confianza.                    |
| **Contact**          | Form con validaciones y envío EmailJS a la bandeja de Maritza.             |
| **Footer**           | Links, WhatsApp directo, derechos reservados.                              |

---

## Flujo de datos y formularios

1. **Newsletter (Hero)**:
   - Input controlado (`email`).
   - Al enviar, se llama a `sendEmail` con `NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID`.
   - Mensajes de éxito/error se guardan en estado local y se muestran bajo el formulario.

2. **Formulario de contacto**:
   - Manejo con React Hook Form / estado controlado (según versión actual).
   - Envía nombre, teléfono, correo, motivo y mensaje usando `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID`.
   - Logs en consola ayudan a depurar cuando EmailJS no está configurado correctamente.

3. **Calculadora educativa**:
   - No envía correos. Genera un texto estructurado con los resultados.
   - Usa `encodeURIComponent` y abre `https://wa.me/573153183896` con el mensaje prellenado.

---

## Calculadora educativa

Características clave:

- **Inputs**:
  - Años hasta que el hijo inicie universidad (slider 1–18).
  - Duración estimada de carrera (slider 4–6 años con datalist y etiquetas).
  - Valor actual del semestre (slider 3M–40M COP con step de 500k).
- **Cálculos**:
  - Incremento anual del 5 % aplicado a cada año de carrera.
  - Costo total = sumatoria de semestres futuros ajustados.
  - Ahorro mensual = total ÷ meses hasta iniciar (mín. 12 meses).
- **Salida**:
  - Resultados en cards responsivas (costo total y ahorro mensual).
  - CTA “Compartir por WhatsApp” con mensaje JSON-friendly.

Esto permite dar una experiencia inmediata de planeación sin depender de formularios complejos.

---

## Rutas educativas en `/screens`

- **`/screens/glosario`**: definiciones de términos (cobertura, deducible, etc.).
- **`/screens/mitos`**: listas de mitos y realidades; ideal para SEO long-tail (“¿Es caro un seguro educativo?”).
- **`/screens/guia`**: pasos concretos para elegir la póliza adecuada.
- Cada pantalla tiene su propio `layout.tsx` para controlar metadata y envoltorio visual.
- Los enlaces del header usan rutas absolutas (p. ej. `/screens/guia`) para evitar 403 al desplegar en Hostinger u otros servidores que diferencian trailing slash.

---

## Configuración y Variables de entorno

Crear `.env.local` en la raíz:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=XXXX
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=XXXX
NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID=XXXX
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=XXXX
```

> Si se añade otro flujo (p. ej. calculadora por EmailJS), incluir `NEXT_PUBLIC_EMAILJS_CALCULATOR_TEMPLATE_ID`.

Luego ejecutar `npm install` para resolver dependencias.

---

## Scripts disponibles

```bash
npm run dev     # Servidor local en http://localhost:3000
npm run build   # Compila la app para producción (analiza TypeScript y Next)
npm run start   # Arranca el build en modo producción
npm run lint    # Revisa estilo y posibles errores con ESLint
```

> Para despliegues en Hostinger, se recomienda `npm run build` seguido de `npm run start` (Node 18+).

---

## Optimización, SEO y buenas prácticas

- **Metadata**: configurada en `app/layout.tsx` (títulos dinámicos, descripción, OG image, base URL).
- **Sitemaps**: `app/sitemap.ts` y `app/robots.ts` generan los archivos automáticamente.
- **Imágenes**: colocadas en `public/src/` (el header usa `logo.webp` y las secciones `foto_maritza.webp`, etc.).
- **Tipografías**: `next/font/google` (Outfit y Lora) con variables CSS (`--font-outfit`, `--font-lora`).
- **Accesibilidad**:
  - Menú hamburguesa con atributos `aria-expanded`.
  - Dropdown de Educación con botones y focus states.
  - Inputs con `label` claros y contrastes adecuados.
- **Performance**: se evita cargar librerías pesadas; Radix se usa de forma modular.
- **Internacionalización**: project en español, pero se puede integrar i18n en `next.config.ts` si es necesario.

---

## Despliegue (Hostinger/Vercel)

### Vercel
1. Conectar repo.
2. Añadir variables de entorno desde el panel.
3. Deploy automático (`npm run build`).

### Hostinger u otro VPS
1. Subir archivos del proyecto.
2. Instalar dependencias (`npm install --production`).
3. Ejecutar `npm run build`.
4. Servir con `npm run start` (usar PM2 o servicio systemd si aplica).
5. Asegurar que el servidor soporte rutas limpias de Next (rewrites a `index.js`).

> Importante: si se ven 403 en `/screens/*`, revisar que los enlaces sean absolutos y que el hosting no fuerce un slash extra.

---

## Checklist previo a producción

- [ ] `.env.local` completo con IDs reales de EmailJS.
- [ ] `npm run lint` sin errores ni `console.log` residuales.
- [ ] `npm run build` exitoso.
- [ ] Revisar que los textos mencionen **40 años de experiencia** (Why, Testimonials, Contact, About).
- [ ] Verificar imágenes en `public/src` (peso y formato webp/jpg).
- [ ] Probar Newsletter, Contacto y CTA de calculadora en el entorno de staging.
- [ ] Confirmar que `/screens/*` cargan sin 403 después del deploy.
- [ ] Actualizar `README` si cambian dependencias o flujos.

---

## Roadmap sugerido

1. **Testimonios dinámicos**: conectar a CMS ligero o Google Sheets.
2. **Notificaciones**: integrar `sonner` o Radix Toast para feedback en formularios.
3. **Dark mode**: ya se tienen tokens; solo falta el switch con `next-themes`.
4. **Blog / casos**: ampliar `/screens` con más contenidos SEO.
5. **Tests**: agregar pruebas unitarias para componentes críticos (calculadora, formularios).
6. **Analytics**: instrumentar GA4 o PostHog para medir eventos clave (clics en WhatsApp, envíos de formularios).

---
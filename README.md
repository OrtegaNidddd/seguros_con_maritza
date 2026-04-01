# 🛡️ Seguros con Maritza – Plataforma Web y CMS

Aplicación web desarrollada para la asesora de seguros **Maritza Cañas**, diseñada para informar, educar y convertir visitantes en clientes potenciales.

El proyecto incluye:

* Landing page optimizada para conversión
* Micrositio educativo sobre seguros
* Calculadora interactiva
* Sistema de contenido editable (CMS interno)
* Panel administrativo sin código
* Integración con Supabase para persistencia de datos
* Despliegue serverless en Vercel

El sistema permite que la cliente **gestione el contenido del sitio sin conocimientos técnicos**, manteniendo una infraestructura moderna y escalable.

---

# 📚 Tabla de Contenido

1. Descripción del Proyecto
2. Objetivos del Sistema
3. Arquitectura General
4. Stack Tecnológico
5. Estructura del Proyecto
6. Flujo de Funcionamiento
7. Instalación del Proyecto
8. Configuración de Variables de Entorno
9. Supabase (Base de Datos y Storage)
10. Panel Administrativo
11. Manejo de Imágenes
12. Despliegue en Producción
13. Seguridad
14. Problemas Comunes

---

# 1️⃣ Descripción del Proyecto

El sitio **Seguros con Maritza** es una plataforma web diseñada para:

* explicar productos de seguros de forma clara
* resolver dudas comunes
* desmontar mitos sobre seguros
* captar clientes potenciales
* permitir edición del contenido sin código

El proyecto utiliza **Next.js con App Router** y un backend serverless basado en **Supabase**.

---

# 2️⃣ Objetivos del Sistema

### Objetivo principal

Crear una plataforma digital profesional para asesoría de seguros que permita:

* generación de confianza
* educación del cliente
* generación de leads
* gestión simple del contenido

### Objetivos técnicos

* arquitectura serverless
* bajo costo de infraestructura
* edición visual del contenido
* escalabilidad
* mantenimiento sencillo

---

# 3️⃣ Arquitectura del Sistema

El sistema sigue una arquitectura **Serverless JAMstack moderna**.

```
Usuario
   ↓
Frontend (Next.js)
   ↓
Server Actions
   ↓
Supabase
   ├ PostgreSQL (contenido CMS)
   └ Storage (imágenes)
```

### Componentes

Frontend
→ Next.js App Router

Backend
→ Supabase

Persistencia
→ PostgreSQL

Almacenamiento de imágenes
→ Supabase Storage

Hosting
→ Vercel

---

# 4️⃣ Stack Tecnológico

## Frontend

* Next.js 16
* React 19
* TypeScript
* TailwindCSS

## UI

* shadcn/ui
* Radix UI
* Lucide Icons
* Embla Carousel

## Formularios

* React Hook Form
* Zod

## Backend

* Supabase
* PostgreSQL

## Deploy

* Vercel

---

# 5️⃣ Estructura del Proyecto

```
seguros_con_maritza
├─ ADMIN_GUIDE.md
├─ README.md
├─ app
│  ├─ admin
│  │  ├─ AdminPageClient.tsx
│  │  ├─ ColorPicker.tsx
│  │  ├─ IconPicker.tsx
│  │  ├─ ImageUploader.tsx
│  │  ├─ actions.ts
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ isotipo.png
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  ├─ page.tsx
│  ├─ robots.ts
│  ├─ screens
│  │  ├─ glosario
│  │  │  ├─ GlossaryPageClient.tsx
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  ├─ guia
│  │  │  ├─ GuidePageClient.tsx
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx
│  │  └─ mitos
│  │     ├─ MitosPageClient.tsx
│  │     ├─ layout.tsx
│  │     └─ page.tsx
│  ├─ sitemap.ts
│  └─ src
│     └─ [file]
│        └─ route.ts
├─ components
│  ├─ AOSInit.tsx
│  ├─ HomePageClient.tsx
│  ├─ Toast.tsx
│  └─ sections
│     ├─ AboutSection.tsx
│     ├─ CalculatorSection.tsx
│     ├─ ContactSection.tsx
│     ├─ EducationalSection.tsx
│     ├─ Footer.tsx
│     ├─ Header.tsx
│     ├─ HeroSection.tsx
│     ├─ ServicesSection.tsx
│     ├─ TestimonialsSection.tsx
│     └─ WhyServicesSection.tsx
├─ components.json
├─ data
│  └─ content.json
├─ eslint.config.mjs
├─ lib
│  ├─ content.ts
│  ├─ supabase-server.ts
│  ├─ supabase.ts
│  └─ utils.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  └─ src
└─ tsconfig.json

```

---

# 6️⃣ Flujo de Funcionamiento

### Edición de contenido

```
Admin Panel
    ↓
Server Action
    ↓
Supabase (tabla site_content)
    ↓
Frontend re-render
```

### Subida de imágenes

```
Admin Panel
   ↓
uploadImageAction
   ↓
Supabase Storage
   ↓
URL pública
```

---

# 7️⃣ Instalación del Proyecto

Clonar repositorio:

```bash
git clone https://github.com/OrtegaNidddd/seguros_con_maritza.git
cd seguros_con_maritza
```

Instalar dependencias:

```bash
npm install
```

Ejecutar entorno local:

```bash
npm run dev
```

Aplicación disponible en:

```
http://localhost:3000
```

---

# 8️⃣ Variables de Entorno

Crear archivo:

```
.env.local
```

Variables requeridas:

```
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

ADMIN_KEY=
```

### Descripción

| Variable          | Uso                   |
| ----------------- | --------------------- |
| SUPABASE_URL      | conexión a Supabase   |
| SUPABASE_ANON_KEY | acceso público        |
| SERVICE_ROLE_KEY  | operaciones server    |
| ADMIN_KEY         | autenticación del CMS |

---

# 9️⃣ Configuración de Supabase

Crear proyecto en:

```
https://supabase.com
```

### Tabla requerida

```
site_content
```

Campos:

| Campo        | Tipo        |
| ------------ | ----------- |
| id           | uuid        |
| section_key  | text        |
| content_json | jsonb       |
| updated_at   | timestamptz |

---

### Bucket de imágenes

Crear bucket:

```
site-images
```

Modo:

```
public
```

---

# 🔟 Panel Administrativo

Ruta:

```
/admin
```

Funcionalidades:

* editar contenido del sitio
* modificar textos
* subir imágenes
* actualizar testimonios
* modificar secciones

El contenido se guarda en Supabase.

---

# 1️⃣1️⃣ Manejo de Imágenes

Las imágenes se almacenan en:

```
Supabase Storage
```

Ruta típica:

```
site-images/uploads
```

Ejemplo de URL pública:

```
https://xxxx.supabase.co/storage/v1/object/public/site-images/uploads/image.webp
```

---

# 1️⃣2️⃣ Despliegue en Producción

La aplicación está optimizada para **Vercel**.

Pasos:

1. Conectar repositorio en Vercel
2. Configurar variables de entorno
3. Deploy automático

No se requiere:

* VPS
* Docker
* configuración manual de servidores

---

# 1️⃣3️⃣ Seguridad

El sistema utiliza varias capas de seguridad.

### CMS protegido

```
ADMIN_KEY
```

### Server Actions protegidas

Validación de clave administrativa.

### Supabase

* acceso restringido
* operaciones sensibles solo desde server

---

# 1️⃣4️⃣ Problemas Comunes

### Error Next.js vulnerable

Actualizar:

```
npm install next@latest
```

---

### Imágenes no cargan

Verificar bucket:

```
site-images
```

Debe ser **public**.

---

### CMS no guarda contenido

Verificar:

```
SUPABASE_SERVICE_ROLE_KEY
```

---

# 📄 Licencia

Proyecto privado.

Uso exclusivo para **Seguros con Maritza**.
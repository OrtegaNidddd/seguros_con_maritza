# Panel de Administración - Seguros con Maritza

## 🎯 Descripción

Panel CMS visual para modificar todo el contenido del sitio web sin necesidad de conocimientos técnicos.

## 🔐 Acceso al Panel

1. Abre tu navegador y ve a: `http://localhost:3000/admin` (o tu dominio en producción)
2. Ingresa la contraseña configurada en `.env.local` (por defecto: `admin123`)
3. Haz clic en "Ingresar"

## 📝 Configuración Inicial

### Cambiar la Contraseña

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Modifica el valor de `ADMIN_KEY`:
   ```env
   ADMIN_KEY=tu_nueva_contraseña_aquí
   ```
3. Guarda el archivo
4. Reinicia el servidor de desarrollo (Ctrl+C y luego `npm run dev`)

## ✨ Funcionalidades del Panel

### 🖼️ Carga de Imágenes
- Haz clic en "Subir archivo" para seleccionar una imagen de tu computadora
- Verás una vista previa automática de la imagen seleccionada
- También puedes pegar una URL directamente si prefieres
- Las imágenes se guardan en la carpeta `public/src`

### 🎨 Selección de Iconos
- Haz clic en el icono que desees usar
- Se resalta automáticamente el icono seleccionado
- Disponibles 15 iconos prediseñados

### 🌈 Selector de Colores
- Usa el selector visual de color (cuadrado de color)
- O escribe directamente el código hexadecimal (ej: #ff0000)
- Los colores se sincronizan automáticamente

### 👀 Vista Previa
- Haz clic en la pestaña "Vista Previa" en la parte superior
- Verás exactamente cómo se ve el sitio con tus cambios
- Los formularios están deshabilitados en modo vista previa

### 💾 Guardar Cambios
1. Haz todos los cambios que necesites en la pestaña "Editar"
2. Haz clic en el botón "Guardar cambios" en la parte superior
3. Verás un mensaje de confirmación
4. Los cambios se reflejan inmediatamente en el sitio público

## 📋 Secciones Editables

### 1️⃣ Hero (Portada)
- Badge superior
- Título principal
- Párrafos descriptivos
- 2 imágenes con descripciones

### 2️⃣ Acerca De
- Título y subtítulo
- 3 párrafos descriptivos
- Foto de perfil

### 3️⃣ Por Qué Elegirnos
- Título y subtítulo
- Tarjetas con icono, título y descripción
- Botón de añadir/eliminar tarjetas

### 4️⃣ Recursos Educativos
- Título y subtítulo
- Tarjetas con icono, título, descripción y enlace
- Botón de añadir/eliminar recursos

### 5️⃣ Servicios
- Título y subtítulo
- Tarjetas personalizables:
  - Nombre del servicio
  - Icono
  - Descripción
  - 4 colores (fondo inicial, fondo final, texto, borde)
  - Checkbox "Destacado"
- Botón de añadir/eliminar servicios

### 6️⃣ Testimonios
- Título y subtítulo
- Tarjetas de testimonios:
  - Nombre del cliente
  - Rol/Ocupación
  - Testimonio completo
  - Calificación (1-5 estrellas)
- Botón de añadir/eliminar testimonios

### 7️⃣ Contacto
- Título y subtítulo del formulario
- Beneficios de contactar:
  - Título del beneficio
  - Icono
  - Descripción
- Botón de añadir/eliminar beneficios

### 8️⃣ Footer (Pie de Página)
- Título del footer
- Descripción corta
- Texto "Acerca de"
- Copyright
- Enlaces internos (texto + ruta)
- Enlaces de contacto (texto + enlace)

## 🚀 Comandos para Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura de Archivos

```
/app/admin/
  ├── page.tsx              # Página principal del admin
  ├── AdminPageClient.tsx   # Componente cliente del panel
  ├── actions.ts            # Acciones del servidor (guardar/upload)
  ├── IconPicker.tsx        # Selector visual de iconos
  ├── ImageUploader.tsx     # Componente de carga de imágenes
  └── ColorPicker.tsx       # Selector visual de colores

/data/
  └── content.json          # Contenido del sitio (generado automáticamente)

/lib/
  └── content.ts            # Tipos y funciones para leer/escribir contenido

/public/src/
  └── ...                   # Imágenes subidas
```

## ⚠️ Notas Importantes

1. **No modifiques manualmente** el archivo `data/content.json` - usa el panel admin
2. **Las imágenes** se guardan en `public/src/` con nombres únicos (timestamp)
3. **Los cambios son inmediatos** - no hay caché, se recarga el contenido en cada visita
4. **Usa contraseñas seguras** en producción
5. **Haz backup** del archivo `data/content.json` regularmente

## 🐛 Solución de Problemas

### No puedo acceder al admin
- Verifica que `.env.local` exista y tenga `ADMIN_KEY` configurado
- Reinicia el servidor después de cambiar `.env.local`

### Las imágenes no se ven
- Verifica que la carpeta `public/src` tenga permisos de escritura
- Asegúrate de que el servidor esté corriendo

### Los cambios no se guardan
- Verifica la contraseña en `.env.local`
- Revisa la consola del navegador (F12) por errores
- Asegúrate de hacer clic en "Guardar cambios"

## 📞 Soporte

Para cualquier duda o problema, contacta al desarrollador del sitio.

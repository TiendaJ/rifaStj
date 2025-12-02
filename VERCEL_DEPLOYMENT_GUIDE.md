# Guía de Despliegue en Vercel

Tu proyecto está configurado y listo para desplegarse en Vercel. Sigue estos pasos:

## 1. Preparación en Vercel
1. Ve a [vercel.com](https://vercel.com) e inicia sesión.
2. Haz clic en **"Add New..."** -> **"Project"**.
3. Importa tu repositorio de GitHub (`rifaStj`).

## 2. Configuración de Variables de Entorno
En la pantalla de configuración del proyecto en Vercel, busca la sección **"Environment Variables"** y añade las siguientes claves (copia los valores de tu archivo `.env` o `supabase_config.txt`):

| Clave | Valor |
|-------|-------|
| `DATABASE_URL` | Tu URL de conexión de Supabase (Pooling, puerto 6543) |
| `DIRECT_URL` | Tu URL directa de Supabase (Direct, puerto 5432) |
| `NEXT_PUBLIC_APP_URL` | La URL de tu dominio (ej. `https://tu-proyecto.vercel.app`) |

> **IMPORTANTE:** Asegúrate de reemplazar `[YOUR-PASSWORD]` con tu contraseña real de la base de datos en las URLs.

## 3. Despliegue
1. Haz clic en **"Deploy"**.
2. Vercel detectará automáticamente que es un proyecto Next.js.
3. El comando de construcción (`Build Command`) debe ser `next build`.
4. El comando de instalación (`Install Command`) debe ser `npm install`.
5. El script `postinstall` en `package.json` ejecutará automáticamente `prisma generate` para generar el cliente de base de datos.

## 4. Notas Importantes

### Base de Datos (Supabase)
Asegúrate de haber ejecutado el siguiente comando localmente para subir tu estructura de base de datos a Supabase antes de desplegar:
```bash
npx prisma db push
```

### Imágenes (Advertencia)
Actualmente, el sistema guarda las imágenes en la carpeta `public/uploads`.
**En Vercel, los archivos subidos al sistema de archivos desaparecen después de un tiempo** (porque es una arquitectura serverless).
Para un entorno de producción real, se recomienda configurar **Supabase Storage** o **Vercel Blob** para guardar las imágenes de las rifas de forma permanente.

### Autenticación
Si usas autenticación basada en cookies/sesiones, asegúrate de generar secretos seguros si tu código lo requiere (ej. `JWT_SECRET` o `AUTH_SECRET`) y añadirlos también a las variables de entorno de Vercel.

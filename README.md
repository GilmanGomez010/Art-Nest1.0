# ART NEST - Plataforma de Red Social para Artistas

![ART NEST Logo](public/logo.png)

## Descripción del Proyecto

ART NEST es una aplicación web progresiva (PWA) diseñada como una red social para artistas, donde pueden compartir sus obras, conectar con otros creadores y descubrir contenido artístico. La aplicación cuenta con un sistema completo de autenticación, gestión de publicaciones, subida de imágenes y funcionalidades sociales como likes y comentarios.

## Tecnologías Utilizadas

### Frontend
- **Next.js 15** - Framework de React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS v4** - Framework de estilos utility-first
- **shadcn/ui** - Componentes de UI reutilizables

### Gestión de Estado
- **React Context API** - Para autenticación y estado global
- **React Hooks** - useState, useEffect, useCallback, useMemo
- **localStorage** - Almacenamiento persistente en el navegador

### Librerías Adicionales
- **Lucide React** - Iconos modernos
- **date-fns** - Manipulación de fechas
- **Browser Image Compression** - Compresión de imágenes en el cliente

## Arquitectura del Proyecto

### Estructura de Carpetas

\`\`\`
art-nest/
├── app/                          # Rutas de la aplicación (App Router)
│   ├── login/                    # Página de inicio de sesión
│   ├── register/                 # Página de registro
│   ├── forgot-password/          # Recuperación de contraseña
│   ├── reset-password/           # Restablecer contraseña
│   ├── mobile/                   # Aplicación móvil principal
│   │   ├── page.tsx             # Feed principal (Home)
│   │   ├── search/              # Búsqueda de publicaciones
│   │   ├── create/              # Crear nueva publicación
│   │   ├── community/           # Comunidad de artistas
│   │   └── profile/             # Perfil de usuario
│   ├── layout.tsx               # Layout principal
│   └── globals.css              # Estilos globales y tokens de diseño
│
├── components/                   # Componentes reutilizables
│   ├── ui/                      # Componentes base de shadcn/ui
│   ├── image-upload.tsx         # Componente de subida de imágenes
│   ├── image-gallery.tsx        # Galería de imágenes con modal
│   ├── mobile-nav.tsx           # Navegación móvil inferior
│   └── widgets/                 # Widgets reutilizables
│       ├── loading-spinner.tsx  # Indicador de carga
│       ├── empty-state.tsx      # Estado vacío
│       ├── error-message.tsx    # Mensajes de error
│       ├── success-message.tsx  # Mensajes de éxito
│       ├── confirmation-dialog.tsx # Diálogos de confirmación
│       ├── stat-card.tsx        # Tarjetas de estadísticas
│       ├── pull-to-refresh.tsx  # Pull to refresh
│       └── toast-notification.tsx # Notificaciones toast
│
├── lib/                         # Lógica de negocio y utilidades
│   ├── auth.tsx                # Context de autenticación
│   ├── models/                 # Modelos de datos TypeScript
│   │   └── publication.ts      # Interfaces y tipos
│   └── services/               # Servicios de API
│       ├── api-service.ts      # Servicio principal CRUD
│       └── image-service.ts    # Servicio de imágenes
│
├── public/                      # Archivos estáticos
│   ├── logo.png                # Logo de la aplicación
│   └── female-artist-avatar.jpg # Avatar por defecto
│
└── hooks/                       # Custom hooks
    ├── use-mobile.tsx          # Detección de dispositivo móvil
    └── use-toast.ts            # Sistema de notificaciones
\`\`\`

## Modelos de Datos

### Usuario (User)
\`\`\`typescript
interface User {
  id: string;              // ID único del usuario
  email: string;           // Email (único)
  username: string;        // Nombre de usuario
  fullName: string;        // Nombre completo
  avatar?: string;         // URL del avatar (opcional)
  bio?: string;           // Biografía (opcional)
  followers: number;       // Número de seguidores
  following: number;       // Número de seguidos
  createdAt: Date;        // Fecha de creación
}
\`\`\`

### Publicación (Publication)
\`\`\`typescript
interface Publication {
  id: string;              // ID único de la publicación
  userId: string;          // ID del usuario creador
  username: string;        // Nombre del usuario
  userAvatar?: string;     // Avatar del usuario
  title: string;           // Título de la obra
  description: string;     // Descripción
  images: string[];        // Array de URLs de imágenes
  category: string;        // Categoría artística
  tags: string[];          // Etiquetas
  likes: number;           // Número de likes
  comments: number;        // Número de comentarios
  views: number;           // Número de vistas
  likedBy: string[];       // IDs de usuarios que dieron like
  createdAt: Date;        // Fecha de creación
  updatedAt: Date;        // Fecha de actualización
}
\`\`\`

### Comentario (Comment)
\`\`\`typescript
interface Comment {
  id: string;              // ID único del comentario
  publicationId: string;   // ID de la publicación
  userId: string;          // ID del usuario
  username: string;        // Nombre del usuario
  userAvatar?: string;     // Avatar del usuario
  content: string;         // Contenido del comentario
  likes: number;           // Número de likes
  createdAt: Date;        // Fecha de creación
}
\`\`\`

## Servicios Principales

### ApiService (lib/services/api-service.ts)

Servicio singleton que maneja todas las operaciones CRUD de la aplicación.

#### Métodos de Publicaciones
\`\`\`typescript
// Obtener todas las publicaciones
getPublications(): Promise<Publication[]>

// Obtener publicación por ID
getPublicationById(id: string): Promise<Publication | null>

// Crear nueva publicación
createPublication(data: CreatePublicationData): Promise<Publication>

// Actualizar publicación
updatePublication(id: string, data: Partial<Publication>): Promise<Publication>

// Eliminar publicación
deletePublication(id: string): Promise<boolean>

// Buscar publicaciones
searchPublications(query: string, filters?: SearchFilters): Promise<Publication[]>

// Dar/quitar like
toggleLike(publicationId: string, userId: string): Promise<Publication>
\`\`\`

#### Métodos de Usuarios
\`\`\`typescript
// Obtener usuario por ID
getUserById(id: string): Promise<User | null>

// Actualizar perfil de usuario
updateUser(id: string, data: Partial<User>): Promise<User>

// Obtener publicaciones de un usuario
getUserPublications(userId: string): Promise<Publication[]>
\`\`\`

#### Métodos de Comentarios
\`\`\`typescript
// Obtener comentarios de una publicación
getComments(publicationId: string): Promise<Comment[]>

// Crear comentario
createComment(data: CreateCommentData): Promise<Comment>

// Eliminar comentario
deleteComment(id: string): Promise<boolean>
\`\`\`

### ImageService (lib/services/image-service.ts)

Servicio para manejo y optimización de imágenes.

#### Métodos Principales
\`\`\`typescript
// Comprimir imagen antes de subir
compressImage(file: File, options?: CompressionOptions): Promise<File>

// Convertir imagen a base64
imageToBase64(file: File): Promise<string>

// Validar archivo de imagen
validateImageFile(file: File): ValidationResult

// Redimensionar imagen
resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File>
\`\`\`

#### Opciones de Compresión
\`\`\`typescript
interface CompressionOptions {
  maxSizeMB: number;        // Tamaño máximo en MB (default: 1)
  maxWidthOrHeight: number; // Dimensión máxima (default: 1920)
  useWebWorker: boolean;    // Usar Web Worker (default: true)
  quality: number;          // Calidad 0-1 (default: 0.8)
}
\`\`\`

## Sistema de Autenticación

### AuthContext (lib/auth.tsx)

Proveedor de contexto que maneja el estado de autenticación global.

#### Estado del Contexto
\`\`\`typescript
interface AuthContextType {
  user: User | null;                    // Usuario actual
  isAuthenticated: boolean;             // Estado de autenticación
  isLoading: boolean;                   // Cargando
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
}
\`\`\`

#### Flujo de Autenticación

1. **Registro**
   - Usuario completa formulario de registro
   - Se validan los datos (email único, contraseña segura)
   - Se crea el usuario en localStorage
   - Se genera un ID único con UUID
   - Se redirige al login

2. **Login**
   - Usuario ingresa email y contraseña
   - Se validan las credenciales contra localStorage
   - Se guarda el usuario en el contexto
   - Se guarda el ID en localStorage como "currentUserId"
   - Se redirige a /mobile (feed principal)

3. **Recuperación de Contraseña**
   - Usuario ingresa su email en /forgot-password
   - Se genera un código de verificación (simulado)
   - Se muestra el código en consola (en producción se enviaría por email)
   - Usuario ingresa el código en /reset-password
   - Se valida el código (código de prueba: "123456")
   - Usuario ingresa nueva contraseña
   - Se actualiza la contraseña en localStorage

4. **Logout**
   - Se limpia el usuario del contexto
   - Se elimina "currentUserId" de localStorage
   - Se redirige a /login

## Componentes Principales

### ImageUpload (components/image-upload.tsx)

Componente completo para subida de imágenes con múltiples características.

#### Características
- Drag and drop de archivos
- Selección múltiple de imágenes
- Preview de imágenes antes de subir
- Compresión automática de imágenes
- Validación de tipo y tamaño de archivo
- Indicador de progreso
- Eliminación de imágenes seleccionadas
- Límite configurable de imágenes

#### Props
\`\`\`typescript
interface ImageUploadProps {
  onImagesChange: (images: string[]) => void;  // Callback con imágenes en base64
  maxImages?: number;                          // Máximo de imágenes (default: 5)
  maxSizeMB?: number;                         // Tamaño máximo por imagen (default: 5)
}
\`\`\`

#### Uso
\`\`\`tsx
<ImageUpload
  onImagesChange={(images) => setImages(images)}
  maxImages={5}
  maxSizeMB={5}
/>
\`\`\`

### ImageGallery (components/image-gallery.tsx)

Galería de imágenes con modal de vista detallada.

#### Características
- Grid responsive de imágenes
- Modal de vista completa
- Navegación entre imágenes (anterior/siguiente)
- Zoom y pan en imágenes
- Contador de imágenes
- Cierre con ESC o click fuera

#### Props
\`\`\`typescript
interface ImageGalleryProps {
  images: string[];           // Array de URLs de imágenes
  className?: string;         // Clases CSS adicionales
}
\`\`\`

### MobileNav (components/mobile-nav.tsx)

Barra de navegación inferior para móviles.

#### Características
- 5 pestañas principales: Home, Buscar, Crear, Comunidad, Perfil
- Indicador visual de pestaña activa
- Iconos de Lucide React
- Diseño fixed en la parte inferior
- Responsive y accesible

## Páginas de la Aplicación

### /login - Inicio de Sesión
- Formulario de login con email y contraseña
- Validación de campos
- Enlace a registro
- Enlace a recuperación de contraseña
- Redirección automática si ya está autenticado

### /register - Registro
- Formulario completo de registro
- Validación de email único
- Validación de contraseña segura
- Confirmación de contraseña
- Términos y condiciones
- Redirección a login después de registro exitoso

### /forgot-password - Recuperar Contraseña
- Formulario para ingresar email
- Generación de código de verificación
- Instrucciones para siguiente paso
- Enlace para volver al login

### /reset-password - Restablecer Contraseña
- Formulario con código de verificación
- Nueva contraseña con confirmación
- Validación de código (código de prueba: "123456")
- Validación de contraseña segura
- Redirección a login después de éxito

### /mobile - Feed Principal
- Lista de publicaciones de todos los usuarios
- Tarjetas de publicación con imagen, título, descripción
- Botón de like funcional
- Contador de likes, comentarios y vistas
- Pull to refresh para actualizar
- Estado de carga y estado vacío

### /mobile/search - Búsqueda
- Barra de búsqueda por texto
- Filtros por categoría artística
- Filtros por etiquetas
- Resultados en tiempo real
- Grid de publicaciones encontradas

### /mobile/create - Crear Publicación
- Formulario completo de creación
- Subida de múltiples imágenes (hasta 5)
- Título y descripción
- Selector de categoría
- Etiquetas (tags)
- Preview de imágenes
- Validación de campos requeridos
- Mensaje de éxito después de publicar

### /mobile/community - Comunidad
- Lista de artistas destacados
- Tarjetas de usuario con avatar y estadísticas
- Botón de seguir/dejar de seguir
- Contador de seguidores y publicaciones
- Búsqueda de artistas

### /mobile/profile - Perfil
- Información del usuario actual
- Avatar, nombre, biografía
- Estadísticas (publicaciones, seguidores, seguidos)
- Grid de publicaciones del usuario
- Botón de editar perfil
- Botón de cerrar sesión

## Widgets Reutilizables

### LoadingSpinner
Indicador de carga animado con diferentes tamaños.

\`\`\`tsx
<LoadingSpinner size="lg" text="Cargando publicaciones..." />
\`\`\`

### EmptyState
Estado vacío con icono, título y descripción.

\`\`\`tsx
<EmptyState
  icon={ImageIcon}
  title="No hay publicaciones"
  description="Sé el primero en compartir tu arte"
  action={<Button>Crear publicación</Button>}
/>
\`\`\`

### ErrorMessage
Mensaje de error con icono y opción de reintentar.

\`\`\`tsx
<ErrorMessage
  message="Error al cargar las publicaciones"
  onRetry={() => fetchPublications()}
/>
\`\`\`

### SuccessMessage
Mensaje de éxito con icono y animación.

\`\`\`tsx
<SuccessMessage message="Publicación creada exitosamente" />
\`\`\`

### ConfirmationDialog
Diálogo de confirmación para acciones destructivas.

\`\`\`tsx
<ConfirmationDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Eliminar publicación"
  description="¿Estás seguro de que quieres eliminar esta publicación?"
  onConfirm={handleDelete}
/>
\`\`\`

### StatCard
Tarjeta de estadística con icono y valor.

\`\`\`tsx
<StatCard
  icon={Heart}
  label="Likes"
  value={1234}
  trend="+12%"
/>
\`\`\`

### PullToRefresh
Componente de pull to refresh para listas.

\`\`\`tsx
<PullToRefresh onRefresh={async () => await fetchData()}>
  <div>{/* Contenido */}</div>
</PullToRefresh>
\`\`\`

### ToastNotification
Sistema de notificaciones toast.

\`\`\`tsx
const { toast } = useToast();

toast({
  title: "Éxito",
  description: "Publicación creada",
  variant: "success"
});
\`\`\`

## Sistema de Diseño

### Paleta de Colores

La aplicación utiliza tokens de diseño semánticos definidos en `app/globals.css`:

\`\`\`css
--background: 0 0% 100%;           /* Fondo principal blanco */
--foreground: 240 10% 3.9%;        /* Texto principal oscuro */
--primary: 142 76% 36%;            /* Verde artístico */
--primary-foreground: 0 0% 100%;   /* Texto sobre primary */
--secondary: 240 4.8% 95.9%;       /* Gris claro */
--accent: 142 76% 36%;             /* Acento verde */
--muted: 240 4.8% 95.9%;          /* Gris suave */
--destructive: 0 84.2% 60.2%;     /* Rojo para acciones destructivas */
\`\`\`

### Tipografía

- **Font Sans**: Geist Sans (fuente principal)
- **Font Mono**: Geist Mono (código y monoespaciado)

Tamaños de texto:
- `text-xs`: 12px
- `text-sm`: 14px
- `text-base`: 16px
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px
- `text-3xl`: 30px

### Espaciado

Sistema de espaciado basado en Tailwind (1 unidad = 0.25rem = 4px):
- `p-2`: 8px padding
- `p-4`: 16px padding
- `p-6`: 24px padding
- `gap-4`: 16px gap
- `space-y-4`: 16px espacio vertical

### Componentes UI

Todos los componentes base están en `components/ui/` y siguen el sistema de diseño de shadcn/ui:
- Button
- Card
- Input
- Label
- Avatar
- Badge
- Dialog
- Tabs
- Select
- Textarea

## Instalación y Configuración

### Requisitos Previos
- Node.js 18+ instalado
- npm o yarn como gestor de paquetes
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Pasos de Instalación

1. **Descargar el proyecto**
   - Desde v0: Click en los tres puntos (⋯) → "Download ZIP"
   - Descomprimir el archivo

2. **Instalar dependencias**
   \`\`\`bash
   cd art-nest
   npm install
   \`\`\`

3. **Ejecutar en desarrollo**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Abrir en el navegador**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Scripts Disponibles

\`\`\`json
{
  "dev": "next dev",           // Servidor de desarrollo
  "build": "next build",       // Build de producción
  "start": "next start",       // Servidor de producción
  "lint": "next lint"          // Linter de código
}
\`\`\`

## Flujo de Datos

### Ciclo de Vida de una Publicación

1. **Creación**
   \`\`\`
   Usuario → ImageUpload → Compresión → Base64
   ↓
   Formulario → Validación → ApiService.createPublication()
   ↓
   localStorage → Actualización de estado → Redirección
   \`\`\`

2. **Visualización**
   \`\`\`
   Componente → useEffect → ApiService.getPublications()
   ↓
   localStorage → Deserialización → Estado del componente
   ↓
   Renderizado → ImageGallery → UI
   \`\`\`

3. **Interacción (Like)**
   \`\`\`
   Click → ApiService.toggleLike(publicationId, userId)
   ↓
   Actualizar likedBy array → Incrementar/decrementar likes
   ↓
   localStorage → Actualización de estado → Re-renderizado
   \`\`\`

### Persistencia de Datos

Todos los datos se almacenan en localStorage con las siguientes claves:

\`\`\`typescript
// Usuarios registrados
localStorage.setItem('users', JSON.stringify(users));

// Usuario actual (ID)
localStorage.setItem('currentUserId', userId);

// Publicaciones
localStorage.setItem('publications', JSON.stringify(publications));

// Comentarios
localStorage.setItem('comments', JSON.stringify(comments));
\`\`\`

## Limitaciones Actuales

### Almacenamiento
- **localStorage limitado**: Máximo ~5-10MB dependiendo del navegador
- **Sin persistencia en la nube**: Los datos se pierden al limpiar caché
- **Imágenes en base64**: Ocupan más espacio que archivos binarios
- **Sin sincronización**: Los datos no se comparten entre dispositivos

### Autenticación
- **Sin encriptación de contraseñas**: Las contraseñas se guardan en texto plano
- **Sin tokens JWT**: No hay sistema de sesiones seguro
- **Sin expiración de sesión**: La sesión persiste indefinidamente
- **Recuperación simulada**: No se envían emails reales

### Funcionalidades
- **Sin backend real**: Todo se ejecuta en el cliente
- **Sin notificaciones push**: No hay sistema de notificaciones en tiempo real
- **Sin chat**: No hay mensajería entre usuarios
- **Sin búsqueda avanzada**: Búsqueda básica por texto

## Mejoras Futuras Recomendadas

### Corto Plazo (1-2 semanas)

1. **Integrar Base de Datos**
   - Supabase o Neon para PostgreSQL
   - Migrar datos de localStorage a base de datos
   - Crear tablas: users, publications, comments, likes

2. **Almacenamiento de Imágenes**
   - Vercel Blob o Cloudinary
   - Subir imágenes a la nube
   - Generar URLs públicas

3. **Autenticación Segura**
   - Implementar Supabase Auth
   - Hash de contraseñas con bcrypt
   - Tokens JWT para sesiones
   - Refresh tokens

### Mediano Plazo (1-2 meses)

4. **Sistema de Comentarios**
   - Interfaz de comentarios en publicaciones
   - Respuestas a comentarios (threads)
   - Notificaciones de comentarios

5. **Sistema de Seguimiento**
   - Seguir/dejar de seguir usuarios
   - Feed personalizado de seguidos
   - Notificaciones de nuevas publicaciones

6. **Búsqueda Avanzada**
   - Búsqueda full-text con PostgreSQL
   - Filtros múltiples combinados
   - Ordenamiento por relevancia, fecha, popularidad

7. **Perfil de Usuario Completo**
   - Edición de perfil con avatar
   - Biografía y enlaces sociales
   - Portafolio de obras

### Largo Plazo (3-6 meses)

8. **Mensajería Directa**
   - Chat en tiempo real con WebSockets
   - Notificaciones de mensajes
   - Historial de conversaciones

9. **Notificaciones Push**
   - Web Push API
   - Notificaciones de likes, comentarios, seguidores
   - Configuración de preferencias

10. **Monetización**
    - Venta de obras de arte
    - Comisiones personalizadas
    - Integración con Stripe

11. **Análisis y Estadísticas**
    - Dashboard de analytics
    - Estadísticas de vistas y engagement
    - Insights de audiencia

12. **Moderación de Contenido**
    - Reportar publicaciones inapropiadas
    - Sistema de moderación para administradores
    - Filtros de contenido

## Guía de Desarrollo

### Agregar una Nueva Página

1. Crear archivo en `app/nueva-pagina/page.tsx`
2. Implementar el componente
3. Agregar navegación en `mobile-nav.tsx` si es necesario
4. Actualizar rutas protegidas en `layout.tsx` si requiere autenticación

### Crear un Nuevo Componente

1. Crear archivo en `components/nombre-componente.tsx`
2. Definir props con TypeScript
3. Implementar lógica y UI
4. Exportar el componente
5. Documentar props y uso

### Agregar un Nuevo Servicio

1. Crear archivo en `lib/services/nombre-service.ts`
2. Implementar clase o funciones
3. Agregar tipos TypeScript
4. Exportar métodos públicos
5. Documentar API del servicio

### Modificar el Modelo de Datos

1. Actualizar interfaces en `lib/models/`
2. Actualizar métodos en `api-service.ts`
3. Migrar datos existentes en localStorage si es necesario
4. Actualizar componentes que usen el modelo

## Solución de Problemas

### La aplicación no carga
- Verificar que Node.js esté instalado: `node --version`
- Verificar que las dependencias estén instaladas: `npm install`
- Limpiar caché: `rm -rf .next` y `npm run dev`

### Las imágenes no se suben
- Verificar tamaño del archivo (máximo 5MB)
- Verificar formato (JPG, PNG, GIF, WebP)
- Verificar espacio en localStorage (limpiar datos antiguos)
- Abrir consola del navegador para ver errores

### Los datos se pierden
- localStorage se limpia al borrar caché del navegador
- Usar modo incógnito puede no persistir datos
- Verificar que el navegador permita localStorage

### Error de autenticación
- Verificar que el email esté registrado
- Verificar que la contraseña sea correcta
- Limpiar localStorage y volver a registrarse
- Verificar que no haya errores en la consola

## Contacto y Soporte

Para preguntas, sugerencias o reportar problemas:

- **Documentación**: Este archivo README.md
- **Código fuente**: Disponible en el proyecto descargado
- **Soporte v0**: https://vercel.com/help

## Licencia

Este proyecto es un prototipo educativo creado con v0 by Vercel.

---

**Última actualización**: Enero 2025  
**Versión**: 1.0.0  
**Autor**: Generado con v0 by Vercel

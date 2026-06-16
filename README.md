# Portal Académico — UTLM

Sistema de gestión académica integral para la **Universidad Tecnológica de La Mancha**. Plataforma web moderna con SSR que centraliza la administración de estudiantes, docentes, cursos, horarios, pagos y reportes académicos, con roles diferenciados.

## Roles

| Rol | Descripción |
|------|-------------|
| **Administrador** | Gestión de estudiantes, docentes, cursos y periodos |
| **Profesor** | Toma de asistencia, registro de calificaciones, cursos asignados |
| **Alumno** | Inscripción, horarios, calificaciones, historial académico, estado de cuenta |
| **Ejecutivo** | Dashboard ejecutivo con reportes y métricas |
| **Finanzas** | Gestión de pagos de colegiatura y cursos, historial de pagos |

## Funcionalidades

- **Autenticación** por roles con vistas y permisos diferenciados
- **Panel de administración**: CRUD de estudiantes, profesores, cursos y periodos
- **Módulo de profesor**: gestión de asistencias y calificaciones por curso
- **Portal del alumno**: inscripción a cursos, consulta de horario, calificaciones, historial académico y estado de cuenta
- **Módulo de finanzas**: registro y consulta de pagos (colegiaturas y cursos)
- **Dashboard ejecutivo** con visualización de datos y reportes
- **SSR** con renderizado del lado del servidor para mejor SEO y rendimiento
- **UI responsiva** con componentes accesibles (shadcn/ui + Radix UI)

## Tecnologías

| Tecnología | Versión |
|------------|---------|
| [TanStack Start](https://tanstack.com/start) (SSR) | latest |
| [React](https://react.dev) | 19 |
| [Vite](https://vitejs.dev) | 7 |
| [Tailwind CSS](https://tailwindcss.com) | 4 |
| [shadcn/ui](https://ui.shadcn.com) | latest |
| [Radix UI](https://www.radix-ui.com) | latest |
| [TanStack Router](https://tanstack.com/router) | 1.x |
| [TanStack Query](https://tanstack.com/query) | 5.x |
| [React Hook Form](https://react-hook-form.com) + Zod | latest |
| [Recharts](https://recharts.org) | 3.x |
| [Bun](https://bun.sh) | latest |

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── AppLayout.tsx     # Layout principal con navegación por rol
├── hooks/
│   └── use-mobile.tsx    # Hook para detección de dispositivo móvil
├── lib/
│   ├── api/              # Funciones de API
│   ├── auth.ts           # Lógica de autenticación
│   ├── mock-data.ts      # Datos mock para desarrollo
│   └── utils.ts          # Utilidades generales
├── routes/
│   ├── __root.tsx        # Layout raíz
│   ├── index.tsx         # Página de inicio
│   ├── login.tsx         # Inicio de sesión
│   ├── admin.*.tsx       # Rutas de administrador
│   ├── teacher.*.tsx     # Rutas de profesor
│   ├── student.*.tsx     # Rutas de alumno
│   ├── executive.*.tsx   # Rutas de ejecutivo
│   └── finance.*.tsx     # Rutas de finanzas
├── router.tsx            # Configuración del router
├── server.ts             # Entry point del servidor SSR
├── start.ts              # Punto de entrada de la app
└── styles.css            # Estilos globales
```

## Requisitos

- [Bun](https://bun.sh) instalado

## Instalación y ejecución

```bash
# Instalar Bun
npm install -g bun

# Clonar el repositorio
git clone <url-del-repo>
cd proyecto-AP

# Instalar dependencias
bun install

# Iniciar servidor de desarrollo
bun run dev
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `bun run dev` | Inicia el servidor de desarrollo |
| `bun run build` | Compila para producción |
| `bun run build:dev` | Compila en modo desarrollo |
| `bun run preview` | Previsualiza la compilación de producción |
| `bun run lint` | Ejecuta ESLint |
| `bun run format` | Formatea el código con Prettier |

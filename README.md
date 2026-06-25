# Portal Académico — UTLM

Sistema de gestión académica integral para la **Universidad Tecnológica La Mejor (UTLM)**. Plataforma web moderna con SSR que centraliza la administración de estudiantes, docentes, cursos, horarios, pagos y reportes académicos, con roles diferenciados por tipo de usuario.

## Roles del sistema

| Rol | Descripción |
|------|-------------|
| **Estudiante** | Matrícula de cursos, consulta de horario, calificaciones, historial académico y estado de cuenta |
| **Docente** | Toma de asistencia, registro de calificaciones y gestión de cursos asignados |
| **Administrador** | CRUD completo de estudiantes, docentes, cursos y períodos académicos |
| **Financiero** | Registro y procesamiento de pagos de matrícula y cursos, historial de transacciones |
| **Ejecutivo** | Dashboard con indicadores estratégicos, reportes académicos y financieros |

## Funcionalidades principales

- **Autenticación por rol** con vistas y navegación diferenciadas por perfil
- **Portal del estudiante**: matrícula con control de créditos, horario semanal interactivo, calificaciones por componente, historial académico por período y estado de cuenta con pago en línea
- **Portal del docente**: lista de cursos activos, registro de asistencia por sesión y publicación de calificaciones por componente
- **Panel de administración**: gestión completa de estudiantes y docentes (ver, editar, activar/desactivar), gestión de cursos con asignación de docentes, y línea de tiempo de períodos académicos
- **Módulo financiero**: procesamiento de pagos de matrícula y cursos, selección de cargos pendientes y múltiples métodos de pago, historial completo de transacciones con búsqueda y filtros
- **Dashboard ejecutivo**: tendencia de matrícula, ingresos por período, distribución por carrera, rendimiento por facultad e indicadores presupuestarios
- **UI responsiva** con componentes accesibles (shadcn/ui + Radix UI)
- **SSR** con TanStack Start para mejor rendimiento y SEO

## Tecnologías

| Tecnología | Versión |
|------------|---------|
| [TanStack Start](https://tanstack.com/start) (SSR) | 1.x |
| [React](https://react.dev) | 19 |
| [Vite](https://vitejs.dev) | 7 |
| [Tailwind CSS](https://tailwindcss.com) | 4 |
| [TanStack Router](https://tanstack.com/router) | 1.x |
| [TanStack Query](https://tanstack.com/query) | 5.x |
| [Recharts](https://recharts.org) | 3.x |
| [React Hook Form](https://react-hook-form.com) + Zod | latest |
| [shadcn/ui](https://ui.shadcn.com) + Radix UI | latest |
| TypeScript | 5.x |

## Requisitos previos

- **Node.js** 18+ o **Bun** (recomendado)
- npm, yarn o bun como gestor de paquetes

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd proyecto-AP

# Instalar dependencias (elige uno)
npm install
# o con Bun:
bun install

# Iniciar servidor de desarrollo
npm run dev
# o:
bun run dev
```

La aplicación estará disponible en `http://localhost:8080` (o el siguiente puerto disponible).

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Compila para producción |
| `npm run build:dev` | Compila en modo desarrollo |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run format` | Formatea el código con Prettier |

## Credenciales de demostración

El sistema usa datos mock. Para acceder, selecciona el rol deseado en el formulario de login y usa cualquier combinación de:

| Campo | Valor |
|-------|-------|
| **Correo** | cualquier email válido (ej. `demo@utlm.ac.cr`) |
| **Contraseña** | `1234` |
| **Rol** | selecciona el que quieras probar |

Cada rol carga automáticamente un usuario demo con datos precargados.

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── AppLayout.tsx     # Layout principal, sidebar, StatCard, Modal, Toast
├── lib/
│   ├── auth.ts           # Lógica de sesión por rol (localStorage)
│   ├── mock-data.ts      # Datos de demostración
│   └── utils.ts          # Utilidades generales
├── routes/
│   ├── __root.tsx        # Layout raíz
│   ├── index.tsx         # Redirección a login
│   ├── login.tsx         # Pantalla de inicio de sesión
│   ├── admin.*.tsx       # Rutas del administrador
│   ├── teacher.*.tsx     # Rutas del docente
│   ├── student.*.tsx     # Rutas del estudiante
│   ├── finance.*.tsx     # Rutas del módulo financiero
│   └── executive.*.tsx   # Rutas del ejecutivo
├── styles.css            # Estilos globales y tokens de diseño
└── router.tsx            # Configuración del router
```

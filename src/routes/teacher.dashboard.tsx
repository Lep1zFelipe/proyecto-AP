import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, Card } from "@/components/AppLayout";
import { TEACHER_COURSES } from "@/lib/mock-data";
import {
  BookOpen, CheckSquare, ClipboardCheck, Users,
  AlertCircle, ChevronRight, BarChart2, Clock,
} from "lucide-react";

const PENDING_TASKS = [
  { label: "Publicar notas — Examen Parcial I", course: "IC-3001", priority: "high" as const },
  { label: "Registrar asistencia del 19/06", course: "IC-4010", priority: "medium" as const },
];

const COURSE_CAPACITY = 35;

export const Route = createFileRoute("/teacher/dashboard")({
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const totalStudents = TEACHER_COURSES.reduce((s, c) => s + c.estudiantes, 0);

  return (
    <AppLayout role="teacher" title="Portal Docente">
      <div className="space-y-5">

        {/* Hero */}
        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{ background: "linear-gradient(135deg, oklch(0.50 0.09 180) 0%, oklch(0.32 0.08 255) 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(45deg, white 1px, transparent 1px), linear-gradient(-45deg, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/5" />
          <div className="absolute right-6 bottom-0 h-36 w-36 rounded-full bg-white/5" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="text-white/60 text-xs font-medium mb-1">Portal Docente · Período 2026-I</p>
              <h2 className="text-2xl font-bold text-white">Prof. Luis Hernández</h2>
              <p className="text-white/70 text-sm mt-0.5">Escuela de Ingeniería en Computación</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {TEACHER_COURSES.map((c) => (
                  <div
                    key={c.codigo}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
                  >
                    <Clock className="h-3 w-3 text-white/60" />
                    <span className="font-semibold">{c.codigo}</span>
                    <span className="text-white/60">{c.horario.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-8 shrink-0">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{totalStudents}</p>
                <p className="text-white/60 text-xs mt-0.5">Estudiantes totales</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{TEACHER_COURSES.length}</p>
                <p className="text-white/60 text-xs mt-0.5">Cursos activos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-300">{PENDING_TASKS.length}</p>
                <p className="text-white/60 text-xs mt-0.5">Pendientes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Cursos */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mis cursos</p>
              <Link to="/teacher/courses" className="text-xs text-secondary font-medium hover:underline">Ver todos →</Link>
            </div>
            {TEACHER_COURSES.map((c) => {
              const fillPct = Math.round((c.estudiantes / COURSE_CAPACITY) * 100);
              const barColor = fillPct > 90 ? "bg-danger" : fillPct > 70 ? "bg-warning" : "bg-teal-accent";
              return (
                <div
                  key={c.codigo}
                  className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-teal-accent transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-teal-accent">{c.codigo}</span>
                        <span className="text-muted-foreground text-xs">·</span>
                        <span className="text-xs text-muted-foreground">{c.horario}</span>
                        <span className="text-muted-foreground text-xs">·</span>
                        <span className="text-xs text-muted-foreground">Aula {c.aula}</span>
                      </div>
                      <p className="font-bold">{c.nombre}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-bold leading-none">{c.estudiantes}</p>
                      <p className="text-xs text-muted-foreground">estudiantes</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Ocupación del grupo</span>
                      <span className={`font-semibold ${fillPct > 90 ? "text-danger" : "text-foreground"}`}>
                        {fillPct}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${fillPct}%` }} />
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Link
                      to="/teacher/attendance"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-muted hover:bg-muted-foreground/15 px-3 py-1.5 text-xs font-semibold transition-colors"
                    >
                      <CheckSquare className="h-3.5 w-3.5" /> Asistencia
                    </Link>
                    <Link
                      to="/teacher/grades"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-teal-accent/10 hover:bg-teal-accent/20 px-3 py-1.5 text-xs font-semibold text-teal-accent transition-colors"
                    >
                      <ClipboardCheck className="h-3.5 w-3.5" /> Calificaciones
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Columna derecha */}
          <div className="space-y-4">
            {/* Tareas pendientes */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Tareas pendientes
              </p>
              <div className="space-y-2">
                {PENDING_TASKS.map((task, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border p-3.5 ${
                      task.priority === "high"
                        ? "border-danger/30 bg-danger/5"
                        : "border-warning/30 bg-warning/5"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <AlertCircle
                        className={`h-3.5 w-3.5 ${task.priority === "high" ? "text-danger" : "text-warning"}`}
                      />
                      <span
                        className={`text-xs font-bold uppercase tracking-wide ${
                          task.priority === "high" ? "text-danger" : "text-warning"
                        }`}
                      >
                        {task.priority === "high" ? "Urgente" : "Pendiente"}
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-snug">{task.label}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{task.course}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Acceso rápido */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Acceso rápido
              </p>
              <div className="space-y-2">
                {[
                  { to: "/teacher/courses", label: "Gestión de cursos", icon: BookOpen },
                  { to: "/teacher/attendance", label: "Registrar asistencia", icon: CheckSquare },
                  { to: "/teacher/grades", label: "Publicar calificaciones", icon: BarChart2 },
                ].map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:border-teal-accent hover:shadow-sm transition-all group"
                  >
                    <Icon className="h-4 w-4 text-teal-accent shrink-0" />
                    <span className="text-sm font-medium flex-1">{label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Resumen estadístico */}
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-secondary" />
                <h3 className="font-bold text-sm">Distribución</h3>
              </div>
              <div className="space-y-2.5">
                {TEACHER_COURSES.map((c) => (
                  <div key={c.codigo} className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-teal-accent w-16 shrink-0">{c.codigo}</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-teal-accent/60"
                        style={{ width: `${(c.estudiantes / totalStudents) * 100}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground font-semibold w-6 text-right">{c.estudiantes}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

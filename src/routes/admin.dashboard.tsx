import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, Card } from "@/components/AppLayout";
import { ADMIN_STUDENTS, ADMIN_TEACHERS, ADMIN_COURSES, ADMIN_PERIODS } from "@/lib/mock-data";
import { Users, GraduationCap, BookOpen, CalendarRange, ChevronRight, Activity, Zap } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const activePeriod = ADMIN_PERIODS.find((p) => p.estado === "Activo");
  const activeStudents = ADMIN_STUDENTS.filter((s) => s.estado === "Activo").length;
  const activeTeachers = ADMIN_TEACHERS.filter((t) => t.estado === "Activo").length;
  const activeCourses = ADMIN_COURSES.filter((c) => c.estado === "Activo").length;
  const totalEnrollment = ADMIN_COURSES.reduce((s, c) => s + c.matric, 0);

  return (
    <AppLayout role="admin" title="Panel de Administración">
      <div className="space-y-5">

        {/* Hero */}
        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{ background: "linear-gradient(135deg, oklch(0.42 0.18 300) 0%, oklch(0.28 0.08 260) 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, white, white 1px, transparent 1px, transparent 36px), repeating-linear-gradient(90deg, white, white 1px, transparent 1px, transparent 36px)",
            }}
          />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute right-0 bottom-0 h-40 w-40 rounded-tl-3xl bg-white/5" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="text-white/60 text-xs font-medium mb-1">Panel Administrativo</p>
              <h2 className="text-2xl font-bold text-white">Control Académico</h2>
              {activePeriod && (
                <div className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                  <span>Período activo: <strong>{activePeriod.periodo}</strong></span>
                  <span className="text-white/60">{activePeriod.inicio} – {activePeriod.fin}</span>
                </div>
              )}
            </div>

            <div className="flex gap-8 shrink-0">
              {[
                { label: "Matriculaciones", value: totalEnrollment },
                { label: "Estudiantes activos", value: activeStudents },
                { label: "Docentes activos", value: activeTeachers },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-bold text-white">{value}</p>
                  <p className="text-white/60 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPI cards — clickables */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              to: "/admin/students",
              label: "Estudiantes activos",
              value: activeStudents,
              total: ADMIN_STUDENTS.length,
              icon: Users,
              color: "text-purple-accent",
              bg: "bg-purple-accent/10",
              border: "hover:border-purple-accent",
            },
            {
              to: "/admin/teachers",
              label: "Docentes activos",
              value: activeTeachers,
              total: ADMIN_TEACHERS.length,
              icon: GraduationCap,
              color: "text-navy",
              bg: "bg-navy/10",
              border: "hover:border-navy",
            },
            {
              to: "/admin/courses",
              label: "Cursos activos",
              value: activeCourses,
              total: ADMIN_COURSES.length,
              icon: BookOpen,
              color: "text-secondary",
              bg: "bg-secondary/10",
              border: "hover:border-secondary",
            },
            {
              to: "/admin/periods",
              label: "Períodos",
              value: ADMIN_PERIODS.length,
              total: ADMIN_PERIODS.length,
              icon: CalendarRange,
              color: "text-success",
              bg: "bg-success/10",
              border: "hover:border-success",
            },
          ].map(({ to, label, value, total, icon: Icon, color, bg, border }) => (
            <Link
              key={to}
              to={to}
              className={`bg-card border border-border rounded-xl p-4 shadow-sm transition-all ${border} hover:shadow-md group block`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`rounded-lg p-2 ${bg}`}>
                  <Icon className={`h-4 w-4 ${color}`} />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              {value < total && (
                <div className="mt-2.5 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${bg.replace("/10", "/60")}`}
                    style={{ width: `${(value / total) * 100}%` }}
                  />
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Estudiantes recientes */}
          <div className="lg:col-span-3">
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-accent" />
                  <h3 className="font-bold">Estudiantes registrados</h3>
                </div>
                <Link to="/admin/students" className="text-xs text-secondary font-medium hover:underline">
                  Gestionar →
                </Link>
              </div>
              <div className="space-y-1">
                {ADMIN_STUDENTS.slice(0, 6).map((s) => (
                  <div key={s.carne} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/40 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-accent/10 text-purple-accent text-xs font-bold shrink-0">
                      {s.nombre.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{s.nombre}</p>
                      <p className="text-xs text-muted-foreground truncate">{s.carrera} · {s.anio} año</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        s.estado === "Activo" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s.estado}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Columna derecha */}
          <div className="lg:col-span-2 space-y-4">
            {/* Acciones rápidas */}
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-purple-accent" />
                <h3 className="font-bold text-sm">Gestión rápida</h3>
              </div>
              <div className="space-y-2">
                {[
                  { to: "/admin/students", label: "Estudiantes", icon: Users },
                  { to: "/admin/teachers", label: "Docentes", icon: GraduationCap },
                  { to: "/admin/courses", label: "Cursos", icon: BookOpen },
                  { to: "/admin/periods", label: "Períodos", icon: CalendarRange },
                ].map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 rounded-xl border border-border p-2.5 hover:border-purple-accent hover:bg-purple-accent/5 transition-all group"
                  >
                    <Icon className="h-4 w-4 text-purple-accent shrink-0" />
                    <span className="text-sm font-medium flex-1">{label}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </Card>

            {/* Ocupación de cursos */}
            <Card>
              <h3 className="font-bold text-sm mb-3">Ocupación de cursos</h3>
              <div className="space-y-3">
                {ADMIN_COURSES.filter((c) => c.estado === "Activo").slice(0, 5).map((c) => {
                  const pct = Math.round((c.matric / c.cupos) * 100);
                  return (
                    <div key={c.codigo}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground truncate pr-2">{c.nombre}</span>
                        <span className={`font-mono font-bold shrink-0 ${pct > 90 ? "text-danger" : "text-foreground"}`}>
                          {c.matric}/{c.cupos}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            pct > 90 ? "bg-danger" : pct > 70 ? "bg-warning" : "bg-success"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

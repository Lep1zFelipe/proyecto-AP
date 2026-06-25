import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, Card } from "@/components/AppLayout";
import { STUDENT, SCHEDULE, COURSE_GRADES, CHARGES } from "@/lib/mock-data";
import {
  User, ClipboardList, Calendar, GraduationCap, CreditCard, History,
  TrendingUp, Clock, ChevronRight, AlertCircle,
} from "lucide-react";

const TOTAL_CREDITS = 200;

export const Route = createFileRoute("/student/dashboard")({
  component: StudentDashboard,
});

function StudentDashboard() {
  const pending = CHARGES.filter((c) => c.estado === "Pendiente").reduce((s, c) => s + c.monto, 0);
  const creditPct = Math.round((STUDENT.creditos / TOTAL_CREDITS) * 100);
  const initials = STUDENT.nombre.split(" ").slice(0, 2).map((n) => n[0]).join("");

  return (
    <AppLayout role="student" title="Mi Portal">
      <div className="space-y-5">

        {/* Hero personalizado */}
        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{ background: "linear-gradient(135deg, oklch(0.30 0.07 255) 0%, oklch(0.45 0.13 235) 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
          />
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/5" />
          <div className="absolute right-12 bottom-0 h-32 w-32 rounded-full bg-white/5" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-white/60 text-xs font-medium mb-1">Portal Estudiantil · Período 2026-I</p>
              <h2 className="text-2xl font-bold text-white">
                Bienvenida, {STUDENT.nombre.split(" ")[0]}
              </h2>
              <p className="text-white/70 text-sm mt-0.5">{STUDENT.carrera} · {STUDENT.anio}</p>

              <div className="mt-5 max-w-sm">
                <div className="flex justify-between text-xs text-white/60 mb-1.5">
                  <span>Avance de carrera</span>
                  <span className="font-bold text-white">{creditPct}% completado</span>
                </div>
                <div className="h-2 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white/80 transition-all"
                    style={{ width: `${creditPct}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-white/50">
                  {STUDENT.creditos} de {TOTAL_CREDITS} créditos aprobados · {TOTAL_CREDITS - STUDENT.creditos} restantes
                </p>
              </div>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 border border-white/20 text-white font-bold text-xl backdrop-blur-sm shrink-0">
              {initials}
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: "Promedio general",
              value: STUDENT.promedio,
              note: "Rendimiento excelente",
              icon: TrendingUp,
              iconColor: "text-success",
              iconBg: "bg-success/10",
            },
            {
              label: "Cursos activos",
              value: `${STUDENT.matriculados} cursos`,
              note: "Período 2026-I",
              icon: ClipboardList,
              iconColor: "text-secondary",
              iconBg: "bg-secondary/10",
            },
            {
              label: "Saldo pendiente",
              value: `$${pending.toFixed(2)}`,
              note: pending > 0 ? "Requiere atención" : "Cuenta al día",
              icon: pending > 0 ? AlertCircle : CreditCard,
              iconColor: pending > 0 ? "text-danger" : "text-success",
              iconBg: pending > 0 ? "bg-danger/10" : "bg-success/10",
            },
            {
              label: "Créditos aprobados",
              value: `${STUDENT.creditos} créd.`,
              note: `${TOTAL_CREDITS - STUDENT.creditos} para completar`,
              icon: GraduationCap,
              iconColor: "text-purple-accent",
              iconBg: "bg-purple-accent/10",
            },
          ].map(({ label, value, note, icon: Icon, iconColor, iconBg }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 shadow-sm">
              <div className={`inline-flex rounded-lg p-2 ${iconBg} mb-3`}>
                <Icon className={`h-4 w-4 ${iconColor}`} />
              </div>
              <p className="text-xs text-muted-foreground font-medium">{label}</p>
              <p className="text-xl font-bold text-foreground mt-0.5 leading-tight">{value}</p>
              <p className={`text-xs mt-1 font-medium ${iconColor}`}>{note}</p>
            </div>
          ))}
        </div>

        {/* Contenido central */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3">
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" />
                  <h3 className="font-bold">Próximas clases</h3>
                </div>
                <Link to="/student/schedule" className="text-xs text-secondary font-medium hover:underline">
                  Horario completo →
                </Link>
              </div>
              <div className="space-y-2">
                {SCHEDULE.slice(0, 4).map((c) => (
                  <div key={c.code} className="flex items-center gap-3 rounded-xl border border-border p-3 hover:bg-muted/30 transition-colors">
                    <div className={`h-10 w-1.5 rounded-full shrink-0 ${c.color.replace("/80", "")}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{c.course}</p>
                      <p className="text-xs text-muted-foreground">Aula {c.room}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-mono font-bold">{c.start}:00</p>
                      <p className="text-xs text-muted-foreground">−{c.end}:00</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-secondary" />
                  <h3 className="font-bold">Calificaciones</h3>
                </div>
                <Link to="/student/grades" className="text-xs text-secondary font-medium hover:underline">
                  Ver detalle →
                </Link>
              </div>
              <div className="space-y-3">
                {COURSE_GRADES.map((g) => {
                  const color = g.nota >= 90 ? "bg-success" : g.nota >= 75 ? "bg-secondary" : "bg-warning";
                  const text = g.nota >= 90 ? "text-success" : g.nota >= 75 ? "text-secondary" : "text-warning";
                  return (
                    <div key={g.codigo}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground truncate pr-2">{g.nombre}</span>
                        <span className={`font-bold font-mono shrink-0 ${text}`}>{g.nota}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${g.nota}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Acceso rápido</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { to: "/student/profile", label: "Mi Perfil", icon: User },
              { to: "/student/enrollment", label: "Matrícula", icon: ClipboardList },
              { to: "/student/schedule", label: "Horario", icon: Calendar },
              { to: "/student/grades", label: "Notas", icon: GraduationCap },
              { to: "/student/account-status", label: "Cuenta", icon: CreditCard },
              { to: "/student/academic-history", label: "Historial", icon: History },
            ].map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-2.5 hover:border-secondary hover:shadow-sm transition-all"
              >
                <div className="rounded-xl bg-muted p-2.5 group-hover:bg-secondary/10 transition-colors">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                </div>
                <span className="text-xs font-semibold text-center leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

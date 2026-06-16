import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, Card, StatCard } from "@/components/AppLayout";
import { STUDENT, SCHEDULE, COURSE_GRADES } from "@/lib/mock-data";
import { BookOpen, ClipboardList, Calendar, GraduationCap, CreditCard, History } from "lucide-react";

export const Route = createFileRoute("/student/dashboard")({
  component: () => (
    <AppLayout role="student" title="Dashboard del Estudiante">
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-navy to-secondary p-6 text-white">
          <h2 className="text-2xl font-bold">Bienvenida, {STUDENT.nombre.split(" ")[0]} {STUDENT.nombre.split(" ")[1]}</h2>
          <p className="mt-1 opacity-90">{STUDENT.carrera} — {STUDENT.anio}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Cursos matriculados" value={STUDENT.matriculados} accent="bg-navy" />
          <StatCard label="Promedio general" value={STUDENT.promedio} accent="bg-success" />
          <StatCard label="Saldo pendiente" value={`$${STUDENT.saldo}`} accent="bg-danger" />
          <StatCard label="Créditos aprobados" value={STUDENT.creditos} accent="bg-accent" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { to: "/student/profile", label: "Perfil", icon: BookOpen },
            { to: "/student/enrollment", label: "Matrícula", icon: ClipboardList },
            { to: "/student/schedule", label: "Horario", icon: Calendar },
            { to: "/student/grades", label: "Notas", icon: GraduationCap },
            { to: "/student/account-status", label: "Cuenta", icon: CreditCard },
            { to: "/student/academic-history", label: "Historial", icon: History },
          ].map((q) => {
            const Icon = q.icon;
            return (
              <Link key={q.to} to={q.to} className="card-base flex flex-col items-center justify-center gap-2 hover:border-secondary transition-colors">
                <Icon className="h-6 w-6 text-secondary" />
                <span className="text-xs font-semibold">{q.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="mb-3 font-bold">Próximas clases hoy</h3>
            <ul className="space-y-2">
              {SCHEDULE.slice(0, 3).map((c) => (
                <li key={c.code} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <div className="font-semibold text-sm">{c.course}</div>
                    <div className="text-xs text-muted-foreground">Aula {c.room}</div>
                  </div>
                  <div className="text-sm font-mono">{c.start}:00 - {c.end}:00</div>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="mb-3 font-bold">Calificaciones recientes</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2">Curso</th><th>Nota</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {COURSE_GRADES.slice(0, 3).map((g) => (
                  <tr key={g.codigo} className="border-b hover:bg-muted/40">
                    <td className="py-2">{g.nombre}</td>
                    <td className="font-mono font-bold">{g.nota}</td>
                    <td><span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">{g.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </AppLayout>
  ),
});

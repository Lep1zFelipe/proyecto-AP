import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, Card, StatCard } from "@/components/AppLayout";
import { TEACHER_COURSES } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/dashboard")({
  component: () => (
    <AppLayout role="teacher" title="Dashboard del Docente">
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-teal-accent to-navy p-6 text-white">
          <h2 className="text-2xl font-bold">Bienvenido, Prof. Luis Hernández</h2>
          <p className="mt-1 opacity-90">Escuela de Ingeniería en Computación — Período 2026-I</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Cursos activos" value={3} accent="bg-teal-accent" />
          <StatCard label="Total estudiantes" value={87} accent="bg-navy" />
          <StatCard label="Pendientes de calificar" value={2} accent="bg-warning" />
        </div>
        <Card>
          <h3 className="mb-3 font-bold">Mis cursos activos</h3>
          <ul className="divide-y">
            {TEACHER_COURSES.map((c) => (
              <li key={c.codigo} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold"><span className="font-mono text-secondary">{c.codigo}</span> — {c.nombre}</div>
                  <div className="text-xs text-muted-foreground">{c.horario} · Aula {c.aula} · {c.estudiantes} estudiantes</div>
                </div>
                <Link to="/teacher/courses" className="text-sm font-semibold text-secondary hover:underline">Ver detalles →</Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppLayout>
  ),
});

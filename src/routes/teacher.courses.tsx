import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card } from "@/components/AppLayout";
import { TEACHER_COURSES, TEACHER_STUDENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/courses")({
  component: CoursesPage,
});

function CoursesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <AppLayout role="teacher" title="Gestión de Cursos">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEACHER_COURSES.map((c) => (
          <button key={c.codigo} onClick={() => setExpanded(expanded === c.codigo ? null : c.codigo)} className="card-base text-left hover:border-teal-accent transition-colors">
            <div className="font-mono text-xs text-teal-accent font-bold">{c.codigo}</div>
            <div className="mt-1 font-bold">{c.nombre}</div>
            <div className="mt-2 text-xs text-muted-foreground">{c.horario}</div>
            <div className="text-xs text-muted-foreground">Aula {c.aula}</div>
            <div className="mt-3 text-2xl font-bold">{c.estudiantes} <span className="text-sm font-normal text-muted-foreground">estudiantes</span></div>
          </button>
        ))}
      </div>
      {expanded && (
        <Card className="mt-6">
          <h3 className="mb-3 font-bold">Lista de estudiantes — {TEACHER_COURSES.find((c) => c.codigo === expanded)?.nombre}</h3>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2">Carné</th><th>Nombre</th><th>Estado</th></tr></thead>
            <tbody>
              {TEACHER_STUDENTS.map((s) => (
                <tr key={s.carne} className="border-b hover:bg-muted/40">
                  <td className="py-2 font-mono">{s.carne}</td>
                  <td>{s.nombre}</td>
                  <td><span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">Activo</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </AppLayout>
  );
}

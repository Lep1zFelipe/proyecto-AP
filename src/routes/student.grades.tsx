import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, StatCard } from "@/components/AppLayout";
import { COURSE_GRADES, GRADE_DETAIL, STUDENT } from "@/lib/mock-data";

export const Route = createFileRoute("/student/grades")({
  component: GradesPage,
});

function GradesPage() {
  const [course, setCourse] = useState(COURSE_GRADES[0].codigo);
  const total = GRADE_DETAIL.reduce((s, g) => s + (g.nota * g.peso) / 100, 0);
  return (
    <AppLayout role="student" title="Calificaciones">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Promedio General" value={STUDENT.promedio} accent="bg-success" />
          <StatCard label="Cursos cursados" value={COURSE_GRADES.length} accent="bg-navy" />
          <StatCard label="Cursos aprobados" value={COURSE_GRADES.filter((g) => g.estado === "Aprobado").length} accent="bg-accent" />
        </div>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">Detalle por Curso</h3>
            <select value={course} onChange={(e) => setCourse(e.target.value)} className="rounded-lg border border-border px-3 py-1.5 text-sm">
              {COURSE_GRADES.map((c) => <option key={c.codigo} value={c.codigo}>{c.codigo} — {c.nombre}</option>)}
            </select>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="py-2">Componente</th><th>Porcentaje</th><th>Nota</th><th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {GRADE_DETAIL.map((g) => (
                <tr key={g.comp} className="border-b hover:bg-muted/40">
                  <td className="py-2">{g.comp}</td>
                  <td className="font-mono">{g.peso}%</td>
                  <td className="font-mono font-bold">{g.nota}</td>
                  <td className="font-mono">{((g.nota * g.peso) / 100).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-muted/50 font-bold">
                <td className="py-2">Total</td><td className="font-mono">100%</td><td></td><td className="font-mono">{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card>
          <h3 className="mb-3 font-bold">Resumen de Todos los Cursos</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="py-2">Código</th><th>Curso</th><th>Nota Final</th><th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {COURSE_GRADES.map((g) => {
                const gradeColor = g.nota >= 90 ? "text-success" : g.nota >= 75 ? "text-secondary" : "text-warning";
                return (
                  <tr key={g.codigo} className="border-b hover:bg-muted/40">
                    <td className="py-2 font-mono text-secondary font-semibold">{g.codigo}</td>
                    <td className="font-medium">{g.nombre}</td>
                    <td className={`font-mono font-bold text-lg ${gradeColor}`}>{g.nota}</td>
                    <td><span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">{g.estado}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </AppLayout>
  );
}

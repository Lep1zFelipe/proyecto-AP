import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Toast } from "@/components/AppLayout";
import { AVAILABLE_COURSES, ENROLLED } from "@/lib/mock-data";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/student/enrollment")({
  component: EnrollmentPage,
});

function EnrollmentPage() {
  const [enrolled, setEnrolled] = useState(ENROLLED.map((c) => c.codigo));
  const [toast, setToast] = useState<string | null>(null);
  const enrolledCourses = AVAILABLE_COURSES.filter((c) => enrolled.includes(c.codigo));
  const creditTotal = enrolledCourses.reduce((s, c) => s + c.creditos, 0);

  return (
    <AppLayout role="student" title="Matrícula de Cursos">
      <div className="space-y-6">
        <div className="rounded-xl bg-accent/15 border border-accent/40 p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-foreground">Período 2026-I — Matrícula Abierta</div>
            <div className="text-xs text-muted-foreground">Fecha límite: 30 de enero de 2026</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Créditos seleccionados</div>
            <div className="text-2xl font-bold">{creditTotal} <span className="text-sm text-muted-foreground">/ 18 máx</span></div>
          </div>
        </div>

        <Card>
          <h3 className="mb-3 font-bold">Cursos Disponibles</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2">Código</th><th>Nombre</th><th>Créd.</th><th>Horario</th><th>Profesor</th><th>Cupos</th><th></th>
                </tr>
              </thead>
              <tbody>
                {AVAILABLE_COURSES.map((c) => {
                  const isEnrolled = enrolled.includes(c.codigo);
                  return (
                    <tr key={c.codigo} className="border-b hover:bg-muted/40">
                      <td className="py-2 font-mono font-semibold">{c.codigo}</td>
                      <td>{c.nombre}</td>
                      <td className="font-mono">{c.creditos}</td>
                      <td className="text-xs">{c.horario}</td>
                      <td className="text-xs">{c.profesor}</td>
                      <td><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.cupos > 5 ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>{c.cupos}</span></td>
                      <td>
                        <button
                          disabled={isEnrolled || creditTotal + c.creditos > 18}
                          onClick={() => { setEnrolled([...enrolled, c.codigo]); setToast(`${c.nombre} agregado`); }}
                          className="inline-flex items-center gap-1 rounded-lg bg-secondary px-3 py-1 text-xs font-semibold text-white disabled:bg-muted disabled:text-muted-foreground"
                        >
                          <Plus className="h-3 w-3" /> {isEnrolled ? "Matriculado" : "Matricular"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3 className="mb-3 font-bold">Cursos Matriculados ({enrolledCourses.length})</h3>
          <ul className="divide-y">
            {enrolledCourses.map((c) => (
              <li key={c.codigo} className="flex items-center justify-between py-2">
                <div className="text-sm"><span className="font-mono font-semibold">{c.codigo}</span> — {c.nombre} <span className="text-muted-foreground">({c.creditos} créd.)</span></div>
                <button onClick={() => { setEnrolled(enrolled.filter((e) => e !== c.codigo)); setToast(`${c.nombre} eliminado`); }} className="text-danger hover:bg-danger/10 rounded-lg p-2"><Trash2 className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex justify-end">
          <button onClick={() => setToast("Matrícula confirmada exitosamente")} className="btn-primary">Confirmar Matrícula</button>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Toast } from "@/components/AppLayout";
import { AVAILABLE_COURSES, ENROLLED } from "@/lib/mock-data";
import { Plus, Trash2, BookOpen } from "lucide-react";

const MAX_CREDITS = 18;

export const Route = createFileRoute("/student/enrollment")({
  component: EnrollmentPage,
});

function EnrollmentPage() {
  const [enrolled, setEnrolled] = useState(ENROLLED.map((c) => c.codigo));
  const [toast, setToast] = useState<{ msg: string; type?: "success" | "error" } | null>(null);
  const enrolledCourses = AVAILABLE_COURSES.filter((c) => enrolled.includes(c.codigo));
  const creditTotal = enrolledCourses.reduce((s, c) => s + c.creditos, 0);
  const pct = Math.min(100, Math.round((creditTotal / MAX_CREDITS) * 100));
  const overLimit = creditTotal > MAX_CREDITS;

  return (
    <AppLayout role="student" title="Matrícula de Cursos">
      <div className="space-y-6">
        <div className="rounded-xl bg-accent/10 border border-accent/30 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-foreground">Período 2026-I — Matrícula Abierta</div>
              <div className="text-xs text-muted-foreground mt-0.5">Fecha límite: 30 de enero de 2026</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs text-muted-foreground">Créditos</div>
              <div className={`text-2xl font-bold leading-none ${overLimit ? "text-danger" : "text-foreground"}`}>
                {creditTotal}
                <span className="text-sm font-normal text-muted-foreground"> / {MAX_CREDITS}</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 rounded-full bg-border overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  overLimit ? "bg-danger" : pct >= 80 ? "bg-warning" : "bg-success"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{pct}% del límite de créditos</div>
          </div>
        </div>

        <Card>
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-secondary" />
            <h3 className="font-bold">Cursos Disponibles</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2">Código</th>
                  <th>Nombre</th>
                  <th>Créd.</th>
                  <th>Horario</th>
                  <th>Profesor</th>
                  <th>Cupos</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {AVAILABLE_COURSES.map((c) => {
                  const isEnrolled = enrolled.includes(c.codigo);
                  const wouldExceed = !isEnrolled && creditTotal + c.creditos > MAX_CREDITS;
                  return (
                    <tr key={c.codigo} className={`border-b transition-colors ${isEnrolled ? "bg-success/5" : "hover:bg-muted/40"}`}>
                      <td className="py-2 font-mono font-semibold text-secondary">{c.codigo}</td>
                      <td className="font-medium">{c.nombre}</td>
                      <td className="font-mono">{c.creditos}</td>
                      <td className="text-xs text-muted-foreground">{c.horario}</td>
                      <td className="text-xs text-muted-foreground">{c.profesor}</td>
                      <td>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            c.cupos > 5 ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                          }`}
                        >
                          {c.cupos} cupos
                        </span>
                      </td>
                      <td>
                        {isEnrolled ? (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                            ✓ Matriculado
                          </span>
                        ) : (
                          <button
                            disabled={wouldExceed}
                            onClick={() => {
                              setEnrolled([...enrolled, c.codigo]);
                              setToast({ msg: `${c.nombre} agregado`, type: "success" });
                            }}
                            className="inline-flex items-center gap-1 rounded-lg bg-secondary px-3 py-1 text-xs font-semibold text-white disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
                            title={wouldExceed ? "Supera el límite de créditos" : "Matricular curso"}
                          >
                            <Plus className="h-3 w-3" /> Matricular
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3 className="mb-3 font-bold">
            Cursos Matriculados{" "}
            <span className="text-muted-foreground font-normal text-sm">({enrolledCourses.length})</span>
          </h3>
          {enrolledCourses.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No hay cursos matriculados aún.</p>
          ) : (
            <ul className="divide-y">
              {enrolledCourses.map((c) => (
                <li key={c.codigo} className="flex items-center gap-3 py-2.5">
                  <div className="flex-1 text-sm">
                    <span className="font-mono font-semibold text-secondary">{c.codigo}</span>
                    <span className="mx-1.5 text-muted-foreground">—</span>
                    <span className="font-medium">{c.nombre}</span>
                    <span className="ml-2 text-xs text-muted-foreground">({c.creditos} créd.)</span>
                  </div>
                  <button
                    onClick={() => {
                      setEnrolled(enrolled.filter((e) => e !== c.codigo));
                      setToast({ msg: `${c.nombre} eliminado`, type: "error" });
                    }}
                    className="rounded-lg p-2 text-danger hover:bg-danger/10 transition-colors"
                    title="Quitar curso"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="flex justify-end gap-3">
          <div className="text-sm text-muted-foreground self-center">
            {enrolledCourses.length} cursos · {creditTotal} créditos
          </div>
          <button
            onClick={() => setToast({ msg: "Matrícula confirmada exitosamente", type: "success" })}
            disabled={enrolledCourses.length === 0}
            className="btn-primary disabled:opacity-50"
          >
            Confirmar Matrícula
          </button>
        </div>
      </div>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

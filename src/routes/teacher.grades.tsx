import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { TEACHER_COURSES, TEACHER_STUDENTS } from "@/lib/mock-data";

const COMPONENTS = ["Examen Parcial I", "Proyecto", "Quices", "Examen Final"];

export const Route = createFileRoute("/teacher/grades")({
  component: TeacherGradesPage,
});

function TeacherGradesPage() {
  const [course, setCourse] = useState(TEACHER_COURSES[0].codigo);
  const [comp, setComp] = useState(COMPONENTS[0]);
  const [grades, setGrades] = useState<Record<string, string>>(() =>
    Object.fromEntries(TEACHER_STUDENTS.map((s, i) => [s.carne, String(75 + ((i * 7) % 25))]))
  );
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  return (
    <AppLayout role="teacher" title="Registro de Calificaciones">
      <div className="space-y-4">
        <Card>
          <div className="flex flex-wrap gap-3">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Curso</label>
              <select value={course} onChange={(e) => setCourse(e.target.value)} className="block rounded-lg border border-border px-3 py-2 text-sm">
                {TEACHER_COURSES.map((c) => <option key={c.codigo} value={c.codigo}>{c.codigo} — {c.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Componente</label>
              <select value={comp} onChange={(e) => setComp(e.target.value)} className="block rounded-lg border border-border px-3 py-2 text-sm">
                {COMPONENTS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </Card>
        <Card>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2">Nombre</th><th>Carné</th><th>Nota (0-100)</th></tr></thead>
            <tbody>
              {TEACHER_STUDENTS.map((s) => {
                const v = Number(grades[s.carne]);
                const invalid = grades[s.carne] !== "" && (isNaN(v) || v < 0 || v > 100);
                return (
                  <tr key={s.carne} className="border-b hover:bg-muted/40">
                    <td className="py-2">{s.nombre}</td>
                    <td className="font-mono text-xs">{s.carne}</td>
                    <td>
                      <input
                        value={grades[s.carne]}
                        onChange={(e) => setGrades({ ...grades, [s.carne]: e.target.value })}
                        className={`w-24 rounded-lg border px-3 py-1.5 text-sm font-mono ${invalid ? "border-danger" : "border-border"}`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <div className="flex justify-end">
          <button onClick={() => setConfirm(true)} className="btn-primary">Publicar Calificaciones</button>
        </div>
      </div>
      <Modal open={confirm} onClose={() => setConfirm(false)} title="Confirmar publicación">
        <p className="text-sm">¿Está seguro de publicar las calificaciones de <b>{comp}</b> para {course}? Esta acción notificará a los estudiantes.</p>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={() => setConfirm(false)} className="btn-ghost">Cancelar</button>
          <button onClick={() => { setConfirm(false); setToast("Calificaciones publicadas exitosamente"); }} className="btn-primary">Publicar</button>
        </div>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

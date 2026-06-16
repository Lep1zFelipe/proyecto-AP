import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Toast } from "@/components/AppLayout";
import { TEACHER_COURSES, TEACHER_STUDENTS } from "@/lib/mock-data";

const DATES = ["03/06", "05/06", "10/06", "12/06"];
type Status = "P" | "A" | "T";

export const Route = createFileRoute("/teacher/attendance")({
  component: AttendancePage,
});

function AttendancePage() {
  const [course, setCourse] = useState(TEACHER_COURSES[0].codigo);
  const [date, setDate] = useState("16/06/2026");
  const [attendance, setAttendance] = useState<Record<string, Record<string, Status>>>(() => {
    const init: Record<string, Record<string, Status>> = {};
    TEACHER_STUDENTS.forEach((s) => {
      init[s.carne] = {};
      DATES.forEach((d, i) => { init[s.carne][d] = i === 2 ? "A" : "P"; });
    });
    return init;
  });
  const [toast, setToast] = useState<string | null>(null);

  const rate = Math.round(
    (Object.values(attendance).flatMap((r) => Object.values(r)).filter((v) => v === "P").length /
      (TEACHER_STUDENTS.length * DATES.length)) * 100
  );

  return (
    <AppLayout role="teacher" title="Registro de Asistencia">
      <div className="space-y-4">
        <Card>
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Curso</label>
              <select value={course} onChange={(e) => setCourse(e.target.value)} className="block rounded-lg border border-border px-3 py-2 text-sm">
                {TEACHER_COURSES.map((c) => <option key={c.codigo} value={c.codigo}>{c.codigo} — {c.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Fecha</label>
              <input type="text" value={date} onChange={(e) => setDate(e.target.value)} className="block rounded-lg border border-border px-3 py-2 text-sm" />
            </div>
            <div className="ml-auto rounded-lg bg-success/10 px-3 py-2">
              <div className="text-xs font-semibold text-muted-foreground">Tasa de asistencia</div>
              <div className="text-xl font-bold text-success">{rate}%</div>
            </div>
          </div>
        </Card>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2">Nombre</th><th>Carné</th>
                  {DATES.map((d) => <th key={d} className="text-center">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {TEACHER_STUDENTS.map((s) => (
                  <tr key={s.carne} className="border-b hover:bg-muted/40">
                    <td className="py-2">{s.nombre}</td>
                    <td className="font-mono text-xs">{s.carne}</td>
                    {DATES.map((d) => (
                      <td key={d} className="text-center">
                        <div className="inline-flex gap-1">
                          {(["P", "A", "T"] as Status[]).map((st) => {
                            const active = attendance[s.carne][d] === st;
                            const colors = { P: "bg-success text-white", A: "bg-danger text-white", T: "bg-warning text-white" };
                            return (
                              <button key={st} onClick={() => setAttendance({ ...attendance, [s.carne]: { ...attendance[s.carne], [d]: st } })} className={`h-6 w-6 rounded text-xs font-bold ${active ? colors[st] : "bg-muted text-muted-foreground"}`}>{st === "P" ? "✓" : st === "A" ? "✗" : "⚠"}</button>
                            );
                          })}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <div className="flex justify-end">
          <button onClick={() => setToast("Asistencia guardada")} className="btn-primary">Guardar Asistencia</button>
        </div>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

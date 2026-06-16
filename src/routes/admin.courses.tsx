import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { ADMIN_COURSES } from "@/lib/mock-data";
import { Plus, UserPlus } from "lucide-react";

export const Route = createFileRoute("/admin/courses")({
  component: AdminCoursesPage,
});

function AdminCoursesPage() {
  const [open, setOpen] = useState(false);
  const [assign, setAssign] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  return (
    <AppLayout role="admin" title="Gestión de Cursos">
      <Card>
        <div className="mb-4 flex justify-end gap-2">
          <button onClick={() => setAssign(true)} className="btn-secondary inline-flex items-center gap-1"><UserPlus className="h-4 w-4" /> Asignar Docente</button>
          <button onClick={() => setOpen(true)} className="btn-primary inline-flex items-center gap-1"><Plus className="h-4 w-4" /> Agregar Curso</button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2">Código</th><th>Nombre</th><th>Créd.</th><th>Docente</th><th>Cupos</th><th>Matric.</th><th>Estado</th></tr></thead>
          <tbody>
            {ADMIN_COURSES.map((c) => (
              <tr key={c.codigo} className="border-b hover:bg-muted/40">
                <td className="py-2 font-mono">{c.codigo}</td>
                <td>{c.nombre}</td>
                <td className="font-mono">{c.creditos}</td>
                <td className="text-xs">{c.docente}</td>
                <td className="font-mono">{c.cupos}</td>
                <td className="font-mono">{c.matric}</td>
                <td><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.estado === "Activo" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{c.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title="Agregar Curso">
        <form onSubmit={(e) => { e.preventDefault(); setOpen(false); setToast("Curso agregado"); }} className="space-y-3">
          {["Código (IC-XXXX)", "Nombre del curso", "Créditos", "Cupos"].map((f) => <input key={f} required placeholder={f} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />)}
          <button className="btn-primary w-full">Guardar</button>
        </form>
      </Modal>
      <Modal open={assign} onClose={() => setAssign(false)} title="Asignar Docente a Curso">
        <form onSubmit={(e) => { e.preventDefault(); setAssign(false); setToast("Docente asignado"); }} className="space-y-3">
          <select required className="w-full rounded-lg border border-border px-3 py-2 text-sm">
            <option value="">Seleccionar curso...</option>
            {ADMIN_COURSES.map((c) => <option key={c.codigo}>{c.codigo} — {c.nombre}</option>)}
          </select>
          <input required placeholder="Docente" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
          <button className="btn-primary w-full">Asignar</button>
        </form>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

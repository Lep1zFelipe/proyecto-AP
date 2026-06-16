import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { ADMIN_TEACHERS } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/teachers")({
  component: AdminTeachersPage,
});

function AdminTeachersPage() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  return (
    <AppLayout role="admin" title="Gestión de Docentes">
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <input placeholder="Buscar docente..." className="rounded-lg border border-border px-3 py-2 text-sm" />
          <button onClick={() => setOpen(true)} className="btn-primary inline-flex items-center gap-1"><Plus className="h-4 w-4" /> Agregar Docente</button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2">Cédula</th><th>Nombre</th><th>Especialidad</th><th>Cursos</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {ADMIN_TEACHERS.map((t) => (
              <tr key={t.cedula} className="border-b hover:bg-muted/40">
                <td className="py-2 font-mono">{t.cedula}</td>
                <td>{t.nombre}</td>
                <td className="text-xs">{t.especialidad}</td>
                <td className="font-mono">{t.cursos}</td>
                <td><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${t.estado === "Activo" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{t.estado}</span></td>
                <td className="space-x-2 text-xs">
                  <button className="text-secondary hover:underline">Ver</button>
                  <button className="text-secondary hover:underline">Editar</button>
                  <button className="text-danger hover:underline">Desactivar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title="Agregar Docente">
        <form onSubmit={(e) => { e.preventDefault(); setOpen(false); setToast("Docente agregado"); }} className="space-y-3">
          {["Nombre completo", "Cédula", "Email", "Especialidad"].map((f) => <input key={f} required placeholder={f} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />)}
          <button className="btn-primary w-full">Guardar</button>
        </form>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

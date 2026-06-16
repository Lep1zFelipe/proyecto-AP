import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { ADMIN_STUDENTS } from "@/lib/mock-data";
import { Plus, Search } from "lucide-react";

export const Route = createFileRoute("/admin/students")({
  component: AdminStudentsPage,
});

function AdminStudentsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [career, setCareer] = useState("all");
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const careers = Array.from(new Set(ADMIN_STUDENTS.map((s) => s.carrera)));

  const filtered = ADMIN_STUDENTS.filter((s) =>
    (q === "" || s.nombre.toLowerCase().includes(q.toLowerCase()) || s.carne.includes(q)) &&
    (status === "all" || s.estado === status) &&
    (career === "all" || s.carrera === career)
  );
  const pageSize = 8;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  return (
    <AppLayout role="admin" title="Gestión de Estudiantes">
      <Card>
        <div className="mb-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre o carné..." className="w-full rounded-lg border border-border pl-9 pr-3 py-2 text-sm" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-border px-3 py-2 text-sm">
            <option value="all">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <select value={career} onChange={(e) => setCareer(e.target.value)} className="rounded-lg border border-border px-3 py-2 text-sm">
            <option value="all">Todas las carreras</option>
            {careers.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button onClick={() => setOpen(true)} className="btn-primary inline-flex items-center gap-1"><Plus className="h-4 w-4" /> Agregar Estudiante</button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2">Carné</th><th>Nombre</th><th>Carrera</th><th>Año</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {pageData.map((s) => (
              <tr key={s.carne} className="border-b hover:bg-muted/40">
                <td className="py-2 font-mono">{s.carne}</td>
                <td>{s.nombre}</td>
                <td className="text-xs">{s.carrera}</td>
                <td className="font-mono">{s.anio}</td>
                <td><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s.estado === "Activo" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{s.estado}</span></td>
                <td className="space-x-2 text-xs">
                  <button className="text-secondary hover:underline">Ver</button>
                  <button className="text-secondary hover:underline">Editar</button>
                  <button className="text-danger hover:underline">Desactivar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="text-muted-foreground">{filtered.length} resultados</div>
          <div className="flex gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} className="btn-ghost text-sm">‹ Anterior</button>
            <span className="px-3 py-1.5">{page} / {totalPages}</span>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} className="btn-ghost text-sm">Siguiente ›</button>
          </div>
        </div>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title="Agregar Estudiante">
        <form onSubmit={(e) => { e.preventDefault(); setOpen(false); setToast("Estudiante agregado"); }} className="space-y-3">
          {["Nombre", "Apellidos", "Email", "Teléfono"].map((f) => <input key={f} required placeholder={f} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />)}
          <select className="w-full rounded-lg border border-border px-3 py-2 text-sm">{careers.map((c) => <option key={c}>{c}</option>)}</select>
          <input type="date" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
          <button className="btn-primary w-full">Guardar</button>
        </form>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { ADMIN_STUDENTS } from "@/lib/mock-data";
import { Plus, Search, Eye, Pencil, PowerOff } from "lucide-react";

type Student = (typeof ADMIN_STUDENTS)[number] & { estado: string };

export const Route = createFileRoute("/admin/students")({
  component: AdminStudentsPage,
});

function AdminStudentsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [career, setCareer] = useState("all");
  const [openAdd, setOpenAdd] = useState(false);
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState<Student[]>(ADMIN_STUDENTS as Student[]);

  const careers = Array.from(new Set(students.map((s) => s.carrera)));

  const filtered = students.filter(
    (s) =>
      (q === "" ||
        s.nombre.toLowerCase().includes(q.toLowerCase()) ||
        s.carne.includes(q)) &&
      (status === "all" || s.estado === status) &&
      (career === "all" || s.carrera === career)
  );
  const pageSize = 8;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const toggleStatus = (carne: string) => {
    const target = students.find((s) => s.carne === carne);
    if (!target) return;
    const next = target.estado === "Activo" ? "Inactivo" : "Activo";
    setStudents(students.map((s) => (s.carne === carne ? { ...s, estado: next } : s)));
    setToast(`${target.nombre} ${next === "Inactivo" ? "desactivado" : "reactivado"}`);
  };

  return (
    <AppLayout role="admin" title="Gestión de Estudiantes">
      <Card>
        <div className="mb-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Buscar por nombre o carné..."
              className="w-full rounded-lg border border-border pl-9 pr-3 py-2 text-sm"
            />
          </div>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="rounded-lg border border-border px-3 py-2 text-sm"
          >
            <option value="all">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <select
            value={career}
            onChange={(e) => { setCareer(e.target.value); setPage(1); }}
            className="rounded-lg border border-border px-3 py-2 text-sm"
          >
            <option value="all">Todas las carreras</option>
            {careers.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button
            onClick={() => setOpenAdd(true)}
            className="btn-primary inline-flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Agregar Estudiante
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="py-2">Carné</th>
              <th>Nombre</th>
              <th>Carrera</th>
              <th>Año</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((s) => (
              <tr key={s.carne} className="border-b hover:bg-muted/40">
                <td className="py-2 font-mono">{s.carne}</td>
                <td className="font-medium">{s.nombre}</td>
                <td className="text-xs">{s.carrera}</td>
                <td className="font-mono">{s.anio}</td>
                <td>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      s.estado === "Activo"
                        ? "bg-success/15 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.estado}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewStudent(s)}
                      className="rounded-lg p-1.5 text-secondary hover:bg-secondary/10 transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditStudent(s)}
                      className="rounded-lg p-1.5 text-secondary hover:bg-secondary/10 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleStatus(s.carne)}
                      className={`rounded-lg p-1.5 transition-colors ${
                        s.estado === "Activo"
                          ? "text-danger hover:bg-danger/10"
                          : "text-success hover:bg-success/10"
                      }`}
                      title={s.estado === "Activo" ? "Desactivar" : "Reactivar"}
                    >
                      <PowerOff className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="text-muted-foreground">{filtered.length} resultados</div>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="btn-ghost text-sm disabled:opacity-40"
            >
              ‹ Anterior
            </button>
            <span className="px-3 py-1.5 text-muted-foreground">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="btn-ghost text-sm disabled:opacity-40"
            >
              Siguiente ›
            </button>
          </div>
        </div>
      </Card>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Agregar Estudiante">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenAdd(false);
            setToast("Estudiante agregado exitosamente");
          }}
          className="space-y-3"
        >
          {["Nombre", "Apellidos", "Email", "Teléfono"].map((f) => (
            <input key={f} required placeholder={f} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
          ))}
          <select className="w-full rounded-lg border border-border px-3 py-2 text-sm">
            {careers.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input type="date" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={() => setOpenAdd(false)} className="btn-ghost flex-1">
              Cancelar
            </button>
            <button className="btn-primary flex-1">Guardar</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!viewStudent} onClose={() => setViewStudent(null)} title="Detalles del Estudiante">
        {viewStudent && (
          <div className="space-y-1">
            {(
              [
                ["Nombre completo", viewStudent.nombre],
                ["Carné", viewStudent.carne],
                ["Carrera", viewStudent.carrera],
                ["Año", viewStudent.anio],
                ["Estado", viewStudent.estado],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {k}
                </span>
                <span className="text-sm font-medium">{v}</span>
              </div>
            ))}
            <button onClick={() => setViewStudent(null)} className="btn-ghost w-full mt-3">
              Cerrar
            </button>
          </div>
        )}
      </Modal>

      <Modal open={!!editStudent} onClose={() => setEditStudent(null)} title="Editar Estudiante">
        {editStudent && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEditStudent(null);
              setToast("Estudiante actualizado exitosamente");
            }}
            className="space-y-3"
          >
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Nombre completo
              </label>
              <input
                defaultValue={editStudent.nombre}
                required
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Carné</label>
              <input
                defaultValue={editStudent.carne}
                disabled
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm bg-muted/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Carrera</label>
              <select
                defaultValue={editStudent.carrera}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
              >
                {careers.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={() => setEditStudent(null)} className="btn-ghost flex-1">
                Cancelar
              </button>
              <button className="btn-primary flex-1">Guardar cambios</button>
            </div>
          </form>
        )}
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

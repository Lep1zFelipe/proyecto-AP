import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { ADMIN_TEACHERS } from "@/lib/mock-data";
import { Plus, Search, Eye, Pencil, PowerOff } from "lucide-react";

type Teacher = (typeof ADMIN_TEACHERS)[number] & { estado: string };

export const Route = createFileRoute("/admin/teachers")({
  component: AdminTeachersPage,
});

function AdminTeachersPage() {
  const [q, setQ] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>(ADMIN_TEACHERS as Teacher[]);

  const filtered = teachers.filter(
    (t) =>
      q === "" ||
      t.nombre.toLowerCase().includes(q.toLowerCase()) ||
      t.cedula.includes(q) ||
      t.especialidad.toLowerCase().includes(q.toLowerCase())
  );

  const toggleStatus = (cedula: string) => {
    const target = teachers.find((t) => t.cedula === cedula);
    if (!target) return;
    const next = target.estado === "Activo" ? "Inactivo" : "Activo";
    setTeachers(teachers.map((t) => (t.cedula === cedula ? { ...t, estado: next } : t)));
    setToast(`${target.nombre} ${next === "Inactivo" ? "desactivado" : "reactivado"}`);
  };

  return (
    <AppLayout role="admin" title="Gestión de Docentes">
      <Card>
        <div className="mb-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, cédula o especialidad..."
              className="w-full rounded-lg border border-border pl-9 pr-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={() => setOpenAdd(true)}
            className="btn-primary inline-flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Agregar Docente
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="py-2">Cédula</th>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Cursos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.cedula} className="border-b hover:bg-muted/40">
                <td className="py-2 font-mono">{t.cedula}</td>
                <td className="font-medium">{t.nombre}</td>
                <td className="text-xs">{t.especialidad}</td>
                <td className="font-mono">{t.cursos}</td>
                <td>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      t.estado === "Activo"
                        ? "bg-success/15 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {t.estado}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewTeacher(t)}
                      className="rounded-lg p-1.5 text-secondary hover:bg-secondary/10 transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditTeacher(t)}
                      className="rounded-lg p-1.5 text-secondary hover:bg-secondary/10 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleStatus(t.cedula)}
                      className={`rounded-lg p-1.5 transition-colors ${
                        t.estado === "Activo"
                          ? "text-danger hover:bg-danger/10"
                          : "text-success hover:bg-success/10"
                      }`}
                      title={t.estado === "Activo" ? "Desactivar" : "Reactivar"}
                    >
                      <PowerOff className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-sm text-muted-foreground">{filtered.length} docentes</div>
      </Card>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Agregar Docente">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenAdd(false);
            setToast("Docente agregado exitosamente");
          }}
          className="space-y-3"
        >
          {["Nombre completo", "Cédula", "Email", "Especialidad"].map((f) => (
            <input
              key={f}
              required
              placeholder={f}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          ))}
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={() => setOpenAdd(false)} className="btn-ghost flex-1">
              Cancelar
            </button>
            <button className="btn-primary flex-1">Guardar</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!viewTeacher} onClose={() => setViewTeacher(null)} title="Detalles del Docente">
        {viewTeacher && (
          <div className="space-y-1">
            {(
              [
                ["Nombre completo", viewTeacher.nombre],
                ["Cédula", viewTeacher.cedula],
                ["Especialidad", viewTeacher.especialidad],
                ["Cursos asignados", String(viewTeacher.cursos)],
                ["Estado", viewTeacher.estado],
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
            <button onClick={() => setViewTeacher(null)} className="btn-ghost w-full mt-3">
              Cerrar
            </button>
          </div>
        )}
      </Modal>

      <Modal open={!!editTeacher} onClose={() => setEditTeacher(null)} title="Editar Docente">
        {editTeacher && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEditTeacher(null);
              setToast("Docente actualizado exitosamente");
            }}
            className="space-y-3"
          >
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Nombre completo
              </label>
              <input
                defaultValue={editTeacher.nombre}
                required
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Cédula</label>
              <input
                defaultValue={editTeacher.cedula}
                disabled
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm bg-muted/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Especialidad
              </label>
              <input
                defaultValue={editTeacher.especialidad}
                required
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={() => setEditTeacher(null)} className="btn-ghost flex-1">
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

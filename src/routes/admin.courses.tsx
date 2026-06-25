import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { ADMIN_COURSES, ADMIN_TEACHERS } from "@/lib/mock-data";
import { Plus, UserPlus, Pencil, PowerOff } from "lucide-react";

type Course = (typeof ADMIN_COURSES)[number] & { estado: string };

export const Route = createFileRoute("/admin/courses")({
  component: AdminCoursesPage,
});

function AdminCoursesPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>(ADMIN_COURSES as Course[]);

  const toggleStatus = (codigo: string) => {
    const target = courses.find((c) => c.codigo === codigo);
    if (!target) return;
    const next = target.estado === "Activo" ? "Inactivo" : "Activo";
    setCourses(courses.map((c) => (c.codigo === codigo ? { ...c, estado: next } : c)));
    setToast(`Curso ${codigo} ${next === "Inactivo" ? "desactivado" : "activado"}`);
  };

  return (
    <AppLayout role="admin" title="Gestión de Cursos">
      <Card>
        <div className="mb-4 flex justify-end gap-2">
          <button
            onClick={() => setOpenAssign(true)}
            className="btn-secondary inline-flex items-center gap-1"
          >
            <UserPlus className="h-4 w-4" /> Asignar Docente
          </button>
          <button
            onClick={() => setOpenAdd(true)}
            className="btn-primary inline-flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Agregar Curso
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="py-2">Código</th>
                <th>Nombre</th>
                <th>Créd.</th>
                <th>Docente</th>
                <th>Cupos</th>
                <th>Matric.</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.codigo} className="border-b hover:bg-muted/40">
                  <td className="py-2 font-mono font-semibold text-secondary">{c.codigo}</td>
                  <td>{c.nombre}</td>
                  <td className="font-mono">{c.creditos}</td>
                  <td className="text-xs">{c.docente}</td>
                  <td className="font-mono">{c.cupos}</td>
                  <td className="font-mono">
                    <span
                      className={`font-semibold ${
                        c.matric / c.cupos > 0.85 ? "text-danger" : "text-foreground"
                      }`}
                    >
                      {c.matric}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        c.estado === "Activo"
                          ? "bg-success/15 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {c.estado}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditCourse(c)}
                        className="rounded-lg p-1.5 text-secondary hover:bg-secondary/10 transition-colors"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleStatus(c.codigo)}
                        className={`rounded-lg p-1.5 transition-colors ${
                          c.estado === "Activo"
                            ? "text-danger hover:bg-danger/10"
                            : "text-success hover:bg-success/10"
                        }`}
                        title={c.estado === "Activo" ? "Desactivar" : "Activar"}
                      >
                        <PowerOff className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={openAdd} onClose={() => setOpenAdd(false)} title="Agregar Curso">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenAdd(false);
            setToast("Curso agregado exitosamente");
          }}
          className="space-y-3"
        >
          {["Código (IC-XXXX)", "Nombre del curso", "Créditos", "Cupos"].map((f) => (
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

      <Modal open={openAssign} onClose={() => setOpenAssign(false)} title="Asignar Docente a Curso">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenAssign(false);
            setToast("Docente asignado exitosamente");
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Curso</label>
            <select
              required
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
            >
              <option value="">Seleccionar curso...</option>
              {courses.map((c) => (
                <option key={c.codigo}>
                  {c.codigo} — {c.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Docente</label>
            <select
              required
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
            >
              <option value="">Seleccionar docente...</option>
              {ADMIN_TEACHERS.filter((t) => t.estado === "Activo").map((t) => (
                <option key={t.cedula}>{t.nombre}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={() => setOpenAssign(false)} className="btn-ghost flex-1">
              Cancelar
            </button>
            <button className="btn-primary flex-1">Asignar</button>
          </div>
        </form>
      </Modal>

      <Modal open={!!editCourse} onClose={() => setEditCourse(null)} title="Editar Curso">
        {editCourse && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEditCourse(null);
              setToast("Curso actualizado exitosamente");
            }}
            className="space-y-3"
          >
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">Código</label>
              <input
                defaultValue={editCourse.codigo}
                disabled
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm bg-muted/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Nombre del curso
              </label>
              <input
                defaultValue={editCourse.nombre}
                required
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">
                  Créditos
                </label>
                <input
                  defaultValue={editCourse.creditos}
                  type="number"
                  min={1}
                  max={6}
                  required
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-muted-foreground">Cupos</label>
                <input
                  defaultValue={editCourse.cupos}
                  type="number"
                  min={1}
                  required
                  className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={() => setEditCourse(null)} className="btn-ghost flex-1">
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

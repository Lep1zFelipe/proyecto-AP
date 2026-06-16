import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { ADMIN_PERIODS } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/periods")({
  component: AdminPeriodsPage,
});

function AdminPeriodsPage() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const colorFor = (s: string) => s === "Activo" ? "bg-success" : s === "Cerrado" ? "bg-muted-foreground" : "bg-accent";

  return (
    <AppLayout role="admin" title="Gestión de Períodos Académicos">
      <div className="space-y-6">
        <Card>
          <h3 className="mb-4 font-bold">Línea de tiempo</h3>
          <div className="relative">
            <div className="absolute left-0 right-0 top-4 h-0.5 bg-border" />
            <div className="relative grid grid-cols-4 gap-4">
              {ADMIN_PERIODS.map((p) => (
                <div key={p.periodo} className="text-center">
                  <div className={`mx-auto h-8 w-8 rounded-full ${colorFor(p.estado)} ring-4 ring-background`} />
                  <div className="mt-3 font-bold text-sm">{p.periodo}</div>
                  <div className="text-xs text-muted-foreground">{p.estado}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <div className="mb-4 flex justify-end">
            <button onClick={() => setOpen(true)} className="btn-primary inline-flex items-center gap-1"><Plus className="h-4 w-4" /> Crear Período</button>
          </div>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2">Período</th><th>Inicio</th><th>Fin</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>
              {ADMIN_PERIODS.map((p) => (
                <tr key={p.periodo} className="border-b hover:bg-muted/40">
                  <td className="py-2 font-mono font-semibold">{p.periodo}</td>
                  <td className="font-mono text-xs">{p.inicio}</td>
                  <td className="font-mono text-xs">{p.fin}</td>
                  <td><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.estado === "Activo" ? "bg-success/15 text-success" : p.estado === "Cerrado" ? "bg-muted text-muted-foreground" : "bg-accent/20 text-accent-foreground"}`}>{p.estado}</span></td>
                  <td className="space-x-2 text-xs"><button className="text-secondary hover:underline">Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Crear Período Académico">
        <form onSubmit={(e) => { e.preventDefault(); setOpen(false); setToast("Período creado"); }} className="space-y-3">
          <input required placeholder="Identificador (e.g. 2027-I)" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
          <input required type="date" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
          <input required type="date" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
          <button className="btn-primary w-full">Crear</button>
        </form>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

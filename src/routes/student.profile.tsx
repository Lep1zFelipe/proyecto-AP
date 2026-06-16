import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { STUDENT } from "@/lib/mock-data";
import { User } from "lucide-react";

export const Route = createFileRoute("/student/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const fields = [
    ["Nombre completo", STUDENT.nombre],
    ["Carné", STUDENT.carne],
    ["Email institucional", STUDENT.email],
    ["Teléfono", STUDENT.telefono],
    ["Carrera", STUDENT.carrera],
    ["Año de ingreso", STUDENT.ingreso],
    ["Estado", STUDENT.estado],
  ];
  return (
    <AppLayout role="student" title="Mi Perfil">
      <Card>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-navy to-secondary text-white">
              <User className="h-16 w-16" />
            </div>
            <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">{STUDENT.estado}</span>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</div>
                  <div className="mt-1 text-sm font-medium">{v}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setOpen(true)} className="btn-primary mt-6">Editar perfil</button>
          </div>
        </div>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title="Editar perfil">
        <form onSubmit={(e) => { e.preventDefault(); setOpen(false); setToast("Perfil actualizado"); }} className="space-y-3">
          <input defaultValue={STUDENT.telefono} className="w-full rounded-lg border border-border px-3 py-2 text-sm" placeholder="Teléfono" />
          <input defaultValue={STUDENT.email} className="w-full rounded-lg border border-border px-3 py-2 text-sm" placeholder="Email" />
          <button className="btn-primary w-full">Guardar cambios</button>
        </form>
      </Modal>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

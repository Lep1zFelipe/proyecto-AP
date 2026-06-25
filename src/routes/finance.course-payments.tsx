import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { CHARGES, STUDENT } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/finance/course-payments")({
  component: CoursePaymentsPage,
});

function CoursePaymentsPage() {
  const [found, setFound] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [method, setMethod] = useState("Tarjeta de Crédito");
  const [success, setSuccess] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const list = CHARGES.filter((c) => c.concepto.startsWith("Curso"));
  const total = list.filter((_, i) => selected.includes(i)).reduce((s, c) => s + c.monto, 0);

  return (
    <AppLayout role="finance" title="Pagos de Cursos">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="mb-3 font-bold">Buscar Estudiante</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFound(true);
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  defaultValue="2024073529"
                  className="w-full rounded-lg border border-border pl-9 pr-3 py-2 text-sm"
                  placeholder="Carné o nombre"
                />
              </div>
              <button className="btn-secondary">Buscar</button>
            </form>
          </Card>

          {found && (
            <>
              <Card>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{STUDENT.nombre}</div>
                    <div className="text-xs text-muted-foreground">
                      {STUDENT.carne} · {STUDENT.carrera}
                    </div>
                  </div>
                  <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                    {STUDENT.estado}
                  </span>
                </div>
              </Card>
              <Card>
                <h3 className="mb-3 font-bold">Cursos por pagar</h3>
                <ul className="divide-y">
                  {list.map((c, i) => (
                    <li key={i} className="flex items-center gap-3 py-2">
                      <input
                        type="checkbox"
                        checked={selected.includes(i)}
                        onChange={(e) =>
                          setSelected(
                            e.target.checked
                              ? [...selected, i]
                              : selected.filter((s) => s !== i)
                          )
                        }
                        disabled={c.estado === "Pagado"}
                        className="h-4 w-4"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{c.concepto}</div>
                        <div className="text-xs text-muted-foreground">{c.fecha}</div>
                      </div>
                      <div className="font-mono font-bold">${c.monto.toFixed(2)}</div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          c.estado === "Pagado"
                            ? "bg-success/15 text-success"
                            : "bg-warning/15 text-warning"
                        }`}
                      >
                        {c.estado}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="mb-3 font-bold">Resumen de Pago</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cursos seleccionados</span>
                <span className="font-mono">{selected.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold">
                <span>Total</span>
                <span className="font-mono text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold uppercase text-muted-foreground">
                Método de pago
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
              >
                <option>Tarjeta de Crédito</option>
                <option>Transferencia</option>
                <option>Efectivo</option>
              </select>
            </div>
            <button
              disabled={total === 0}
              onClick={() => setSuccess(`R-${Math.floor(Math.random() * 90000 + 10000)}`)}
              className="btn-primary w-full mt-4 disabled:opacity-50"
            >
              Procesar Pago
            </button>
          </Card>
        </div>
      </div>

      <Modal
        open={!!success}
        onClose={() => {
          setSuccess(null);
          setSelected([]);
          setToast("Pago registrado exitosamente");
        }}
        title="Pago Procesado"
      >
        <div className="text-center py-4 space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success text-2xl">
            ✓
          </div>
          <div className="font-bold text-lg">¡Pago aprobado exitosamente!</div>
          <div className="text-sm text-muted-foreground">Número de recibo</div>
          <div className="text-xl font-mono font-bold">{success}</div>
          <div className="text-sm">
            Monto: <span className="font-mono font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="text-xs text-muted-foreground">Método: {method}</div>
          <button
            onClick={() => {
              setSuccess(null);
              setSelected([]);
              setToast("Pago registrado exitosamente");
            }}
            className="btn-primary mt-2"
          >
            Cerrar
          </button>
        </div>
      </Modal>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </AppLayout>
  );
}

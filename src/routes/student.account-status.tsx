import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, Modal, Toast } from "@/components/AppLayout";
import { CHARGES } from "@/lib/mock-data";
import { CreditCard } from "lucide-react";

export const Route = createFileRoute("/student/account-status")({
  component: AccountStatusPage,
});

function AccountStatusPage() {
  const [payOpen, setPayOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [method, setMethod] = useState("Tarjeta de Crédito");
  const [success, setSuccess] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const pending = CHARGES.filter((c) => c.estado === "Pendiente").reduce((s, c) => s + c.monto, 0);
  const pendingItems = CHARGES.filter((c) => c.estado === "Pendiente");
  const total = pendingItems.filter((_, i) => selected.includes(i)).reduce((s, c) => s + c.monto, 0);

  return (
    <AppLayout role="student" title="Estado de Cuenta">
      <div className="space-y-6">
        <div
          className={`card-base ${pending > 0 ? "border-danger/40 bg-danger/5" : "border-success/40 bg-success/5"}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase text-muted-foreground">Saldo pendiente</div>
              <div className={`mt-1 text-4xl font-bold ${pending > 0 ? "text-danger" : "text-success"}`}>
                ${pending.toFixed(2)}
              </div>
              {pending === 0 && (
                <div className="mt-1 text-sm text-success">Cuenta al día</div>
              )}
            </div>
            {pending > 0 && (
              <button
                onClick={() => setPayOpen(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" /> Realizar Pago
              </button>
            )}
          </div>
        </div>

        <Card>
          <h3 className="mb-3 font-bold">Cargos del Período</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="py-2">Concepto</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {CHARGES.map((c, i) => (
                <tr key={i} className="border-b hover:bg-muted/40">
                  <td className="py-2">{c.concepto}</td>
                  <td className="font-mono text-xs">{c.fecha}</td>
                  <td className="font-mono">${c.monto.toFixed(2)}</td>
                  <td>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        c.estado === "Pagado"
                          ? "bg-success/15 text-success"
                          : "bg-danger/15 text-danger"
                      }`}
                    >
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Modal open={payOpen} onClose={() => setPayOpen(false)} title="Realizar Pago">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Seleccione los cargos que desea cancelar:</p>
          <ul className="divide-y rounded-lg border border-border">
            {pendingItems.map((c, i) => (
              <li key={i} className="flex items-center gap-3 px-3 py-2.5">
                <input
                  type="checkbox"
                  id={`charge-${i}`}
                  checked={selected.includes(i)}
                  onChange={(e) =>
                    setSelected(e.target.checked ? [...selected, i] : selected.filter((s) => s !== i))
                  }
                  className="h-4 w-4 accent-navy"
                />
                <label htmlFor={`charge-${i}`} className="flex-1 cursor-pointer text-sm">
                  {c.concepto}
                </label>
                <span className="font-mono font-bold text-sm">${c.monto.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div>
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
          <div className="flex justify-between font-bold border-t pt-3">
            <span>Total a pagar</span>
            <span className="font-mono text-lg">${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setPayOpen(false)} className="btn-ghost flex-1">
              Cancelar
            </button>
            <button
              disabled={total === 0}
              onClick={() => {
                setPayOpen(false);
                setSuccess(`R-${Math.floor(Math.random() * 90000 + 10000)}`);
                setSelected([]);
              }}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              Confirmar Pago
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!success}
        onClose={() => {
          setSuccess(null);
          setToast("Pago registrado exitosamente");
        }}
        title="Pago Procesado"
      >
        <div className="text-center py-4 space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-2xl text-success">
            ✓
          </div>
          <div className="font-bold text-lg">¡Pago aprobado!</div>
          <div className="text-sm text-muted-foreground">Número de recibo</div>
          <div className="text-xl font-mono font-bold">{success}</div>
          <button
            onClick={() => {
              setSuccess(null);
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

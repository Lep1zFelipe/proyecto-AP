import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card, StatCard } from "@/components/AppLayout";
import { PAYMENT_HISTORY } from "@/lib/mock-data";
import { Search, Download } from "lucide-react";

export const Route = createFileRoute("/finance/payment-history")({
  component: PaymentHistoryPage,
});

function PaymentHistoryPage() {
  const [q, setQ] = useState("");
  const [method, setMethod] = useState("all");

  const methods = Array.from(new Set(PAYMENT_HISTORY.map((p) => p.metodo)));

  const filtered = PAYMENT_HISTORY.filter(
    (p) =>
      (q === "" ||
        p.estudiante.toLowerCase().includes(q.toLowerCase()) ||
        p.carne.includes(q) ||
        p.recibo.toLowerCase().includes(q.toLowerCase()) ||
        p.concepto.toLowerCase().includes(q.toLowerCase())) &&
      (method === "all" || p.metodo === method)
  );

  const totalMonto = PAYMENT_HISTORY.reduce((s, p) => s + p.monto, 0);

  return (
    <AppLayout role="finance" title="Historial de Pagos">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Total transacciones" value={PAYMENT_HISTORY.length} accent="bg-success" />
          <StatCard
            label="Monto total recaudado"
            value={`$${totalMonto.toLocaleString()}`}
            accent="bg-navy"
          />
          <StatCard label="Estudiantes únicos" value={new Set(PAYMENT_HISTORY.map((p) => p.carne)).size} accent="bg-green-accent" />
        </div>

        <Card>
          <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
            <h3 className="font-bold">Registro de Pagos</h3>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar estudiante, recibo..."
                  className="rounded-lg border border-border pl-9 pr-3 py-2 text-sm"
                />
              </div>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="rounded-lg border border-border px-3 py-2 text-sm"
              >
                <option value="all">Todos los métodos</option>
                {methods.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:bg-muted transition-colors">
                <Download className="h-4 w-4" /> Exportar
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2">Fecha</th>
                  <th>Recibo</th>
                  <th>Estudiante</th>
                  <th>Carné</th>
                  <th>Concepto</th>
                  <th>Método</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.recibo} className="border-b hover:bg-muted/40">
                    <td className="py-2 font-mono text-xs">{p.fecha}</td>
                    <td className="font-mono text-xs font-semibold text-secondary">{p.recibo}</td>
                    <td className="font-medium">{p.estudiante}</td>
                    <td className="font-mono text-xs">{p.carne}</td>
                    <td className="text-xs">{p.concepto}</td>
                    <td className="text-xs">{p.metodo}</td>
                    <td className="font-mono font-bold">${p.monto.toFixed(2)}</td>
                    <td>
                      <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">{filtered.length} registros</div>
        </Card>
      </div>
    </AppLayout>
  );
}

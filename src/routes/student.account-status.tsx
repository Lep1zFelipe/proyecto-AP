import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, Card } from "@/components/AppLayout";
import { CHARGES } from "@/lib/mock-data";

export const Route = createFileRoute("/student/account-status")({
  component: () => {
    const pending = CHARGES.filter((c) => c.estado === "Pendiente").reduce((s, c) => s + c.monto, 0);
    return (
      <AppLayout role="student" title="Estado de Cuenta">
        <div className="space-y-6">
          <div className={`card-base ${pending > 0 ? "border-danger/40 bg-danger/5" : "border-success/40 bg-success/5"}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold uppercase text-muted-foreground">Saldo pendiente</div>
                <div className={`mt-1 text-4xl font-bold ${pending > 0 ? "text-danger" : "text-success"}`}>${pending.toFixed(2)}</div>
              </div>
              <Link to="/finance/tuition-payments" className="btn-primary">Realizar Pago</Link>
            </div>
          </div>

          <Card>
            <h3 className="mb-3 font-bold">Cargos del Período</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="py-2">Concepto</th><th>Fecha</th><th>Monto</th><th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {CHARGES.map((c, i) => (
                  <tr key={i} className="border-b hover:bg-muted/40">
                    <td className="py-2">{c.concepto}</td>
                    <td className="font-mono text-xs">{c.fecha}</td>
                    <td className="font-mono">${c.monto.toFixed(2)}</td>
                    <td>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.estado === "Pagado" ? "bg-success/15 text-success" : "bg-danger/15 text-danger"}`}>{c.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </AppLayout>
    );
  },
});

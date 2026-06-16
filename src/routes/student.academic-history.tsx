import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, Card } from "@/components/AppLayout";
import { ACADEMIC_HISTORY } from "@/lib/mock-data";
import { Download } from "lucide-react";

export const Route = createFileRoute("/student/academic-history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [tab, setTab] = useState<"period" | "all">("period");
  const totalCred = ACADEMIC_HISTORY.reduce((s, c) => s + c.creditos, 0);
  const avg = ACADEMIC_HISTORY.reduce((s, c) => s + c.nota, 0) / ACADEMIC_HISTORY.length;
  const byPeriod = ACADEMIC_HISTORY.reduce((acc, c) => {
    (acc[c.periodo] = acc[c.periodo] || []).push(c);
    return acc;
  }, {} as Record<string, typeof ACADEMIC_HISTORY>);

  return (
    <AppLayout role="student" title="Historial Académico">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={() => setTab("period")} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${tab === "period" ? "bg-navy text-white" : "bg-muted"}`}>Por Período</button>
            <button onClick={() => setTab("all")} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${tab === "all" ? "bg-navy text-white" : "bg-muted"}`}>Todos los Cursos</button>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-semibold hover:bg-muted"><Download className="h-4 w-4" /> Descargar PDF</button>
        </div>

        {tab === "period" ? (
          <div className="space-y-4">
            {Object.entries(byPeriod).map(([p, items]) => (
              <Card key={p}>
                <h3 className="mb-2 font-bold text-secondary">Período {p}</h3>
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2">Código</th><th>Curso</th><th>Créd.</th><th>Nota</th><th>Estado</th></tr></thead>
                  <tbody>
                    {items.map((c) => (
                      <tr key={c.codigo} className="border-b hover:bg-muted/40">
                        <td className="py-2 font-mono">{c.codigo}</td>
                        <td>{c.nombre}</td>
                        <td className="font-mono">{c.creditos}</td>
                        <td className="font-mono font-bold">{c.nota}</td>
                        <td><span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">{c.estado}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2">Período</th><th>Código</th><th>Curso</th><th>Créd.</th><th>Nota</th><th>Estado</th></tr></thead>
              <tbody>
                {ACADEMIC_HISTORY.map((c) => (
                  <tr key={`${c.periodo}-${c.codigo}`} className="border-b hover:bg-muted/40">
                    <td className="py-2 font-mono text-xs">{c.periodo}</td>
                    <td className="font-mono">{c.codigo}</td>
                    <td>{c.nombre}</td>
                    <td className="font-mono">{c.creditos}</td>
                    <td className="font-mono font-bold">{c.nota}</td>
                    <td><span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">{c.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        <div className="card-base flex items-center justify-around">
          <div className="text-center"><div className="text-xs text-muted-foreground">Total créditos aprobados</div><div className="text-2xl font-bold">{totalCred}</div></div>
          <div className="text-center"><div className="text-xs text-muted-foreground">Promedio acumulado</div><div className="text-2xl font-bold text-success">{avg.toFixed(2)}</div></div>
        </div>
      </div>
    </AppLayout>
  );
}

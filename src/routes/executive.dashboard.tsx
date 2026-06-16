import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Card, StatCard } from "@/components/AppLayout";
import {
  ENROLLMENT_TREND, REVENUE_BY_PERIOD, STUDENTS_BY_CAREER, PERFORMANCE_BY_FACULTY,
  ACADEMIC_INDICATORS, FINANCIAL_INDICATORS,
} from "@/lib/mock-data";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from "recharts";

const PIE_COLORS = [
  "oklch(0.30 0.07 255)", "oklch(0.58 0.12 235)", "oklch(0.78 0.16 75)",
  "oklch(0.50 0.14 150)", "oklch(0.42 0.18 300)",
];

export const Route = createFileRoute("/executive/dashboard")({
  component: () => (
    <AppLayout role="executive" title="Dashboard Ejecutivo">
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-amber-accent to-navy p-6 text-white">
          <h2 className="text-2xl font-bold">Visión Ejecutiva — Período 2026-I</h2>
          <p className="mt-1 opacity-90">Indicadores estratégicos institucionales</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Estudiantes activos" value="1,240" sub="+3.2%" accent="bg-navy" />
          <StatCard label="Ingresos matrícula" value="$248K" sub="+7.1%" accent="bg-success" />
          <StatCard label="Promedio general" value="82.6" sub="/ 100" accent="bg-accent" />
          <StatCard label="Tasa retención" value="94.3%" sub="+1.4%" accent="bg-secondary" />
          <StatCard label="Cursos activos" value={64} accent="bg-purple-accent" />
          <StatCard label="Docentes activos" value={87} accent="bg-teal-accent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="mb-3 font-bold">Tendencia de matrícula (12 meses)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={ENROLLMENT_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 255)" />
                <XAxis dataKey="mes" stroke="oklch(0.50 0.02 260)" />
                <YAxis stroke="oklch(0.50 0.02 260)" domain={["dataMin - 20", "dataMax + 20"]} />
                <Tooltip />
                <Line type="monotone" dataKey="est" stroke="oklch(0.58 0.12 235)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="mb-3 font-bold">Ingresos por período</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={REVENUE_BY_PERIOD}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 255)" />
                <XAxis dataKey="periodo" stroke="oklch(0.50 0.02 260)" />
                <YAxis stroke="oklch(0.50 0.02 260)" />
                <Tooltip />
                <Bar dataKey="ingresos" fill="oklch(0.55 0.14 60)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="mb-3 font-bold">Estudiantes por carrera</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={STUDENTS_BY_CAREER} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
                  {STUDENTS_BY_CAREER.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="mb-3 font-bold">Rendimiento por facultad</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={PERFORMANCE_BY_FACULTY} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 255)" />
                <XAxis type="number" domain={[60, 100]} stroke="oklch(0.50 0.02 260)" />
                <YAxis type="category" dataKey="facultad" width={120} stroke="oklch(0.50 0.02 260)" />
                <Tooltip />
                <Bar dataKey="promedio" fill="oklch(0.42 0.18 300)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card>
          <h3 className="mb-3 font-bold">Indicadores académicos por carrera</h3>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2">Carrera</th><th>Matriculados</th><th>Promedio</th><th>Tasa aprobación</th><th>Tasa deserción</th></tr></thead>
            <tbody>
              {ACADEMIC_INDICATORS.map((a) => (
                <tr key={a.carrera} className="border-b hover:bg-muted/40">
                  <td className="py-2">{a.carrera}</td>
                  <td className="font-mono">{a.matric}</td>
                  <td className="font-mono">{a.promedio}</td>
                  <td className="font-mono text-success">{a.aprob}%</td>
                  <td className="font-mono text-danger">{a.deser}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <h3 className="mb-3 font-bold">Indicadores financieros</h3>
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="py-2">Concepto</th><th>Presupuestado</th><th>Real</th><th>Variación</th></tr></thead>
            <tbody>
              {FINANCIAL_INDICATORS.map((f) => {
                const diff = f.real - f.presupuesto;
                const pct = ((diff / f.presupuesto) * 100).toFixed(1);
                return (
                  <tr key={f.concepto} className="border-b hover:bg-muted/40">
                    <td className="py-2">{f.concepto}</td>
                    <td className="font-mono">${f.presupuesto.toLocaleString()}</td>
                    <td className="font-mono">${f.real.toLocaleString()}</td>
                    <td className={`font-mono font-bold ${diff >= 0 ? "text-success" : "text-danger"}`}>{diff >= 0 ? "+" : ""}{pct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          Datos actualizados al 15 de junio de 2026 — Período 2026-I
        </div>
      </div>
    </AppLayout>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Card } from "@/components/AppLayout";
import {
  ENROLLMENT_TREND, REVENUE_BY_PERIOD, STUDENTS_BY_CAREER,
  PERFORMANCE_BY_FACULTY, ACADEMIC_INDICATORS, FINANCIAL_INDICATORS,
} from "@/lib/mock-data";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, GraduationCap, BookOpen, Award, BarChart2 } from "lucide-react";

const PIE_COLORS = [
  "oklch(0.30 0.07 255)", "oklch(0.58 0.12 235)", "oklch(0.78 0.16 75)",
  "oklch(0.50 0.14 150)", "oklch(0.42 0.18 300)",
];

const KPIs = [
  { label: "Estudiantes activos", value: "1,240", trend: "+3.2%", up: true, icon: Users, accent: "bg-navy text-navy-foreground" },
  { label: "Ingresos matrícula", value: "$248K", trend: "+7.1%", up: true, icon: DollarSign, accent: "bg-success text-white" },
  { label: "Promedio general", value: "82.6", trend: "+0.4", up: true, icon: GraduationCap, accent: "bg-secondary text-white" },
  { label: "Tasa retención", value: "94.3%", trend: "+1.4%", up: true, icon: Award, accent: "bg-teal-accent text-white" },
  { label: "Cursos activos", value: "64", trend: "Período 2026-I", up: true, icon: BookOpen, accent: "bg-purple-accent text-white" },
  { label: "Tasa deserción", value: "4.7%", trend: "-0.3%", up: false, icon: BarChart2, accent: "bg-amber-accent text-white" },
];

export const Route = createFileRoute("/executive/dashboard")({
  component: ExecutiveDashboard,
});

function ExecutiveDashboard() {
  return (
    <AppLayout role="executive" title="Visión Ejecutiva">
      <div className="space-y-5">

        {/* Hero */}
        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{ background: "linear-gradient(135deg, oklch(0.55 0.14 60) 0%, oklch(0.30 0.07 255) 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(ellipse at 0% 0%, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/5" />
          <div className="absolute right-20 bottom-0 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative">
            <p className="text-white/60 text-xs font-medium mb-1">Dashboard Ejecutivo</p>
            <h2 className="text-2xl font-bold text-white">Visión Estratégica Institucional</h2>
            <p className="text-white/70 text-sm mt-0.5">
              Indicadores clave · Período 2026-I · Datos al 15 de junio de 2026
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Crecimiento estudiantil ↑", "Ingresos en máximo histórico", "Deserción bajo control"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/15 border border-white/20 px-3 py-1 text-xs text-white font-medium backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {KPIs.map(({ label, value, trend, up, icon: Icon, accent }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 shadow-sm">
              <div className={`inline-flex rounded-lg p-2 ${accent} mb-3`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-xs text-muted-foreground font-medium leading-tight">{label}</p>
              <p className="text-xl font-bold text-foreground mt-1 leading-none">{value}</p>
              <div className={`flex items-center gap-1 mt-1.5 text-xs font-semibold ${up ? "text-success" : "text-danger"}`}>
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {trend}
              </div>
            </div>
          ))}
        </div>

        {/* Gráficas superiores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <div className="mb-4">
              <h3 className="font-bold">Tendencia de matrícula</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Últimos 12 meses</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ENROLLMENT_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 255)" />
                <XAxis
                  dataKey="mes"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "oklch(0.50 0.02 260)", fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "oklch(0.50 0.02 260)", fontSize: 10 }}
                  domain={["dataMin - 20", "dataMax + 20"]}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: 12 }}
                  formatter={(v) => [v, "Estudiantes"]}
                />
                <Line
                  type="monotone"
                  dataKey="est"
                  stroke="oklch(0.58 0.12 235)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <div className="mb-4">
              <h3 className="font-bold">Ingresos por período</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Evolución histórica</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={REVENUE_BY_PERIOD} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 255)" />
                <XAxis
                  dataKey="periodo"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "oklch(0.50 0.02 260)", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "oklch(0.50 0.02 260)", fontSize: 10 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(v) => [`$${Number(v).toLocaleString()}`, "Ingresos"]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: 12 }}
                />
                <Bar dataKey="ingresos" fill="oklch(0.55 0.14 60)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <div className="mb-4">
              <h3 className="font-bold">Distribución por carrera</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Total: 1,240 estudiantes</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={STUDENTS_BY_CAREER} dataKey="value" nameKey="name" innerRadius={55} outerRadius={88}>
                  {STUDENTS_BY_CAREER.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: 12 }} />
                <Legend iconSize={8} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <div className="mb-4">
              <h3 className="font-bold">Rendimiento por facultad</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Promedio de notas (0–100)</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={PERFORMANCE_BY_FACULTY} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.01 255)" />
                <XAxis
                  type="number"
                  domain={[60, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "oklch(0.50 0.02 260)", fontSize: 10 }}
                />
                <YAxis
                  type="category"
                  dataKey="facultad"
                  width={110}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "oklch(0.50 0.02 260)", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: 12 }}
                />
                <Bar dataKey="promedio" fill="oklch(0.42 0.18 300)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Tablas de indicadores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <h3 className="font-bold mb-4">Indicadores académicos por carrera</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-muted-foreground">
                    <th className="pb-2">Carrera</th>
                    <th className="pb-2 text-right">Matric.</th>
                    <th className="pb-2 text-right">Promedio</th>
                    <th className="pb-2 text-right">Aprobac.</th>
                    <th className="pb-2 text-right">Deserc.</th>
                  </tr>
                </thead>
                <tbody>
                  {ACADEMIC_INDICATORS.map((a) => (
                    <tr key={a.carrera} className="border-b hover:bg-muted/40">
                      <td className="py-2 text-xs font-medium">{a.carrera}</td>
                      <td className="py-2 font-mono text-xs text-right">{a.matric}</td>
                      <td className="py-2 font-mono text-xs text-right font-bold">{a.promedio}</td>
                      <td className="py-2 font-mono text-xs text-right text-success font-semibold">{a.aprob}%</td>
                      <td className="py-2 font-mono text-xs text-right text-danger font-semibold">{a.deser}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-4">Indicadores financieros vs presupuesto</h3>
            <div className="space-y-3">
              {FINANCIAL_INDICATORS.map((f) => {
                const diff = f.real - f.presupuesto;
                const pct = ((diff / f.presupuesto) * 100).toFixed(1);
                const isPositive = diff >= 0;
                const fillPct = Math.min(100, Math.round((f.real / f.presupuesto) * 100));
                return (
                  <div key={f.concepto}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium">{f.concepto}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground font-mono">${f.real.toLocaleString()}</span>
                        <span className={`font-bold font-mono ${isPositive ? "text-success" : "text-danger"}`}>
                          {isPositive ? "+" : ""}{pct}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isPositive ? "bg-success" : "bg-danger"}`}
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                      <span>Presupuesto: ${f.presupuesto.toLocaleString()}</span>
                      <span>{fillPct}% ejecutado</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

      </div>
    </AppLayout>
  );
}

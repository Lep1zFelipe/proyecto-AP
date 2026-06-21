import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, Card } from "@/components/AppLayout";
import { MONTHLY_INCOME, INCOME_BY_CONCEPT, PAYMENT_HISTORY } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  DollarSign, Receipt, History, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, ChevronRight,
} from "lucide-react";

const PIE_COLORS = ["oklch(0.50 0.14 150)", "oklch(0.58 0.12 235)", "oklch(0.78 0.16 75)"];

export const Route = createFileRoute("/finance/dashboard")({
  component: FinanceDashboard,
});

function FinanceDashboard() {
  const thisMonth = MONTHLY_INCOME[MONTHLY_INCOME.length - 1];
  const lastMonth = MONTHLY_INCOME[MONTHLY_INCOME.length - 2];
  const growth = (((thisMonth.ingresos - lastMonth.ingresos) / lastMonth.ingresos) * 100).toFixed(1);
  const isGrowthPositive = thisMonth.ingresos >= lastMonth.ingresos;

  return (
    <AppLayout role="finance" title="Panel Financiero">
      <div className="space-y-5">

        {/* Hero */}
        <div
          className="relative overflow-hidden rounded-2xl p-6"
          style={{ background: "linear-gradient(135deg, oklch(0.50 0.14 150) 0%, oklch(0.30 0.07 255) 100%)" }}
        >
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute right-6 bottom-0 h-40 w-40 rounded-tl-3xl bg-white/5" />

          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <p className="text-white/60 text-xs font-medium mb-1">Módulo Financiero · Período 2026-I</p>
              <p className="text-white/70 text-sm">Ingresos del mes</p>
              <p className="text-4xl font-bold text-white mt-1">${thisMonth.ingresos.toLocaleString()}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-sm">
                {isGrowthPositive
                  ? <TrendingUp className="h-4 w-4 text-green-300" />
                  : <TrendingDown className="h-4 w-4 text-red-300" />}
                <span className={`font-bold ${isGrowthPositive ? "text-green-300" : "text-red-300"}`}>
                  {isGrowthPositive ? "+" : ""}{growth}%
                </span>
                <span className="text-white/50">vs mes anterior (${lastMonth.ingresos.toLocaleString()})</span>
              </div>
            </div>

            <div className="flex gap-6 shrink-0 pb-1">
              {[
                { label: "Pendientes", value: 87, color: "text-amber-300" },
                { label: "Vencidos", value: 12, color: "text-red-300" },
                { label: "Procesados hoy", value: 5, color: "text-green-300" },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                  <p className="text-white/60 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Módulos de acción */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              to: "/finance/tuition-payments",
              label: "Pagos de Matrícula",
              desc: "Procesar cobros de matrícula y servicios estudiantiles",
              icon: DollarSign,
              badge: "87 pendientes",
              badgeColor: "bg-warning/15 text-warning",
            },
            {
              to: "/finance/course-payments",
              label: "Pagos de Cursos",
              desc: "Registrar y gestionar pagos por curso individual",
              icon: Receipt,
              badge: "12 vencidos",
              badgeColor: "bg-danger/15 text-danger",
            },
            {
              to: "/finance/payment-history",
              label: "Historial de Pagos",
              desc: "Consultar transacciones, recibos y reportes",
              icon: History,
              badge: `${PAYMENT_HISTORY.length} registros`,
              badgeColor: "bg-success/15 text-success",
            },
          ].map(({ to, label, desc, icon: Icon, badge, badgeColor }) => (
            <Link
              key={to}
              to={to}
              className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-green-accent hover:shadow-md transition-all group block"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="rounded-xl bg-green-accent/10 p-2.5">
                  <Icon className="h-5 w-5 text-green-accent" />
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColor}`}>{badge}</span>
              </div>
              <p className="font-bold">{label}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-snug">{desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-green-accent group-hover:gap-2 transition-all">
                Ir al módulo <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Gráficas + actividad reciente */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 space-y-5">
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold">Ingresos mensuales</h3>
                <span className="text-xs text-muted-foreground">Últimos 6 meses</span>
              </div>
              <ResponsiveContainer width="100%" height={190}>
                <BarChart data={MONTHLY_INCOME} barSize={28}>
                  <XAxis
                    dataKey="mes"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.50 0.02 260)", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "oklch(0.50 0.02 260)", fontSize: 11 }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    formatter={(v) => [`$${Number(v).toLocaleString()}`, "Ingresos"]}
                    contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", fontSize: 12 }}
                  />
                  <Bar dataKey="ingresos" fill="oklch(0.50 0.14 150)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold">Pagos recientes</h3>
                <Link to="/finance/payment-history" className="text-xs text-secondary font-medium hover:underline">
                  Ver historial →
                </Link>
              </div>
              <div className="space-y-2">
                {PAYMENT_HISTORY.slice(0, 5).map((p) => (
                  <div key={p.recibo} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/40 transition-colors">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{p.estudiante}</p>
                      <p className="text-xs text-muted-foreground truncate">{p.concepto} · {p.metodo}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-mono font-bold">${p.monto}</p>
                      <p className="text-xs text-muted-foreground font-mono">{p.recibo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Columna derecha */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <h3 className="font-bold mb-3">Distribución de ingresos</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={INCOME_BY_CONCEPT} dataKey="value" nameKey="name" innerRadius={45} outerRadius={72}>
                    {INCOME_BY_CONCEPT.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
                  <Legend iconSize={8} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-warning" />
                <h3 className="font-bold text-sm">Alertas de cobro</h3>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Vencidos +30 días", value: 4, color: "text-danger", bg: "bg-danger/10" },
                  { label: "Vencidos 15-30 días", value: 8, color: "text-warning", bg: "bg-warning/10" },
                  { label: "Por vencer esta semana", value: 15, color: "text-amber-500", bg: "bg-amber-500/10" },
                ].map(({ label, value, color, bg }) => (
                  <div key={label} className={`flex items-center justify-between rounded-lg ${bg} px-3 py-2`}>
                    <span className="text-xs font-medium">{label}</span>
                    <span className={`text-sm font-bold font-mono ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* KPIs adicionales */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Recaudación total", value: `$${MONTHLY_INCOME.reduce((s, m) => s + m.ingresos, 0).toLocaleString()}`, note: "Últimos 6 meses" },
                { label: "Promedio mensual", value: `$${Math.round(MONTHLY_INCOME.reduce((s, m) => s + m.ingresos, 0) / MONTHLY_INCOME.length).toLocaleString()}`, note: "Por mes" },
              ].map(({ label, value, note }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-3 shadow-sm">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-base font-bold mt-0.5 leading-tight">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

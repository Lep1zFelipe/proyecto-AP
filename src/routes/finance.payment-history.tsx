import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Card, StatCard } from "@/components/AppLayout";
import { MONTHLY_INCOME, INCOME_BY_CONCEPT } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["oklch(0.50 0.14 150)", "oklch(0.58 0.12 235)", "oklch(0.78 0.16 75)"];

export const Route = createFileRoute("/finance/payment-history")({
  component: () => (
    <AppLayout role="finance" title="Dashboard Financiero">
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-green-accent to-navy p-6 text-white">
          <h2 className="text-2xl font-bold">Gestión Financiera</h2>
          <p className="mt-1 opacity-90">Resumen del período en curso</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Ingresos del mes" value="$124,500" sub="+6.4% vs mes anterior" accent="bg-success" />
          <StatCard label="Pagos pendientes" value={87} accent="bg-warning" />
          <StatCard label="Cobros vencidos" value={12} accent="bg-danger" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="mb-3 font-bold">Ingresos mensuales (últimos 6 meses)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={MONTHLY_INCOME}>
                <XAxis dataKey="mes" stroke="oklch(0.50 0.02 260)" />
                <YAxis stroke="oklch(0.50 0.02 260)" />
                <Tooltip />
                <Bar dataKey="ingresos" fill="oklch(0.50 0.14 150)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="mb-3 font-bold">Ingresos por concepto</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={INCOME_BY_CONCEPT} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
                  {INCOME_BY_CONCEPT.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </AppLayout>
  ),
});

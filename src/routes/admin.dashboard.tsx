import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout, StatCard } from "@/components/AppLayout";
import { Users, GraduationCap, BookOpen, CalendarRange } from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: () => (
    <AppLayout role="admin" title="Dashboard Administrativo">
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-purple-accent to-navy p-6 text-white">
          <h2 className="text-2xl font-bold">Panel de Administración</h2>
          <p className="mt-1 opacity-90">Período académico activo: 2026-I</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total estudiantes" value="1,240" accent="bg-purple-accent" />
          <StatCard label="Total docentes" value={87} accent="bg-navy" />
          <StatCard label="Cursos activos" value={64} accent="bg-accent" />
          <StatCard label="Período actual" value="2026-I" accent="bg-success" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { to: "/admin/students", label: "Gestionar Estudiantes", icon: Users },
            { to: "/admin/teachers", label: "Gestionar Docentes", icon: GraduationCap },
            { to: "/admin/courses", label: "Gestionar Cursos", icon: BookOpen },
            { to: "/admin/periods", label: "Gestionar Períodos", icon: CalendarRange },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.to} to={c.to} className="card-base hover:border-purple-accent transition-colors">
                <Icon className="h-7 w-7 text-purple-accent" />
                <div className="mt-3 font-bold">{c.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">Ver y administrar →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </AppLayout>
  ),
});

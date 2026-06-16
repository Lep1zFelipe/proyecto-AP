import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, User, ClipboardList, Calendar, GraduationCap, CreditCard,
  History, Users, BookOpen, CalendarRange, DollarSign, Receipt, BarChart3,
  LogOut, Bell, CheckSquare, ClipboardCheck, FileText, TrendingUp,
} from "lucide-react";
import { getSession, logout, ROLE_LABEL, type Role } from "@/lib/auth";

const NAV: Record<Role, { to: string; label: string; icon: any }[]> = {
  student: [
    { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/profile", label: "Mi Perfil", icon: User },
    { to: "/student/enrollment", label: "Matrícula", icon: ClipboardList },
    { to: "/student/schedule", label: "Horario", icon: Calendar },
    { to: "/student/grades", label: "Calificaciones", icon: GraduationCap },
    { to: "/student/account-status", label: "Estado de Cuenta", icon: CreditCard },
    { to: "/student/academic-history", label: "Historial Académico", icon: History },
  ],
  teacher: [
    { to: "/teacher/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/teacher/courses", label: "Mis Cursos", icon: BookOpen },
    { to: "/teacher/attendance", label: "Asistencia", icon: CheckSquare },
    { to: "/teacher/grades", label: "Calificaciones", icon: ClipboardCheck },
  ],
  admin: [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/students", label: "Estudiantes", icon: Users },
    { to: "/admin/teachers", label: "Docentes", icon: GraduationCap },
    { to: "/admin/courses", label: "Cursos", icon: BookOpen },
    { to: "/admin/periods", label: "Períodos", icon: CalendarRange },
  ],
  finance: [
    { to: "/finance/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/finance/tuition-payments", label: "Pagos de Matrícula", icon: DollarSign },
    { to: "/finance/course-payments", label: "Pagos de Cursos", icon: Receipt },
    { to: "/finance/payment-history", label: "Historial de Pagos", icon: History },
  ],
  executive: [
    { to: "/executive/dashboard", label: "Dashboard Ejecutivo", icon: BarChart3 },
  ],
};

const ACCENTS: Record<Role, string> = {
  student: "border-l-navy",
  teacher: "border-l-teal-accent",
  admin: "border-l-purple-accent",
  finance: "border-l-green-accent",
  executive: "border-l-amber-accent",
};

const BADGE_COLOR: Record<Role, string> = {
  student: "bg-navy text-navy-foreground",
  teacher: "bg-teal-accent text-white",
  admin: "bg-purple-accent text-white",
  finance: "bg-green-accent text-white",
  executive: "bg-amber-accent text-white",
};

export function AppLayout({ role, title, children }: { role: Role; title: string; children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [session, setSession] = useState<ReturnType<typeof getSession>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const s = getSession();
    if (!s || s.role !== role) {
      navigate({ to: "/login" });
      return;
    }
    setSession(s);
  }, [role, navigate]);

  if (!mounted || !session) {
    return <div className="min-h-screen bg-background" />;
  }

  const nav = NAV[role];
  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className={`fixed left-0 top-0 z-30 flex h-screen w-60 flex-col border-r border-l-4 ${ACCENTS[role]} bg-white`}>
        <div className="border-b p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-navy-foreground font-bold">U</div>
            <div>
              <div className="text-xs font-semibold text-foreground leading-tight">Universidad</div>
              <div className="text-xs text-muted-foreground leading-tight">Tecnológica La Mejor</div>
            </div>
          </div>
          <div className={`mt-3 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${BADGE_COLOR[role]}`}>
            Portal {ROLE_LABEL[role]}
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-navy text-navy-foreground font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-3">
          <button
            onClick={() => { logout(); navigate({ to: "/login" }); }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger hover:bg-danger/10 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <div className="ml-60 flex w-full flex-col min-h-screen">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-6">
          <div>
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
            <div className="text-xs text-muted-foreground">
              {crumbs.map((c, i) => (
                <span key={i}>{i > 0 && " / "}<span className="capitalize">{c.replace("-", " ")}</span></span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 hover:bg-muted">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">3</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-navy-foreground font-semibold text-sm">
                {session.name.split(" ").slice(0, 2).map((s) => s[0]).join("")}
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground leading-tight">{session.name}</div>
                <div className="text-xs text-muted-foreground leading-tight">{ROLE_LABEL[role]}</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card-base ${className}`}>{children}</div>;
}

export function StatCard({ label, value, sub, accent = "bg-navy" }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <div className="card-base relative overflow-hidden">
      <div className={`absolute left-0 top-0 h-full w-1 ${accent}`} />
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-bold text-foreground">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

export function Toast({ message, type = "success", onClose }: { message: string; type?: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${type === "success" ? "bg-success" : "bg-danger"}`}>
      {message}
    </div>
  );
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

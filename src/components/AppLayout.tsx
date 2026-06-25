import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, User, ClipboardList, Calendar, GraduationCap, CreditCard,
  History, Users, BookOpen, CalendarRange, DollarSign, Receipt, BarChart3,
  LogOut, Bell, CheckSquare, ClipboardCheck, X,
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

const ROLE_GRADIENT: Record<Role, string> = {
  student: "from-navy to-secondary",
  teacher: "from-teal-accent to-navy",
  admin: "from-purple-accent to-navy",
  finance: "from-green-accent to-navy",
  executive: "from-amber-accent to-navy",
};

const ACTIVE_BG: Record<Role, string> = {
  student: "bg-navy text-navy-foreground",
  teacher: "bg-teal-accent text-white",
  admin: "bg-purple-accent text-white",
  finance: "bg-green-accent text-white",
  executive: "bg-amber-accent text-white",
};

const BADGE_COLOR: Record<Role, string> = {
  student: "bg-navy/10 text-navy",
  teacher: "bg-teal-accent/10 text-teal-accent",
  admin: "bg-purple-accent/10 text-purple-accent",
  finance: "bg-green-accent/10 text-green-accent",
  executive: "bg-amber-accent/10 text-amber-accent",
};

const AVATAR_BG: Record<Role, string> = {
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

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="fixed left-0 top-0 z-30 flex h-screen w-60 flex-col bg-white shadow-[1px_0_0_0_var(--color-border)]">
        <div className={`bg-gradient-to-br ${ROLE_GRADIENT[role]} p-5`}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white font-bold text-lg backdrop-blur-sm">
              U
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Universidad</div>
              <div className="text-[11px] text-white/70 leading-tight">Tecnológica La Mejor</div>
            </div>
          </div>
          <div className={`mt-3 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-white/20 text-white backdrop-blur-sm`}>
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
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                  active
                    ? `${ACTIVE_BG[role]} font-semibold shadow-sm`
                    : "text-foreground hover:bg-muted font-medium"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-3">
          <button
            onClick={() => { logout(); navigate({ to: "/login" }); }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-danger hover:bg-danger/10 transition-colors font-medium"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <div className="ml-60 flex w-full flex-col min-h-screen">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/95 backdrop-blur-sm px-6">
          <div>
            <h1 className="text-base font-bold text-foreground">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-2 hover:bg-muted transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white leading-none">
                3
              </span>
            </button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${AVATAR_BG[role]} font-semibold text-xs`}>
                {session.name.split(" ").slice(0, 2).map((s) => s[0]).join("")}
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground leading-tight">{session.name}</div>
                <div className={`text-[11px] font-medium leading-tight px-1.5 py-0.5 rounded-full inline-block ${BADGE_COLOR[role]}`}>
                  {ROLE_LABEL[role]}
                </div>
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
  return (
    <div className={`bg-card border border-border rounded-xl p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  accent = "bg-navy",
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  icon?: any;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm relative overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent} rounded-l-xl`} />
      <div className="flex items-start justify-between pl-1">
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </div>
          <div className="mt-1.5 text-2xl font-bold text-foreground leading-none">{value}</div>
          {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
        </div>
        {Icon && (
          <div className={`rounded-lg p-2 ${accent} bg-opacity-10`}>
            <Icon className={`h-5 w-5 ${accent.replace("bg-", "text-")}`} />
          </div>
        )}
      </div>
    </div>
  );
}

export function Toast({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-xl ${
        type === "success" ? "bg-success" : "bg-danger"
      }`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 transition-opacity">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

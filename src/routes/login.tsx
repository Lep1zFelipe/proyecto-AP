import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, ChevronRight, BookOpen, Users, BarChart3 } from "lucide-react";
import { login, ROLE_HOME, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Iniciar Sesión — UTLM" }],
  }),
  component: LoginPage,
});

const HIGHLIGHTS = [
  { icon: Users, label: "Estudiantes activos", value: "1,240" },
  { icon: BookOpen, label: "Cursos disponibles", value: "64" },
  { icon: BarChart3, label: "Tasa de retención", value: "94.3%" },
];

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = { email: !email, password: !password };
    setErrors(err);
    if (err.email || err.password) return;
    setLoading(true);
    setTimeout(() => {
      login(email, role);
      navigate({ to: ROLE_HOME[role] });
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-[55%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, oklch(0.22 0.06 260) 0%, oklch(0.30 0.07 255) 50%, oklch(0.38 0.10 240) 100%)" }}
      >
        {/* Geometric decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full border border-white/5" />
          <div className="absolute -top-12 -right-12 h-72 w-72 rounded-full border border-white/5" />
          <div className="absolute top-1/3 -left-32 h-64 w-64 rounded-full bg-white/[0.03]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-tl-[120px] bg-white/[0.04]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">Universidad Tecnológica</div>
              <div className="text-white/60 text-xs leading-tight">La Mejor · UTLM</div>
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Plataforma<br />
              <span className="text-white/50">Universitaria</span><br />
              Integrada
            </h1>
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-xs">
              Gestión académica, financiera y administrativa en un solo lugar.
              Accede con tu cuenta institucional para continuar.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {HIGHLIGHTS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl bg-white/[0.07] border border-white/10 p-3 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-white/50 mb-1.5" />
                <div className="text-xl font-bold text-white leading-none">{value}</div>
                <div className="text-[11px] text-white/50 mt-1 leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-white/30">
          © {new Date().getFullYear()} Universidad Tecnológica La Mejor. Todos los derechos reservados.
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background px-8 py-12">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-foreground leading-tight">UTLM</div>
            <div className="text-xs text-muted-foreground leading-tight">Portal Universitario</div>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Iniciar sesión</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingresa tus credenciales institucionales
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@utlm.ac.cr"
                autoComplete="email"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60
                  focus:border-navy focus:ring-4 focus:ring-navy/10
                  ${errors.email ? "border-danger ring-2 ring-danger/20" : "border-border"}`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-danger">Ingresa tu correo electrónico</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60
                  focus:border-navy focus:ring-4 focus:ring-navy/10
                  ${errors.password ? "border-danger ring-2 ring-danger/20" : "border-border"}`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-danger">Ingresa tu contraseña</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Tipo de acceso
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-all focus:border-navy focus:ring-4 focus:ring-navy/10"
              >
                <option value="student">Estudiante</option>
                <option value="teacher">Docente</option>
                <option value="admin">Administrador</option>
                <option value="finance">Financiero</option>
                <option value="executive">Ejecutivo</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-navy/90 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Ingresar
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground/60">
            Sistema de uso exclusivo para personal y estudiantes de UTLM.
          </p>
        </div>
      </div>
    </div>
  );
}

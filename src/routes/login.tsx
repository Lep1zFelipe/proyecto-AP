import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { login, ROLE_HOME, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Iniciar Sesión — UTLM" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = { email: !email, password: !password };
    setErrors(err);
    if (err.email || err.password) return;
    login(email, role);
    navigate({ to: ROLE_HOME[role] });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.30 0.07 255), oklch(0.22 0.06 260))" }}>
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-navy-foreground">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Universidad Tecnológica La Mejor</h1>
          <p className="mt-1 text-sm text-muted-foreground">Plataforma Universitaria Integrada</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@utlm.ac.cr"
              className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 ${errors.email ? "border-danger" : "border-border"}`}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30 ${errors.password ? "border-danger" : "border-border"}`}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground">Rol</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/30"
            >
              <option value="student">Estudiante</option>
              <option value="teacher">Docente</option>
              <option value="admin">Administrador</option>
              <option value="finance">Financiero</option>
              <option value="executive">Ejecutivo</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full">Iniciar Sesión</button>
          <p className="text-center text-xs text-muted-foreground">
            Usuario demo: cualquier email / contraseña: <span className="font-mono font-semibold">1234</span>
          </p>
        </form>
      </div>
    </div>
  );
}

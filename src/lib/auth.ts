export type Role = "student" | "teacher" | "admin" | "finance" | "executive";

export interface Session {
  email: string;
  role: Role;
  name: string;
}

const KEY = "utlm_session";

const NAMES: Record<Role, string> = {
  student: "María González Rojas",
  teacher: "Prof. Luis Hernández Vargas",
  admin: "Admin - Registraduría",
  finance: "Carla Mora Jiménez",
  executive: "Dr. Roberto Chaves",
};

export function login(email: string, role: Role) {
  const session: Session = { email, role, name: NAMES[role] };
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export const ROLE_LABEL: Record<Role, string> = {
  student: "Estudiante",
  teacher: "Docente",
  admin: "Administrador",
  finance: "Financiero",
  executive: "Ejecutivo",
};

export const ROLE_HOME: Record<Role, string> = {
  student: "/student/dashboard",
  teacher: "/teacher/dashboard",
  admin: "/admin/dashboard",
  finance: "/finance/dashboard",
  executive: "/executive/dashboard",
};

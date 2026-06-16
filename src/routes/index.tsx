import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { getSession, ROLE_HOME } from "@/lib/auth";

export const Route = createFileRoute("/")({
  component: IndexRedirect,
});

function IndexRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const s = getSession();
    navigate({ to: s ? ROLE_HOME[s.role] : "/login" });
  }, [navigate]);
  return <div className="min-h-screen bg-background" />;
}

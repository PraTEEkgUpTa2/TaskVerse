// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

    const auth = useAuth();
    if(!auth) return;
    const { user, loading } = auth;

  if (loading) return null; // or show spinner

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

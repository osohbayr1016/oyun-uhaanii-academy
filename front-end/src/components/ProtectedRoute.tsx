"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated()) {
        router.push("/login");
        return;
      }

      if (requireAdmin && !isAdmin()) {
        router.push("/");
        return;
      }
    }
  }, [user, loading, requireAdmin, router, isAuthenticated, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return null; // Will redirect to login
  }

  if (requireAdmin && !isAdmin()) {
    return null; // Will redirect to home
  }

  return <>{children}</>;
}

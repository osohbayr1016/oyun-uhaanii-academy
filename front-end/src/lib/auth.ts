import { useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
  });

  useEffect(() => {
    // Check for existing auth on mount
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthState({
          user,
          token,
          loading: false,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    } else {
      setAuthState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setAuthState({
          user: data.user,
          token: data.token,
          loading: false,
        });

        return { success: true, data };
      } else {
        return { success: false, error: data.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.message || "Registration failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      token: null,
      loading: false,
    });
  };

  const isAuthenticated = () => {
    return !!authState.token && !!authState.user;
  };

  const isAdmin = () => {
    return authState.user?.role === "admin";
  };

  return {
    ...authState,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
  };
};

// API utility for authenticated requests
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

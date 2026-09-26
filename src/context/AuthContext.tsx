"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User, AuthContextType } from "@/lib/authTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "lattice_user_session";
const COOKIE_NAME = "lattice_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [clientId, setClientId] = useState<string>(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "917297586357-on8u6s4kl9nqdjrdl01gssgggrclunni.apps.googleusercontent.com"
  );

  // Restore user session on mount (prevents SSR hydration mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        if (parsed && parsed.email) {
          queueMicrotask(() => setUser(parsed));
        }
      }
    } catch (err) {
      console.error("Failed to restore auth session:", err);
    }
  }, []);

  // Fetch client ID from server config if missing
  useEffect(() => {
    fetch("/api/auth/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.clientId) {
          setClientId(data.clientId);
        }
      })
      .catch(() => {});
  }, []);

  const loginWithUser = useCallback(
    (userData: User) => {
      setUser(userData);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        const maxAge = 365 * 24 * 60 * 60;
        document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
          JSON.stringify(userData)
        )}; path=/; max-age=${maxAge}; SameSite=Lax`;
      } catch (err) {
        console.error("Failed to save session:", err);
      }

      setIsAuthModalOpen(false);

      if (pendingAction) {
        setTimeout(() => {
          pendingAction();
          setPendingAction(null);
        }, 100);
      }
    },
    [pendingAction]
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } catch (err) {
      console.error("Failed to clear session:", err);
    }
  }, []);

  const openAuthModal = useCallback((onSuccess?: () => void) => {
    if (onSuccess) {
      setPendingAction(() => onSuccess);
    } else {
      setPendingAction(null);
    }
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setPendingAction(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: false,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        loginWithUser,
        logout,
        clientId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

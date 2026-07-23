"use client";

import { useEffect, useState } from "react";
import { users } from "@/data/mock-data";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ResidenteDashboard } from "@/components/ResidenteDashboard";
import { SuperAdminDashboard } from "@/components/SuperAdminDashboard";
import { TrabajadorDashboard } from "@/components/TrabajadorDashboard";
import { LoginScreen } from "@/components/LoginScreen";
import { LandingPage } from "@/components/LandingPage";

const SESSION_KEY = "comunipy.session.v1";

interface Session {
  userId: string | null;
  showLogin: boolean;
}

export default function Home() {
  const [session, setSession] = useState<Session>({ userId: null, showLogin: false });
  const [hydrated, setHydrated] = useState(false);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Session;
        if (parsed && typeof parsed === "object") setSession(parsed);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist on any change (after hydration to avoid overwriting)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      // ignore
    }
  }, [session, hydrated]);

  // Avoid mismatch during SSR: render nothing until hydrated
  if (!hydrated) {
    return <div className="min-h-screen bg-white" aria-hidden="true" />;
  }

  const currentUser = users.find((u) => u.id === session.userId);

  const setUserId = (id: string | null) => setSession({ userId: id, showLogin: false });
  const setShowLogin = (v: boolean) => setSession((s) => ({ ...s, showLogin: v }));

  if (!currentUser && !session.showLogin) {
    return <LandingPage onLogin={() => setShowLogin(true)} />;
  }

  if (!currentUser) {
    return <LoginScreen onLogin={setUserId} onBack={() => setShowLogin(false)} />;
  }

  const handleLogout = () => {
    try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setSession({ userId: null, showLogin: false });
  };

  switch (currentUser.role) {
    case "superadmin":
      return <SuperAdminDashboard user={currentUser} onLogout={handleLogout} />;
    case "admin":
      return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
    case "residente":
      return <ResidenteDashboard user={currentUser} onLogout={handleLogout} />;
    case "trabajador":
      return <TrabajadorDashboard user={currentUser} onLogout={handleLogout} />;
    default:
      return null;
  }
}

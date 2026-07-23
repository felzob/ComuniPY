"use client";

import { useState } from "react";
import { users, UserRole } from "@/data/mock-data";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ResidenteDashboard } from "@/components/ResidenteDashboard";
import { SuperAdminDashboard } from "@/components/SuperAdminDashboard";
import { TrabajadorDashboard } from "@/components/TrabajadorDashboard";
import { LoginScreen } from "@/components/LoginScreen";
import { LandingPage } from "@/components/LandingPage";

export default function Home() {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const currentUser = users.find((u) => u.id === currentUserId);

  if (!currentUser && !showLogin) {
    return <LandingPage onLogin={() => setShowLogin(true)} />;
  }

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUserId} onBack={() => setShowLogin(false)} />;
  }

  const handleLogout = () => { setCurrentUserId(null); setShowLogin(false); };

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

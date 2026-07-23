"use client";

import { useState } from "react";
import { User, edificios, cobros, reclamos, mantenciones, gastosOCR } from "@/data/mock-data";
import { HamburgerMenu } from "./HamburgerMenu";
import { EdificioView } from "./EdificioView";
import { DashboardView } from "./admin/DashboardView";
import { CobrosView } from "./admin/CobrosView";
import { UnidadesView } from "./admin/UnidadesView";
import { GastosView } from "./admin/GastosView";
import { BancoView } from "./admin/BancoView";
import { ReclamosView } from "./admin/ReclamosView";
import { MantencionesView } from "./admin/MantencionesView";
import { ProveedoresView } from "./admin/ProveedoresView";
import { ReportesView } from "./admin/ReportesView";
import { LiquidacionView } from "./admin/LiquidacionView";
import { AsambleasView } from "./admin/AsambleasView";
import { VotacionesView } from "./admin/VotacionesView";
import { AuditoriaView } from "./admin/AuditoriaView";
import { ConfigView } from "./admin/ConfigView";

type AdminTab =
  | "dashboard" | "edificio" | "cobros" | "liquidacion" | "unidades"
  | "gastos" | "banco" | "reclamos" | "mantenciones" | "asambleas"
  | "votaciones" | "proveedores" | "reportes" | "auditoria" | "config";

interface Props {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [selectedEdificio] = useState("e1");
  const edificio = edificios.find(e => e.id === selectedEdificio) || edificios[0];

  const menuItems = [
    { id: "dashboard", label: "Inicio", icon: "📊" },
    { id: "edificio", label: "Edificio", icon: "🏗️" },
    { id: "cobros", label: "Cobros", icon: "💰", badge: cobros.filter(c => c.estado === "pendiente" || c.estado === "vencido" || c.estado === "mora").length },
    { id: "liquidacion", label: "Liquidación", icon: "📑" },
    { id: "unidades", label: "Unidades", icon: "🏢" },
    { id: "gastos", label: "Gastos (OCR)", icon: "🧾", badge: gastosOCR.filter(g => g.estado === "draft").length },
    { id: "banco", label: "Banco", icon: "🏦" },
    { id: "reclamos", label: "Reclamos", icon: "📢", badge: reclamos.filter(r => r.estado !== "resuelto").length },
    { id: "mantenciones", label: "Mantenciones", icon: "🔧", badge: mantenciones.filter(m => m.estado === "vencida").length },
    { id: "asambleas", label: "Asambleas", icon: "👥" },
    { id: "votaciones", label: "Votaciones", icon: "🗳️" },
    { id: "proveedores", label: "Proveedores", icon: "🤝" },
    { id: "reportes", label: "Reportes", icon: "📈" },
    { id: "auditoria", label: "Auditoría", icon: "🔒" },
    { id: "config", label: "Configuración", icon: "⚙️" },
  ];

  const pagados = cobros.filter(c => c.estado === "pagado");
  const pendientes = cobros.filter(c => c.estado === "pendiente");
  const vencidos = cobros.filter(c => c.estado === "vencido");
  const enMora = cobros.filter(c => c.estado === "mora");
  const totalRecaudado = pagados.reduce((s, c) => s + c.monto, 0);
  const totalEmitido = cobros.reduce((s, c) => s + c.monto, 0);
  const tasaRecaudacion = ((totalRecaudado / totalEmitido) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-ink-50/50" data-testid="admin-dashboard">
      <HamburgerMenu
        items={menuItems}
        activeItem={activeTab}
        onSelect={(id) => setActiveTab(id as AdminTab)}
        title="ComuniPy"
        subtitle={`${edificio.nombre} — Admin`}
        userName={user.nombre}
        userRole="Administrador"
        onLogout={onLogout}
      />
      <main className="pt-24 px-4 pb-10 max-w-7xl mx-auto anim-fade-up">
        {activeTab === "dashboard" && (
          <DashboardView
            totalRecaudado={totalRecaudado}
            totalEmitido={totalEmitido}
            tasaRecaudacion={tasaRecaudacion}
            pagados={pagados.length}
            pendientes={pendientes.length}
            vencidos={vencidos.length}
            enMora={enMora.length}
          />
        )}
        {activeTab === "edificio" && <EdificioView />}
        {activeTab === "cobros" && <CobrosView />}
        {activeTab === "liquidacion" && <LiquidacionView />}
        {activeTab === "unidades" && <UnidadesView />}
        {activeTab === "gastos" && <GastosView />}
        {activeTab === "banco" && <BancoView />}
        {activeTab === "reclamos" && <ReclamosView />}
        {activeTab === "mantenciones" && <MantencionesView />}
        {activeTab === "asambleas" && <AsambleasView />}
        {activeTab === "votaciones" && <VotacionesView />}
        {activeTab === "proveedores" && <ProveedoresView />}
        {activeTab === "reportes" && <ReportesView />}
        {activeTab === "auditoria" && <AuditoriaView />}
        {activeTab === "config" && <ConfigView />}
      </main>
    </div>
  );
}

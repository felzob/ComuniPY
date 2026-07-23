"use client";

import { useState } from "react";
import { User, edificios, formatGuaranies } from "@/data/mock-data";
import { HamburgerMenu } from "./HamburgerMenu";

type SuperTab = "overview" | "edificios" | "transacciones" | "clientes" | "facturacion" | "sistema";

interface Props {
  user: User;
  onLogout: () => void;
}

export function SuperAdminDashboard({ user, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<SuperTab>("overview");

  const menuItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "edificios", label: "Edificios", icon: "🏢" },
    { id: "transacciones", label: "Transacciones", icon: "💳" },
    { id: "clientes", label: "Clientes", icon: "👥" },
    { id: "facturacion", label: "Facturación", icon: "💰" },
    { id: "sistema", label: "Sistema", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-mesh-dark text-slate-100 relative" data-testid="superadmin-dashboard">
      <div className="absolute inset-0 bg-grid-neon opacity-60 pointer-events-none" />
      <div className="relative">
        <HamburgerMenu
          items={menuItems}
          activeItem={activeTab}
          onSelect={(id) => setActiveTab(id as SuperTab)}
          title="ComuniPy"
          subtitle="Backoffice · Plataforma"
          userName={user.nombre}
          userRole="Super Admin"
          onLogout={onLogout}
          variant="dark"
        />

        <main className="pt-24 px-4 pb-10 max-w-7xl mx-auto anim-fade-up">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-300">Overview</p>
                <h1 className="text-2xl font-extrabold text-white mt-1">Platform Overview</h1>
                <p className="text-[13px] text-slate-400">Estado global de la plataforma ComuniPy</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { l: "Edificios activos", v: "3", d: "+1 este mes", tone: "text-white", accent: "text-emerald-400", glow: "shadow-neon-blue" },
                  { l: "Unidades totales", v: "144", d: "48 + 32 + 64", tone: "text-white", accent: "text-slate-400" },
                  { l: "MRR mensual", v: "$247", d: "USD equivalente", tone: "text-emerald-400", accent: "text-slate-400", glow: "shadow-neon-emerald" },
                  { l: "Transacciones Julio", v: "43", d: "+18% vs. Junio", tone: "text-white", accent: "text-cyan-300", glow: "shadow-neon-cyan" },
                ].map((k) => (
                  <div key={k.l} className={`relative overflow-hidden rounded-2xl bg-ink-900/80 border border-white/10 p-5 backdrop-blur ${k.glow || ""}`}>
                    <p className="text-[11px] uppercase tracking-widest font-semibold text-slate-400">{k.l}</p>
                    <p className={`text-3xl font-extrabold mt-1 ${k.tone}`}>{k.v}</p>
                    <p className={`text-[11px] mt-1 ${k.accent}`}>{k.d}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-ink-900/70 border border-white/10 p-6 backdrop-blur">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-bold text-white">Revenue por concepto</h3>
                    <span className="text-[10.5px] uppercase tracking-widest text-cyan-300 font-semibold">Julio 2026</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { l: "Plan Profesional (2 edificios)", v: "$138 USD" },
                      { l: "Plan Empresa (1 edificio)", v: "$79 USD" },
                      { l: "Fee transaccional (43 txs)", v: "$30 USD" },
                    ].map((r) => (
                      <div key={r.l} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                        <span className="text-[13px] text-slate-300">{r.l}</span>
                        <span className="text-[13.5px] font-semibold text-white">{r.v}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-3 mt-1 border-t border-white/10">
                      <span className="text-[13px] font-bold text-slate-200">Total MRR</span>
                      <span className="text-lg font-extrabold text-emerald-400">$247 USD</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-ink-900/70 border border-white/10 p-6 backdrop-blur">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-bold text-white">Estado del sistema</h3>
                    <span className="pill bg-emerald-500/10 text-emerald-300 border border-emerald-400/20"><span className="dot-live"></span> Operativo</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      ["API Backend", "Operativo", "emerald"],
                      ["Base de datos", "Operativo", "emerald"],
                      ["SPI Gateway", "Conectado", "emerald"],
                      ["Tigo Money API", "Conectado", "emerald"],
                      ["Personal Pay API", "Conectado", "emerald"],
                      ["Amazon SES (emails)", "Activo", "emerald"],
                      ["Uptime (30 días)", "99.87%", "cyan"],
                    ].map(([label, val, color], i) => (
                      <div key={i} className="flex justify-between items-center py-1">
                        <span className="text-[13px] text-slate-300">{label}</span>
                        {color === "emerald" ? (
                          <span className="pill bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">{val}</span>
                        ) : (
                          <span className="text-[13.5px] font-semibold text-white font-mono">{val}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "edificios" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-300">Edificios</p>
                  <h1 className="text-2xl font-extrabold text-white mt-1">Edificios en plataforma</h1>
                </div>
                <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-[13px] font-semibold shadow-neon-cyan hover:brightness-110 transition-all">
                  + Onboarding nuevo edificio
                </button>
              </div>
              <div className="space-y-3">
                {edificios.map(e => (
                  <div key={e.id} className="rounded-2xl bg-ink-900/70 border border-white/10 p-5 backdrop-blur flex items-center justify-between flex-wrap gap-4 hover:border-cyan-500/30 transition-colors">
                    <div>
                      <h3 className="text-[14px] font-bold text-white">{e.nombre}</h3>
                      <p className="text-[12px] text-slate-400 mt-0.5">{e.direccion}, {e.ciudad}</p>
                      <div className="flex flex-wrap gap-3 mt-2 text-[11.5px] text-slate-400">
                        <span>· {e.unidades} unidades</span>
                        <span>· {e.pisos} pisos</span>
                        <span>· RUC: <span className="font-mono">{e.ruc}</span></span>
                        <span>· {e.banco}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="pill bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">Activo</span>
                      <button className="text-[12.5px] text-cyan-300 hover:text-cyan-200 font-semibold">Gestionar →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "transacciones" && (
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-300">Transacciones</p>
                <h1 className="text-2xl font-extrabold text-white mt-1">Transacciones de la plataforma</h1>
              </div>
              <div className="rounded-2xl bg-ink-900/70 border border-white/10 overflow-hidden backdrop-blur">
                <table className="w-full">
                  <thead className="bg-white/[0.03] border-b border-white/10">
                    <tr>
                      {["ID", "Edificio", "Unidad", "Monto", "Canal", "Fee", "Estado", "Fecha"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "TXN-0043", ed: "Torre Ñandutí", u: "4B", m: 696000, ch: "Tigo Money", f: 6960, dt: "10/07/2026" },
                      { id: "TXN-0042", ed: "Torre Ñandutí", u: "6B", m: 696000, ch: "SPI", f: 6960, dt: "09/07/2026" },
                      { id: "TXN-0041", ed: "Torre Ñandutí", u: "4A", m: 812000, ch: "SPI", f: 8120, dt: "08/07/2026" },
                      { id: "TXN-0040", ed: "Residencial Cerro Corá", u: "3C", m: 520000, ch: "Personal Pay", f: 5200, dt: "07/07/2026" },
                      { id: "TXN-0039", ed: "Torre Ñandutí", u: "5B", m: 696000, ch: "Personal Pay", f: 6960, dt: "05/07/2026" },
                    ].map((t) => (
                      <tr key={t.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3 text-[11.5px] text-cyan-300 font-mono">{t.id}</td>
                        <td className="px-4 py-3 text-[13px] text-slate-200">{t.ed}</td>
                        <td className="px-4 py-3 text-[13px] text-slate-300">{t.u}</td>
                        <td className="px-4 py-3 text-[13px] text-white font-semibold">{formatGuaranies(t.m)}</td>
                        <td className="px-4 py-3 text-[13px] text-slate-300">{t.ch}</td>
                        <td className="px-4 py-3 text-[13px] text-emerald-400">{formatGuaranies(t.f)}</td>
                        <td className="px-4 py-3"><span className="pill bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">Completada</span></td>
                        <td className="px-4 py-3 text-[12px] text-slate-500 font-mono">{t.dt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "clientes" && (
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-300">Clientes</p>
                <h1 className="text-2xl font-extrabold text-white mt-1">Clientes (Administradoras)</h1>
              </div>
              <div className="rounded-2xl bg-ink-900/70 border border-white/10 p-5 backdrop-blur">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-neon-cyan">MG</div>
                    <div>
                      <h3 className="text-[14px] font-bold text-white">AdminPro SRL · María González</h3>
                      <p className="text-[11.5px] text-slate-400">maria@adminpro.com.py · +595 21 345678</p>
                      <div className="flex flex-wrap gap-3 mt-1 text-[11px] text-slate-500">
                        <span>3 edificios</span><span>· 144 unidades</span><span>· Plan: Empresa</span><span>· Desde 01/03/2026</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-emerald-400">$247 USD/mes</p>
                    <p className="text-[11px] text-slate-500">SaaS + fees</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "facturacion" && (
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-300">Facturación</p>
                <h1 className="text-2xl font-extrabold text-white mt-1">Facturación</h1>
              </div>
              <div className="rounded-2xl bg-ink-900/70 border border-white/10 overflow-hidden backdrop-blur">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr>
                      {["Factura", "Cliente", "Concepto", "Monto", "Estado"].map((h, i) => (
                        <th key={h} className={`text-${i === 3 ? "right" : "left"} px-4 py-3 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { f: "FAC-2026-007", c: "AdminPro SRL", con: "Plan Empresa Julio 2026 + Fees", m: "$247 USD", s: "Pendiente", tone: "amber" },
                      { f: "FAC-2026-006", c: "AdminPro SRL", con: "Plan Empresa Junio 2026 + Fees", m: "$231 USD", s: "Pagada", tone: "emerald" },
                      { f: "FAC-2026-005", c: "AdminPro SRL", con: "Plan Empresa Mayo 2026 + Fees", m: "$219 USD", s: "Pagada", tone: "emerald" },
                    ].map((r) => (
                      <tr key={r.f} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                        <td className="px-4 py-3 text-[12.5px] text-slate-200 font-mono">{r.f}</td>
                        <td className="px-4 py-3 text-[13px] text-slate-200">{r.c}</td>
                        <td className="px-4 py-3 text-[13px] text-slate-300">{r.con}</td>
                        <td className="px-4 py-3 text-[13px] text-right text-white font-semibold">{r.m}</td>
                        <td className="px-4 py-3">
                          <span className={`pill ${r.tone === "amber" ? "bg-amber-500/10 text-amber-300 border border-amber-400/20" : "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20"}`}>{r.s}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "sistema" && (
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-cyan-300">Sistema</p>
                <h1 className="text-2xl font-extrabold text-white mt-1">Configuración del sistema</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-ink-900/70 border border-white/10 p-6 backdrop-blur">
                  <h3 className="text-[14px] font-bold text-white mb-4">Integraciones de pago</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "🏦", n: "SPI (Banco Central PY)", st: "Producción", tone: "emerald" },
                      { icon: "📱", n: "Tigo Money API v2", st: "Producción", tone: "emerald" },
                      { icon: "📲", n: "Personal Pay API", st: "Producción", tone: "emerald" },
                      { icon: "📧", n: "Amazon SES (us-east-1)", st: "Activo", tone: "emerald" },
                      { icon: "💳", n: "Bancard (tarjetas)", st: "Pendiente", tone: "slate" },
                    ].map((it) => (
                      <div key={it.n} className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-base">{it.icon}</span>
                          <span className="text-[13px] text-slate-200">{it.n}</span>
                        </div>
                        <span className={`pill ${
                          it.tone === "emerald"
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-400/20"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                        }`}>{it.st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-ink-900/70 border border-white/10 p-6 backdrop-blur">
                  <h3 className="text-[14px] font-bold text-white mb-4">Infraestructura AWS <span className="text-[11px] text-slate-500 font-normal">us-east-1</span></h3>
                  <div className="space-y-2.5 text-[13px]">
                    {[
                      ["Backend (ECS Fargate)", "2 tasks · 0.5 vCPU"],
                      ["Base de datos (RDS PostgreSQL)", "db.t3.micro · 20GB"],
                      ["Cache (ElastiCache Redis)", "cache.t3.micro"],
                      ["Storage (S3)", "2.3 GB usados"],
                      ["CDN (CloudFront)", "12 GB/mes transfer"],
                    ].map(([l, v]) => (
                      <div key={l} className="flex justify-between py-1 border-b border-white/5 last:border-0">
                        <span className="text-slate-400">{l}</span>
                        <span className="text-slate-200 font-mono text-[12px]">{v}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-3 mt-1 border-t border-white/10">
                      <span className="text-slate-200 font-semibold">Costo mensual AWS</span>
                      <span className="text-white font-extrabold">~$118 USD</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-ink-900/70 border border-white/10 p-6 backdrop-blur">
                <h3 className="text-[14px] font-bold text-white mb-4">Estadísticas de email · Julio 2026</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { n: "342", l: "Enviados", tone: "text-white" },
                    { n: "98.5%", l: "Entregados", tone: "text-emerald-400" },
                    { n: "67.2%", l: "Abiertos", tone: "text-cyan-300" },
                    { n: "0.3%", l: "Bounce", tone: "text-rose-400" },
                  ].map((k) => (
                    <div key={k.l} className="text-center rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className={`text-3xl font-extrabold ${k.tone}`}>{k.n}</p>
                      <p className="text-[11px] uppercase tracking-widest text-slate-500 mt-1 font-semibold">{k.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

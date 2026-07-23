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
    <div className="min-h-screen bg-gray-900">
      <HamburgerMenu
        items={menuItems}
        activeItem={activeTab}
        onSelect={(id) => setActiveTab(id as SuperTab)}
        title="ComuniPy"
        subtitle="Backoffice — Plataforma"
        userName={user.nombre}
        userRole="Super Admin"
        onLogout={onLogout}
      />

      {/* Content */}
      <main className="pt-20 px-4 pb-6 max-w-7xl mx-auto">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Platform Overview</h2>
            
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-400">Edificios activos</p>
                <p className="text-3xl font-bold text-white">3</p>
                <p className="text-xs text-green-400 mt-1">+1 este mes</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-400">Unidades totales</p>
                <p className="text-3xl font-bold text-white">144</p>
                <p className="text-xs text-gray-500 mt-1">48 + 32 + 64</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-400">MRR (Revenue mensual)</p>
                <p className="text-3xl font-bold text-green-400">$247</p>
                <p className="text-xs text-gray-500 mt-1">USD equivalente</p>
              </div>
              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-400">Transacciones Julio</p>
                <p className="text-3xl font-bold text-white">43</p>
                <p className="text-xs text-green-400 mt-1">+18% vs. Junio</p>
              </div>
            </div>

            {/* Revenue breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Revenue por concepto</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Plan Profesional (2 edificios)</span>
                    <span className="text-sm font-medium text-white">$138 USD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Plan Empresa (1 edificio)</span>
                    <span className="text-sm font-medium text-white">$79 USD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Fee transaccional (43 txs)</span>
                    <span className="text-sm font-medium text-white">$30 USD</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-600 pt-2">
                    <span className="text-sm font-medium text-gray-300">Total MRR</span>
                    <span className="text-sm font-bold text-green-400">$247 USD</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Estado del sistema</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">API Backend</span>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Operativo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Base de datos</span>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Operativo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">SPI Gateway</span>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Conectado</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Tigo Money API</span>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Conectado</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Personal Pay API</span>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Conectado</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Amazon SES (emails)</span>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Activo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Uptime (30 días)</span>
                    <span className="text-sm font-medium text-white">99.87%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "edificios" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Edificios en plataforma</h2>
              <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700">+ Onboarding nuevo edificio</button>
            </div>
            <div className="space-y-3">
              {edificios.map(e => (
                <div key={e.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">{e.nombre}</h3>
                    <p className="text-xs text-gray-400">{e.direccion}, {e.ciudad}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-gray-500">{e.unidades} unidades</span>
                      <span className="text-xs text-gray-500">{e.pisos} pisos</span>
                      <span className="text-xs text-gray-500">RUC: {e.ruc}</span>
                      <span className="text-xs text-gray-500">{e.banco}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded-full">Activo</span>
                    <button className="text-xs text-purple-400 hover:underline">Gestionar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "transacciones" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Transacciones de la plataforma</h2>
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-750 border-b border-gray-700">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Edificio</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Unidad</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Monto</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Canal</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Fee</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Estado</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">TXN-0043</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Torre Ñandutí</td>
                    <td className="px-4 py-3 text-sm text-gray-300">4B</td>
                    <td className="px-4 py-3 text-sm text-white">{formatGuaranies(696000)}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Tigo Money</td>
                    <td className="px-4 py-3 text-sm text-green-400">{formatGuaranies(6960)}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Completada</span></td>
                    <td className="px-4 py-3 text-sm text-gray-400">10/07/2026</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">TXN-0042</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Torre Ñandutí</td>
                    <td className="px-4 py-3 text-sm text-gray-300">6B</td>
                    <td className="px-4 py-3 text-sm text-white">{formatGuaranies(696000)}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">SPI</td>
                    <td className="px-4 py-3 text-sm text-green-400">{formatGuaranies(6960)}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Completada</span></td>
                    <td className="px-4 py-3 text-sm text-gray-400">09/07/2026</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">TXN-0041</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Torre Ñandutí</td>
                    <td className="px-4 py-3 text-sm text-gray-300">4A</td>
                    <td className="px-4 py-3 text-sm text-white">{formatGuaranies(812000)}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">SPI</td>
                    <td className="px-4 py-3 text-sm text-green-400">{formatGuaranies(8120)}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Completada</span></td>
                    <td className="px-4 py-3 text-sm text-gray-400">08/07/2026</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">TXN-0040</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Residencial Cerro Corá</td>
                    <td className="px-4 py-3 text-sm text-gray-300">3C</td>
                    <td className="px-4 py-3 text-sm text-white">{formatGuaranies(520000)}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Personal Pay</td>
                    <td className="px-4 py-3 text-sm text-green-400">{formatGuaranies(5200)}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Completada</span></td>
                    <td className="px-4 py-3 text-sm text-gray-400">07/07/2026</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">TXN-0039</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Torre Ñandutí</td>
                    <td className="px-4 py-3 text-sm text-gray-300">5B</td>
                    <td className="px-4 py-3 text-sm text-white">{formatGuaranies(696000)}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Personal Pay</td>
                    <td className="px-4 py-3 text-sm text-green-400">{formatGuaranies(6960)}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Completada</span></td>
                    <td className="px-4 py-3 text-sm text-gray-400">05/07/2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "clientes" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Clientes (Administradoras)</h2>
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">AdminPro SRL — María González</h3>
                    <p className="text-xs text-gray-400">maria@adminpro.com.py | +595 21 345678</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs text-gray-500">3 edificios</span>
                      <span className="text-xs text-gray-500">144 unidades</span>
                      <span className="text-xs text-gray-500">Plan: Empresa</span>
                      <span className="text-xs text-gray-500">Desde: 01/03/2026</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-400">$247 USD/mes</p>
                    <p className="text-xs text-gray-500">SaaS + fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "facturacion" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Facturación</h2>
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Factura</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Cliente</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Concepto</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-400 uppercase">Monto</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-300">FAC-2026-007</td>
                    <td className="px-4 py-3 text-sm text-gray-300">AdminPro SRL</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Plan Empresa Julio 2026 + Fees</td>
                    <td className="px-4 py-3 text-sm text-right text-white">$247 USD</td>
                    <td className="px-4 py-3"><span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-0.5 rounded-full">Pendiente</span></td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-300">FAC-2026-006</td>
                    <td className="px-4 py-3 text-sm text-gray-300">AdminPro SRL</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Plan Empresa Junio 2026 + Fees</td>
                    <td className="px-4 py-3 text-sm text-right text-white">$231 USD</td>
                    <td className="px-4 py-3"><span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Pagada</span></td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="px-4 py-3 text-sm text-gray-300">FAC-2026-005</td>
                    <td className="px-4 py-3 text-sm text-gray-300">AdminPro SRL</td>
                    <td className="px-4 py-3 text-sm text-gray-300">Plan Empresa Mayo 2026 + Fees</td>
                    <td className="px-4 py-3 text-sm text-right text-white">$219 USD</td>
                    <td className="px-4 py-3"><span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Pagada</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "sistema" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Configuración del Sistema</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Integraciones */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Integraciones de pago</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🏦</span>
                      <span className="text-sm text-gray-300">SPI (Banco Central PY)</span>
                    </div>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Producción</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📱</span>
                      <span className="text-sm text-gray-300">Tigo Money API v2</span>
                    </div>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Producción</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📲</span>
                      <span className="text-sm text-gray-300">Personal Pay API</span>
                    </div>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Producción</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📧</span>
                      <span className="text-sm text-gray-300">Amazon SES (us-east-1)</span>
                    </div>
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full">Activo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💳</span>
                      <span className="text-sm text-gray-300">Bancard (tarjetas)</span>
                    </div>
                    <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">Pendiente</span>
                  </div>
                </div>
              </div>

              {/* Infraestructura */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Infraestructura AWS (us-east-1)</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Backend (ECS Fargate)</span>
                    <span className="text-gray-300">2 tasks, 0.5 vCPU</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Base de datos (RDS PostgreSQL)</span>
                    <span className="text-gray-300">db.t3.micro, 20GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cache (ElastiCache Redis)</span>
                    <span className="text-gray-300">cache.t3.micro</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Storage (S3)</span>
                    <span className="text-gray-300">2.3 GB usados</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CDN (CloudFront)</span>
                    <span className="text-gray-300">12 GB/mes transfer</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2">
                    <span className="text-gray-300 font-medium">Costo mensual AWS</span>
                    <span className="text-white font-medium">~$118 USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emails stats */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Estadísticas de email (Julio 2026)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">342</p>
                  <p className="text-xs text-gray-400">Enviados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">98.5%</p>
                  <p className="text-xs text-gray-400">Entregados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">67.2%</p>
                  <p className="text-xs text-gray-400">Abiertos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-400">0.3%</p>
                  <p className="text-xs text-gray-400">Bounce</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

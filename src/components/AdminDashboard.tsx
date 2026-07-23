"use client";

import { useState } from "react";
import { User, edificios, cobros, reclamos, mantenciones, unidades, categoriasGasto, totalPresupuestoMensual, movimientosBancarios, proveedores, recaudacionMensual, morosidadMensual, pagosPorCanal, formatGuaranies, getEstadoColor, getEstadoReclamoColor, getMantencionColor, gastosOCR, centrosCosto, getConfianzaColor, getEstadoGastoColor, getEstadoGastoLabel, getCentroCostoNombre, asambleas, votaciones, logsAuditoria, getEstadoVotacionColor, getEstadoAsambleaColor } from "@/data/mock-data";
import { HamburgerMenu } from "./HamburgerMenu";
import { EdificioView } from "./EdificioView";

type AdminTab = "dashboard" | "edificio" | "cobros" | "liquidacion" | "unidades" | "gastos" | "banco" | "reclamos" | "mantenciones" | "asambleas" | "votaciones" | "proveedores" | "reportes" | "auditoria" | "config";

interface Props {
  user: User;
  onLogout: () => void;
}

export function AdminDashboard({ user, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [selectedEdificio, setSelectedEdificio] = useState("e1");
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
    <div className="min-h-screen bg-gray-50">
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
      {/* Content */}
      <main className="pt-24 px-4 pb-10 max-w-7xl mx-auto anim-fade-up">
        {activeTab === "dashboard" && <DashboardView totalRecaudado={totalRecaudado} totalEmitido={totalEmitido} tasaRecaudacion={tasaRecaudacion} pagados={pagados.length} pendientes={pendientes.length} vencidos={vencidos.length} enMora={enMora.length} />}
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

// ============ DASHBOARD VIEW ============
function DashboardView({ totalRecaudado, totalEmitido, tasaRecaudacion, pagados, pendientes, vencidos, enMora }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-ink-900">Resumen — Julio 2026</h2>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-sm text-ink-500">Recaudado</p>
          <p className="text-2xl font-bold text-green-600">{formatGuaranies(totalRecaudado)}</p>
          <p className="text-xs text-ink-500 mt-1">de {formatGuaranies(totalEmitido)} emitido</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-sm text-ink-500">Tasa de recaudación</p>
          <p className="text-2xl font-bold text-blue-600">{tasaRecaudacion}%</p>
          <p className="text-xs text-ink-500 mt-1">meta: 95%</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-sm text-ink-500">Cobros del mes</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold text-green-600">{pagados} pagados</span>
            <span className="text-sm text-gray-400">/ 8 total</span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">{pendientes} pend.</span>
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded">{vencidos} venc.</span>
            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">{enMora} mora</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-sm text-ink-500">Reclamos abiertos</p>
          <p className="text-2xl font-bold text-orange-600">2</p>
          <p className="text-xs text-ink-500 mt-1">1 en proceso, 1 nuevo</p>
        </div>
      </div>

      {/* Alertas */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
        <h3 className="font-medium text-red-800 mb-2">⚠️ Alertas</h3>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Mantención vencida: Sistema contra incendios (vencido 10/07/2026)</li>
          <li>• 2 unidades en mora: 5A (Jorge Villalba), 6A (Fernando Acosta)</li>
          <li>• Reclamo sin atender hace 2 días: Ruido excesivo depto 6A</li>
        </ul>
      </div>

      {/* Últimos pagos */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-5">
        <h3 className="font-bold text-ink-900 mb-3">Últimos pagos recibidos</h3>
        <div className="space-y-2">
          {cobros.filter(c => c.estado === "pagado").sort((a,b) => (b.fechaPago || "").localeCompare(a.fechaPago || "")).slice(0, 5).map(c => (
            <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-bold text-ink-900">Depto {c.unidadNumero} — {c.residente}</p>
                <p className="text-xs text-gray-500">{c.fechaPago} via {c.canalPago}</p>
              </div>
              <p className="text-sm font-bold text-green-600">{formatGuaranies(c.monto)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ COBROS VIEW ============
function CobrosView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Cobros — Julio 2026</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">
            + Emitir liquidación
          </button>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">
            Enviar recordatorios
          </button>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">
            Exportar Excel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Unidad</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Residente</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Monto</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Vencimiento</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Estado</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Canal</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cobros.map(cobro => (
              <tr key={cobro.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-sm font-bold text-ink-900">{cobro.unidadNumero}</td>
                <td className="px-4 py-3 text-sm text-ink-700">{cobro.residente}</td>
                <td className="px-4 py-3 text-sm font-bold text-ink-900">{formatGuaranies(cobro.monto)}</td>
                <td className="px-4 py-3 text-sm text-ink-500">{cobro.vencimiento}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getEstadoColor(cobro.estado)}`}>
                    {cobro.estado.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-ink-500">{cobro.canalPago || "—"}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-blue-600 hover:underline mr-2">Ver detalle</button>
                  {cobro.estado !== "pagado" && <button className="text-xs text-orange-600 hover:underline">Recordar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ UNIDADES VIEW ============
function UnidadesView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Unidades — Torre Ñandutí</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Agregar unidad</button>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">Importar CSV</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Unidad</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Piso</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Tipo</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">m²</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Coef.</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Propietario</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Residente</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {unidades.map(u => (
              <tr key={u.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-sm font-bold text-ink-900">{u.numero}</td>
                <td className="px-4 py-3 text-sm text-ink-500">{u.piso}</td>
                <td className="px-4 py-3 text-sm text-ink-500 capitalize">{u.tipo}</td>
                <td className="px-4 py-3 text-sm text-ink-500">{u.metrosCuadrados}</td>
                <td className="px-4 py-3 text-sm text-ink-500">{u.coeficiente}%</td>
                <td className="px-4 py-3 text-sm text-ink-700">{u.propietario}</td>
                <td className="px-4 py-3 text-sm text-ink-700">{u.residente}</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-blue-600 hover:underline mr-2">Editar</button>
                  <button className="text-xs text-rose-600 hover:text-rose-800 hover:underline font-medium">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ GASTOS VIEW ============
function GastosView() {
  const [subTab, setSubTab] = useState<"carga" | "presupuesto" | "centros">("carga");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Gestión de Gastos</h2>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button onClick={() => setSubTab("carga")} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${subTab === "carga" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
          📄 Carga de Gastos (OCR)
        </button>
        <button onClick={() => setSubTab("presupuesto")} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${subTab === "presupuesto" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
          📊 Presupuesto
        </button>
        <button onClick={() => setSubTab("centros")} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${subTab === "centros" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
          🏷️ Centros de Costo
        </button>
      </div>

      {subTab === "carga" && <GastosCargaOCR />}
      {subTab === "presupuesto" && <GastosPresupuesto />}
      {subTab === "centros" && <GastosCentrosCosto />}
    </div>
  );
}

// ---- Sub: Carga de Gastos con OCR ----
function GastosCargaOCR() {
  const drafts = gastosOCR.filter(g => g.estado === "draft");
  const procesando = gastosOCR.filter(g => g.estado === "procesando");
  const ratificados = gastosOCR.filter(g => g.estado === "ratificado");

  return (
    <div className="space-y-6">
      {/* Zona de upload */}
      <div className="bg-white rounded-xl border-2 border-dashed border-blue-300 p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">📤</span>
          </div>
          <div>
            <p className="text-sm font-bold text-ink-900">Subir boleta o factura</p>
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG — Máximo 10MB</p>
            <p className="text-xs text-blue-600 mt-2">El sistema detectará automáticamente: proveedor, monto, fecha y categoría</p>
          </div>
          <button className="mt-2 px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
            Seleccionar archivo
          </button>
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-xs text-gray-500">Procesando OCR</p>
          <p className="text-2xl font-bold text-blue-600">{procesando.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-xs text-gray-500">Borradores por revisar</p>
          <p className="text-2xl font-bold text-yellow-600">{drafts.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-xs text-gray-500">Ratificados este mes</p>
          <p className="text-2xl font-bold text-green-600">{ratificados.length}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-xs text-gray-500">Total ratificado</p>
          <p className="text-2xl font-bold text-gray-900">{formatGuaranies(ratificados.reduce((s, g) => s + (g.montoFinal || 0), 0))}</p>
        </div>
      </div>

      {/* Borradores pendientes de revisión */}
      {drafts.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-ink-900 mb-3">⚡ Borradores pendientes de revisión</h3>
          <div className="space-y-3">
            {drafts.map(gasto => (
              <div key={gasto.id} className="bg-white rounded-2xl border border-yellow-200 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getEstadoGastoColor(gasto.estado)}`}>
                        {getEstadoGastoLabel(gasto.estado)}
                      </span>
                      <span className="text-xs text-ink-500">Subido: {gasto.fechaSubida}</span>
                      <span className="text-xs text-ink-500 font-mono">📎 {gasto.archivoNombre}</span>
                    </div>

                    {/* Datos extraídos por OCR */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Proveedor detectado</p>
                        <p className="text-sm font-bold text-ink-900">{gasto.proveedorDetectado || "No detectado"}</p>
                        <p className={`text-xs mt-1 ${getConfianzaColor(gasto.proveedorConfianza)}`}>
                          Confianza: {gasto.proveedorConfianza}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Monto detectado</p>
                        <p className="text-sm font-bold text-ink-900">{gasto.montoDetectado > 0 ? formatGuaranies(gasto.montoDetectado) : "No detectado"}</p>
                        <p className={`text-xs mt-1 ${getConfianzaColor(gasto.montoConfianza)}`}>
                          Confianza: {gasto.montoConfianza}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Fecha documento</p>
                        <p className="text-sm font-bold text-ink-900">{gasto.fechaDocumento || "No detectada"}</p>
                        <p className={`text-xs mt-1 ${getConfianzaColor(gasto.fechaConfianza)}`}>
                          Confianza: {gasto.fechaConfianza}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Centro de costo sugerido</p>
                        <p className="text-sm font-bold text-ink-900">{gasto.centroCostoSugerido ? getCentroCostoNombre(gasto.centroCostoSugerido) : "Sin clasificar"}</p>
                        <p className={`text-xs mt-1 ${getConfianzaColor(gasto.centroCostoConfianza)}`}>
                          Confianza: {gasto.centroCostoConfianza}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                  <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                    ✓ Ratificar
                  </button>
                  <button className="px-4 py-2 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600">
                    ✏️ Editar y ratificar
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50">
                    ✕ Rechazar
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50 ml-auto">
                    👁️ Ver documento
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* En procesamiento */}
      {procesando.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-ink-900 mb-3">🔄 Procesando OCR...</h3>
          <div className="space-y-2">
            {procesando.map(gasto => (
              <div key={gasto.id} className="bg-white rounded-2xl border border-blue-200 p-4 flex items-center gap-4">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <p className="text-sm font-bold text-ink-900">{gasto.archivoNombre}</p>
                  <p className="text-xs text-blue-600">Extrayendo datos del documento...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historial de gastos ratificados */}
      <div>
        <h3 className="text-sm font-bold text-ink-900 mb-3">✓ Gastos ratificados — Julio 2026</h3>
        <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 overflow-hidden">
          <table className="w-full">
            <thead className="bg-ink-50 border-b border-ink-200">
              <tr>
                <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Documento</th>
                <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Proveedor</th>
                <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Centro de costo</th>
                <th className="text-right px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Monto</th>
                <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Fecha doc.</th>
                <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ratificados.map(gasto => (
                <tr key={gasto.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📎</span>
                      <span className="text-xs text-ink-600 font-mono">{gasto.archivoNombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-ink-900">{gasto.proveedorFinal}</td>
                  <td className="px-4 py-3 text-sm text-ink-600">{gasto.centroCostoFinal ? getCentroCostoNombre(gasto.centroCostoFinal) : "—"}</td>
                  <td className="px-4 py-3 text-sm text-right font-bold text-ink-900">{formatGuaranies(gasto.montoFinal || 0)}</td>
                  <td className="px-4 py-3 text-sm text-ink-500">{gasto.fechaDocumento}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-blue-600 hover:underline mr-2">Editar</button>
                    <button className="text-xs text-ink-600 hover:text-ink-900 hover:underline font-medium mr-2">Ver doc</button>
                    <button className="text-xs text-rose-600 hover:text-rose-800 hover:underline font-medium">Anular</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info del sistema */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">ℹ️ Proveedores con reconocimiento automático</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {["ANDE (electricidad)", "ESSAP (agua)", "COPACO (telefonía)", "Tigo/Personal (internet)", "Guardia SRL", "CleanPro", "ThyssenKrupp", "HidroServ"].map(p => (
            <span key={p} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{p}</span>
          ))}
        </div>
        <p className="text-xs text-blue-600 mt-2">Para boletas de otros proveedores, el sistema extrae lo posible y deja el resto para revisión manual.</p>
      </div>
    </div>
  );
}

// ---- Sub: Presupuesto ----
function GastosPresupuesto() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-ink-900">Presupuesto de Gastos Comunes</h3>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Agregar categoría</button>
      </div>
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Categoría</th>
              <th className="text-right px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Presupuesto mensual</th>
              <th className="text-right px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">% del total</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categoriasGasto.map(cat => (
              <tr key={cat.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-sm font-bold text-ink-900">{cat.nombre}</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-ink-900">{formatGuaranies(cat.presupuestoMensual)}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-500">{((cat.presupuestoMensual / totalPresupuestoMensual) * 100).toFixed(1)}%</td>
                <td className="px-4 py-3">
                  <button className="text-xs text-blue-600 hover:underline mr-2">Editar</button>
                  <button className="text-xs text-rose-600 hover:text-rose-800 hover:underline font-medium">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="px-4 py-3 text-sm font-bold text-gray-900">TOTAL</td>
              <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">{formatGuaranies(totalPresupuestoMensual)}</td>
              <td className="px-4 py-3 text-sm text-right font-bold text-gray-500">100%</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Costo por unidad promedio:</strong> {formatGuaranies(Math.round(totalPresupuestoMensual / 48))}/mes 
          (basado en 48 unidades con prorrateo por coeficiente)
        </p>
      </div>
    </div>
  );
}

// ---- Sub: Centros de Costo ----
function GastosCentrosCosto() {
  const padres = centrosCosto.filter(cc => !cc.padre);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-ink-900">Centros de Costo</h3>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Nuevo centro</button>
      </div>

      <p className="text-sm text-ink-600">Estructura jerárquica para clasificar y agrupar gastos. Se usa para el reconocimiento automático de boletas y para reportes.</p>

      <div className="space-y-3">
        {padres.map(padre => {
          const hijos = centrosCosto.filter(cc => cc.padre === padre.id);
          return (
            <div key={padre.id} className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 overflow-hidden">
              {/* Padre */}
              <div className="flex items-center justify-between px-5 py-3 bg-ink-50 border-b border-ink-200">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-ink-900">{padre.nombre}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${padre.activo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {padre.activo ? "Activo" : "Inactivo"}
                  </span>
                  {padre.prorrateable && <span className="text-xs text-blue-600">Prorrateable</span>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">{formatGuaranies(padre.presupuestoMensual)}</span>
                  <button className="text-xs text-blue-600 hover:underline">Editar</button>
                </div>
              </div>
              {/* Hijos */}
              {hijos.length > 0 && (
                <div className="divide-y divide-gray-100">
                  {hijos.map(hijo => (
                    <div key={hijo.id} className="flex items-center justify-between px-5 py-2 pl-10">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">└</span>
                        <span className="text-sm text-ink-700">{hijo.nombre}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-ink-500">{formatGuaranies(hijo.presupuestoMensual)}</span>
                        <button className="text-xs text-blue-600 hover:underline">Editar</button>
                        <button className="text-xs text-rose-600 hover:text-rose-800 hover:underline font-medium">Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Resumen */}
      <div className="bg-gray-50 rounded-2xl border border-ink-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500">Total centros</p>
            <p className="text-lg font-bold text-ink-900">{centrosCosto.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Categorías padre</p>
            <p className="text-lg font-bold text-ink-900">{padres.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Presupuesto total</p>
            <p className="text-lg font-bold text-ink-900">{formatGuaranies(padres.reduce((s, p) => s + p.presupuestoMensual, 0))}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Prorrateables</p>
            <p className="text-lg font-bold text-ink-900">{centrosCosto.filter(c => c.prorrateable && !c.padre).length}/{padres.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ BANCO VIEW ============
function BancoView() {
  const ingresos = movimientosBancarios.filter(m => m.tipo === "ingreso");
  const egresos = movimientosBancarios.filter(m => m.tipo === "egreso");
  const totalIngresos = ingresos.reduce((s, m) => s + m.monto, 0);
  const totalEgresos = egresos.reduce((s, m) => s + m.monto, 0);
  const saldo = totalIngresos - totalEgresos;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Movimientos Bancarios — Julio 2026</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">Conciliar</button>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">Importar extracto</button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-sm text-ink-500">Ingresos del mes</p>
          <p className="text-xl font-bold text-green-600">{formatGuaranies(totalIngresos)}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-sm text-ink-500">Egresos del mes</p>
          <p className="text-xl font-bold text-red-600">{formatGuaranies(totalEgresos)}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-ink-200 shadow-elev-1">
          <p className="text-sm text-ink-500">Saldo del período</p>
          <p className={`text-xl font-bold ${saldo >= 0 ? "text-blue-600" : "text-red-600"}`}>{formatGuaranies(saldo)}</p>
        </div>
      </div>

      {/* Cuenta */}
      <div className="bg-gray-100 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-500">Cuenta: Banco Itaú Paraguay</p>
          <p className="text-sm font-medium text-gray-700">Cta. Cte. 001-234567-001 — Torre Ñandutí</p>
        </div>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Conectada</span>
      </div>

      {/* Tabla de movimientos */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Fecha</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Concepto</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Referencia</th>
              <th className="text-right px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Monto</th>
              <th className="text-center px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Conciliado</th>
            </tr>
          </thead>
          <tbody>
            {movimientosBancarios.map(mov => (
              <tr key={mov.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-sm text-ink-500">{mov.fecha}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{mov.concepto}</td>
                <td className="px-4 py-3 text-xs text-ink-500 font-mono">{mov.referencia}</td>
                <td className={`px-4 py-3 text-sm text-right font-medium ${mov.tipo === "ingreso" ? "text-green-600" : "text-red-600"}`}>
                  {mov.tipo === "ingreso" ? "+" : "-"}{formatGuaranies(mov.monto)}
                </td>
                <td className="px-4 py-3 text-center">
                  {mov.conciliado ? <span className="text-green-600">✓</span> : <span className="text-gray-300">○</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ RECLAMOS VIEW ============
function ReclamosView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Reclamos y Solicitudes</h2>
        <div className="flex gap-2">
          <span className="text-sm text-ink-500">Total: {reclamos.length} | Abiertos: {reclamos.filter(r => r.estado !== "resuelto").length}</span>
        </div>
      </div>
      <div className="space-y-3">
        {reclamos.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-ink-900">{r.titulo}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getEstadoReclamoColor(r.estado)}`}>
                    {r.estado.replace("_", " ").toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-ink-600">{r.descripcion}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-xs text-ink-500">Depto {unidades.find(u => u.id === r.unidadId)?.numero} — {r.residente}</span>
                  <span className="text-xs text-ink-500">Categoría: {r.categoria}</span>
                  <span className="text-xs text-ink-500">Creado: {r.fechaCreacion}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">Responder</button>
                {r.estado !== "resuelto" && <button className="text-xs px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100">Resolver</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MANTENCIONES VIEW ============
function MantencionesView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Calendario de Mantenciones</h2>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Programar mantención</button>
      </div>
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Equipo</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Proveedor</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Frecuencia</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Última</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Próxima</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Estado</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mantenciones.map(m => (
              <tr key={m.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-sm font-bold text-ink-900">{m.equipo}</td>
                <td className="px-4 py-3 text-sm text-ink-700">{m.proveedor}</td>
                <td className="px-4 py-3 text-sm text-ink-500">{m.frecuencia}</td>
                <td className="px-4 py-3 text-sm text-ink-500">{m.ultimaMantencion}</td>
                <td className="px-4 py-3 text-sm text-ink-500">{m.proximaMantencion}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getMantencionColor(m.estado)}`}>
                    {m.estado.replace("_", " ").toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-xs text-blue-600 hover:underline mr-2">Registrar</button>
                  <button className="text-xs text-ink-600 hover:text-ink-900 hover:underline font-medium">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ PROVEEDORES VIEW ============
function ProveedoresView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Proveedores</h2>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Agregar proveedor</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proveedores.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-ink-900">{p.nombre}</h3>
                <p className="text-xs text-blue-600 mt-0.5">{p.servicio}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-500">RUC: {p.ruc}</p>
                  <p className="text-xs text-gray-500">Contacto: {p.contacto}</p>
                  <p className="text-xs text-gray-500">Tel: {p.telefono}</p>
                  <p className="text-xs text-gray-500">Email: {p.email}</p>
                </div>
              </div>
              <button className="text-xs text-blue-600 hover:underline">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ REPORTES VIEW ============
function ReportesView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-ink-900">Reportes y Análisis</h2>
      
      {/* Recaudación mensual */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-4">Recaudación vs Emitido (2026)</h3>
        <div className="space-y-2">
          {recaudacionMensual.map(r => (
            <div key={r.mes} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-8">{r.mes}</span>
              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full" style={{ width: "100%" }}></div>
                <div className="absolute inset-0 bg-green-500 rounded-full" style={{ width: `${(r.recaudado / r.emitido) * 100}%` }}></div>
              </div>
              <span className="text-xs font-medium text-gray-700 w-16 text-right">{((r.recaudado / r.emitido) * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <span className="text-xs text-gray-500 flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded"></span> Recaudado</span>
          <span className="text-xs text-gray-500 flex items-center gap-1"><span className="w-3 h-3 bg-blue-100 rounded"></span> Emitido</span>
        </div>
      </div>

      {/* Morosidad */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-4">Evolución de Morosidad (%)</h3>
        <div className="space-y-2">
          {morosidadMensual.map(m => (
            <div key={m.mes} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-8">{m.mes}</span>
              <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${m.porcentaje > 10 ? "bg-red-500" : m.porcentaje > 5 ? "bg-orange-400" : "bg-yellow-400"}`} style={{ width: `${m.porcentaje * 5}%` }}></div>
              </div>
              <span className="text-xs font-medium text-gray-700 w-12 text-right">{m.porcentaje}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pagos por canal */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-4">Distribución por Canal de Pago (Julio 2026)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pagosPorCanal.map(p => (
            <div key={p.canal} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-lg font-bold text-ink-900">{p.cantidad}</p>
              <p className="text-xs text-gray-500">transacciones</p>
              <p className="text-sm font-medium text-blue-600 mt-1">{p.canal}</p>
              <p className="text-xs text-ink-500">{formatGuaranies(p.monto)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de exportación */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">📊 Exportar Excel</button>
        <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">📄 Exportar PDF</button>
        <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">📧 Enviar reporte por email</button>
      </div>
    </div>
  );
}

// ============ LIQUIDACION VIEW ============
function LiquidacionView() {
  const unidadesEdificio = unidades.filter(u => u.tipo === "departamento");
  const totalCoef = unidadesEdificio.reduce((s, u) => s + u.coeficiente, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Emitir Liquidación Mensual</h2>
        <div className="flex gap-2 items-center">
          <select className="px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
            <option>Julio 2026</option>
            <option>Agosto 2026</option>
          </select>
          <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">Generar liquidación</button>
        </div>
      </div>

      {/* Paso 1: Resumen de gastos por centro de costo */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-3">Paso 1: Gastos ratificados del período</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-ink-600">Gastos Básicos (ANDE + ESSAP)</span><span className="text-sm font-medium">₲ 4.800.000</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-ink-600">Remuneraciones</span><span className="text-sm font-medium">₲ 8.050.000</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-ink-600">Servicios contratados (seguridad, limpieza, jardín)</span><span className="text-sm font-medium">₲ 14.500.000</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-ink-600">Mantención y reparaciones</span><span className="text-sm font-medium">₲ 2.500.000</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-ink-600">Seguros</span><span className="text-sm font-medium">₲ 1.500.000</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-ink-600">Administración</span><span className="text-sm font-medium">₲ 2.000.000</span></div>
          <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-ink-600">Fondo de reserva</span><span className="text-sm font-medium">₲ 3.000.000</span></div>
          <div className="flex justify-between py-2 font-bold"><span className="text-sm">TOTAL A DISTRIBUIR</span><span className="text-sm">₲ 36.350.000</span></div>
        </div>
      </div>

      {/* Paso 2: Prorrateo por unidad */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-3">Paso 2: Prorrateo por unidad (coeficiente)</h3>
        <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 overflow-hidden">
          <table className="w-full">
            <thead className="bg-ink-50 border-b border-ink-200">
              <tr>
                <th className="text-left px-4 py-2 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Unidad</th>
                <th className="text-left px-4 py-2 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Residente</th>
                <th className="text-right px-4 py-2 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Coef.</th>
                <th className="text-right px-4 py-2 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">% prorrateo</th>
                <th className="text-right px-4 py-2 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Monto</th>
                <th className="text-center px-4 py-2 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Ajuste</th>
              </tr>
            </thead>
            <tbody>
              {unidadesEdificio.slice(0, 8).map(u => {
                const pct = (u.coeficiente / totalCoef) * 100;
                const monto = Math.round((u.coeficiente / totalCoef) * 36350000);
                return (
                  <tr key={u.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                    <td className="px-4 py-2 text-sm font-bold text-ink-900">{u.numero}</td>
                    <td className="px-4 py-2 text-sm text-ink-600">{u.residente}</td>
                    <td className="px-4 py-2 text-sm text-right text-gray-500">{u.coeficiente}</td>
                    <td className="px-4 py-2 text-sm text-right text-gray-500">{pct.toFixed(1)}%</td>
                    <td className="px-4 py-2 text-sm text-right font-bold text-ink-900">{formatGuaranies(monto)}</td>
                    <td className="px-4 py-2 text-center"><button className="text-xs text-blue-600 hover:underline">Ajustar</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paso 3: Confirmación */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <h3 className="text-sm font-medium text-green-800 mb-2">Paso 3: Confirmar y emitir</h3>
        <p className="text-sm text-green-700 mb-4">Al confirmar se generarán 8 cobros individuales y se notificará a todos los residentes por email + WhatsApp.</p>
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 font-medium">✓ Confirmar y emitir liquidación</button>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">Guardar borrador</button>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">Vista previa PDF</button>
        </div>
      </div>
    </div>
  );
}

// ============ ASAMBLEAS VIEW ============
function AsambleasView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Asambleas</h2>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Convocar asamblea</button>
      </div>

      {/* Próxima asamblea */}
      {asambleas.filter(a => a.estado === "programada").map(a => (
        <div key={a.id} className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getEstadoAsambleaColor(a.estado)}`}>
                  {a.estado.toUpperCase()}
                </span>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{a.tipo}</span>
              </div>
              <h3 className="text-sm font-bold text-ink-900">{a.titulo}</h3>
              <div className="flex gap-4 mt-2 text-xs text-ink-600">
                <span>📅 {a.fecha}</span>
                <span>🕐 {a.hora}</span>
                <span>📍 {a.lugar}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Editar</button>
              <button className="text-xs px-3 py-1 border border-blue-300 text-blue-600 rounded hover:bg-blue-100">Enviar recordatorio</button>
            </div>
          </div>

          {/* Agenda */}
          <div className="mt-4 pt-3 border-t border-blue-200">
            <p className="text-xs font-medium text-gray-700 mb-2">Agenda:</p>
            <ol className="space-y-1">
              {a.agenda.map((punto, i) => (
                <li key={i} className="text-xs text-ink-600 flex gap-2">
                  <span className="text-blue-500 font-medium">{i + 1}.</span>
                  {punto}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-200 flex items-center gap-4">
            <span className="text-xs text-gray-500">Quorum requerido: {a.quorumRequerido}% ({Math.ceil(a.totalVotantes * a.quorumRequerido / 100)} unidades)</span>
            <span className="text-xs text-gray-500">Confirmados: 18/{a.totalVotantes}</span>
          </div>
        </div>
      ))}

      {/* Historial */}
      <div>
        <h3 className="text-sm font-bold text-ink-900 mb-3">Historial de asambleas</h3>
        <div className="space-y-3">
          {asambleas.filter(a => a.estado === "finalizada").map(a => (
            <div key={a.id} className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-ink-900">{a.titulo}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getEstadoAsambleaColor(a.estado)}`}>FINALIZADA</span>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>📅 {a.fecha}</span>
                    <span>Asistentes: {a.asistentes}/{a.totalVotantes} ({((a.asistentes / a.totalVotantes) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {a.actaUrl && <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">📄 Ver acta</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ VOTACIONES VIEW ============
function VotacionesView() {
  const activas = votaciones.filter(v => v.estado === "activa");
  const cerradas = votaciones.filter(v => v.estado === "cerrada");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Votaciones</h2>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Crear votación</button>
      </div>

      {/* Votaciones activas */}
      {activas.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-ink-900 mb-3">🗳️ Votaciones activas</h3>
          <div className="space-y-4">
            {activas.map(v => (
              <div key={v.id} className="bg-white rounded-2xl border border-green-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-ink-900">{v.titulo}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getEstadoVotacionColor(v.estado)}`}>ACTIVA</span>
                    </div>
                    <p className="text-xs text-ink-600">{v.descripcion}</p>
                  </div>
                  <button className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100">Cerrar votación</button>
                </div>

                {/* Progreso */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Participación: {v.votosEmitidos}/{v.totalVotantes} ({((v.votosEmitidos / v.totalVotantes) * 100).toFixed(0)}%)</span>
                    <span>Quorum: {v.quorumRequerido}% | Mayoría: {v.mayoriaRequerida === "simple" ? "Simple" : "2/3"}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${(v.votosEmitidos / v.totalVotantes) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-400">Cierre: {v.fechaCierre}</span>
                    <span className={`font-medium ${(v.votosEmitidos / v.totalVotantes * 100) >= v.quorumRequerido ? "text-green-600" : "text-yellow-600"}`}>
                      {(v.votosEmitidos / v.totalVotantes * 100) >= v.quorumRequerido ? "✓ Quorum alcanzado" : "⏳ Quorum pendiente"}
                    </span>
                  </div>
                </div>

                {/* Opciones (parcial, sin revelar al público) */}
                <div className="space-y-2">
                  {v.opciones.map(op => (
                    <div key={op.id} className="flex items-center gap-3">
                      <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 bg-blue-200 rounded-lg" style={{ width: `${v.votosEmitidos > 0 ? (op.votos / v.votosEmitidos) * 100 : 0}%` }}></div>
                        <span className="relative z-10 text-xs font-medium text-gray-700 px-3 leading-8">{op.texto}</span>
                      </div>
                      <span className="text-xs text-gray-500 w-12 text-right">{op.votos} votos</span>
                    </div>
                  ))}
                </div>

                {v.montoAsociado && (
                  <div className="mt-3 pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">💰 Monto asociado: {formatGuaranies(v.montoAsociado)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Votaciones cerradas */}
      <div>
        <h3 className="text-sm font-bold text-ink-900 mb-3">Historial de votaciones</h3>
        <div className="space-y-3">
          {cerradas.map(v => (
            <div key={v.id} className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-ink-900">{v.titulo}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getEstadoVotacionColor(v.estado)}`}>CERRADA</span>
                  </div>
                  <p className="text-xs text-gray-500">Participación: {v.votosEmitidos}/{v.totalVotantes} | Resultado: {v.resultado}</p>
                  <p className="text-xs text-ink-500 mt-1">Período: {v.fechaInicio} — {v.fechaCierre}</p>
                </div>
                <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Ver detalle</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ AUDITORIA VIEW ============
function AuditoriaView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-ink-900">Log de Auditoría</h2>
        <div className="flex gap-2">
          <select className="px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
            <option>Todos los módulos</option>
            <option>Gastos OCR</option>
            <option>Cobros</option>
            <option>Votaciones</option>
            <option>Auth</option>
            <option>Comunicaciones</option>
            <option>Banco</option>
          </select>
          <select className="px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
            <option>Todos los usuarios</option>
            <option>María González</option>
            <option>Roberto Díaz</option>
            <option>Sistema</option>
          </select>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">Exportar</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Fecha/Hora</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Usuario</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Rol</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Acción</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Módulo</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">Detalle</th>
              <th className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">IP</th>
            </tr>
          </thead>
          <tbody>
            {logsAuditoria.map(log => (
              <tr key={log.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-xs text-gray-500 font-mono">{log.timestamp}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{log.usuario}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    log.rol === "admin" ? "bg-blue-100 text-blue-800" :
                    log.rol === "residente" ? "bg-green-100 text-green-800" :
                    log.rol === "superadmin" ? "bg-purple-100 text-purple-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>{log.rol}</span>
                </td>
                <td className="px-4 py-3 text-sm font-bold text-ink-900">{log.accion}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{log.modulo}</td>
                <td className="px-4 py-3 text-xs text-ink-600 max-w-xs truncate">{log.detalle}</td>
                <td className="px-4 py-3 text-xs text-ink-500 font-mono">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
        <p className="text-xs text-yellow-700">
          <strong>🔒 Registro inmutable:</strong> Los logs de auditoría no pueden ser editados ni eliminados. Se mantienen por mínimo 5 años según normativa.
        </p>
      </div>
    </div>
  );
}

// ============ CONFIG VIEW ============
function ConfigView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-ink-900">Configuración — Torre Ñandutí</h2>
      
      {/* Datos del edificio */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-4">Datos del edificio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Nombre</label>
            <input type="text" defaultValue="Torre Ñandutí" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
          <div>
            <label className="text-xs text-gray-500">RUC</label>
            <input type="text" defaultValue="80012345-6" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Dirección</label>
            <input type="text" defaultValue="Av. España 1245, Villa Morra" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Ciudad</label>
            <input type="text" defaultValue="Asunción" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
        </div>
      </div>

      {/* Configuración de cobro */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-4">Configuración de cobro</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Día de vencimiento</label>
            <input type="number" defaultValue="10" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Días de gracia</label>
            <input type="number" defaultValue="5" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Tasa de interés por mora (% mensual)</label>
            <input type="number" defaultValue="2" step="0.1" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
          <div>
            <label className="text-xs text-gray-500">Recordatorios automáticos</label>
            <select className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
              <option>5 días antes, día del vencimiento, 5 y 15 después</option>
              <option>Solo día del vencimiento</option>
              <option>Desactivado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Canales de pago */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-4">Canales de pago habilitados</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-lg">🏦</span>
              <div>
                <p className="text-sm font-bold text-ink-900">SPI — Transferencia Instantánea</p>
                <p className="text-xs text-gray-500">Banco Itaú Paraguay — Cta. 001-234567-001</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Activo</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-lg">📱</span>
              <div>
                <p className="text-sm font-bold text-ink-900">Tigo Money</p>
                <p className="text-xs text-gray-500">Comercio ID: TM-NAN-2026-001</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Activo</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-lg">📲</span>
              <div>
                <p className="text-sm font-bold text-ink-900">Personal Pay</p>
                <p className="text-xs text-gray-500">Comercio ID: PP-NAN-2026-001</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Activo</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-lg">💳</span>
              <div>
                <p className="text-sm font-bold text-ink-900">Tarjeta de crédito/débito</p>
                <p className="text-xs text-gray-500">Próximamente</p>
              </div>
            </div>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">No disponible</span>
          </div>
        </div>
      </div>

      <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">Guardar cambios</button>
    </div>
  );
}

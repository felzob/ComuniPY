"use client";

import { useState } from "react";
import {
  gastosOCR, centrosCosto, categoriasGasto, totalPresupuestoMensual,
  formatGuaranies, getConfianzaColor, getEstadoGastoColor,
  getEstadoGastoLabel, getCentroCostoNombre
} from "@/data/mock-data";

export function GastosView() {
  const [subTab, setSubTab] = useState<"carga" | "presupuesto" | "centros">("carga");

  const tabs = [
    { id: "carga", label: "Carga de Gastos (OCR)", icon: "📄" },
    { id: "presupuesto", label: "Presupuesto", icon: "📊" },
    { id: "centros", label: "Centros de Costo", icon: "🏷️" },
  ] as const;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Gastos</p>
        <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Gestión de Gastos</h2>
      </div>

      {/* Sub-tabs */}
      <div className="inline-flex gap-1 bg-ink-100 p-1 rounded-xl">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`px-4 py-2 text-[13px] font-semibold rounded-lg transition-all ${
              subTab === t.id
                ? "bg-white text-blue-700 shadow-elev-1"
                : "text-ink-500 hover:text-ink-900"
            }`}
          >
            <span className="mr-1.5">{t.icon}</span>
            {t.label}
          </button>
        ))}
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
      <div className="rounded-2xl bg-gradient-to-br from-blue-50/70 to-cyan-50/40 border-2 border-dashed border-blue-300 p-8 text-center hover:border-blue-500 hover:from-blue-50 transition-all cursor-pointer">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-white border border-blue-100 shadow-elev-1 rounded-2xl flex items-center justify-center text-3xl">
            📤
          </div>
          <div>
            <p className="text-[15px] font-bold text-ink-900">Subir boleta o factura</p>
            <p className="text-[12px] text-ink-500 mt-1">PDF, JPG, PNG — Máximo 10 MB</p>
            <p className="text-[12px] text-blue-600 mt-2 font-medium">El sistema detectará automáticamente proveedor, monto, fecha y categoría</p>
          </div>
          <button className="mt-2 px-6 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">
            Seleccionar archivo
          </button>
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { l: "Procesando OCR", v: procesando.length, tone: "text-blue-600", bg: "border-blue-100 bg-blue-50/50" },
          { l: "Borradores por revisar", v: drafts.length, tone: "text-amber-600", bg: "border-amber-100 bg-amber-50/50" },
          { l: "Ratificados este mes", v: ratificados.length, tone: "text-emerald-600", bg: "border-emerald-100 bg-emerald-50/50" },
          { l: "Total ratificado", v: formatGuaranies(ratificados.reduce((s, g) => s + (g.montoFinal || 0), 0)), tone: "text-ink-900", bg: "border-ink-200 bg-white" },
        ].map((k, i) => (
          <div key={i} className={`rounded-2xl border p-4 ${k.bg}`}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">{k.l}</p>
            <p className={`text-2xl font-extrabold mt-1 ${k.tone}`}>{k.v}</p>
          </div>
        ))}
      </div>

      {/* Borradores pendientes de revisión */}
      {drafts.length > 0 && (
        <div>
          <h3 className="text-[13.5px] font-bold text-ink-900 mb-3">⚡ Borradores pendientes de revisión</h3>
          <div className="space-y-3">
            {drafts.map(gasto => (
              <div key={gasto.id} className="rounded-2xl bg-white border border-amber-200 p-5 shadow-elev-1">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`pill ${getEstadoGastoColor(gasto.estado)}`}>{getEstadoGastoLabel(gasto.estado)}</span>
                  <span className="text-[11.5px] text-ink-500">Subido: {gasto.fechaSubida}</span>
                  <span className="text-[11.5px] text-ink-500 font-mono">📎 {gasto.archivoNombre}</span>
                </div>

                {/* Datos extraídos por OCR */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { l: "Proveedor detectado", v: gasto.proveedorDetectado || "No detectado", conf: gasto.proveedorConfianza },
                    { l: "Monto detectado", v: gasto.montoDetectado > 0 ? formatGuaranies(gasto.montoDetectado) : "No detectado", conf: gasto.montoConfianza },
                    { l: "Fecha documento", v: gasto.fechaDocumento || "No detectada", conf: gasto.fechaConfianza },
                    { l: "Centro de costo sugerido", v: gasto.centroCostoSugerido ? getCentroCostoNombre(gasto.centroCostoSugerido) : "Sin clasificar", conf: gasto.centroCostoConfianza },
                  ].map((f, i) => (
                    <div key={i} className="rounded-xl bg-ink-50/60 border border-ink-100 p-3">
                      <p className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">{f.l}</p>
                      <p className="text-[13px] font-bold text-ink-900 mt-1">{f.v}</p>
                      <p className={`text-[11px] mt-0.5 font-medium ${getConfianzaColor(f.conf)}`}>Confianza: {f.conf}</p>
                    </div>
                  ))}
                </div>

                {/* Acciones */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-ink-100 flex-wrap">
                  <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold rounded-xl transition-colors">✓ Ratificar</button>
                  <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-[13px] font-semibold rounded-xl transition-colors">✏️ Editar y ratificar</button>
                  <button className="px-4 py-2 border border-rose-200 text-rose-600 text-[13px] font-medium rounded-xl hover:bg-rose-50 transition-colors">✕ Rechazar</button>
                  <button className="px-4 py-2 border border-ink-200 text-ink-700 text-[13px] font-medium rounded-xl hover:bg-ink-50 ml-auto transition-colors">👁️ Ver documento</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Procesando */}
      {procesando.length > 0 && (
        <div>
          <h3 className="text-[13.5px] font-bold text-ink-900 mb-3">🔄 Procesando OCR…</h3>
          <div className="space-y-2">
            {procesando.map(gasto => (
              <div key={gasto.id} className="rounded-2xl bg-white border border-blue-200 p-4 flex items-center gap-4 shadow-elev-1">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <div>
                  <p className="text-[13px] font-bold text-ink-900">{gasto.archivoNombre}</p>
                  <p className="text-[11.5px] text-blue-600 font-medium">Extrayendo datos del documento…</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historial ratificados */}
      <div>
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-3">✓ Gastos ratificados — Julio 2026</h3>
        <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 overflow-hidden">
          <table className="w-full">
            <thead className="bg-ink-50 border-b border-ink-200">
              <tr>
                {["Documento", "Proveedor", "Centro de costo", "Monto", "Fecha doc.", "Acciones"].map((h, i) => (
                  <th key={h} className={`text-${i === 3 ? "right" : "left"} px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ratificados.map(gasto => (
                <tr key={gasto.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📎</span>
                      <span className="text-[11.5px] text-ink-600 font-mono">{gasto.archivoNombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] font-bold text-ink-900">{gasto.proveedorFinal}</td>
                  <td className="px-4 py-3 text-[13px] text-ink-600">{gasto.centroCostoFinal ? getCentroCostoNombre(gasto.centroCostoFinal) : "—"}</td>
                  <td className="px-4 py-3 text-[13px] text-right font-bold text-ink-900">{formatGuaranies(gasto.montoFinal || 0)}</td>
                  <td className="px-4 py-3 text-[13px] text-ink-500">{gasto.fechaDocumento}</td>
                  <td className="px-4 py-3">
                    <button className="text-[11.5px] text-blue-600 hover:text-blue-800 hover:underline font-medium mr-2">Editar</button>
                    <button className="text-[11.5px] text-ink-600 hover:text-ink-900 hover:underline font-medium mr-2">Ver doc</button>
                    <button className="text-[11.5px] text-rose-600 hover:text-rose-800 hover:underline font-medium">Anular</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info del sistema */}
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 p-5">
        <h4 className="text-[13.5px] font-bold text-blue-900 mb-2">ℹ️ Proveedores con reconocimiento automático</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {["ANDE (electricidad)", "ESSAP (agua)", "COPACO (telefonía)", "Tigo/Personal (internet)", "Guardia SRL", "CleanPro", "ThyssenKrupp", "HidroServ"].map(p => (
            <span key={p} className="text-[11.5px] bg-white text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg">{p}</span>
          ))}
        </div>
        <p className="text-[11.5px] text-blue-700 mt-2">Para boletas de otros proveedores, el sistema extrae lo posible y deja el resto para revisión manual.</p>
      </div>
    </div>
  );
}

// ---- Sub: Presupuesto ----
function GastosPresupuesto() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold text-ink-900">Presupuesto de gastos comunes</h3>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Agregar categoría</button>
      </div>
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              {["Categoría", "Presupuesto mensual", "% del total", "Acciones"].map((h, i) => (
                <th key={h} className={`text-${i > 0 && i < 3 ? "right" : "left"} px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categoriasGasto.map(cat => (
              <tr key={cat.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-[13px] font-bold text-ink-900">{cat.nombre}</td>
                <td className="px-4 py-3 text-[13px] text-right font-bold text-ink-900">{formatGuaranies(cat.presupuestoMensual)}</td>
                <td className="px-4 py-3 text-[13px] text-right text-ink-500">{((cat.presupuestoMensual / totalPresupuestoMensual) * 100).toFixed(1)}%</td>
                <td className="px-4 py-3">
                  <button className="text-[11.5px] text-blue-600 hover:text-blue-800 hover:underline font-medium mr-2">Editar</button>
                  <button className="text-[11.5px] text-rose-600 hover:text-rose-800 hover:underline font-medium">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-ink-50 border-t border-ink-200">
            <tr>
              <td className="px-4 py-3 text-[13px] font-bold text-ink-900">TOTAL</td>
              <td className="px-4 py-3 text-[13px] text-right font-extrabold text-ink-900">{formatGuaranies(totalPresupuestoMensual)}</td>
              <td className="px-4 py-3 text-[13px] text-right font-bold text-ink-500">100%</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 p-4">
        <p className="text-[13px] text-blue-800">
          <strong>Costo por unidad promedio:</strong> {formatGuaranies(Math.round(totalPresupuestoMensual / 48))}/mes (basado en 48 unidades con prorrateo por coeficiente).
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
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold text-ink-900">Centros de costo</h3>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Nuevo centro</button>
      </div>

      <p className="text-[13px] text-ink-600">Estructura jerárquica para clasificar y agrupar gastos. Se usa para el reconocimiento automático de boletas y para reportes.</p>

      <div className="space-y-3">
        {padres.map(padre => {
          const hijos = centrosCosto.filter(cc => cc.padre === padre.id);
          return (
            <div key={padre.id} className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-ink-50 border-b border-ink-200 flex-wrap gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[13.5px] font-bold text-ink-900">{padre.nombre}</span>
                  <span className={`pill ${padre.activo ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-ink-100 text-ink-500 border border-ink-200"}`}>
                    {padre.activo ? "Activo" : "Inactivo"}
                  </span>
                  {padre.prorrateable && <span className="pill bg-blue-50 text-blue-700 border border-blue-200">Prorrateable</span>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-semibold text-ink-700">{formatGuaranies(padre.presupuestoMensual)}</span>
                  <button className="text-[11.5px] text-blue-600 hover:text-blue-800 hover:underline font-medium">Editar</button>
                </div>
              </div>
              {hijos.length > 0 && (
                <div className="divide-y divide-ink-100">
                  {hijos.map(hijo => (
                    <div key={hijo.id} className="flex items-center justify-between px-5 py-2.5 pl-10">
                      <div className="flex items-center gap-2">
                        <span className="text-ink-300">└</span>
                        <span className="text-[13px] text-ink-700">{hijo.nombre}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] text-ink-500">{formatGuaranies(hijo.presupuestoMensual)}</span>
                        <button className="text-[11.5px] text-blue-600 hover:text-blue-800 hover:underline font-medium">Editar</button>
                        <button className="text-[11.5px] text-rose-600 hover:text-rose-800 hover:underline font-medium">Eliminar</button>
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
      <div className="rounded-2xl bg-ink-50 border border-ink-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { l: "Total centros", v: centrosCosto.length },
            { l: "Categorías padre", v: padres.length },
            { l: "Presupuesto total", v: formatGuaranies(padres.reduce((s, p) => s + p.presupuestoMensual, 0)) },
            { l: "Prorrateables", v: `${centrosCosto.filter(c => c.prorrateable && !c.padre).length}/${padres.length}` },
          ].map((k, i) => (
            <div key={i}>
              <p className="text-[10.5px] font-semibold uppercase tracking-widest text-ink-500">{k.l}</p>
              <p className="text-lg font-extrabold text-ink-900 mt-1">{k.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

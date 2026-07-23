import { recaudacionMensual, morosidadMensual, pagosPorCanal, formatGuaranies } from "@/data/mock-data";

export function ReportesView() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Reportes</p>
        <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Reportes y análisis</h2>
      </div>

      {/* Recaudación mensual */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-4">Recaudación vs. emitido — 2026</h3>
        <div className="space-y-2.5">
          {recaudacionMensual.map(r => (
            <div key={r.mes} className="flex items-center gap-3">
              <span className="text-[11.5px] font-semibold text-ink-500 w-10 uppercase tracking-wider">{r.mes}</span>
              <div className="flex-1 h-6 bg-ink-100 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-100 rounded-full" />
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: `${(r.recaudado / r.emitido) * 100}%` }} />
              </div>
              <span className="text-[12px] font-bold text-ink-700 w-14 text-right font-mono">{((r.recaudado / r.emitido) * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 pt-3 border-t border-ink-100">
          <span className="text-[11.5px] text-ink-500 flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded" /> Recaudado</span>
          <span className="text-[11.5px] text-ink-500 flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-100 rounded" /> Emitido</span>
        </div>
      </div>

      {/* Morosidad */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-4">Evolución de morosidad (%)</h3>
        <div className="space-y-2.5">
          {morosidadMensual.map(m => (
            <div key={m.mes} className="flex items-center gap-3">
              <span className="text-[11.5px] font-semibold text-ink-500 w-10 uppercase tracking-wider">{m.mes}</span>
              <div className="flex-1 h-5 bg-ink-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${m.porcentaje > 10 ? "bg-rose-500" : m.porcentaje > 5 ? "bg-orange-400" : "bg-amber-400"}`} style={{ width: `${m.porcentaje * 5}%` }} />
              </div>
              <span className="text-[12px] font-bold text-ink-700 w-12 text-right font-mono">{m.porcentaje}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pagos por canal */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-4">Distribución por canal de pago — Julio 2026</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pagosPorCanal.map(p => (
            <div key={p.canal} className="text-center rounded-xl border border-ink-100 bg-ink-50/40 p-4">
              <p className="text-2xl font-extrabold text-ink-900">{p.cantidad}</p>
              <p className="text-[11px] text-ink-500 uppercase tracking-wider font-semibold">transacciones</p>
              <p className="text-[13px] font-semibold text-blue-600 mt-2">{p.canal}</p>
              <p className="text-[11.5px] text-ink-500 mt-0.5">{formatGuaranies(p.monto)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de exportación */}
      <div className="flex gap-3 flex-wrap">
        <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold rounded-xl transition-colors">📊 Exportar Excel</button>
        <button className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-[13px] font-semibold rounded-xl transition-colors">📄 Exportar PDF</button>
        <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">📧 Enviar reporte por email</button>
      </div>
    </div>
  );
}

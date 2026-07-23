import { cobros, formatGuaranies } from "@/data/mock-data";

interface Props {
  totalRecaudado: number;
  totalEmitido: number;
  tasaRecaudacion: string;
  pagados: number;
  pendientes: number;
  vencidos: number;
  enMora: number;
}

export function DashboardView({ totalRecaudado, totalEmitido, tasaRecaudacion, pagados, pendientes, vencidos, enMora }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Resumen</p>
        <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Torre Ñandutí · Julio 2026</h2>
        <p className="text-[13px] text-ink-500">Panorama financiero y operativo del edificio</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">Recaudado</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{formatGuaranies(totalRecaudado)}</p>
          <p className="text-[11.5px] text-ink-500 mt-1">de {formatGuaranies(totalEmitido)} emitido</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">Tasa de recaudación</p>
          <p className="text-2xl font-extrabold text-blue-600 mt-1">{tasaRecaudacion}%</p>
          <p className="text-[11.5px] text-ink-500 mt-1">meta 95%</p>
        </div>
        <div className="rounded-2xl bg-white border border-ink-200 p-5 shadow-elev-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">Cobros del mes</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-emerald-600">{pagados}</span>
            <span className="text-[13px] text-ink-400">/ 8 pagados</span>
          </div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            <span className="pill bg-amber-50 text-amber-700 border border-amber-200">{pendientes} pend.</span>
            <span className="pill bg-orange-50 text-orange-700 border border-orange-200">{vencidos} venc.</span>
            <span className="pill bg-rose-50 text-rose-700 border border-rose-200">{enMora} mora</span>
          </div>
        </div>
        <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">Reclamos abiertos</p>
          <p className="text-2xl font-extrabold text-orange-600 mt-1">2</p>
          <p className="text-[11.5px] text-ink-500 mt-1">1 en proceso · 1 nuevo</p>
        </div>
      </div>

      {/* Alertas */}
      <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-white border border-rose-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">⚠️</span>
          <h3 className="text-[14px] font-bold text-rose-900">Alertas activas</h3>
        </div>
        <ul className="text-[13px] text-rose-800 space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-rose-500 mt-0.5">▸</span>
            Mantención vencida: Sistema contra incendios (vencido 10/07/2026)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-500 mt-0.5">▸</span>
            2 unidades en mora: 5A (Jorge Villalba), 6A (Fernando Acosta)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-500 mt-0.5">▸</span>
            Reclamo sin atender hace 2 días: Ruido excesivo depto 6A
          </li>
        </ul>
      </div>

      {/* Últimos pagos */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[14px] font-bold text-ink-900">Últimos pagos recibidos</h3>
          <span className="pill bg-emerald-50 text-emerald-700 border border-emerald-200"><span className="dot-live" /> En vivo</span>
        </div>
        <div className="space-y-1.5">
          {cobros.filter(c => c.estado === "pagado").sort((a,b) => (b.fechaPago || "").localeCompare(a.fechaPago || "")).slice(0, 5).map(c => (
            <div key={c.id} className="flex items-center justify-between py-2 border-b border-ink-100 last:border-0">
              <div>
                <p className="text-[13px] font-bold text-ink-900">Depto {c.unidadNumero} — {c.residente}</p>
                <p className="text-[11.5px] text-ink-500 font-medium">{c.fechaPago} · {c.canalPago}</p>
              </div>
              <p className="text-[13.5px] font-bold text-emerald-600">{formatGuaranies(c.monto)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

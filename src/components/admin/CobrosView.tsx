import { cobros, formatGuaranies, getEstadoColor } from "@/data/mock-data";

export function CobrosView() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Cobros</p>
          <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Cobros — Julio 2026</h2>
        </div>
        <div className="flex gap-2 flex-wrap">
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

      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              {["Unidad", "Residente", "Monto", "Vencimiento", "Estado", "Canal", "Acciones"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cobros.map(cobro => (
              <tr key={cobro.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-[13px] font-bold text-ink-900">{cobro.unidadNumero}</td>
                <td className="px-4 py-3 text-[13px] text-ink-700">{cobro.residente}</td>
                <td className="px-4 py-3 text-[13px] font-bold text-ink-900">{formatGuaranies(cobro.monto)}</td>
                <td className="px-4 py-3 text-[13px] text-ink-500">{cobro.vencimiento}</td>
                <td className="px-4 py-3">
                  <span className={`pill ${getEstadoColor(cobro.estado)}`}>{cobro.estado.toUpperCase()}</span>
                </td>
                <td className="px-4 py-3 text-[13px] text-ink-500">{cobro.canalPago || "—"}</td>
                <td className="px-4 py-3">
                  <button className="text-[11.5px] text-blue-600 hover:text-blue-800 hover:underline font-medium mr-2">Ver detalle</button>
                  {cobro.estado !== "pagado" && <button className="text-[11.5px] text-orange-600 hover:text-orange-800 hover:underline font-medium">Recordar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

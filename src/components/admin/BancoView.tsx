import { movimientosBancarios, formatGuaranies } from "@/data/mock-data";

export function BancoView() {
  const ingresos = movimientosBancarios.filter(m => m.tipo === "ingreso");
  const egresos = movimientosBancarios.filter(m => m.tipo === "egreso");
  const totalIngresos = ingresos.reduce((s, m) => s + m.monto, 0);
  const totalEgresos = egresos.reduce((s, m) => s + m.monto, 0);
  const saldo = totalIngresos - totalEgresos;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Banco</p>
          <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Movimientos bancarios — Julio 2026</h2>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">Conciliar</button>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">Importar extracto</button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">Ingresos del mes</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{formatGuaranies(totalIngresos)}</p>
        </div>
        <div className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">Egresos del mes</p>
          <p className="text-2xl font-extrabold text-rose-600 mt-1">{formatGuaranies(totalEgresos)}</p>
        </div>
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">Saldo del período</p>
          <p className={`text-2xl font-extrabold mt-1 ${saldo >= 0 ? "text-blue-600" : "text-rose-600"}`}>{formatGuaranies(saldo)}</p>
        </div>
      </div>

      {/* Cuenta */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg text-white shadow-elev-1">🏦</div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500">Cuenta: Banco Itaú Paraguay</p>
            <p className="text-[13.5px] font-semibold text-ink-800">Cta. Cte. 001-234567-001 — Torre Ñandutí</p>
          </div>
        </div>
        <span className="pill bg-emerald-50 text-emerald-700 border border-emerald-200"><span className="dot-live" /> Conectada</span>
      </div>

      {/* Tabla */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              {["Fecha", "Concepto", "Referencia", "Monto", "Conciliado"].map((h, i) => (
                <th key={h} className={`text-${i === 3 ? "right" : i === 4 ? "center" : "left"} px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movimientosBancarios.map(mov => (
              <tr key={mov.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-[13px] text-ink-500">{mov.fecha}</td>
                <td className="px-4 py-3 text-[13px] text-ink-800">{mov.concepto}</td>
                <td className="px-4 py-3 text-[11.5px] text-ink-500 font-mono">{mov.referencia}</td>
                <td className={`px-4 py-3 text-[13px] text-right font-semibold ${mov.tipo === "ingreso" ? "text-emerald-600" : "text-rose-600"}`}>
                  {mov.tipo === "ingreso" ? "+" : "-"}{formatGuaranies(mov.monto)}
                </td>
                <td className="px-4 py-3 text-center">
                  {mov.conciliado
                    ? <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">✓</span>
                    : <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-ink-100 text-ink-400 text-[11px] font-bold">○</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

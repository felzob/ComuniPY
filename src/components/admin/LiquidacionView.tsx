import { unidades, formatGuaranies } from "@/data/mock-data";

export function LiquidacionView() {
  const unidadesEdificio = unidades.filter(u => u.tipo === "departamento");
  const totalCoef = unidadesEdificio.reduce((s, u) => s + u.coeficiente, 0);

  const gastos = [
    { l: "Gastos básicos (ANDE + ESSAP)", v: 4800000 },
    { l: "Remuneraciones", v: 8050000 },
    { l: "Servicios contratados (seguridad, limpieza, jardín)", v: 14500000 },
    { l: "Mantención y reparaciones", v: 2500000 },
    { l: "Seguros", v: 1500000 },
    { l: "Administración", v: 2000000 },
    { l: "Fondo de reserva", v: 3000000 },
  ];
  const totalGastos = gastos.reduce((s, g) => s + g.v, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Liquidación</p>
          <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Emitir liquidación mensual</h2>
        </div>
        <div className="flex gap-2 items-center">
          <select className="px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
            <option>Julio 2026</option>
            <option>Agosto 2026</option>
          </select>
          <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">Generar liquidación</button>
        </div>
      </div>

      {/* Wizard steps indicator */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {[
          { n: "1", l: "Gastos", active: true },
          { n: "2", l: "Prorrateo", active: true },
          { n: "3", l: "Confirmar", active: false },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${s.active ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-ink-50 border-ink-200 text-ink-500"}`}>
              <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${s.active ? "bg-blue-600 text-white" : "bg-ink-200 text-ink-600"}`}>{s.n}</span>
              <span className="text-[12px] font-semibold">{s.l}</span>
            </div>
            {i < 2 && <span className="text-ink-300">—</span>}
          </div>
        ))}
      </div>

      {/* Paso 1 */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-3">Paso 1 · Gastos ratificados del período</h3>
        <div className="space-y-1.5">
          {gastos.map(g => (
            <div key={g.l} className="flex justify-between py-2 border-b border-ink-100 last:border-0">
              <span className="text-[13px] text-ink-600">{g.l}</span>
              <span className="text-[13px] font-medium text-ink-900">{formatGuaranies(g.v)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 mt-1 border-t-2 border-ink-900">
            <span className="text-[13.5px] font-bold text-ink-900">TOTAL A DISTRIBUIR</span>
            <span className="text-[15px] font-extrabold text-blue-700">{formatGuaranies(totalGastos)}</span>
          </div>
        </div>
      </div>

      {/* Paso 2 */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-3">Paso 2 · Prorrateo por unidad (coeficiente)</h3>
        <div className="rounded-xl border border-ink-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-ink-50 border-b border-ink-200">
              <tr>
                {["Unidad", "Residente", "Coef.", "% prorrateo", "Monto", "Ajuste"].map((h, i) => (
                  <th key={h} className={`text-${i < 2 ? "left" : i === 5 ? "center" : "right"} px-4 py-2.5 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {unidadesEdificio.slice(0, 8).map(u => {
                const pct = (u.coeficiente / totalCoef) * 100;
                const monto = Math.round((u.coeficiente / totalCoef) * totalGastos);
                return (
                  <tr key={u.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                    <td className="px-4 py-2.5 text-[13px] font-bold text-ink-900">{u.numero}</td>
                    <td className="px-4 py-2.5 text-[13px] text-ink-600">{u.residente}</td>
                    <td className="px-4 py-2.5 text-[13px] text-right text-ink-500 font-mono">{u.coeficiente}</td>
                    <td className="px-4 py-2.5 text-[13px] text-right text-ink-500 font-mono">{pct.toFixed(1)}%</td>
                    <td className="px-4 py-2.5 text-[13px] text-right font-bold text-ink-900">{formatGuaranies(monto)}</td>
                    <td className="px-4 py-2.5 text-center"><button className="text-[11.5px] text-blue-600 hover:text-blue-800 hover:underline font-medium">Ajustar</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paso 3 */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-5">
        <h3 className="text-[13.5px] font-bold text-emerald-900 mb-1">Paso 3 · Confirmar y emitir</h3>
        <p className="text-[13px] text-emerald-800 mb-4">Al confirmar se generarán 8 cobros individuales y se notificará a todos los residentes por email + WhatsApp.</p>
        <div className="flex gap-3 flex-wrap">
          <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold rounded-xl transition-colors">✓ Confirmar y emitir liquidación</button>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-white bg-white/70 transition-colors">Guardar borrador</button>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-white bg-white/70 transition-colors">Vista previa PDF</button>
        </div>
      </div>
    </div>
  );
}

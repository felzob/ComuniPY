export function ConfigView() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Configuración</p>
        <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Configuración — Torre Ñandutí</h2>
      </div>

      {/* Datos del edificio */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-4">Datos del edificio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { l: "Nombre", d: "Torre Ñandutí", type: "text" },
            { l: "RUC", d: "80012345-6", type: "text" },
            { l: "Dirección", d: "Av. España 1245, Villa Morra", type: "text" },
            { l: "Ciudad", d: "Asunción", type: "text" },
          ].map((f) => (
            <div key={f.l}>
              <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">{f.l}</label>
              <input type={f.type} defaultValue={f.d} className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Configuración de cobro */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-4">Configuración de cobro</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">Día de vencimiento</label>
            <input type="number" defaultValue="10" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
          <div>
            <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">Días de gracia</label>
            <input type="number" defaultValue="5" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
          <div>
            <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">Tasa de interés por mora (% mensual)</label>
            <input type="number" defaultValue="2" step="0.1" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
          </div>
          <div>
            <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">Recordatorios automáticos</label>
            <select className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
              <option>5 días antes, día del vencimiento, 5 y 15 después</option>
              <option>Solo día del vencimiento</option>
              <option>Desactivado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Canales de pago */}
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-5">
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-4">Canales de pago habilitados</h3>
        <div className="space-y-3">
          {[
            { icon: "🏦", n: "SPI — Transferencia instantánea", d: "Banco Itaú Paraguay — Cta. 001-234567-001", active: true },
            { icon: "📱", n: "Tigo Money", d: "Comercio ID: TM-NAN-2026-001", active: true },
            { icon: "📲", n: "Personal Pay", d: "Comercio ID: PP-NAN-2026-001", active: true },
            { icon: "💳", n: "Tarjeta de crédito/débito", d: "Próximamente", active: false },
          ].map((c) => (
            <div
              key={c.n}
              className={`flex items-center justify-between p-3.5 rounded-xl border ${c.active ? "bg-emerald-50/60 border-emerald-200" : "bg-ink-50 border-ink-200"}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${c.active ? "bg-white border border-emerald-200" : "bg-white border border-ink-200"}`}>{c.icon}</span>
                <div>
                  <p className="text-[13.5px] font-bold text-ink-900">{c.n}</p>
                  <p className="text-[11.5px] text-ink-500">{c.d}</p>
                </div>
              </div>
              <span className={`pill ${c.active ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-ink-100 text-ink-500 border border-ink-200"}`}>
                {c.active ? "Activo" : "No disponible"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">Guardar cambios</button>
    </div>
  );
}

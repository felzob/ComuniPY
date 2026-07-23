import { reclamos, unidades, getEstadoReclamoColor } from "@/data/mock-data";

export function ReclamosView() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Reclamos</p>
          <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Reclamos y solicitudes</h2>
        </div>
        <div className="flex gap-2">
          <span className="pill bg-ink-100 text-ink-700 border border-ink-200">Total: {reclamos.length}</span>
          <span className="pill bg-amber-50 text-amber-700 border border-amber-200">Abiertos: {reclamos.filter(r => r.estado !== "resuelto").length}</span>
        </div>
      </div>
      <div className="space-y-3">
        {reclamos.map(r => (
          <div key={r.id} className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-4 hover:shadow-elev-2 transition-shadow">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-[13.5px] font-bold text-ink-900">{r.titulo}</h3>
                  <span className={`pill ${getEstadoReclamoColor(r.estado)}`}>{r.estado.replace("_", " ").toUpperCase()}</span>
                </div>
                <p className="text-[13px] text-ink-600">{r.descripcion}</p>
                <div className="flex gap-4 mt-2 flex-wrap">
                  <span className="text-[11.5px] text-ink-500">Depto {unidades.find(u => u.id === r.unidadId)?.numero} — {r.residente}</span>
                  <span className="text-[11.5px] text-ink-500">Categoría: {r.categoria}</span>
                  <span className="text-[11.5px] text-ink-500">Creado: {r.fechaCreacion}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-[11.5px] px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-semibold transition-colors">Responder</button>
                {r.estado !== "resuelto" && <button className="text-[11.5px] px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 font-semibold transition-colors">Resolver</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

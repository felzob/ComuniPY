import { unidades } from "@/data/mock-data";

export function UnidadesView() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Unidades</p>
          <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Unidades — Torre Ñandutí</h2>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Agregar unidad</button>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">Importar CSV</button>
        </div>
      </div>
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              {["Unidad", "Piso", "Tipo", "m²", "Coef.", "Propietario", "Residente", "Acciones"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {unidades.map(u => (
              <tr key={u.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-[13px] font-bold text-ink-900">{u.numero}</td>
                <td className="px-4 py-3 text-[13px] text-ink-500">{u.piso}</td>
                <td className="px-4 py-3 text-[13px] text-ink-500 capitalize">{u.tipo}</td>
                <td className="px-4 py-3 text-[13px] text-ink-500">{u.metrosCuadrados}</td>
                <td className="px-4 py-3 text-[13px] font-mono text-blue-600 font-semibold">{u.coeficiente}%</td>
                <td className="px-4 py-3 text-[13px] text-ink-700">{u.propietario}</td>
                <td className="px-4 py-3 text-[13px] text-ink-700">{u.residente}</td>
                <td className="px-4 py-3">
                  <button className="text-[11.5px] text-blue-600 hover:text-blue-800 hover:underline font-medium mr-2">Editar</button>
                  <button className="text-[11.5px] text-rose-600 hover:text-rose-800 hover:underline font-medium">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

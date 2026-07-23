import { mantenciones, getMantencionColor } from "@/data/mock-data";

export function MantencionesView() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Mantenciones</p>
          <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Calendario de mantenciones</h2>
        </div>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Programar mantención</button>
      </div>
      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              {["Equipo", "Proveedor", "Frecuencia", "Última", "Próxima", "Estado", "Acciones"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mantenciones.map(m => (
              <tr key={m.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-[13px] font-bold text-ink-900">{m.equipo}</td>
                <td className="px-4 py-3 text-[13px] text-ink-700">{m.proveedor}</td>
                <td className="px-4 py-3 text-[13px] text-ink-500">{m.frecuencia}</td>
                <td className="px-4 py-3 text-[13px] text-ink-500">{m.ultimaMantencion}</td>
                <td className="px-4 py-3 text-[13px] text-ink-500">{m.proximaMantencion}</td>
                <td className="px-4 py-3">
                  <span className={`pill ${getMantencionColor(m.estado)}`}>{m.estado.replace("_", " ").toUpperCase()}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-[11.5px] text-blue-600 hover:text-blue-800 hover:underline font-medium mr-2">Registrar</button>
                  <button className="text-[11.5px] text-ink-600 hover:text-ink-900 hover:underline font-medium">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { logsAuditoria } from "@/data/mock-data";

export function AuditoriaView() {
  const rolTone: Record<string, string> = {
    admin: "bg-blue-100 text-blue-800 border border-blue-200",
    residente: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    superadmin: "bg-violet-100 text-violet-800 border border-violet-200",
    trabajador: "bg-amber-100 text-amber-800 border border-amber-200",
    sistema: "bg-ink-100 text-ink-700 border border-ink-200",
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Auditoría</p>
          <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Log de auditoría</h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select className="px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
            <option>Todos los módulos</option>
            <option>Gastos OCR</option>
            <option>Cobros</option>
            <option>Votaciones</option>
            <option>Auth</option>
            <option>Comunicaciones</option>
            <option>Banco</option>
          </select>
          <select className="px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
            <option>Todos los usuarios</option>
            <option>María González</option>
            <option>Roberto Díaz</option>
            <option>Sistema</option>
          </select>
          <button className="px-4 py-2.5 border border-ink-200 text-[13px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">Exportar</button>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 border-b border-ink-200">
            <tr>
              {["Fecha/Hora", "Usuario", "Rol", "Acción", "Módulo", "Detalle", "IP"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logsAuditoria.map(log => (
              <tr key={log.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                <td className="px-4 py-3 text-[11.5px] text-ink-500 font-mono">{log.timestamp}</td>
                <td className="px-4 py-3 text-[13px] text-ink-800">{log.usuario}</td>
                <td className="px-4 py-3">
                  <span className={`pill ${rolTone[log.rol] || rolTone.sistema}`}>{log.rol}</span>
                </td>
                <td className="px-4 py-3 text-[13px] font-bold text-ink-900">{log.accion}</td>
                <td className="px-4 py-3 text-[11.5px] text-ink-500">{log.modulo}</td>
                <td className="px-4 py-3 text-[11.5px] text-ink-600 max-w-xs truncate">{log.detalle}</td>
                <td className="px-4 py-3 text-[11.5px] text-ink-500 font-mono">{log.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4">
        <p className="text-[12.5px] text-amber-800">
          <strong>🔒 Registro inmutable:</strong> Los logs de auditoría no pueden ser editados ni eliminados. Se mantienen por mínimo 5 años según normativa.
        </p>
      </div>
    </div>
  );
}

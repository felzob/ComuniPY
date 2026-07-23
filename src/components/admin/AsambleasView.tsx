import { asambleas, getEstadoAsambleaColor } from "@/data/mock-data";

export function AsambleasView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Asambleas</p>
          <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Asambleas</h2>
        </div>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Convocar asamblea</button>
      </div>

      {/* Próxima asamblea */}
      {asambleas.filter(a => a.estado === "programada").map(a => (
        <div key={a.id} className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 p-5">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`pill ${getEstadoAsambleaColor(a.estado)}`}>{a.estado.toUpperCase()}</span>
                <span className="pill bg-violet-100 text-violet-700 border border-violet-200">{a.tipo}</span>
              </div>
              <h3 className="text-[15px] font-bold text-ink-900">{a.titulo}</h3>
              <div className="flex gap-4 mt-2 text-[12px] text-ink-600 flex-wrap">
                <span>📅 {a.fecha}</span>
                <span>🕐 {a.hora}</span>
                <span>📍 {a.lugar}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-[11.5px] px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">Editar</button>
              <button className="text-[11.5px] px-3 py-1.5 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 font-semibold transition-colors">Enviar recordatorio</button>
            </div>
          </div>

          {/* Agenda */}
          <div className="mt-4 pt-3 border-t border-blue-200">
            <p className="text-[11.5px] font-bold text-ink-700 mb-2 uppercase tracking-wider">Agenda</p>
            <ol className="space-y-1">
              {a.agenda.map((punto, i) => (
                <li key={i} className="text-[12.5px] text-ink-700 flex gap-2">
                  <span className="text-blue-600 font-bold min-w-[16px]">{i + 1}.</span>
                  {punto}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-200 flex items-center gap-4 flex-wrap text-[11.5px] text-ink-600">
            <span>Quorum requerido: <strong className="text-ink-900">{a.quorumRequerido}%</strong> ({Math.ceil(a.totalVotantes * a.quorumRequerido / 100)} unidades)</span>
            <span>Confirmados: <strong className="text-ink-900">18/{a.totalVotantes}</strong></span>
          </div>
        </div>
      ))}

      {/* Historial */}
      <div>
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-3">Historial de asambleas</h3>
        <div className="space-y-3">
          {asambleas.filter(a => a.estado === "finalizada").map(a => (
            <div key={a.id} className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-[13.5px] font-bold text-ink-900">{a.titulo}</h4>
                    <span className={`pill ${getEstadoAsambleaColor(a.estado)}`}>FINALIZADA</span>
                  </div>
                  <div className="flex gap-4 text-[11.5px] text-ink-500 flex-wrap">
                    <span>📅 {a.fecha}</span>
                    <span>Asistentes: {a.asistentes}/{a.totalVotantes} ({((a.asistentes / a.totalVotantes) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
                {a.actaUrl && <button className="text-[11.5px] px-3 py-1.5 bg-ink-100 text-ink-700 rounded-lg hover:bg-ink-200 font-semibold transition-colors">📄 Ver acta</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

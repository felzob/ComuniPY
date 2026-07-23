import { votaciones, formatGuaranies, getEstadoVotacionColor } from "@/data/mock-data";

export function VotacionesView() {
  const activas = votaciones.filter(v => v.estado === "activa");
  const cerradas = votaciones.filter(v => v.estado === "cerrada");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Votaciones</p>
          <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Votaciones</h2>
        </div>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Crear votación</button>
      </div>

      {/* Activas */}
      {activas.length > 0 && (
        <div>
          <h3 className="text-[13.5px] font-bold text-ink-900 mb-3">🗳️ Votaciones activas</h3>
          <div className="space-y-4">
            {activas.map(v => (
              <div key={v.id} className="rounded-2xl bg-white border border-emerald-200 p-5 shadow-elev-1">
                <div className="flex items-start justify-between mb-3 gap-3 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="text-[14px] font-bold text-ink-900">{v.titulo}</h4>
                      <span className={`pill ${getEstadoVotacionColor(v.estado)}`}>ACTIVA</span>
                    </div>
                    <p className="text-[13px] text-ink-600">{v.descripcion}</p>
                  </div>
                  <button className="text-[11.5px] px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100 font-semibold transition-colors">Cerrar votación</button>
                </div>

                {/* Progreso */}
                <div className="rounded-xl bg-ink-50/60 border border-ink-100 p-3.5 mb-3">
                  <div className="flex justify-between text-[11.5px] text-ink-500 mb-1.5 flex-wrap gap-2">
                    <span>Participación: <strong className="text-ink-900">{v.votosEmitidos}/{v.totalVotantes}</strong> ({((v.votosEmitidos / v.totalVotantes) * 100).toFixed(0)}%)</span>
                    <span>Quorum: {v.quorumRequerido}% · Mayoría: {v.mayoriaRequerida === "simple" ? "Simple" : "2/3"}</span>
                  </div>
                  <div className="w-full h-2 bg-ink-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: `${(v.votosEmitidos / v.totalVotantes) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-[11.5px] mt-1.5 flex-wrap">
                    <span className="text-ink-400">Cierre: {v.fechaCierre}</span>
                    <span className={`font-semibold ${(v.votosEmitidos / v.totalVotantes * 100) >= v.quorumRequerido ? "text-emerald-600" : "text-amber-600"}`}>
                      {(v.votosEmitidos / v.totalVotantes * 100) >= v.quorumRequerido ? "✓ Quorum alcanzado" : "⏳ Quorum pendiente"}
                    </span>
                  </div>
                </div>

                {/* Opciones */}
                <div className="space-y-2">
                  {v.opciones.map(op => (
                    <div key={op.id} className="flex items-center gap-3">
                      <div className="flex-1 h-8 bg-ink-100 rounded-lg overflow-hidden relative">
                        <div className="absolute inset-y-0 left-0 bg-blue-200/70 rounded-lg" style={{ width: `${v.votosEmitidos > 0 ? (op.votos / v.votosEmitidos) * 100 : 0}%` }} />
                        <span className="relative z-10 text-[12.5px] font-semibold text-ink-800 px-3 leading-8">{op.texto}</span>
                      </div>
                      <span className="text-[11.5px] text-ink-500 w-16 text-right font-mono">{op.votos} votos</span>
                    </div>
                  ))}
                </div>

                {v.montoAsociado && (
                  <div className="mt-3 pt-2 border-t border-ink-100">
                    <span className="text-[11.5px] text-ink-500">💰 Monto asociado: <strong className="text-ink-900">{formatGuaranies(v.montoAsociado)}</strong></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cerradas */}
      <div>
        <h3 className="text-[13.5px] font-bold text-ink-900 mb-3">Historial de votaciones</h3>
        <div className="space-y-3">
          {cerradas.map(v => (
            <div key={v.id} className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="text-[13.5px] font-bold text-ink-900">{v.titulo}</h4>
                    <span className={`pill ${getEstadoVotacionColor(v.estado)}`}>CERRADA</span>
                  </div>
                  <p className="text-[11.5px] text-ink-500">Participación: {v.votosEmitidos}/{v.totalVotantes} · Resultado: <strong className="text-emerald-700">{v.resultado}</strong></p>
                  <p className="text-[11.5px] text-ink-400 mt-1">Período: {v.fechaInicio} — {v.fechaCierre}</p>
                </div>
                <button className="text-[11.5px] px-3 py-1.5 bg-ink-100 text-ink-700 rounded-lg hover:bg-ink-200 font-semibold transition-colors">Ver detalle</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

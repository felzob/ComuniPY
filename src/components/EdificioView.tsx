"use client";

import { useState } from "react";

interface Espacio {
  id: string;
  nombre: string;
  tipo: "departamento" | "estacionamiento" | "bodega" | "comercial";
  metrosTotales: number;
  unidadesCreadas: number;
  metrosUsados: number;
}

const tipoIcon = {
  departamento: "🏢",
  estacionamiento: "🚗",
  bodega: "📦",
  comercial: "🏪",
} as const;

const tipoAccent = {
  departamento: "from-blue-500 to-indigo-600",
  estacionamiento: "from-emerald-500 to-teal-600",
  bodega: "from-amber-500 to-orange-600",
  comercial: "from-violet-500 to-fuchsia-600",
} as const;

export function EdificioView() {
  const [espacios, setEspacios] = useState<Espacio[]>([
    { id: "esp1", nombre: "Departamentos", tipo: "departamento", metrosTotales: 1200, unidadesCreadas: 8, metrosUsados: 676 },
    { id: "esp2", nombre: "Estacionamientos residentes", tipo: "estacionamiento", metrosTotales: 450, unidadesCreadas: 2, metrosUsados: 30 },
    { id: "esp3", nombre: "Bodegas", tipo: "bodega", metrosTotales: 120, unidadesCreadas: 2, metrosUsados: 16 },
  ]);
  const [showAddEspacio, setShowAddEspacio] = useState(false);
  const [nuevoEspacio, setNuevoEspacio] = useState({ nombre: "", tipo: "departamento" as const, metrosTotales: 0 });
  const [showAddUnidad, setShowAddUnidad] = useState<string | null>(null);
  const [nuevaUnidad, setNuevaUnidad] = useState({ numero: "", piso: 0, metros: 0, propietario: "", residente: "" });
  const [unidadesLocal, setUnidadesLocal] = useState([
    { id: "u1", espacioId: "esp1", numero: "4A", piso: 4, metros: 85, propietario: "Roberto Díaz", residente: "Roberto Díaz" },
    { id: "u2", espacioId: "esp1", numero: "4B", piso: 4, metros: 72, propietario: "Ana Benítez", residente: "Ana Benítez" },
    { id: "u3", espacioId: "esp1", numero: "5A", piso: 5, metros: 85, propietario: "Jorge Villalba", residente: "Jorge Villalba" },
    { id: "u4", espacioId: "esp1", numero: "5B", piso: 5, metros: 72, propietario: "Susana Ortiz", residente: "Marcos Peña" },
    { id: "u5", espacioId: "esp1", numero: "6A", piso: 6, metros: 95, propietario: "Fernando Acosta", residente: "Fernando Acosta" },
    { id: "u6", espacioId: "esp1", numero: "6B", piso: 6, metros: 72, propietario: "Claudia Ramírez", residente: "Claudia Ramírez" },
    { id: "u7", espacioId: "esp1", numero: "7A", piso: 7, metros: 85, propietario: "Luis Giménez", residente: "Luis Giménez" },
    { id: "u8", espacioId: "esp1", numero: "7B", piso: 7, metros: 110, propietario: "Patricia Cardozo", residente: "Patricia Cardozo" },
    { id: "u9", espacioId: "esp2", numero: "C-01", piso: -1, metros: 15, propietario: "Roberto Díaz", residente: "Roberto Díaz" },
    { id: "u10", espacioId: "esp2", numero: "C-02", piso: -1, metros: 15, propietario: "Ana Benítez", residente: "Ana Benítez" },
    { id: "u11", espacioId: "esp3", numero: "B-01", piso: -2, metros: 8, propietario: "Roberto Díaz", residente: "Roberto Díaz" },
    { id: "u12", espacioId: "esp3", numero: "B-02", piso: -2, metros: 8, propietario: "Ana Benítez", residente: "Ana Benítez" },
  ]);

  const calcCoef = (metros: number, espacioId: string) => {
    const esp = espacios.find(e => e.id === espacioId);
    if (!esp || esp.metrosTotales === 0) return "0.00";
    return ((metros / esp.metrosTotales) * 100).toFixed(2);
  };

  const handleAddUnidad = (espacioId: string) => {
    if (!nuevaUnidad.numero || nuevaUnidad.metros <= 0) return;
    setUnidadesLocal([...unidadesLocal, { id: `u${Date.now()}`, espacioId, ...nuevaUnidad }]);
    setEspacios(espacios.map(e => e.id === espacioId ? { ...e, unidadesCreadas: e.unidadesCreadas + 1, metrosUsados: e.metrosUsados + nuevaUnidad.metros } : e));
    setNuevaUnidad({ numero: "", piso: 0, metros: 0, propietario: "", residente: "" });
    setShowAddUnidad(null);
  };

  const handleAddEspacio = () => {
    if (!nuevoEspacio.nombre || nuevoEspacio.metrosTotales <= 0) return;
    setEspacios([...espacios, { id: `esp${Date.now()}`, ...nuevoEspacio, unidadesCreadas: 0, metrosUsados: 0 }]);
    setNuevoEspacio({ nombre: "", tipo: "departamento", metrosTotales: 0 });
    setShowAddEspacio(false);
  };

  return (
    <div className="space-y-6" data-testid="edificio-view">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Edificio</p>
        <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Torre Ñandutí</h1>
        <p className="text-[13px] text-ink-500">Configuración general del edificio y espacios</p>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-elev-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-bold text-ink-900">Información general</h3>
          <span className="pill bg-blue-50 text-blue-700 border border-blue-200">Editable</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { l: "Nombre", d: "Torre Ñandutí" },
            { l: "Dirección", d: "Av. España 1245, Villa Morra" },
            { l: "Ciudad", d: "Asunción" },
            { l: "RUC", d: "80012345-6" },
            { l: "Pisos", d: "16", n: true },
            { l: "Año construcción", d: "2022", n: true },
          ].map((f) => (
            <div key={f.l}>
              <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">{f.l}</label>
              <input type={f.n ? "number" : "text"} defaultValue={f.d} className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
            </div>
          ))}
        </div>
        <button className="mt-4 px-4 py-2.5 bg-grad-brand text-white text-[13.5px] font-semibold rounded-xl hover:shadow-brand transition-all">
          Guardar cambios
        </button>
      </div>

      <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-elev-1">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h3 className="text-[14px] font-bold text-ink-900">Espacios y metros útiles</h3>
            <p className="text-[12px] text-ink-500 mt-1">Coeficiente = m² unidad / m² totales del espacio</p>
          </div>
          <button
            onClick={() => setShowAddEspacio(true)}
            data-testid="add-espacio-btn"
            className="px-4 py-2.5 bg-grad-brand text-white text-[13.5px] font-semibold rounded-xl hover:shadow-brand transition-all"
          >
            + Agregar espacio
          </button>
        </div>

        {showAddEspacio && (
          <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl anim-fade-up">
            <p className="text-[12.5px] font-bold text-blue-900 mb-3">Nuevo espacio</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">Nombre</label>
                <input type="text" placeholder="Ej: Locales comerciales" value={nuevoEspacio.nombre} onChange={e => setNuevoEspacio({...nuevoEspacio, nombre: e.target.value})} className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none bg-white" />
              </div>
              <div>
                <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">Tipo</label>
                <select value={nuevoEspacio.tipo} onChange={e => setNuevoEspacio({...nuevoEspacio, tipo: e.target.value as any})} className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
                  <option value="departamento">Departamento</option>
                  <option value="estacionamiento">Estacionamiento</option>
                  <option value="bodega">Bodega</option>
                  <option value="comercial">Comercial</option>
                </select>
              </div>
              <div>
                <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">Metros útiles totales (m²)</label>
                <input type="number" value={nuevoEspacio.metrosTotales || ""} onChange={e => setNuevoEspacio({...nuevoEspacio, metrosTotales: Number(e.target.value)})} className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleAddEspacio} data-testid="save-espacio-btn" className="px-4 py-2 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">Crear</button>
              <button onClick={() => setShowAddEspacio(false)} className="px-4 py-2 border border-ink-200 text-[13px] font-medium rounded-xl hover:bg-white bg-white/60">Cancelar</button>
            </div>
          </div>
        )}

        <div className="space-y-5">
          {espacios.map(espacio => {
            const unis = unidadesLocal.filter(u => u.espacioId === espacio.id);
            const pct = espacio.metrosTotales > 0 ? (espacio.metrosUsados / espacio.metrosTotales * 100) : 0;
            const barColor = pct > 90 ? "bg-rose-500" : pct > 70 ? "bg-amber-500" : "bg-emerald-500";
            return (
              <div key={espacio.id} className="border border-ink-200 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 bg-ink-50/70 flex items-center justify-between border-b border-ink-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tipoAccent[espacio.tipo]} flex items-center justify-center text-xl shadow-elev-1`}>
                      {tipoIcon[espacio.tipo]}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-ink-900">{espacio.nombre}</h4>
                      <p className="text-[11.5px] text-ink-500">{espacio.unidadesCreadas} unidades · {espacio.tipo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-bold text-ink-900">{espacio.metrosTotales} m² <span className="text-[11px] text-ink-500 font-medium">totales</span></p>
                    <p className="text-[11.5px] text-ink-500">{espacio.metrosUsados} m² usados · {pct.toFixed(0)}%</p>
                  </div>
                </div>
                <div className="px-5 py-3 bg-white border-b border-ink-100">
                  <div className="w-full h-2 bg-ink-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                  </div>
                </div>
                {unis.length > 0 && (
                  <table className="w-full">
                    <thead className="bg-ink-50 border-b border-ink-200">
                      <tr>
                        {["Unidad", "Piso", "m²", "Coeficiente", "Propietario", "Residente"].map((h, i) => (
                          <th key={h} className={`text-${i === 2 || i === 3 ? "right" : "left"} px-4 py-2.5 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {unis.map(u => (
                        <tr key={u.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                          <td className="px-4 py-2.5 text-[13px] font-semibold text-ink-900">{u.numero}</td>
                          <td className="px-4 py-2.5 text-[13px] text-ink-500">{u.piso}</td>
                          <td className="px-4 py-2.5 text-[13px] text-right text-ink-700">{u.metros}</td>
                          <td className="px-4 py-2.5 text-[13px] text-right font-bold text-blue-600 font-mono">{calcCoef(u.metros, espacio.id)}%</td>
                          <td className="px-4 py-2.5 text-[13px] text-ink-700">{u.propietario}</td>
                          <td className="px-4 py-2.5 text-[13px] text-ink-700">{u.residente}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {showAddUnidad === espacio.id ? (
                  <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border-t border-emerald-200 anim-fade-up">
                    <h5 className="text-[13px] font-bold text-emerald-900 mb-3">Nueva unidad en {espacio.nombre}</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { l: "Número", type: "text", ph: "8A", key: "numero" },
                        { l: "Piso", type: "number", key: "piso" },
                        { l: "Metros (m²)", type: "number", ph: "85", key: "metros" },
                        { l: "Propietario", type: "text", key: "propietario" },
                        { l: "Residente", type: "text", key: "residente" },
                      ].map((f) => (
                        <div key={f.key}>
                          <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">{f.l}</label>
                          <input
                            type={f.type}
                            placeholder={f.ph}
                            value={(nuevaUnidad as any)[f.key] || ""}
                            onChange={e => setNuevaUnidad({...nuevaUnidad, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value})}
                            className="w-full mt-1.5 px-3 py-2 border border-ink-200 rounded-lg text-[13px] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none bg-white"
                          />
                        </div>
                      ))}
                    </div>
                    {nuevaUnidad.metros > 0 && (
                      <div className="mt-3 p-3 rounded-xl bg-white border border-blue-200 anim-fade-in">
                        <p className="text-[13px] text-blue-900">
                          Coeficiente estimado: <strong className="font-mono text-blue-700">{calcCoef(nuevaUnidad.metros, espacio.id)}%</strong>
                          <span className="text-[11px] text-blue-600 ml-2">({nuevaUnidad.metros} m² / {espacio.metrosTotales} m² totales)</span>
                        </p>
                      </div>
                    )}
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleAddUnidad(espacio.id)} data-testid={`save-unidad-${espacio.id}`} className="px-4 py-2 bg-emerald-600 text-white text-[13px] font-semibold rounded-xl hover:bg-emerald-700 transition-colors">Crear unidad</button>
                      <button onClick={() => setShowAddUnidad(null)} className="px-4 py-2 border border-ink-200 text-[13px] font-medium rounded-xl hover:bg-white bg-white/60">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="px-5 py-3 border-t border-ink-100 bg-white">
                    <button
                      onClick={() => setShowAddUnidad(espacio.id)}
                      data-testid={`add-unidad-${espacio.id}`}
                      className="text-[13px] text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      + Agregar unidad
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 p-5">
        <h4 className="text-[13.5px] font-bold text-blue-900 mb-1">💡 Cálculo automático de coeficientes</h4>
        <p className="text-[12.5px] text-blue-800 leading-relaxed">
          Coeficiente = m² de la unidad / m² totales del tipo de espacio. Ejemplo: depto de 85m² / 1200m² totales = <strong className="font-mono">7.08%</strong>. Este porcentaje determina cuánto paga cada unidad del gasto común.
        </p>
      </div>
    </div>
  );
}

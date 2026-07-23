"use client";

import { useState } from "react";
import { formatGuaranies } from "@/data/mock-data";

interface Espacio {
  id: string;
  nombre: string;
  tipo: "departamento" | "estacionamiento" | "bodega" | "comercial";
  metrosTotales: number;
  unidadesCreadas: number;
  metrosUsados: number;
}

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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Torre Ñandutí</h2>
        <p className="text-sm text-gray-500">Configuración general del edificio y espacios</p>
      </div>

      {/* Info general */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Información general</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="text-xs text-gray-500">Nombre</label><input type="text" defaultValue="Torre Ñandutí" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
          <div><label className="text-xs text-gray-500">Dirección</label><input type="text" defaultValue="Av. España 1245, Villa Morra" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
          <div><label className="text-xs text-gray-500">Ciudad</label><input type="text" defaultValue="Asunción" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
          <div><label className="text-xs text-gray-500">RUC</label><input type="text" defaultValue="80012345-6" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
          <div><label className="text-xs text-gray-500">Pisos</label><input type="number" defaultValue="16" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
          <div><label className="text-xs text-gray-500">Año construcción</label><input type="number" defaultValue="2022" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Guardar</button>
      </div>

      {/* Espacios */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Espacios y metros útiles</h3>
            <p className="text-xs text-gray-500 mt-1">El coeficiente se calcula: m² unidad / m² totales del espacio</p>
          </div>
          <button onClick={() => setShowAddEspacio(true)} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">+ Agregar espacio</button>
        </div>

        {showAddEspacio && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div><label className="text-xs text-gray-500">Nombre</label><input type="text" placeholder="Ej: Locales comerciales" value={nuevoEspacio.nombre} onChange={e => setNuevoEspacio({...nuevoEspacio, nombre: e.target.value})} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              <div><label className="text-xs text-gray-500">Tipo</label><select value={nuevoEspacio.tipo} onChange={e => setNuevoEspacio({...nuevoEspacio, tipo: e.target.value as any})} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"><option value="departamento">Departamento</option><option value="estacionamiento">Estacionamiento</option><option value="bodega">Bodega</option><option value="comercial">Comercial</option></select></div>
              <div><label className="text-xs text-gray-500">Metros útiles totales (m²)</label><input type="number" value={nuevoEspacio.metrosTotales || ""} onChange={e => setNuevoEspacio({...nuevoEspacio, metrosTotales: Number(e.target.value)})} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={handleAddEspacio} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Crear</button>
              <button onClick={() => setShowAddEspacio(false)} className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">Cancelar</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {espacios.map(espacio => {
            const unis = unidadesLocal.filter(u => u.espacioId === espacio.id);
            const pct = espacio.metrosTotales > 0 ? (espacio.metrosUsados / espacio.metrosTotales * 100) : 0;
            return (
              <div key={espacio.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{espacio.tipo === "departamento" ? "🏢" : espacio.tipo === "estacionamiento" ? "🚗" : espacio.tipo === "bodega" ? "📦" : "🏪"}</span>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{espacio.nombre}</h4>
                      <p className="text-xs text-gray-500">{espacio.unidadesCreadas} unidades</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{espacio.metrosTotales} m² totales</p>
                    <p className="text-xs text-gray-500">{espacio.metrosUsados} m² usados ({pct.toFixed(0)}%)</p>
                  </div>
                </div>
                <div className="px-5 py-2 bg-white border-b border-gray-100">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pct > 90 ? "bg-red-500" : pct > 70 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                  </div>
                </div>
                {unis.length > 0 && (
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Unidad</th>
                        <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Piso</th>
                        <th className="text-right px-4 py-2 text-xs font-medium text-gray-500">m²</th>
                        <th className="text-right px-4 py-2 text-xs font-medium text-gray-500">Coeficiente</th>
                        <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Propietario</th>
                        <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Residente</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unis.map(u => (
                        <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm font-medium text-gray-900">{u.numero}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{u.piso}</td>
                          <td className="px-4 py-2 text-sm text-right text-gray-700">{u.metros}</td>
                          <td className="px-4 py-2 text-sm text-right font-medium text-blue-600">{calcCoef(u.metros, espacio.id)}%</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{u.propietario}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{u.residente}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {showAddUnidad === espacio.id ? (
                  <div className="p-4 bg-green-50 border-t border-green-200">
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Nueva unidad en {espacio.nombre}</h5>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div><label className="text-xs text-gray-500">Número</label><input type="text" placeholder="8A" value={nuevaUnidad.numero} onChange={e => setNuevaUnidad({...nuevaUnidad, numero: e.target.value})} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                      <div><label className="text-xs text-gray-500">Piso</label><input type="number" value={nuevaUnidad.piso || ""} onChange={e => setNuevaUnidad({...nuevaUnidad, piso: Number(e.target.value)})} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                      <div><label className="text-xs text-gray-500">Metros (m²)</label><input type="number" placeholder="85" value={nuevaUnidad.metros || ""} onChange={e => setNuevaUnidad({...nuevaUnidad, metros: Number(e.target.value)})} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                      <div><label className="text-xs text-gray-500">Propietario</label><input type="text" value={nuevaUnidad.propietario} onChange={e => setNuevaUnidad({...nuevaUnidad, propietario: e.target.value})} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                      <div><label className="text-xs text-gray-500">Residente</label><input type="text" value={nuevaUnidad.residente} onChange={e => setNuevaUnidad({...nuevaUnidad, residente: e.target.value})} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
                    </div>
                    {nuevaUnidad.metros > 0 && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">Coeficiente: <strong>{calcCoef(nuevaUnidad.metros, espacio.id)}%</strong> <span className="text-xs text-blue-600 ml-2">({nuevaUnidad.metros} m² / {espacio.metrosTotales} m² totales)</span></p>
                      </div>
                    )}
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => handleAddUnidad(espacio.id)} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">Crear unidad</button>
                      <button onClick={() => setShowAddUnidad(null)} className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div className="px-5 py-3 border-t border-gray-100">
                    <button onClick={() => setShowAddUnidad(espacio.id)} className="text-sm text-blue-600 hover:underline font-medium">+ Agregar unidad</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-1">Cálculo automático de coeficientes</h4>
        <p className="text-xs text-blue-700">Coeficiente = m² de la unidad / m² totales del tipo de espacio. Ejemplo: depto de 85m² / 1200m² totales = 7.08%. Este porcentaje determina cuánto paga cada unidad del gasto común.</p>
      </div>
    </div>
  );
}

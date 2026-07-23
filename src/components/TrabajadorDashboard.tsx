"use client";

import { useState } from "react";
import { User, trabajadores, turnos, liquidacionesSueldo, contratos, formatGuaranies, getTurnoColor, getTurnoTipoColor } from "@/data/mock-data";
import { HamburgerMenu } from "./HamburgerMenu";

type TrabajadorTab = "inicio" | "turnos" | "liquidaciones" | "contrato" | "solicitudes";

interface Props {
  user: User;
  onLogout: () => void;
}

export function TrabajadorDashboard({ user, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<TrabajadorTab>("inicio");

  const misDatos = trabajadores[0]; // Miguel Paredes
  const misTurnos = turnos.filter(t => t.trabajadorId === "t1");
  const misLiquidaciones = liquidacionesSueldo.filter(l => l.trabajadorId === "t1");
  const miContrato = contratos.find(c => c.trabajadorId === "t1")!;

  const menuItems = [
    { id: "inicio", label: "Mi Perfil", icon: "👤" },
    { id: "turnos", label: "Mis Turnos", icon: "📅" },
    { id: "liquidaciones", label: "Liquidaciones", icon: "💵" },
    { id: "contrato", label: "Mi Contrato", icon: "📋" },
    { id: "solicitudes", label: "Solicitudes", icon: "✉️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HamburgerMenu
        items={menuItems}
        activeItem={activeTab}
        onSelect={(id) => setActiveTab(id as TrabajadorTab)}
        title="ComuniPy"
        subtitle="Torre Ñandutí — Personal"
        userName={user.nombre}
        userRole="Trabajador — Conserje"
        onLogout={onLogout}
      />

      {/* Content */}
      <main className="pt-20 px-4 pb-6 max-w-4xl mx-auto">

        {activeTab === "inicio" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Mi Perfil</h2>
            
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-700 text-xl font-bold">MP</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{misDatos.nombre}</h3>
                  <p className="text-sm text-amber-600">{misDatos.cargo}</p>
                  <p className="text-xs text-gray-500">Torre Ñandutí — Desde {misDatos.fechaIngreso}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div><span className="text-xs text-gray-500">Cédula:</span><p className="text-sm text-gray-900">{misDatos.cedula}</p></div>
                  <div><span className="text-xs text-gray-500">Teléfono:</span><p className="text-sm text-gray-900">{misDatos.telefono}</p></div>
                  <div><span className="text-xs text-gray-500">Email:</span><p className="text-sm text-gray-900">{misDatos.email}</p></div>
                </div>
                <div className="space-y-2">
                  <div><span className="text-xs text-gray-500">Horario:</span><p className="text-sm text-gray-900">{misDatos.horario}</p></div>
                  <div><span className="text-xs text-gray-500">Tipo contrato:</span><p className="text-sm text-gray-900 capitalize">{misDatos.tipoContrato.replace("_", " ")}</p></div>
                  <div><span className="text-xs text-gray-500">IPS:</span><p className="text-sm text-green-600 font-medium">Activo ✓</p></div>
                </div>
              </div>
            </div>

            {/* Resumen rápido */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500">Próximo turno</p>
                <p className="text-sm font-medium text-gray-900">20/07/2026 — 06:00</p>
                <p className="text-xs text-gray-400">Regular</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500">Vacaciones disponibles</p>
                <p className="text-lg font-bold text-blue-600">7 días</p>
                <p className="text-xs text-gray-400">de 12 totales</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500">Liquidación pendiente</p>
                <p className="text-sm font-bold text-green-600">{formatGuaranies(2802800)}</p>
                <p className="text-xs text-gray-400">Julio 2026</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="text-sm font-medium text-amber-800 mb-2">📋 Recordatorios</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Renovación examen médico IPS: vence 15/09/2026</li>
                <li>• Entrega de uniforme nuevo programada para 01/08/2026</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "turnos" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Mis Turnos — Julio 2026</h2>
              <div className="flex gap-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Cumplidos: {misTurnos.filter(t => t.estado === "cumplido").length}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Programados: {misTurnos.filter(t => t.estado === "programado").length}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Horario</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Horas</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {misTurnos.map(turno => {
                    const hInicio = parseInt(turno.horaInicio.split(":")[0]);
                    const hFin = parseInt(turno.horaFin.split(":")[0]);
                    const horas = hFin - hInicio;
                    return (
                      <tr key={turno.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{turno.fecha}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{turno.horaInicio} — {turno.horaFin}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{horas}h</td>
                        <td className={`px-4 py-3 text-sm capitalize ${getTurnoTipoColor(turno.tipo)}`}>{turno.tipo}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTurnoColor(turno.estado)}`}>
                            {turno.estado.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">{turno.notas || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Resumen del mes:</strong> {misTurnos.filter(t => t.estado === "cumplido").length} turnos cumplidos | 
                {misTurnos.filter(t => t.tipo === "extra").length} hora(s) extra registradas | 
                0 ausencias
              </p>
            </div>
          </div>
        )}

        {activeTab === "liquidaciones" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Liquidaciones de Sueldo</h2>

            {/* Liquidación actual detallada */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">Julio 2026 (pendiente de pago)</h3>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">PENDIENTE</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Salario base</span><span className="text-gray-900">{formatGuaranies(2800000)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Horas extra (12h × ₲23,333)</span><span className="text-green-600">+{formatGuaranies(280000)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Bonificaciones</span><span className="text-gray-900">{formatGuaranies(0)}</span></div>
                <div className="flex justify-between border-t border-gray-200 pt-2"><span className="text-gray-600 font-medium">Total haberes</span><span className="text-gray-900 font-medium">{formatGuaranies(3080000)}</span></div>
                <div className="flex justify-between text-red-600"><span>Descuento IPS (9%)</span><span>-{formatGuaranies(277200)}</span></div>
                <div className="flex justify-between text-red-600"><span>Otros descuentos</span><span>-{formatGuaranies(0)}</span></div>
                <div className="flex justify-between border-t border-gray-300 pt-2 text-lg font-bold"><span>NETO A PAGAR</span><span className="text-green-700">{formatGuaranies(2802800)}</span></div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">📄 Descargar PDF</button>
              </div>
            </div>

            {/* Historial */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Historial de liquidaciones</h3>
              </div>
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Período</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Salario base</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Hrs. extra</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Descuentos</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">Neto</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {misLiquidaciones.map(liq => (
                    <tr key={liq.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{liq.periodo}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700">{formatGuaranies(liq.salarioBase)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700">{formatGuaranies(liq.montoHorasExtra)}</td>
                      <td className="px-4 py-3 text-sm text-right text-red-600">-{formatGuaranies(liq.descuentoIps + liq.otrosDescuentos)}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">{formatGuaranies(liq.netoAPagar)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${liq.estado === "pagado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {liq.estado.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs text-blue-600 hover:underline">📄 PDF</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "contrato" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Mi Contrato</h2>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-900">{miContrato.tipoContrato}</h3>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">VIGENTE</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-gray-500">Cargo</span>
                    <p className="text-gray-900 font-medium">{miContrato.cargo}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Fecha de inicio</span>
                    <p className="text-gray-900">{miContrato.fechaInicio}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Fecha de término</span>
                    <p className="text-gray-900">{miContrato.fechaFin || "Indefinido"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Salario base mensual</span>
                    <p className="text-gray-900 font-bold">{formatGuaranies(miContrato.salarioBase)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-gray-500">Jornada laboral</span>
                    <p className="text-gray-900">{miContrato.jornadaSemanal}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Días de descanso</span>
                    <p className="text-gray-900">{miContrato.diasDescanso}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Vacaciones anuales</span>
                    <p className="text-gray-900">{miContrato.vacacionesDias} días ({miContrato.vacacionesDias - miContrato.vacacionesUsadas} disponibles)</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Aguinaldo proporcional</span>
                    <p className="text-gray-900">{formatGuaranies(miContrato.aguinaldoProporcional)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cláusulas */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Cláusulas especiales</h3>
              <ul className="space-y-2">
                {miContrato.clausulasEspeciales.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-gray-400 mt-0.5">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Beneficios */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Beneficios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-green-700"><span>✓</span> Seguro IPS (salud + jubilación)</div>
                <div className="flex items-center gap-2 text-green-700"><span>✓</span> Aguinaldo (13° salario)</div>
                <div className="flex items-center gap-2 text-green-700"><span>✓</span> Vacaciones remuneradas (12 días/año)</div>
                <div className="flex items-center gap-2 text-green-700"><span>✓</span> Uniforme proporcionado</div>
                <div className="flex items-center gap-2 text-green-700"><span>✓</span> Bonificación por antigüedad (desde 2° año)</div>
                <div className="flex items-center gap-2 text-gray-400"><span>○</span> Vale de almuerzo (no aplica)</div>
              </div>
            </div>

            <button className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
              📄 Descargar contrato completo (PDF)
            </button>
          </div>
        )}

        {activeTab === "solicitudes" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Mis Solicitudes</h2>
              <button className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700">+ Nueva solicitud</button>
            </div>

            {/* Solicitudes existentes */}
            <div className="space-y-3">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">Solicitud de vacaciones</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">APROBADA</span>
                    </div>
                    <p className="text-sm text-gray-600">5 días: 01/08/2026 al 05/08/2026</p>
                    <p className="text-xs text-gray-400 mt-1">Enviada: 10/07/2026 | Aprobada: 12/07/2026</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">Solicitud de cambio de turno</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">PENDIENTE</span>
                    </div>
                    <p className="text-sm text-gray-600">Cambiar turno del 28/07 con Juan R. Bogado (guardia nocturno)</p>
                    <p className="text-xs text-gray-400 mt-1">Enviada: 18/07/2026</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900">Certificado laboral</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">COMPLETADA</span>
                    </div>
                    <p className="text-sm text-gray-600">Certificado para trámite bancario personal</p>
                    <p className="text-xs text-gray-400 mt-1">Enviada: 01/06/2026 | Entregada: 03/06/2026</p>
                  </div>
                  <button className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">📄 Descargar</button>
                </div>
              </div>
            </div>

            {/* Formulario nueva solicitud */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Enviar nueva solicitud</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500">Tipo de solicitud</label>
                  <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Vacaciones</option>
                    <option>Permiso (con goce)</option>
                    <option>Permiso (sin goce)</option>
                    <option>Cambio de turno</option>
                    <option>Certificado laboral</option>
                    <option>Adelanto de sueldo</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Fecha inicio</label>
                    <input type="date" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Fecha fin</label>
                    <input type="date" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Motivo / Detalle</label>
                  <textarea rows={3} placeholder="Describa el motivo de su solicitud..." className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"></textarea>
                </div>
                <button className="px-4 py-2 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700">Enviar solicitud</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

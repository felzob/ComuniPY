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

  const misDatos = trabajadores[0];
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
    <div className="min-h-screen bg-ink-50/50" data-testid="trabajador-dashboard">
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

      <main className="pt-24 px-4 pb-10 max-w-5xl mx-auto anim-fade-up">
        {activeTab === "inicio" && (
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">Personal</p>
              <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Mi perfil</h1>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 shadow-elev-1">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-100/40 blur-3xl" />
              <div className="relative flex items-center gap-4 mb-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-brand">
                  MP
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink-900">{misDatos.nombre}</h3>
                  <p className="text-sm font-semibold text-amber-700">{misDatos.cargo}</p>
                  <p className="text-[11.5px] text-ink-500 mt-0.5">Torre Ñandutí · desde {misDatos.fechaIngreso}</p>
                </div>
              </div>
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  { l: "Cédula", v: misDatos.cedula },
                  { l: "Horario", v: misDatos.horario },
                  { l: "Teléfono", v: misDatos.telefono },
                  { l: "Tipo contrato", v: misDatos.tipoContrato.replace("_", " "), cap: true },
                  { l: "Email", v: misDatos.email },
                  { l: "IPS", v: "Activo ✓", tone: "text-emerald-600 font-semibold" },
                ].map((f) => (
                  <div key={f.l}>
                    <p className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">{f.l}</p>
                    <p className={`text-[13px] mt-0.5 ${f.cap ? "capitalize " : ""}${f.tone || "text-ink-900"}`}>{f.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen rápido */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { l: "Próximo turno", v: "20/07 · 06:00", d: "Regular", icon: "📅", accent: "border-blue-100 bg-blue-50/50" },
                { l: "Vacaciones disponibles", v: "7 días", d: "de 12 totales", icon: "🏖️", accent: "border-cyan-100 bg-cyan-50/50", tone: "text-cyan-700" },
                { l: "Liquidación pendiente", v: formatGuaranies(2802800), d: "Julio 2026", icon: "💵", accent: "border-emerald-100 bg-emerald-50/50", tone: "text-emerald-700" },
              ].map((k) => (
                <div key={k.l} className={`rounded-2xl border ${k.accent} p-5`}>
                  <div className="flex items-start justify-between">
                    <p className="text-[11px] uppercase tracking-widest font-semibold text-ink-500">{k.l}</p>
                    <span className="text-lg">{k.icon}</span>
                  </div>
                  <p className={`text-xl font-extrabold mt-2 ${k.tone || "text-ink-900"}`}>{k.v}</p>
                  <p className="text-[11.5px] text-ink-500 mt-1">{k.d}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
              <p className="text-[13px] font-bold text-amber-900 mb-2">📋 Recordatorios</p>
              <ul className="text-[12.5px] text-amber-800 space-y-1">
                <li>• Renovación examen médico IPS: vence 15/09/2026</li>
                <li>• Entrega de uniforme nuevo programada para 01/08/2026</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "turnos" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">Turnos</p>
                <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Mis turnos · Julio 2026</h1>
              </div>
              <div className="flex gap-2">
                <span className="pill bg-emerald-50 text-emerald-700 border border-emerald-200">Cumplidos: {misTurnos.filter(t => t.estado === "cumplido").length}</span>
                <span className="pill bg-blue-50 text-blue-700 border border-blue-200">Programados: {misTurnos.filter(t => t.estado === "programado").length}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white overflow-hidden shadow-elev-1">
              <table className="w-full">
                <thead className="bg-ink-50 border-b border-ink-200">
                  <tr>
                    {["Fecha", "Horario", "Horas", "Tipo", "Estado", "Notas"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {misTurnos.map(turno => {
                    const hInicio = parseInt(turno.horaInicio.split(":")[0]);
                    const hFin = parseInt(turno.horaFin.split(":")[0]);
                    const horas = hFin - hInicio;
                    return (
                      <tr key={turno.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60 transition-colors">
                        <td className="px-4 py-3 text-[13px] font-semibold text-ink-900">{turno.fecha}</td>
                        <td className="px-4 py-3 text-[13px] text-ink-700 font-mono">{turno.horaInicio} — {turno.horaFin}</td>
                        <td className="px-4 py-3 text-[13px] text-ink-500">{horas}h</td>
                        <td className={`px-4 py-3 text-[13px] capitalize font-medium ${getTurnoTipoColor(turno.tipo)}`}>{turno.tipo}</td>
                        <td className="px-4 py-3">
                          <span className={`pill ${getTurnoColor(turno.estado)}`}>{turno.estado.toUpperCase()}</span>
                        </td>
                        <td className="px-4 py-3 text-[11.5px] text-ink-500">{turno.notas || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4">
              <p className="text-[13px] text-blue-900">
                <strong>Resumen del mes:</strong> {misTurnos.filter(t => t.estado === "cumplido").length} turnos cumplidos · {misTurnos.filter(t => t.tipo === "extra").length} hora(s) extra registradas · 0 ausencias
              </p>
            </div>
          </div>
        )}

        {activeTab === "liquidaciones" && (
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">Liquidaciones</p>
              <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Liquidaciones de sueldo</h1>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-elev-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-semibold text-ink-500">Julio 2026</p>
                  <h3 className="text-[15px] font-bold text-ink-900">Detalle actual</h3>
                </div>
                <span className="pill bg-amber-50 text-amber-700 border border-amber-200">PENDIENTE</span>
              </div>
              <div className="space-y-2 text-[13.5px]">
                <div className="flex justify-between py-1"><span className="text-ink-600">Salario base</span><span className="text-ink-900 font-medium">{formatGuaranies(2800000)}</span></div>
                <div className="flex justify-between py-1"><span className="text-ink-600">Horas extra (12h × ₲23,333)</span><span className="text-emerald-600 font-medium">+{formatGuaranies(280000)}</span></div>
                <div className="flex justify-between py-1"><span className="text-ink-600">Bonificaciones</span><span className="text-ink-500">{formatGuaranies(0)}</span></div>
                <div className="flex justify-between py-2 border-t border-ink-200 mt-1"><span className="text-ink-700 font-semibold">Total haberes</span><span className="text-ink-900 font-semibold">{formatGuaranies(3080000)}</span></div>
                <div className="flex justify-between py-1 text-rose-600"><span>Descuento IPS (9%)</span><span>-{formatGuaranies(277200)}</span></div>
                <div className="flex justify-between py-1 text-ink-500"><span>Otros descuentos</span><span>-{formatGuaranies(0)}</span></div>
                <div className="flex justify-between pt-3 mt-1 border-t-2 border-ink-900">
                  <span className="text-[13px] font-bold text-ink-900">NETO A PAGAR</span>
                  <span className="text-xl font-extrabold text-emerald-700">{formatGuaranies(2802800)}</span>
                </div>
              </div>
              <button className="mt-4 inline-flex items-center gap-2 text-[12.5px] px-3.5 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 font-medium transition-colors">
                📄 Descargar PDF
              </button>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white overflow-hidden shadow-elev-1">
              <div className="px-5 py-3 bg-ink-50 border-b border-ink-200">
                <h3 className="text-[13.5px] font-bold text-ink-900">Historial de liquidaciones</h3>
              </div>
              <table className="w-full">
                <thead className="border-b border-ink-200">
                  <tr>
                    {["Período", "Salario base", "Hrs. extra", "Descuentos", "Neto", "Estado", ""].map((h, i) => (
                      <th key={i} className={`text-${i === 0 || i === 5 || i === 6 ? "left" : "right"} px-4 py-3 text-[10.5px] font-bold text-ink-500 uppercase tracking-wider`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {misLiquidaciones.map(liq => (
                    <tr key={liq.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/60">
                      <td className="px-4 py-3 text-[13px] font-semibold text-ink-900">{liq.periodo}</td>
                      <td className="px-4 py-3 text-[13px] text-right text-ink-700">{formatGuaranies(liq.salarioBase)}</td>
                      <td className="px-4 py-3 text-[13px] text-right text-ink-700">{formatGuaranies(liq.montoHorasExtra)}</td>
                      <td className="px-4 py-3 text-[13px] text-right text-rose-600">-{formatGuaranies(liq.descuentoIps + liq.otrosDescuentos)}</td>
                      <td className="px-4 py-3 text-[13px] text-right font-bold text-ink-900">{formatGuaranies(liq.netoAPagar)}</td>
                      <td className="px-4 py-3">
                        <span className={`pill ${liq.estado === "pagado" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>{liq.estado.toUpperCase()}</span>
                      </td>
                      <td className="px-4 py-3"><button className="text-[12px] text-blue-600 hover:text-blue-800 font-medium">📄 PDF</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "contrato" && (
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">Contrato</p>
              <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Mi contrato</h1>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-elev-1">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-semibold text-ink-500">Tipo</p>
                  <h3 className="text-[15px] font-bold text-ink-900">{miContrato.tipoContrato}</h3>
                </div>
                <span className="pill bg-emerald-50 text-emerald-700 border border-emerald-200">VIGENTE</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-[13px]">
                {[
                  { l: "Cargo", v: miContrato.cargo },
                  { l: "Jornada laboral", v: miContrato.jornadaSemanal },
                  { l: "Fecha de inicio", v: miContrato.fechaInicio },
                  { l: "Días de descanso", v: miContrato.diasDescanso },
                  { l: "Fecha de término", v: miContrato.fechaFin || "Indefinido" },
                  { l: "Vacaciones anuales", v: `${miContrato.vacacionesDias} días (${miContrato.vacacionesDias - miContrato.vacacionesUsadas} disponibles)` },
                  { l: "Salario base mensual", v: formatGuaranies(miContrato.salarioBase), bold: true },
                  { l: "Aguinaldo proporcional", v: formatGuaranies(miContrato.aguinaldoProporcional) },
                ].map((f) => (
                  <div key={f.l}>
                    <p className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">{f.l}</p>
                    <p className={`mt-0.5 ${f.bold ? "text-[15px] font-bold text-ink-900" : "text-ink-800"}`}>{f.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-elev-1">
              <h3 className="text-[13.5px] font-bold text-ink-900 mb-3">Cláusulas especiales</h3>
              <ul className="space-y-2">
                {miContrato.clausulasEspeciales.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-ink-700">
                    <span className="text-blue-500 mt-0.5">▸</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-elev-1">
              <h3 className="text-[13.5px] font-bold text-ink-900 mb-3">Beneficios</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { c: true, l: "Seguro IPS (salud + jubilación)" },
                  { c: true, l: "Aguinaldo (13° salario)" },
                  { c: true, l: "Vacaciones remuneradas (12 días/año)" },
                  { c: true, l: "Uniforme proporcionado" },
                  { c: true, l: "Bonificación por antigüedad (desde 2° año)" },
                  { c: false, l: "Vale de almuerzo (no aplica)" },
                ].map((b, i) => (
                  <div key={i} className={`flex items-center gap-2 text-[13px] ${b.c ? "text-emerald-700" : "text-ink-400"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${b.c ? "bg-emerald-500" : "bg-ink-200"}`}>
                      {b.c ? "✓" : "—"}
                    </span>
                    {b.l}
                  </div>
                ))}
              </div>
            </div>

            <button className="inline-flex items-center gap-2 text-[13px] px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 font-semibold transition-colors">
              📄 Descargar contrato completo (PDF)
            </button>
          </div>
        )}

        {activeTab === "solicitudes" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-700">Solicitudes</p>
                <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Mis solicitudes</h1>
              </div>
              <button className="px-4 py-2.5 bg-gradient-to-br from-amber-500 to-orange-600 text-white text-[13px] font-semibold rounded-xl shadow-elev-1 hover:shadow-elev-2 transition-all">
                + Nueva solicitud
              </button>
            </div>

            <div className="space-y-3">
              {[
                { t: "Solicitud de vacaciones", d: "5 días: 01/08/2026 al 05/08/2026", meta: "Enviada: 10/07/2026 · Aprobada: 12/07/2026", s: "APROBADA", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { t: "Solicitud de cambio de turno", d: "Cambiar turno del 28/07 con Juan R. Bogado (guardia nocturno)", meta: "Enviada: 18/07/2026", s: "PENDIENTE", color: "bg-amber-50 text-amber-700 border-amber-200" },
                { t: "Certificado laboral", d: "Certificado para trámite bancario personal", meta: "Enviada: 01/06/2026 · Entregada: 03/06/2026", s: "COMPLETADA", color: "bg-emerald-50 text-emerald-700 border-emerald-200", download: true },
              ].map((sol, i) => (
                <div key={i} className="rounded-2xl border border-ink-200 bg-white p-4 hover:shadow-elev-2 transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-[13.5px] font-semibold text-ink-900">{sol.t}</h3>
                        <span className={`pill border ${sol.color}`}>{sol.s}</span>
                      </div>
                      <p className="text-[13px] text-ink-700">{sol.d}</p>
                      <p className="text-[11px] text-ink-400 mt-1 font-medium">{sol.meta}</p>
                    </div>
                    {sol.download && (
                      <button className="text-[11.5px] px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-semibold">📄 Descargar</button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-elev-1">
              <h3 className="text-[13.5px] font-bold text-ink-900 mb-4">Enviar nueva solicitud</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">Tipo de solicitud</label>
                  <select className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
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
                  {["Fecha inicio", "Fecha fin"].map((l) => (
                    <div key={l}>
                      <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">{l}</label>
                      <input type="date" className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-[10.5px] uppercase tracking-widest font-semibold text-ink-500">Motivo / Detalle</label>
                  <textarea rows={3} placeholder="Describa el motivo de su solicitud..." className="w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" />
                </div>
                <button className="px-4 py-2.5 bg-gradient-to-br from-amber-500 to-orange-600 text-white text-[13.5px] font-semibold rounded-xl hover:shadow-elev-2 transition-all">
                  Enviar solicitud
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { User, votaciones, formatGuaranies } from "@/data/mock-data";
import { reclamos } from "@/data/mock-data";
import { HamburgerMenu } from "./HamburgerMenu";

type ResidenteTab = "inicio" | "pagos" | "historial" | "reclamos" | "votaciones" | "documentos" | "perfil";

interface Props {
  user: User;
  onLogout: () => void;
}

export function ResidenteDashboard({ user, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<ResidenteTab>("inicio");
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [myVotes, setMyVotes] = useState<Record<string, string>>({});
  const [newReclamo, setNewReclamo] = useState({ categoria: "Mantención", titulo: "", descripcion: "" });
  const [misReclamos, setMisReclamos] = useState(reclamos.filter(r => r.unidadId === "un1"));
  const [showReclamoSuccess, setShowReclamoSuccess] = useState(false);

  const votacionesActivas = votaciones.filter(v => v.estado === "activa");

  const menuItems = [
    { id: "inicio", label: "Mi Comunidad", icon: "🏠" },
    { id: "pagos", label: "Pagar", icon: "💳" },
    { id: "historial", label: "Historial de Pagos", icon: "📋" },
    { id: "reclamos", label: "Reclamos", icon: "📢", badge: misReclamos.filter(r => r.estado !== "resuelto").length },
    { id: "votaciones", label: "Votaciones", icon: "🗳️", badge: votacionesActivas.filter(v => !myVotes[v.id]).length },
    { id: "documentos", label: "Documentos", icon: "📄" },
    { id: "perfil", label: "Mi Perfil", icon: "👤" },
  ];

  const handlePay = (_method: string) => {
    setShowPayModal(false);
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 4000);
  };

  const handleVote = (votingId: string, optionId: string) => {
    setMyVotes(prev => ({ ...prev, [votingId]: optionId }));
  };

  const handleNewReclamo = () => {
    if (!newReclamo.titulo || !newReclamo.descripcion) return;
    const nuevo = {
      id: `r-new-${Date.now()}`,
      edificioId: "e1",
      unidadId: "un1",
      residente: user.nombre,
      categoria: newReclamo.categoria,
      titulo: newReclamo.titulo,
      descripcion: newReclamo.descripcion,
      estado: "abierto" as const,
      fechaCreacion: new Date().toISOString().split("T")[0],
    };
    setMisReclamos(prev => [nuevo, ...prev]);
    setNewReclamo({ categoria: "Mantención", titulo: "", descripcion: "" });
    setShowReclamoSuccess(true);
    setTimeout(() => setShowReclamoSuccess(false), 3000);
  };

  const estadoBadge = (estado: string) => {
    if (estado === "resuelto") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (estado === "en_proceso") return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-rose-50 text-rose-700 border-rose-200";
  };

  return (
    <div className="min-h-screen bg-ink-50/50" data-testid="residente-dashboard">
      <HamburgerMenu
        items={menuItems}
        activeItem={activeTab}
        onSelect={(id) => setActiveTab(id as ResidenteTab)}
        title="ComuniPy"
        subtitle="Torre Ñandutí — Depto 4A"
        userName={user.nombre}
        userRole="Residente"
        onLogout={onLogout}
      />

      {paymentSuccess && (
        <div className="fixed top-20 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40 rounded-2xl bg-emerald-600 text-white p-4 shadow-elev-3 anim-fade-up" role="status" data-testid="success-toast">
          <p className="text-sm font-semibold">✓ Pago registrado exitosamente</p>
          <p className="text-xs opacity-90 mt-0.5">Comprobante enviado a tu email</p>
        </div>
      )}

      <main className="pt-24 px-4 pb-10 max-w-3xl mx-auto anim-fade-up">
        {/* INICIO */}
        {activeTab === "inicio" && (
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Mi Comunidad</p>
              <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Hola, {user.nombre.split(" ")[0]} 👋</h1>
              <p className="text-[13px] text-ink-500">Este es el resumen de tu unidad</p>
            </div>

            {/* Estado financiero */}
            <div className="relative overflow-hidden rounded-2xl bg-grad-brand text-white p-5 shadow-brand">
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-blue-100 font-semibold">Gasto común · Julio 2026</p>
                  <p className="text-3xl font-extrabold mt-1">₲ 812.000</p>
                </div>
                <span className="pill bg-emerald-400/20 text-emerald-100 border border-emerald-300/30">PAGADO ✓</span>
              </div>
              <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  { l: "Vencimiento", v: "10/07" },
                  { l: "Coeficiente", v: "2.8%" },
                  { l: "Canal", v: "SPI" },
                ].map((x) => (
                  <div key={x.l} className="rounded-xl bg-white/10 border border-white/15 backdrop-blur px-2 py-2">
                    <p className="text-[10.5px] text-blue-100 uppercase tracking-wider">{x.l}</p>
                    <p className="text-[13px] font-semibold mt-0.5">{x.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desglose */}
            <div className="rounded-2xl bg-white border border-ink-200 p-5 shadow-elev-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-ink-900">Desglose de tu gasto común</p>
                <span className="text-[10.5px] text-ink-500 uppercase tracking-wider font-semibold">Julio 2026</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { name: "Servicios contratados", amount: 238000, color: "bg-violet-500" },
                  { name: "Remuneraciones", amount: 225400, color: "bg-blue-500" },
                  { name: "Gastos básicos", amount: 134400, color: "bg-amber-500" },
                  { name: "Mantención", amount: 70000, color: "bg-orange-500" },
                  { name: "Administración", amount: 56000, color: "bg-slate-500" },
                  { name: "Fondo de reserva", amount: 46200, color: "bg-emerald-500" },
                  { name: "Seguros", amount: 42000, color: "bg-rose-500" },
                ].map(item => (
                  <div key={item.name} className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                    <span className="text-[13px] text-ink-700 flex-1">{item.name}</span>
                    <span className="text-[13px] font-semibold text-ink-900">{formatGuaranies(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Votaciones pendientes */}
            {votacionesActivas.filter(v => !myVotes[v.id]).length > 0 && (
              <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🗳️</span>
                  <p className="text-sm font-bold text-violet-900">Tienes votaciones pendientes</p>
                </div>
                {votacionesActivas.filter(v => !myVotes[v.id]).map(v => (
                  <button key={v.id} onClick={() => setActiveTab("votaciones")} className="w-full text-left flex items-center justify-between py-2 group">
                    <span className="text-[13px] text-violet-800">{v.titulo}</span>
                    <span className="text-[11px] px-2.5 py-1 bg-violet-600 text-white rounded-lg font-semibold group-hover:bg-violet-700">Votar →</span>
                  </button>
                ))}
              </div>
            )}

            {/* Noticias */}
            <div className="rounded-2xl bg-white border border-ink-200 p-5 shadow-elev-1">
              <p className="text-sm font-bold text-ink-900 mb-3">📢 Noticias de la comunidad</p>
              <div className="space-y-3">
                {[
                  { c: "border-blue-500", t: "Asamblea ordinaria programada", d: "25/07/2026 a las 19:00 en el SUM" },
                  { c: "border-amber-500", t: "Mantención ascensor 1", d: "15/07/2026 de 8:00 a 12:00 — usar ascensor 2" },
                  { c: "border-emerald-500", t: "Votación aprobada: horario piscina extendido", d: "6:00 a 22:00 desde verano 2026" },
                ].map((n, i) => (
                  <div key={i} className={`border-l-2 ${n.c} pl-3`}>
                    <p className="text-[13px] font-medium text-ink-900">{n.t}</p>
                    <p className="text-[11.5px] text-ink-500 mt-0.5">{n.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {misReclamos.filter(r => r.estado !== "resuelto").length > 0 && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
                <p className="text-[12px] font-bold text-amber-900 mb-2">🔧 Tus reclamos activos</p>
                {misReclamos.filter(r => r.estado !== "resuelto").map(r => (
                  <div key={r.id} className="flex items-center justify-between py-1.5">
                    <span className="text-[13px] text-amber-900">{r.titulo}</span>
                    <span className="pill bg-white text-amber-700 border border-amber-200">{r.estado.replace("_", " ")}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PAGAR */}
        {activeTab === "pagos" && (
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Pagar</p>
              <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Realizar pago</h1>
            </div>

            <div className="rounded-2xl bg-white border border-ink-200 p-6 text-center shadow-elev-1">
              <p className="text-[11px] uppercase tracking-widest text-ink-500 font-semibold">Gasto común · Julio 2026</p>
              <p className="text-4xl font-extrabold text-ink-900 mt-2">₲ 812.000</p>
              <span className="pill bg-emerald-50 text-emerald-700 border border-emerald-200 mt-3">YA PAGADO ✓</span>
            </div>

            <p className="text-[13px] font-semibold text-ink-700 mt-2">Selecciona método de pago</p>
            <div className="space-y-2.5">
              {[
                { id: "spi", icon: "🏦", name: "Transferencia SPI", desc: "Instantánea via QR", tag: "Recomendado", accent: "hover:border-blue-400 hover:bg-blue-50/60" },
                { id: "tigo", icon: "📱", name: "Tigo Money", desc: "Paga desde tu billetera Tigo", accent: "hover:border-blue-400 hover:bg-blue-50/60" },
                { id: "personal", icon: "📲", name: "Personal Pay", desc: "Paga desde tu billetera Personal", accent: "hover:border-blue-400 hover:bg-blue-50/60" },
                { id: "transfer", icon: "🏧", name: "Transferencia bancaria", desc: "Con código de referencia", accent: "hover:border-blue-400 hover:bg-blue-50/60" },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setShowPayModal(true)}
                  data-testid={`pay-method-${m.id}`}
                  className={`w-full group flex items-center gap-4 p-4 bg-white border border-ink-200 rounded-2xl transition-all text-left ${m.accent}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center text-xl">
                    {m.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-ink-900">{m.name}</p>
                    <p className="text-[12px] text-ink-500 mt-0.5">{m.desc}</p>
                  </div>
                  {m.tag && <span className="pill bg-emerald-50 text-emerald-700 border border-emerald-200">{m.tag}</span>}
                  <span className="text-ink-400 group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* HISTORIAL */}
        {activeTab === "historial" && (
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Historial</p>
              <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Historial de pagos</h1>
            </div>
            <div className="space-y-2">
              {[
                { periodo: "Julio 2026", monto: 812000, fecha: "08/07/2026", canal: "SPI", estado: "pagado" },
                { periodo: "Junio 2026", monto: 812000, fecha: "05/06/2026", canal: "Tigo Money", estado: "pagado" },
                { periodo: "Mayo 2026", monto: 798000, fecha: "09/05/2026", canal: "SPI", estado: "pagado" },
                { periodo: "Abril 2026", monto: 798000, fecha: "03/04/2026", canal: "Personal Pay", estado: "pagado" },
                { periodo: "Marzo 2026", monto: 798000, fecha: "10/03/2026", canal: "Transferencia", estado: "pagado" },
              ].map((p, i) => (
                <div key={i} className="rounded-2xl bg-white border border-ink-200 p-4 flex items-center justify-between hover:shadow-elev-2 transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-ink-900">{p.periodo}</p>
                      <p className="text-[11.5px] text-ink-500">{p.fecha} · {p.canal}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-bold text-ink-900">{formatGuaranies(p.monto)}</p>
                    <button className="text-[11.5px] text-blue-600 hover:text-blue-800 hover:underline mt-0.5 font-medium">📄 PDF</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECLAMOS */}
        {activeTab === "reclamos" && (
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Reclamos</p>
              <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Mis reclamos</h1>
            </div>

            {showReclamoSuccess && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-[13px] text-emerald-800 font-medium">
                ✓ Reclamo enviado correctamente. El administrador será notificado.
              </div>
            )}

            <div className="rounded-2xl bg-white border border-ink-200 p-5 shadow-elev-1">
              <p className="text-[13.5px] font-bold text-ink-900 mb-3">Nuevo reclamo</p>
              <div className="space-y-3">
                <select value={newReclamo.categoria} onChange={e => setNewReclamo(p => ({...p, categoria: e.target.value}))} className="w-full px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none">
                  <option>Mantención</option>
                  <option>Limpieza</option>
                  <option>Ruido</option>
                  <option>Seguridad</option>
                  <option>Otro</option>
                </select>
                <input type="text" value={newReclamo.titulo} onChange={e => setNewReclamo(p => ({...p, titulo: e.target.value}))} placeholder="Título del reclamo" data-testid="reclamo-titulo" className="w-full px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none" />
                <textarea value={newReclamo.descripcion} onChange={e => setNewReclamo(p => ({...p, descripcion: e.target.value}))} rows={3} placeholder="Describe el problema..." data-testid="reclamo-descripcion" className="w-full px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none" />
                <button
                  onClick={handleNewReclamo}
                  disabled={!newReclamo.titulo || !newReclamo.descripcion}
                  data-testid="reclamo-submit"
                  className="w-full px-4 py-2.5 bg-grad-brand text-white text-[13.5px] font-semibold rounded-xl hover:shadow-brand disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Enviar reclamo
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {misReclamos.map(r => (
                <div key={r.id} className="rounded-2xl bg-white border border-ink-200 p-4 hover:shadow-elev-2 transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[13.5px] font-semibold text-ink-900">{r.titulo}</p>
                      <p className="text-[12.5px] text-ink-600 mt-1">{r.descripcion}</p>
                      <p className="text-[11px] text-ink-400 mt-2 font-medium">{r.fechaCreacion} · {r.categoria}</p>
                    </div>
                    <span className={`pill border ${estadoBadge(r.estado)}`}>{r.estado.replace("_", " ")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VOTACIONES */}
        {activeTab === "votaciones" && (
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Votaciones</p>
              <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Votaciones activas</h1>
            </div>

            {votacionesActivas.map(v => (
              <div key={v.id} className="rounded-2xl bg-white border border-ink-200 p-5 shadow-elev-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="pill bg-emerald-50 text-emerald-700 border border-emerald-200">ACTIVA</span>
                  <span className="text-[11.5px] text-ink-400">Cierra: {v.fechaCierre}</span>
                </div>
                <h3 className="text-[15px] font-bold text-ink-900">{v.titulo}</h3>
                <p className="text-[12.5px] text-ink-600 mt-1 mb-4">{v.descripcion}</p>

                {myVotes[v.id] ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-center">
                    <p className="text-[13.5px] text-emerald-700 font-semibold">✓ Voto registrado</p>
                    <p className="text-[11.5px] text-emerald-600 mt-0.5">Gracias por participar</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {v.opciones.map(op => (
                      <button
                        key={op.id}
                        onClick={() => handleVote(v.id, op.id)}
                        data-testid={`vote-${v.id}-${op.id}`}
                        className="w-full text-left p-3.5 border border-ink-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/60 transition-colors"
                      >
                        <span className="text-[13.5px] text-ink-800 font-medium">{op.texto}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-ink-100">
                  <div className="w-full h-2 bg-ink-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all" style={{ width: `${(v.votosEmitidos / v.totalVotantes) * 100}%` }}></div>
                  </div>
                  <p className="text-[11.5px] text-ink-500 mt-2">
                    Participación: {v.votosEmitidos}/{v.totalVotantes} ({((v.votosEmitidos / v.totalVotantes) * 100).toFixed(0)}%)
                  </p>
                </div>
              </div>
            ))}

            <p className="text-[13px] font-bold text-ink-700 mt-4">Resultados anteriores</p>
            {votaciones.filter(v => v.estado === "cerrada").map(v => (
              <div key={v.id} className="rounded-2xl bg-white border border-ink-200 p-4">
                <p className="text-[13.5px] font-semibold text-ink-900">{v.titulo}</p>
                <p className="text-[12.5px] text-emerald-700 font-semibold mt-1">✓ {v.resultado}</p>
                <p className="text-[11px] text-ink-400 mt-1">{((v.votosEmitidos / v.totalVotantes) * 100).toFixed(0)}% participación</p>
              </div>
            ))}
          </div>
        )}

        {/* DOCUMENTOS */}
        {activeTab === "documentos" && (
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Documentos</p>
              <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Documentos</h1>
            </div>
            <div className="space-y-2">
              {[
                { name: "Reglamento interno Torre Ñandutí", size: "2.4 MB", date: "15/01/2026" },
                { name: "Acta Asamblea Ordinaria — Marzo 2026", size: "1.1 MB", date: "20/03/2026" },
                { name: "Presupuesto aprobado 2026", size: "0.8 MB", date: "15/12/2025" },
                { name: "Liquidación Julio 2026 — Depto 4A", size: "0.3 MB", date: "01/07/2026" },
                { name: "Liquidación Junio 2026 — Depto 4A", size: "0.3 MB", date: "01/06/2026" },
              ].map((doc, i) => (
                <button key={i} className="w-full rounded-2xl bg-white border border-ink-200 p-4 flex items-center gap-3.5 hover:shadow-elev-2 text-left transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center text-lg">📄</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-ink-900 truncate">{doc.name}</p>
                    <p className="text-[11px] text-ink-400 mt-0.5 font-medium">{doc.size} · {doc.date}</p>
                  </div>
                  <span className="text-[12px] text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">Descargar →</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PERFIL */}
        {activeTab === "perfil" && (
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Perfil</p>
              <h1 className="text-2xl font-extrabold text-ink-900 mt-1">Mi perfil</h1>
            </div>
            <div className="rounded-2xl bg-white border border-ink-200 p-6 space-y-4 shadow-elev-1">
              {[
                { l: "Nombre", v: user.nombre, type: "text" },
                { l: "Email", v: user.email, type: "email" },
                { l: "Teléfono", v: "+595 981 234567", type: "text" },
                { l: "Unidad", v: "4A — Piso 4 — 85m²", type: "text", disabled: true },
              ].map((f) => (
                <div key={f.l}>
                  <label className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider">{f.l}</label>
                  <input
                    type={f.type}
                    defaultValue={f.v}
                    disabled={f.disabled}
                    className={`w-full mt-1.5 px-3.5 py-2.5 border border-ink-200 rounded-xl text-[13.5px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                      f.disabled ? "bg-ink-50 text-ink-500" : ""
                    }`}
                  />
                </div>
              ))}
              <button className="w-full px-4 py-2.5 bg-grad-brand text-white text-[13.5px] font-semibold rounded-xl hover:shadow-brand transition-all">
                Guardar cambios
              </button>
            </div>
            <div className="rounded-2xl bg-white border border-ink-200 p-6 shadow-elev-1">
              <p className="text-[13.5px] font-bold text-ink-900 mb-3">Seguridad</p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 border border-ink-200 text-[13.5px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">Cambiar contraseña</button>
                <button className="w-full px-4 py-2.5 border border-ink-200 text-[13.5px] font-medium text-ink-800 rounded-xl hover:bg-ink-50 transition-colors">Activar autenticación 2FA</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal pago */}
      {showPayModal && (
        <div className="fixed inset-0 bg-ink-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 anim-fade-in" data-testid="pay-modal">
          <div className="rounded-3xl bg-white p-6 w-full max-w-sm shadow-elev-3 anim-scale-in">
            <h3 className="text-lg font-bold text-ink-900 mb-4">Confirmar pago</h3>
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 p-4 mb-4 text-center">
              <div className="w-36 h-36 bg-white border-2 border-ink-200 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-elev-1">
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({length: 25}).map((_, i) => (
                    <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.4 ? "bg-ink-900" : "bg-transparent"}`} />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-ink-500 font-semibold uppercase tracking-widest">Código QR SPI</p>
            </div>
            <div className="space-y-2 mb-4 text-[13px]">
              <div className="flex justify-between"><span className="text-ink-500">Monto:</span><span className="font-bold text-ink-900">₲ 812.000</span></div>
              <div className="flex justify-between"><span className="text-ink-500">Beneficiario:</span><span className="text-ink-900">Torre Ñandutí</span></div>
              <div className="flex justify-between"><span className="text-ink-500">Ref:</span><span className="font-mono text-[11px] text-ink-900">GC-NAN-4A-202607</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowPayModal(false)} className="flex-1 px-4 py-2.5 border border-ink-200 text-[13.5px] font-medium rounded-xl hover:bg-ink-50">Cancelar</button>
              <button onClick={() => handlePay("spi")} data-testid="pay-confirm-btn" className="flex-1 px-4 py-2.5 bg-emerald-600 text-white text-[13.5px] font-semibold rounded-xl hover:bg-emerald-700 transition-colors">Confirmar ✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

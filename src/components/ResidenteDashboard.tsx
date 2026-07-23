"use client";

import { useState } from "react";
import { User, cobros, reclamos, votaciones, formatGuaranies, getEstadoVotacionColor } from "@/data/mock-data";
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

  const handlePay = (method: string) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Success toast */}
      {paymentSuccess && (
        <div className="fixed top-16 left-4 right-4 bg-green-600 text-white p-4 rounded-xl shadow-lg z-30 animate-pulse">
          <p className="text-sm font-medium">✓ Pago registrado exitosamente</p>
          <p className="text-xs opacity-80">Comprobante enviado a tu email</p>
        </div>
      )}

      <main className="pt-20 px-4 pb-6 max-w-2xl mx-auto">
        {/* ============ INICIO / FEED ============ */}
        {activeTab === "inicio" && (
          <div className="space-y-4 pt-2">
            {/* Estado financiero */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">Gasto común — Julio 2026</p>
                  <p className="text-2xl font-bold text-gray-900">₲ 812.000</p>
                </div>
                <span className="text-xs px-3 py-1.5 rounded-full font-medium bg-green-100 text-green-800">PAGADO ✓</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Vencimiento</p>
                  <p className="text-sm font-medium">10/07</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Coeficiente</p>
                  <p className="text-sm font-medium">2.8%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500">Canal</p>
                  <p className="text-sm font-medium">SPI</p>
                </div>
              </div>
            </div>

            {/* Desglose por centro de costo */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-medium text-gray-700 mb-3">Desglose de tu gasto común</p>
              <div className="space-y-2">
                {[
                  { name: "Servicios contratados", amount: 238000, color: "bg-purple-400" },
                  { name: "Remuneraciones", amount: 225400, color: "bg-blue-400" },
                  { name: "Gastos Básicos", amount: 134400, color: "bg-yellow-400" },
                  { name: "Mantención", amount: 70000, color: "bg-orange-400" },
                  { name: "Administración", amount: 56000, color: "bg-gray-400" },
                  { name: "Fondo de reserva", amount: 46200, color: "bg-green-400" },
                  { name: "Seguros", amount: 42000, color: "bg-red-400" },
                ].map(item => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                    <span className="text-xs text-gray-600 flex-1">{item.name}</span>
                    <span className="text-xs font-medium text-gray-900">{formatGuaranies(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Votaciones pendientes */}
            {votacionesActivas.filter(v => !myVotes[v.id]).length > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-sm font-medium text-purple-800 mb-2">🗳️ Tienes votaciones pendientes</p>
                {votacionesActivas.filter(v => !myVotes[v.id]).map(v => (
                  <button key={v.id} onClick={() => setActiveTab("votaciones")} className="w-full text-left flex items-center justify-between py-2">
                    <span className="text-sm text-purple-700">{v.titulo}</span>
                    <span className="text-xs px-2 py-1 bg-purple-600 text-white rounded">Votar →</span>
                  </button>
                ))}
              </div>
            )}

            {/* Noticias de la comunidad */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs font-medium text-gray-700 mb-3">📢 Noticias de la comunidad</p>
              <div className="space-y-3">
                <div className="border-l-3 border-blue-500 pl-3">
                  <p className="text-sm text-gray-900">Asamblea ordinaria programada</p>
                  <p className="text-xs text-gray-500">25/07/2026 a las 19:00 en el SUM</p>
                </div>
                <div className="border-l-3 border-yellow-500 pl-3">
                  <p className="text-sm text-gray-900">Mantención ascensor 1</p>
                  <p className="text-xs text-gray-500">15/07/2026 de 8:00 a 12:00 — usar ascensor 2</p>
                </div>
                <div className="border-l-3 border-green-500 pl-3">
                  <p className="text-sm text-gray-900">Resultado votación: Horario piscina extendido</p>
                  <p className="text-xs text-gray-500">Aprobado: 6:00 a 22:00 desde verano 2026</p>
                </div>
              </div>
            </div>

            {/* Reclamo activo */}
            {misReclamos.filter(r => r.estado !== "resuelto").length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-xs font-medium text-yellow-800 mb-2">🔧 Tus reclamos activos</p>
                {misReclamos.filter(r => r.estado !== "resuelto").map(r => (
                  <div key={r.id} className="flex items-center justify-between py-1">
                    <span className="text-sm text-yellow-700">{r.titulo}</span>
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">{r.estado.replace("_", " ")}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============ PAGAR ============ */}
        {activeTab === "pagos" && (
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold text-gray-900">Realizar Pago</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
              <p className="text-xs text-gray-500">Gasto común — Julio 2026</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">₲ 812.000</p>
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-green-100 text-green-800 mt-2 inline-block">YA PAGADO</span>
            </div>

            <p className="text-sm font-medium text-gray-700">Selecciona método de pago:</p>
            <div className="space-y-3">
              {[
                { id: "spi", icon: "🏦", name: "Transferencia SPI", desc: "Instantánea via QR", tag: "Recomendado" },
                { id: "tigo", icon: "📱", name: "Tigo Money", desc: "Paga desde tu billetera Tigo" },
                { id: "personal", icon: "📲", name: "Personal Pay", desc: "Paga desde tu billetera Personal" },
                { id: "transfer", icon: "🏧", name: "Transferencia bancaria", desc: "Con código de referencia" },
              ].map(m => (
                <button key={m.id} onClick={() => setShowPayModal(true)} className="w-full flex items-center gap-4 p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                  <span className="text-2xl">{m.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.desc}</p>
                  </div>
                  {m.tag && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{m.tag}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============ HISTORIAL ============ */}
        {activeTab === "historial" && (
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold text-gray-900">Historial de Pagos</h2>
            <div className="space-y-2">
              {[
                { periodo: "Julio 2026", monto: 812000, fecha: "08/07/2026", canal: "SPI", estado: "pagado" },
                { periodo: "Junio 2026", monto: 812000, fecha: "05/06/2026", canal: "Tigo Money", estado: "pagado" },
                { periodo: "Mayo 2026", monto: 798000, fecha: "09/05/2026", canal: "SPI", estado: "pagado" },
                { periodo: "Abril 2026", monto: 798000, fecha: "03/04/2026", canal: "Personal Pay", estado: "pagado" },
                { periodo: "Marzo 2026", monto: 798000, fecha: "10/03/2026", canal: "Transferencia", estado: "pagado" },
              ].map((p, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.periodo}</p>
                    <p className="text-xs text-gray-500">{p.fecha} — {p.canal}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{formatGuaranies(p.monto)}</p>
                    <button className="text-xs text-blue-600 hover:underline mt-1">📄 PDF</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ RECLAMOS ============ */}
        {activeTab === "reclamos" && (
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold text-gray-900">Mis Reclamos</h2>

            {showReclamoSuccess && (
              <div className="bg-green-100 border border-green-300 rounded-xl p-3 text-sm text-green-800">
                ✓ Reclamo enviado correctamente. El administrador será notificado.
              </div>
            )}

            {/* Formulario nuevo reclamo */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm font-medium text-gray-900 mb-3">Nuevo reclamo</p>
              <div className="space-y-3">
                <select value={newReclamo.categoria} onChange={e => setNewReclamo(p => ({...p, categoria: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Mantención</option>
                  <option>Limpieza</option>
                  <option>Ruido</option>
                  <option>Seguridad</option>
                  <option>Otro</option>
                </select>
                <input type="text" value={newReclamo.titulo} onChange={e => setNewReclamo(p => ({...p, titulo: e.target.value}))} placeholder="Título del reclamo" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <textarea value={newReclamo.descripcion} onChange={e => setNewReclamo(p => ({...p, descripcion: e.target.value}))} rows={3} placeholder="Describe el problema..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <button onClick={handleNewReclamo} disabled={!newReclamo.titulo || !newReclamo.descripcion} className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  Enviar reclamo
                </button>
              </div>
            </div>

            {/* Lista de reclamos */}
            <div className="space-y-2">
              {misReclamos.map(r => (
                <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{r.titulo}</p>
                      <p className="text-xs text-gray-500 mt-1">{r.descripcion}</p>
                      <p className="text-xs text-gray-400 mt-2">{r.fechaCreacion} — {r.categoria}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${r.estado === "resuelto" ? "bg-green-100 text-green-800" : r.estado === "en_proceso" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                      {r.estado.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ VOTACIONES ============ */}
        {activeTab === "votaciones" && (
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold text-gray-900">Votaciones</h2>

            {votacionesActivas.map(v => (
              <div key={v.id} className="bg-white rounded-xl border border-green-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-800">ACTIVA</span>
                  <span className="text-xs text-gray-400">Cierra: {v.fechaCierre}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">{v.titulo}</h3>
                <p className="text-xs text-gray-600 mb-4">{v.descripcion}</p>

                {myVotes[v.id] ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-green-700 font-medium">✓ Voto registrado</p>
                    <p className="text-xs text-green-600 mt-1">Gracias por participar</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {v.opciones.map(op => (
                      <button key={op.id} onClick={() => handleVote(v.id, op.id)} className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
                        <span className="text-sm text-gray-700">{op.texto}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-3 pt-2 border-t border-gray-100">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${(v.votosEmitidos / v.totalVotantes) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Participación: {v.votosEmitidos}/{v.totalVotantes} ({((v.votosEmitidos / v.totalVotantes) * 100).toFixed(0)}%)</p>
                </div>
              </div>
            ))}

            {/* Cerradas */}
            <p className="text-sm font-medium text-gray-700 mt-4">Resultados anteriores</p>
            {votaciones.filter(v => v.estado === "cerrada").map(v => (
              <div key={v.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-900">{v.titulo}</p>
                <p className="text-xs text-green-700 font-medium mt-1">✓ {v.resultado}</p>
                <p className="text-xs text-gray-400 mt-1">{((v.votosEmitidos / v.totalVotantes) * 100).toFixed(0)}% participación</p>
              </div>
            ))}
          </div>
        )}

        {/* ============ DOCUMENTOS ============ */}
        {activeTab === "documentos" && (
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold text-gray-900">Documentos</h2>
            <div className="space-y-2">
              {[
                { name: "Reglamento interno Torre Ñandutí", size: "2.4 MB", date: "15/01/2026" },
                { name: "Acta Asamblea Ordinaria — Marzo 2026", size: "1.1 MB", date: "20/03/2026" },
                { name: "Presupuesto aprobado 2026", size: "0.8 MB", date: "15/12/2025" },
                { name: "Liquidación Julio 2026 — Depto 4A", size: "0.3 MB", date: "01/07/2026" },
                { name: "Liquidación Junio 2026 — Depto 4A", size: "0.3 MB", date: "01/06/2026" },
              ].map((doc, i) => (
                <button key={i} className="w-full bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 hover:bg-gray-50 text-left transition-colors">
                  <span className="text-lg">📄</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-400">{doc.size} — {doc.date}</p>
                  </div>
                  <span className="text-xs text-blue-600">Descargar</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============ PERFIL ============ */}
        {activeTab === "perfil" && (
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-bold text-gray-900">Mi Perfil</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <div><label className="text-xs text-gray-500">Nombre</label><input type="text" defaultValue={user.nombre} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              <div><label className="text-xs text-gray-500">Email</label><input type="email" defaultValue={user.email} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              <div><label className="text-xs text-gray-500">Teléfono</label><input type="text" defaultValue="+595 981 234567" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
              <div><label className="text-xs text-gray-500">Unidad</label><input type="text" defaultValue="4A — Piso 4 — 85m²" disabled className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50" /></div>
              <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Guardar cambios</button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-medium text-gray-900 mb-3">Seguridad</p>
              <button className="w-full px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50 mb-2">Cambiar contraseña</button>
              <button className="w-full px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">Activar autenticación 2FA</button>
            </div>
          </div>
        )}
      </main>

      {/* ============ MODAL PAGO ============ */}
      {showPayModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirmar pago</h3>
            <div className="bg-gray-100 rounded-xl p-4 mb-4 text-center">
              <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-center mx-auto mb-3">
                <div className="grid grid-cols-4 gap-1">
                  {Array.from({length: 16}).map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-gray-800 rounded-sm" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500">Código QR SPI</p>
            </div>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Monto:</span><span className="font-bold">₲ 812.000</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Beneficiario:</span><span>Torre Ñandutí</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Ref:</span><span className="font-mono text-xs">GC-NAN-4A-202607</span></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowPayModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">Cancelar</button>
              <button onClick={() => handlePay("spi")} className="flex-1 px-4 py-2.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 font-medium">Confirmar ✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

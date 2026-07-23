"use client";

interface Props {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src="/Logo Light.png" alt="ComuniPy" className="h-20 object-contain" />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#perfiles" className="text-sm text-gray-600 hover:text-gray-900">Perfiles</a>
            <a href="#modulos" className="text-sm text-gray-600 hover:text-gray-900">Módulos</a>
            <a href="#como-funciona" className="text-sm text-gray-600 hover:text-gray-900">Cómo funciona</a>
            <a href="#beneficios" className="text-sm text-gray-600 hover:text-gray-900">Beneficios</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onLogin} className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Ingresar
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            El software de administración<br />
            de edificios y condominios<br />
            <span className="text-blue-600">más completo del mercado.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            ComuniPy te brinda todo lo que necesitas para lograr una administración segura, transparente y eficiente. Cobro automático, gestión de gastos, comunicación con residentes — todo en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onLogin} className="px-8 py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors text-base shadow-lg shadow-blue-200">
              Solicitar demo
            </button>
            <a href="#modulos" className="px-8 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-base">
              Ver funcionalidades
            </a>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
            <div><p className="text-3xl font-bold text-blue-600">+50</p><p className="text-xs text-gray-500 mt-1">Condominios</p></div>
            <div><p className="text-3xl font-bold text-blue-600">+2.400</p><p className="text-xs text-gray-500 mt-1">Unidades gestionadas</p></div>
            <div><p className="text-3xl font-bold text-blue-600">98%</p><p className="text-xs text-gray-500 mt-1">Tasa de recaudación</p></div>
            <div><p className="text-3xl font-bold text-blue-600">24/7</p><p className="text-xs text-gray-500 mt-1">Disponibilidad</p></div>
          </div>
        </div>
      </section>

      {/* Perfiles */}
      <section id="perfiles" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Pensado para cada integrante de la comunidad</h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">Cada usuario accede a un portal diferente según su rol, con funcionalidades e información adaptadas.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
                <span className="text-3xl">🏢</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Administrador</h3>
              <p className="text-sm text-gray-600 mb-5">Control total de la gestión financiera, operativa y comunicacional del edificio.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Emisión de gastos comunes</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Cobro automático multi-canal</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Conciliación bancaria</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Gastos con OCR inteligente</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Reportes y análisis</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Remuneraciones del personal</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Asambleas y votaciones</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-5">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Residente / Copropietario</h3>
              <p className="text-sm text-gray-600 mb-5">Transparencia total y acceso a toda la información de su unidad y la comunidad.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Pago de gastos comunes online</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Estado de cuenta en tiempo real</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Comprobantes descargables</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Reclamos con seguimiento</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Votaciones digitales</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Reserva de espacios comunes</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Documentos y actas</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-5">
                <span className="text-3xl">👷</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personal / Trabajador</h3>
              <p className="text-sm text-gray-600 mb-5">Portal dedicado para conserjes, guardias y personal de limpieza de la comunidad.</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Contrato y beneficios</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Calendario de turnos</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Liquidaciones de sueldo</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Solicitud de vacaciones</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Control de asistencia</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Registro de visitas</li>
                <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Paquetería y correspondencia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section id="modulos" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Módulos y funcionalidades</h2>
          <p className="text-gray-600 text-center mb-12">Todo lo que necesita una administración profesional.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "💰", title: "Gastos comunes", desc: "Emisión automática con prorrateo por coeficiente. Liquidación mensual con un click." },
              { icon: "🏦", title: "Cobro multi-canal", desc: "SPI (transferencia instantánea), Tigo Money, Personal Pay. Conciliación automática." },
              { icon: "🧾", title: "Carga de gastos con OCR", desc: "Sube boletas y facturas. El sistema detecta proveedor, monto y categoría automáticamente." },
              { icon: "📊", title: "Conciliación bancaria", desc: "Registro exacto de ingresos y egresos. Matching automático pago-cobro." },
              { icon: "👥", title: "Remuneraciones", desc: "Cálculo de sueldos, horas extra, descuentos IPS, aguinaldo. Liquidaciones PDF." },
              { icon: "🗳️", title: "Asambleas y votaciones", desc: "Convocatoria, quorum, votación digital, actas. Todo trazable." },
              { icon: "🔧", title: "Mantenciones", desc: "Calendario preventivo, alertas de vencimiento, historial por equipo." },
              { icon: "📢", title: "Reclamos y solicitudes", desc: "Canal formal residente-administrador con seguimiento y resolución." },
              { icon: "⚡", title: "Coeficientes automáticos", desc: "Define metros totales por tipo, crea unidades y el sistema calcula el prorrateo." },
              { icon: "🔒", title: "Auditoría", desc: "Log inmutable de todas las acciones. Trazabilidad completa para fiscalización." },
              { icon: "📈", title: "Reportes", desc: "Recaudación, morosidad, flujo de caja, distribución por canal. Exportable." },
              { icon: "📧", title: "Comunicaciones", desc: "Notificaciones por email: liquidaciones, recordatorios, avisos, actas." },
            ].map((m, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
                <span className="text-3xl">{m.icon}</span>
                <h4 className="text-base font-bold text-gray-900 mt-3 mb-2">{m.title}</h4>
                <p className="text-sm text-gray-600">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Cómo funciona</h2>
          <div className="space-y-10">
            {[
              { step: "1", title: "Configura tu comunidad", desc: "Registra el edificio, define tipos de espacio (deptos, cocheras, bodegas) con metros útiles totales. Crea unidades y los coeficientes se calculan automáticamente." },
              { step: "2", title: "Carga los gastos del mes", desc: "Sube boletas y facturas. El OCR extrae los datos. Tú solo revisas y ratificas. Sin digitación manual." },
              { step: "3", title: "Emite la liquidación", desc: "El sistema distribuye los gastos según coeficiente de cada unidad y genera los cobros individuales." },
              { step: "4", title: "Los residentes pagan", desc: "Reciben notificación por email con link de pago. Pagan via transferencia SPI, Tigo Money o Personal Pay." },
              { step: "5", title: "Conciliación automática", desc: "Cada pago se identifica y marca automáticamente. Reportes en tiempo real de recaudación y morosidad." },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-5">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shrink-0">{s.step}</div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{s.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Beneficios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-6 bg-green-50 rounded-2xl">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0"><span className="text-xl">📉</span></div>
              <div>
                <h4 className="font-bold text-gray-900">Reduce morosidad hasta 70%</h4>
                <p className="text-sm text-gray-600 mt-1">El cobro automático con recordatorios elimina la fricción. Los residentes pagan desde el celular en segundos.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0"><span className="text-xl">⏱️</span></div>
              <div>
                <h4 className="font-bold text-gray-900">Ahorra +15 horas mensuales</h4>
                <p className="text-sm text-gray-600 mt-1">OCR para gastos, conciliación automática, prorrateo con un click. Cero Excel, cero digitación.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0"><span className="text-xl">🔍</span></div>
              <div>
                <h4 className="font-bold text-gray-900">Transparencia total</h4>
                <p className="text-sm text-gray-600 mt-1">Cada residente ve en qué se gasta cada guaraní. Auditoría inmutable. Confianza entre vecinos y administrador.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-2xl">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0"><span className="text-xl">🏗️</span></div>
              <div>
                <h4 className="font-bold text-gray-900">Multi-edificio</h4>
                <p className="text-sm text-gray-600 mt-1">Administra múltiples comunidades desde una sola cuenta. Dashboard consolidado con métricas por edificio.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-red-50 rounded-2xl">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0"><span className="text-xl">📱</span></div>
              <div>
                <h4 className="font-bold text-gray-900">Mobile-first</h4>
                <p className="text-sm text-gray-600 mt-1">Diseñado para funcionar perfecto desde el celular. Residentes y administradores pueden operar desde cualquier dispositivo.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-teal-50 rounded-2xl">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0"><span className="text-xl">🔐</span></div>
              <div>
                <h4 className="font-bold text-gray-900">Seguro y confiable</h4>
                <p className="text-sm text-gray-600 mt-1">Infraestructura cloud, backups automáticos, encriptación de datos. Disponibilidad 99.9%.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para modernizar tu administración?</h2>
          <p className="text-blue-100 mb-8 text-lg">Más de 50 comunidades ya confían en ComuniPy. Agenda una demo sin compromiso.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onLogin} className="px-8 py-3.5 bg-white text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors text-base">
              Solicitar demo gratuita
            </button>
            <a href="mailto:contacto@comunipy.com" className="px-8 py-3.5 border border-white/50 text-white font-medium rounded-xl hover:bg-white/10 transition-colors text-base">
              Contactar equipo comercial
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <img src="/Logo Light.png" alt="ComuniPy" className="h-14 object-contain mb-3" />
              <p className="text-sm text-gray-500 max-w-xs">Plataforma inteligente de administración de comunidades, edificios y condominios.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-medium text-gray-900 mb-2">Producto</p>
                <ul className="space-y-1 text-gray-500">
                  <li><a href="#modulos" className="hover:text-gray-900">Módulos</a></li>
                  <li><a href="#perfiles" className="hover:text-gray-900">Perfiles</a></li>
                  <li><a href="#beneficios" className="hover:text-gray-900">Beneficios</a></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">Acceso</p>
                <ul className="space-y-1 text-gray-500">
                  <li><button onClick={onLogin} className="hover:text-gray-900">Administradores</button></li>
                  <li><button onClick={onLogin} className="hover:text-gray-900">Residentes</button></li>
                  <li><button onClick={onLogin} className="hover:text-gray-900">Personal</button></li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">Contacto</p>
                <ul className="space-y-1 text-gray-500">
                  <li>contacto@comunipy.com</li>
                  <li>+595 21 XXX XXX</li>
                  <li>Asunción, Paraguay</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">© 2026 ComuniPy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { ROICalculator } from "./ROICalculator";

interface Props {
  onLogin: () => void;
}

const modules = [
  { icon: "💰", title: "Gastos comunes", desc: "Emisión automática con prorrateo por coeficiente. Liquidación mensual con un click." },
  { icon: "🏦", title: "Cobro multi-canal", desc: "SPI, Tigo Money, Personal Pay. Conciliación automática de cada pago." },
  { icon: "🧾", title: "Gastos con OCR", desc: "Sube boletas y facturas. Detección automática de proveedor, monto y categoría." },
  { icon: "📊", title: "Conciliación bancaria", desc: "Ingresos y egresos exactos. Matching automático entre pago y cobro." },
  { icon: "👥", title: "Remuneraciones", desc: "Sueldos, horas extra, IPS, aguinaldo. Liquidaciones PDF en un click." },
  { icon: "🗳️", title: "Asambleas y votaciones", desc: "Convocatoria, quorum y votación digital. Actas trazables." },
  { icon: "🔧", title: "Mantenciones", desc: "Calendario preventivo, alertas de vencimiento, historial por equipo." },
  { icon: "📢", title: "Reclamos", desc: "Canal formal residente-administrador con seguimiento hasta resolución." },
  { icon: "⚡", title: "Coeficientes automáticos", desc: "Define metros por espacio, crea unidades y el prorrateo se calcula solo." },
  { icon: "🔒", title: "Auditoría", desc: "Log inmutable de acciones. Trazabilidad completa para fiscalización." },
  { icon: "📈", title: "Reportes", desc: "Recaudación, morosidad, flujo de caja, distribución por canal — exportable." },
  { icon: "📧", title: "Comunicaciones", desc: "Notificaciones por email: liquidaciones, recordatorios, avisos y actas." },
];

const perfiles = [
  {
    icon: "🏢", title: "Administrador", accent: "from-blue-500 to-indigo-600",
    tag: "text-blue-700 bg-blue-50 border-blue-200",
    lead: "Control total de la gestión financiera, operativa y comunicacional del edificio.",
    items: ["Emisión de gastos comunes", "Cobro automático multi-canal", "Conciliación bancaria", "Gastos con OCR inteligente", "Reportes y análisis", "Remuneraciones del personal", "Asambleas y votaciones"],
  },
  {
    icon: "🏠", title: "Residente / Copropietario", accent: "from-emerald-500 to-teal-600",
    tag: "text-emerald-700 bg-emerald-50 border-emerald-200",
    lead: "Transparencia y acceso a toda la información de su unidad y comunidad.",
    items: ["Pago online multi-canal", "Estado de cuenta en tiempo real", "Comprobantes descargables", "Reclamos con seguimiento", "Votaciones digitales", "Reserva de espacios comunes", "Documentos y actas"],
  },
  {
    icon: "👷", title: "Personal / Trabajador", accent: "from-amber-500 to-orange-600",
    tag: "text-amber-700 bg-amber-50 border-amber-200",
    lead: "Portal dedicado para conserjes, guardias y personal de limpieza.",
    items: ["Contrato y beneficios", "Calendario de turnos", "Liquidaciones de sueldo", "Solicitudes y vacaciones", "Control de asistencia", "Registro de visitas", "Paquetería y correspondencia"],
  },
];

const steps = [
  { title: "Configura tu comunidad", desc: "Registra edificio, define espacios (deptos, cocheras, bodegas) con metros útiles. Crea unidades y los coeficientes se calculan solos." },
  { title: "Carga los gastos del mes", desc: "Sube boletas y facturas. El OCR extrae los datos. Tú solo revisas y ratificas — sin digitación manual." },
  { title: "Emite la liquidación", desc: "El sistema distribuye los gastos según coeficiente y genera los cobros individuales." },
  { title: "Los residentes pagan", desc: "Notificación por email con link. Pagan vía SPI, Tigo Money o Personal Pay." },
  { title: "Conciliación automática", desc: "Cada pago se identifica y marca. Reportes en tiempo real de recaudación y morosidad." },
];

const beneficios = [
  { icon: "📉", chip: "-70%", title: "Reduce morosidad hasta 70%", desc: "Cobro automático con recordatorios. Los residentes pagan desde el celular en segundos.", color: "emerald" },
  { icon: "⏱️", chip: "+15h", title: "Ahorra +15 horas mensuales", desc: "OCR para gastos, conciliación automática, prorrateo con un click. Cero Excel, cero digitación.", color: "blue" },
  { icon: "🔍", chip: "100%", title: "Transparencia total", desc: "Cada residente ve en qué se gasta cada guaraní. Auditoría inmutable. Confianza real.", color: "violet" },
  { icon: "🏗️", chip: "∞", title: "Multi-edificio", desc: "Administra múltiples comunidades desde una cuenta. Dashboard consolidado por edificio.", color: "amber" },
  { icon: "📱", chip: "Mobile", title: "Mobile-first", desc: "Diseñado para funcionar perfecto desde el celular. Residentes y administradores operan desde cualquier dispositivo.", color: "rose" },
  { icon: "🔐", chip: "99.9%", title: "Seguro y confiable", desc: "Infra cloud, backups automáticos, encriptación de datos. Disponibilidad 99.9%.", color: "teal" },
];

const beneficiosColorMap: Record<string, { bg: string; ring: string; chip: string; icon: string }> = {
  emerald: { bg: "from-emerald-50 to-white", ring: "ring-emerald-100", chip: "bg-emerald-100 text-emerald-800", icon: "bg-emerald-100 text-emerald-700" },
  blue: { bg: "from-blue-50 to-white", ring: "ring-blue-100", chip: "bg-blue-100 text-blue-800", icon: "bg-blue-100 text-blue-700" },
  violet: { bg: "from-violet-50 to-white", ring: "ring-violet-100", chip: "bg-violet-100 text-violet-800", icon: "bg-violet-100 text-violet-700" },
  amber: { bg: "from-amber-50 to-white", ring: "ring-amber-100", chip: "bg-amber-100 text-amber-800", icon: "bg-amber-100 text-amber-700" },
  rose: { bg: "from-rose-50 to-white", ring: "ring-rose-100", chip: "bg-rose-100 text-rose-800", icon: "bg-rose-100 text-rose-700" },
  teal: { bg: "from-teal-50 to-white", ring: "ring-teal-100", chip: "bg-teal-100 text-teal-800", icon: "bg-teal-100 text-teal-700" },
};

export function LandingPage({ onLogin }: Props) {
  return (
    <div className="min-h-screen bg-white text-ink-900" data-testid="landing-page">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-3 rounded-2xl glass-strong shadow-elev-2">
          <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/Logo Light.png" alt="ComuniPy" className="h-12 object-contain" />
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "#perfiles", label: "Perfiles" },
                { href: "#modulos", label: "Módulos" },
                { href: "#como-funciona", label: "Cómo funciona" },
                { href: "#beneficios", label: "Beneficios" },
                { href: "#calculadora", label: "ROI" },
              ].map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="px-3 py-2 text-[13px] font-medium text-ink-600 hover:text-ink-900 rounded-lg hover:bg-ink-100/70 transition-colors"
                  data-testid={`nav-${n.label.toLowerCase().replace(" ", "-")}`}
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a
                href="#contacto"
                className="hidden md:inline-flex px-4 py-2 text-[13px] font-medium text-ink-700 hover:text-ink-900 rounded-lg hover:bg-ink-100/70 transition-colors"
              >
                Contacto
              </a>
              <button
                onClick={onLogin}
                data-testid="header-login-btn"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink-900 hover:bg-ink-950 text-white text-[13px] font-semibold shadow-elev-2 transition-all"
              >
                Ingresar
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-mesh-light">
        <div className="absolute inset-0 bg-grid-slate opacity-70 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6 anim-fade-up">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white border border-ink-200 shadow-elev-1 text-ink-700">
              <span className="dot-live"></span>
              Nueva plataforma para Paraguay · 2026
            </span>
          </div>

          {/* Title */}
          <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.05] font-extrabold text-ink-900 anim-fade-up delay-100">
            El software de administración<br className="hidden sm:block" /> de edificios
            <span className="ml-2 inline-block text-gradient-brand">más completo</span><br className="hidden sm:block" />
            del mercado paraguayo.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl mx-auto text-center text-[17px] leading-relaxed text-ink-600 anim-fade-up delay-200">
            ComuniPy centraliza todo: cobro automático, gastos con OCR, remuneraciones, asambleas, comunicación con residentes. Una administración segura, transparente y sin fricción.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 anim-fade-up delay-300">
            <button
              onClick={onLogin}
              data-testid="hero-cta-demo"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-grad-brand text-white text-[15px] font-semibold shadow-brand hover:shadow-elev-3 transition-all"
            >
              Solicitar demo
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
            <a
              href="#modulos"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-ink-200 text-ink-800 text-[15px] font-semibold hover:bg-ink-50 transition-colors"
            >
              Ver funcionalidades
            </a>
          </div>

          {/* Trust bar */}
          <div className="mt-14 anim-fade-up delay-400">
            <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-ink-500 mb-4">
              Diseñado para el mercado paraguayo
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["SPI", "Tigo Money", "Personal Pay", "Bancard", "IPS", "SET"].map((m) => (
                <span key={m} className="px-4 py-1.5 rounded-full bg-white border border-ink-200 text-[12px] font-medium text-ink-700 shadow-elev-1">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Preview card */}
          <div className="relative mt-16 anim-fade-up delay-500">
            <div className="mx-auto max-w-5xl rounded-3xl glass-strong ring-hero p-3">
              <div className="rounded-2xl bg-white border border-ink-200/70 shadow-elev-1 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-100 bg-ink-50/60">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="ml-3 px-3 py-1 rounded-md bg-white border border-ink-200 text-[11px] text-ink-500 font-mono">
                    admin.comunipy.com/dashboard
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                  {[
                    { l: "Recaudado", v: "₲ 4.320.000", d: "de ₲ 5.100.000 emitido", c: "text-emerald-600" },
                    { l: "Tasa", v: "84.7%", d: "meta 95%", c: "text-blue-600" },
                    { l: "Morosidad", v: "2 unidades", d: "5A · 6A", c: "text-rose-600" },
                  ].map((k) => (
                    <div key={k.l} className="rounded-xl border border-ink-100 bg-white p-4 shadow-elev-1">
                      <p className="text-[11px] uppercase tracking-wider text-ink-500 font-semibold">{k.l}</p>
                      <p className={`mt-1 text-2xl font-bold ${k.c}`}>{k.v}</p>
                      <p className="text-[11px] text-ink-500 mt-1">{k.d}</p>
                    </div>
                  ))}
                </div>
                <div className="px-6 pb-6">
                  <div className="rounded-xl border border-ink-100 bg-white p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-ink-900">Últimos pagos</p>
                      <span className="pill bg-emerald-50 text-emerald-700">SPI · en vivo</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { u: "4A · Roberto Díaz", c: "SPI", v: "₲ 812.000" },
                        { u: "4B · Ana Benítez", c: "Tigo Money", v: "₲ 696.000" },
                        { u: "6B · Claudia Ramírez", c: "SPI", v: "₲ 696.000" },
                      ].map((p) => (
                        <div key={p.u} className="flex items-center justify-between text-[13px] py-1.5 border-b border-ink-100 last:border-0">
                          <span className="text-ink-700">{p.u}</span>
                          <span className="text-ink-500">{p.c}</span>
                          <span className="text-emerald-600 font-semibold">{p.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { n: "+50", l: "Condominios" },
              { n: "+2.400", l: "Unidades gestionadas" },
              { n: "98%", l: "Tasa de recaudación" },
              { n: "24/7", l: "Disponibilidad" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-ink-900">{s.n}</p>
                <p className="text-[12px] text-ink-500 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perfiles */}
      <section id="perfiles" className="py-24 px-4 bg-ink-50/40">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-blue-100 text-blue-800">
              · Perfiles
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-ink-900">
              Pensado para cada integrante de la comunidad
            </h2>
            <p className="mt-3 text-ink-600">
              Cada usuario accede a un portal diferente según su rol — con funcionalidades adaptadas y niveles de permiso distintos.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {perfiles.map((p, i) => (
              <div
                key={p.title}
                className="group relative rounded-2xl bg-white border border-ink-200/80 p-7 hover:-translate-y-1 hover:shadow-elev-3 transition-all"
                data-testid={`perfil-card-${i}`}
              >
                <div className={`absolute -top-3 left-6 w-12 h-12 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center text-2xl shadow-brand`}>
                  {p.icon}
                </div>
                <div className="pt-6">
                  <span className={`pill border ${p.tag}`}>{p.title.toUpperCase()}</span>
                  <p className="mt-4 text-[15px] text-ink-700 leading-relaxed">{p.lead}</p>
                  <ul className="mt-5 space-y-2.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[13.5px] text-ink-700">
                        <svg className="mt-0.5 shrink-0 w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section id="modulos" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-violet-100 text-violet-800">
                · Módulos
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-ink-900">
                Todo lo que necesita una administración profesional
              </h2>
              <p className="mt-3 text-ink-600">
                12 módulos integrados. Sin instalaciones. Sin Excel. Sin fricción.
              </p>
            </div>
            <div className="text-[13px] text-ink-500">
              <span className="font-mono">12 módulos</span> · actualización continua
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m, i) => (
              <div
                key={m.title}
                className="group relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white p-6 hover:border-blue-300 hover:shadow-elev-3 hover:-translate-y-0.5 transition-all"
                data-testid={`module-${i}`}
              >
                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center text-xl">
                    {m.icon}
                  </div>
                  <h4 className="mt-4 text-[15px] font-bold text-ink-900">{m.title}</h4>
                  <p className="mt-1.5 text-[13.5px] text-ink-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-24 px-4 bg-ink-50/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              · Cómo funciona
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-ink-900">
              Cinco pasos, cero fricción
            </h2>
            <p className="mt-3 text-ink-600">De la configuración inicial al cobro automatizado.</p>
          </div>

          <ol className="mt-14 relative border-l border-dashed border-ink-300/70 ml-4 md:ml-10 space-y-10">
            {steps.map((s, i) => (
              <li key={s.title} className="pl-8 md:pl-12">
                <span className="absolute -left-5 md:-left-7 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white border border-ink-200 shadow-elev-1 text-blue-700 font-extrabold text-lg font-display">
                  0{i + 1}
                </span>
                <h4 className="text-lg font-bold text-ink-900">{s.title}</h4>
                <p className="mt-1 text-[14px] text-ink-600 max-w-xl leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-rose-100 text-rose-800">
              · Beneficios
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-ink-900">Resultados que se sienten desde el día uno</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {beneficios.map((b, i) => {
              const c = beneficiosColorMap[b.color];
              return (
                <div
                  key={b.title}
                  className={`relative rounded-2xl bg-gradient-to-br ${c.bg} border border-ink-200/70 p-6 ring-1 ${c.ring} hover:shadow-elev-2 transition-all`}
                  data-testid={`benefit-${i}`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-xl ${c.icon} flex items-center justify-center text-xl`}>{b.icon}</div>
                    <span className={`pill ${c.chip}`}>{b.chip}</span>
                  </div>
                  <h4 className="mt-4 text-[15px] font-bold text-ink-900">{b.title}</h4>
                  <p className="mt-1.5 text-[13.5px] text-ink-600 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ROICalculator onCta={onLogin} />

      {/* CTA */}
      <section id="contacto" className="py-24 px-4">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-grad-brand text-white p-10 md:p-14 shadow-brand">
          <div className="absolute inset-0 bg-grid-neon opacity-30 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/15 text-white border border-white/30 backdrop-blur">
              <span className="dot-live"></span> +50 comunidades activas
            </span>
            <h2 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight">
              ¿Listo para modernizar<br /> tu administración?
            </h2>
            <p className="mt-4 text-blue-100 text-[16px] max-w-xl">
              Agenda una demo sin compromiso. Te mostramos cómo migrar sin fricción y ver resultados en el primer mes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={onLogin}
                data-testid="cta-demo-btn"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-700 text-[15px] font-semibold hover:bg-blue-50 transition-colors"
              >
                Solicitar demo gratuita →
              </button>
              <a
                href="mailto:contacto@comunipy.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/40 text-white text-[15px] font-semibold hover:bg-white/10 transition-colors"
              >
                Contactar equipo comercial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-14 pb-8 px-4 border-t border-ink-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <img src="/Logo Light.png" alt="ComuniPy" className="h-14 object-contain mb-4" />
              <p className="text-[13.5px] text-ink-600 max-w-sm leading-relaxed">
                Plataforma inteligente de administración de comunidades, edificios y condominios en Paraguay. Cobro automático y transparencia total.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[12px] text-ink-500">
                <span className="dot-live" /> Sistemas operativos — 99.87% uptime
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-ink-900 uppercase tracking-wider mb-3">Producto</p>
              <ul className="space-y-2 text-[13.5px] text-ink-600">
                <li><a href="#modulos" className="hover:text-ink-900">Módulos</a></li>
                <li><a href="#perfiles" className="hover:text-ink-900">Perfiles</a></li>
                <li><a href="#beneficios" className="hover:text-ink-900">Beneficios</a></li>
                <li><a href="#como-funciona" className="hover:text-ink-900">Cómo funciona</a></li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-ink-900 uppercase tracking-wider mb-3">Acceso</p>
              <ul className="space-y-2 text-[13.5px] text-ink-600">
                <li><button onClick={onLogin} className="hover:text-ink-900">Administradores</button></li>
                <li><button onClick={onLogin} className="hover:text-ink-900">Residentes</button></li>
                <li><button onClick={onLogin} className="hover:text-ink-900">Personal</button></li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-ink-900 uppercase tracking-wider mb-3">Contacto</p>
              <ul className="space-y-2 text-[13.5px] text-ink-600">
                <li>contacto@comunipy.com</li>
                <li>+595 21 XXX XXX</li>
                <li>Asunción, Paraguay</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-ink-100 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-ink-500">© 2026 ComuniPy. Todos los derechos reservados.</p>
            <div className="flex gap-4 text-[12px] text-ink-500">
              <a href="#" className="hover:text-ink-900">Términos</a>
              <a href="#" className="hover:text-ink-900">Privacidad</a>
              <a href="#" className="hover:text-ink-900">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

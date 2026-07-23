"use client";

interface LoginScreenProps {
  onLogin: (userId: string) => void;
  onBack?: () => void;
}

const profiles = [
  {
    id: "u1",
    initials: "CM",
    name: "Carlos Méndez",
    role: "Super Admin — Plataforma",
    gradient: "from-violet-500 to-fuchsia-600",
    ring: "ring-violet-200/60",
    tag: "text-violet-700",
    accent: "hover:border-violet-400 hover:bg-violet-50/70",
    dot: "bg-violet-500",
  },
  {
    id: "u2",
    initials: "MG",
    name: "María González",
    role: "Administrador — Torre Ñandutí",
    gradient: "from-blue-500 to-indigo-600",
    ring: "ring-blue-200/60",
    tag: "text-blue-700",
    accent: "hover:border-blue-400 hover:bg-blue-50/70",
    dot: "bg-blue-500",
  },
  {
    id: "u3",
    initials: "RD",
    name: "Roberto Díaz",
    role: "Residente — Depto 4A, Torre Ñandutí",
    gradient: "from-emerald-500 to-teal-600",
    ring: "ring-emerald-200/60",
    tag: "text-emerald-700",
    accent: "hover:border-emerald-400 hover:bg-emerald-50/70",
    dot: "bg-emerald-500",
  },
  {
    id: "u6",
    initials: "MP",
    name: "Miguel Paredes",
    role: "Trabajador — Conserje, Torre Ñandutí",
    gradient: "from-amber-500 to-orange-600",
    ring: "ring-amber-200/60",
    tag: "text-amber-700",
    accent: "hover:border-amber-400 hover:bg-amber-50/70",
    dot: "bg-amber-500",
  },
];

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-mesh-light overflow-hidden" data-testid="login-screen">
      <div className="absolute inset-0 bg-grid-slate opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative w-full max-w-md anim-fade-up">
        <div className="rounded-3xl glass-strong shadow-elev-3 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-blue-100 text-blue-800 mb-5">
              <span className="dot-live"></span>
              Modo demo
            </div>
            <img src="/Logo Light.png" alt="ComuniPy" className="h-20 mx-auto object-contain" />
            <h1 className="mt-3 text-lg font-bold text-ink-900">Bienvenido a ComuniPy</h1>
            <p className="text-[13px] text-ink-500 mt-1">Selecciona un perfil para explorar la plataforma</p>
          </div>

          <div className="space-y-2.5">
            {profiles.map((p, i) => (
              <button
                key={p.id}
                onClick={() => onLogin(p.id)}
                data-testid={`login-profile-${p.id}`}
                className={`group w-full flex items-center gap-3 p-3 rounded-2xl bg-white border border-ink-200 ${p.accent} transition-all anim-fade-up`}
                style={{ animationDelay: `${100 + i * 60}ms` }}
              >
                <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white font-bold text-[13px] shadow-elev-1 ring-2 ${p.ring}`}>
                  {p.initials}
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${p.dot} border-2 border-white`} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-ink-900 truncate">{p.name}</p>
                  <p className={`text-[11.5px] font-medium ${p.tag} truncate`}>{p.role}</p>
                </div>
                <span className="text-ink-400 group-hover:text-ink-700 group-hover:translate-x-0.5 transition-all">→</span>
              </button>
            ))}
          </div>

          <div className="mt-7 pt-5 border-t border-ink-200/70">
            <p className="text-[11px] text-center text-ink-400 mb-3">
              Mock funcional — cada rol tiene vistas y permisos distintos
            </p>
            {onBack && (
              <button
                onClick={onBack}
                data-testid="login-back-btn"
                className="w-full inline-flex items-center justify-center gap-2 text-[13px] text-ink-500 hover:text-ink-900 py-2 rounded-lg hover:bg-ink-50 transition-colors"
              >
                ← Volver al inicio
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-[11px] text-ink-400 mt-4">
          © 2026 ComuniPy · Asunción, Paraguay
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface Props {
  items: MenuItem[];
  activeItem: string;
  onSelect: (id: string) => void;
  title: string;
  subtitle: string;
  userName: string;
  userRole: string;
  onLogout: () => void;
  variant?: "light" | "dark";
}

export function HamburgerMenu({ items, activeItem, onSelect, subtitle, userName, userRole, onLogout, variant = "light" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dark = variant === "dark";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const initials = userName.split(" ").map(n => n[0]).slice(0, 2).join("");

  return (
    <>
      {/* Header fijo */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b transition-colors ${
          dark
            ? "bg-ink-900/85 border-white/10 backdrop-blur-xl shadow-[0_1px_0_rgba(148,163,184,0.06)]"
            : "bg-white/85 border-ink-200 backdrop-blur-xl shadow-sm"
        }`}
        data-testid="app-header"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setIsOpen(true)}
              data-testid="hamburger-open"
              aria-label="Abrir menú"
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                dark ? "hover:bg-white/10 text-slate-200" : "hover:bg-ink-100 text-ink-700"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="14" y2="17" />
              </svg>
            </button>
            <div className={dark ? "px-2 py-1 rounded-lg bg-white" : ""}>
              <img src="/Logo Light.png" alt="ComuniPy" className="h-11 object-contain" />
            </div>
            <div className="hidden sm:block min-w-0">
              <p className={`text-[11px] font-semibold uppercase tracking-wider truncate ${dark ? "text-cyan-300" : "text-blue-700"}`}>
                {subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium ${
              dark ? "bg-white/5 text-slate-300 border border-white/10" : "bg-ink-50 text-ink-600 border border-ink-200"
            }`}>
              <span className="dot-live" /> Sistema operativo
            </span>
            <div className="flex items-center gap-2.5 pl-2">
              <div className="text-right hidden sm:block">
                <p className={`text-[12.5px] font-semibold leading-tight ${dark ? "text-white" : "text-ink-900"}`}>{userName.split(" ")[0]}</p>
                <p className={`text-[10.5px] leading-tight ${dark ? "text-slate-400" : "text-ink-500"}`}>{userRole.split("—")[0].trim()}</p>
              </div>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shadow-elev-1 ${
                dark ? "bg-gradient-to-br from-cyan-400 to-blue-600 text-white ring-2 ring-white/10" : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
              }`}>
                {initials}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm z-50 anim-fade-in"
          onClick={() => setIsOpen(false)}
          data-testid="hamburger-overlay"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] z-50 flex flex-col transform transition-transform duration-300 ease-out ${
          dark ? "bg-ink-950 border-r border-white/10" : "bg-white border-r border-ink-200"
        } ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        data-testid="hamburger-drawer"
      >
        {/* Header logo */}
        <div className={`px-5 py-4 flex items-center justify-between shrink-0 border-b ${dark ? "border-white/10" : "border-ink-100"}`}>
          <div className={dark ? "px-2 py-1 rounded-lg bg-white" : ""}>
            <img src="/Logo Light.png" alt="ComuniPy" className="h-12 object-contain" />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            data-testid="hamburger-close"
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${
              dark ? "hover:bg-white/10 text-slate-300" : "hover:bg-ink-100 text-ink-600"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* User card */}
        <div className={`px-4 py-4 shrink-0 border-b ${dark ? "border-white/10 bg-white/[0.02]" : "border-ink-100 bg-ink-50/60"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-[13px] font-bold text-white shadow-elev-1 ${
              dark ? "bg-gradient-to-br from-cyan-400 to-blue-600 ring-2 ring-white/10" : "bg-gradient-to-br from-blue-500 to-indigo-600"
            }`}>
              {initials}
            </div>
            <div className="min-w-0">
              <p className={`text-[13.5px] font-semibold truncate ${dark ? "text-white" : "text-ink-900"}`}>{userName}</p>
              <p className={`text-[11.5px] font-medium truncate ${dark ? "text-cyan-300" : "text-blue-700"}`}>{userRole}</p>
            </div>
          </div>
          <p className={`mt-3 text-[10.5px] uppercase tracking-widest font-semibold ${dark ? "text-slate-500" : "text-ink-400"}`}>
            {subtitle}
          </p>
        </div>

        {/* Nav */}
        <nav className={`flex-1 overflow-y-auto min-h-0 p-3 ${dark ? "dark-scrollbar" : ""}`}>
          <p className={`px-3 mb-2 text-[10.5px] uppercase tracking-widest font-semibold ${dark ? "text-slate-500" : "text-ink-400"}`}>
            Menú
          </p>
          <div className="space-y-1">
            {items.map((item) => {
              const active = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onSelect(item.id); setIsOpen(false); }}
                  data-testid={`menu-item-${item.id}`}
                  className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                    active
                      ? dark
                        ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-200 shadow-neon-cyan"
                        : "bg-blue-50 text-blue-800 shadow-elev-1"
                      : dark
                        ? "text-slate-300 hover:bg-white/5 hover:text-white"
                        : "text-ink-700 hover:bg-ink-100"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[15px] ${
                    active
                      ? dark
                        ? "bg-cyan-500/20 text-cyan-200"
                        : "bg-white text-blue-700 shadow-elev-1"
                      : dark
                        ? "bg-white/5 text-slate-400 group-hover:bg-white/10"
                        : "bg-white text-ink-500 border border-ink-200/70"
                  }`}>{item.icon}</span>
                  <span className="text-[13.5px] font-medium flex-1 truncate">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-elev-1">
                      {item.badge}
                    </span>
                  )}
                  {active && !item.badge && (
                    <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-cyan-300" : "bg-blue-600"}`} />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout fijo */}
        <div className={`shrink-0 p-3 border-t ${dark ? "border-white/10 bg-white/[0.02]" : "border-ink-100 bg-ink-50/40"}`}>
          <button
            onClick={() => { onLogout(); setIsOpen(false); }}
            data-testid="logout-btn"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              dark ? "text-rose-300 hover:bg-rose-500/10" : "text-rose-600 hover:bg-rose-50"
            }`}
          >
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark ? "bg-rose-500/15" : "bg-rose-100"}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </span>
            <span className="text-[13.5px] font-semibold">Cerrar sesión</span>
          </button>
          <p className={`mt-3 px-1 text-[10px] ${dark ? "text-slate-600" : "text-ink-400"}`}>
            ComuniPy v1.0 · 2026
          </p>
        </div>
      </aside>
    </>
  );
}

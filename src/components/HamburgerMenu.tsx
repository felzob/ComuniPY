"use client";

import { useState } from "react";

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
}

export function HamburgerMenu({ items, activeItem, onSelect, title, subtitle, userName, userRole, onLogout }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header fijo */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Abrir menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <img src="/Logo Light.png" alt="ComuniPy" className="h-14 object-contain" />
          <div>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{userName.split(" ").map(n => n[0]).join("")}</span>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-200 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo + close */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
          <img src="/Logo Light.png" alt="ComuniPy" className="h-14 object-contain" />
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        {/* User info */}
        <div className="p-5 border-b border-gray-200 bg-gray-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{userName.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-blue-600">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Menu items */}
        <nav className="p-3 flex-1 overflow-y-auto min-h-0">
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => { onSelect(item.id); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors mb-1 ${
                activeItem === item.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200 shrink-0">
          <button
            onClick={() => { onLogout(); setIsOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
          >
            <span className="text-lg">🚪</span>
            <span className="text-sm">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </>
  );
}

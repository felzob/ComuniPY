"use client";

import { users } from "@/data/mock-data";

interface LoginScreenProps {
  onLogin: (userId: string) => void;
  onBack?: () => void;
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/Logo Light.png" alt="ComuniPy" className="h-28 mx-auto mb-4 object-contain" />
          <p className="text-gray-500 mt-1">Administración de Comunidades</p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700 mb-2">Seleccionar usuario (Demo):</p>

          <button
            onClick={() => onLogin("u1")}
            className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">CM</div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Carlos Méndez</p>
              <p className="text-xs text-purple-600 font-medium">Super Admin — Plataforma</p>
            </div>
          </button>

          <button
            onClick={() => onLogin("u2")}
            className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">MG</div>
            <div className="text-left">
              <p className="font-medium text-gray-900">María González</p>
              <p className="text-xs text-blue-600 font-medium">Administrador — Torre Ñandutí</p>
            </div>
          </button>

          <button
            onClick={() => onLogin("u3")}
            className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">RD</div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Roberto Díaz</p>
              <p className="text-xs text-green-600 font-medium">Residente — Depto 4A, Torre Ñandutí</p>
            </div>
          </button>

          <button
            onClick={() => onLogin("u6")}
            className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">MP</div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Miguel Paredes</p>
              <p className="text-xs text-amber-600 font-medium">Trabajador — Conserje, Torre Ñandutí</p>
            </div>
          </button>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-center text-gray-400 mb-3">
            Mock funcional — Cada rol tiene vistas y permisos distintos
          </p>
          {onBack && (
            <button onClick={onBack} className="w-full text-sm text-gray-500 hover:text-gray-900 py-2">
              ← Volver al inicio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { proveedores } from "@/data/mock-data";

export function ProveedoresView() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-700">Proveedores</p>
          <h2 className="text-2xl font-extrabold text-ink-900 mt-1">Proveedores</h2>
        </div>
        <button className="px-4 py-2.5 bg-grad-brand text-white text-[13px] font-semibold rounded-xl hover:shadow-brand transition-all">+ Agregar proveedor</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {proveedores.map(p => (
          <div key={p.id} className="rounded-2xl bg-white border border-ink-200 shadow-elev-1 p-5 hover:shadow-elev-2 transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center text-lg shrink-0">🤝</div>
                <div className="min-w-0">
                  <h3 className="text-[14px] font-bold text-ink-900">{p.nombre}</h3>
                  <p className="text-[12px] text-blue-600 font-semibold mt-0.5">{p.servicio}</p>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-[11.5px] text-ink-500">RUC: <span className="font-mono">{p.ruc}</span></p>
                    <p className="text-[11.5px] text-ink-500">Contacto: {p.contacto}</p>
                    <p className="text-[11.5px] text-ink-500">Tel: {p.telefono}</p>
                    <p className="text-[11.5px] text-ink-500 truncate">Email: {p.email}</p>
                  </div>
                </div>
              </div>
              <button className="text-[11.5px] text-blue-600 hover:text-blue-800 hover:underline font-medium">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

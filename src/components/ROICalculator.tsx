"use client";

import { useMemo, useState } from "react";

const currency = (n: number) => "₲ " + n.toLocaleString("es-PY", { maximumFractionDigits: 0 });

export function ROICalculator({ onCta }: { onCta: () => void }) {
  const [units, setUnits] = useState(48);
  const [avgFee, setAvgFee] = useState(700000);
  const [morosidad, setMorosidad] = useState(15);

  const {
    horasAhorradas,
    valorHoras,
    morosidadRecuperada,
    ahorroTotal,
    roiPct,
    costoPlataforma,
  } = useMemo(() => {
    // Heurísticas conservadoras
    // 1) Horas ahorradas al mes: ~0.4h por unidad (OCR + conciliación + emisión)
    const hs = Math.round(units * 0.4);
    // 2) Valor hora contable en Paraguay ~₲ 55.000/h
    const hourRate = 55000;
    const valorHs = hs * hourRate;
    // 3) Morosidad reducida en 70% del valor actual
    const morosidadInicialG = Math.round(units * avgFee * (morosidad / 100));
    const recuperada = Math.round(morosidadInicialG * 0.7);
    // 4) Costo ComuniPy estimado (Plan Profesional promedio USD 79 = ₲ 590.000)
    const costo = 590000;
    const ahorro = valorHs + recuperada - costo;
    const emitidoMensual = units * avgFee;
    const roi = emitidoMensual > 0 ? Math.round((ahorro / (costo || 1)) * 100) : 0;
    return {
      horasAhorradas: hs,
      valorHoras: valorHs,
      morosidadRecuperada: recuperada,
      ahorroTotal: ahorro,
      roiPct: roi,
      costoPlataforma: costo,
    };
  }, [units, avgFee, morosidad]);

  return (
    <section id="calculadora" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-800">
            · Calculadora ROI
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-ink-900">
            Calcula cuánto ahorrarías con ComuniPy
          </h2>
          <p className="mt-3 text-ink-600">
            Ajusta los parámetros de tu edificio y descubre el retorno mensual estimado.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          {/* Inputs */}
          <div className="lg:col-span-2 rounded-3xl bg-white border border-ink-200 shadow-elev-2 p-6" data-testid="roi-inputs">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-500 mb-4">Parámetros de tu edificio</p>

            <div className="space-y-6">
              {/* Unidades */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-[13px] font-semibold text-ink-900">Unidades del edificio</label>
                  <span className="font-mono text-[15px] font-extrabold text-blue-700">{units}</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={200}
                  step={1}
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  data-testid="roi-input-units"
                  className="w-full h-2 rounded-full accent-blue-600 bg-ink-100 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-ink-400 mt-1 font-mono">
                  <span>8</span><span>200</span>
                </div>
              </div>

              {/* Cuota promedio */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-[13px] font-semibold text-ink-900">Cuota mensual promedio</label>
                  <span className="font-mono text-[15px] font-extrabold text-blue-700">{currency(avgFee)}</span>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={2500000}
                  step={50000}
                  value={avgFee}
                  onChange={(e) => setAvgFee(Number(e.target.value))}
                  data-testid="roi-input-fee"
                  className="w-full h-2 rounded-full accent-blue-600 bg-ink-100 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-ink-400 mt-1 font-mono">
                  <span>{currency(200000)}</span><span>{currency(2500000)}</span>
                </div>
              </div>

              {/* Morosidad */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="text-[13px] font-semibold text-ink-900">Morosidad actual</label>
                  <span className="font-mono text-[15px] font-extrabold text-rose-600">{morosidad}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={1}
                  value={morosidad}
                  onChange={(e) => setMorosidad(Number(e.target.value))}
                  data-testid="roi-input-morosidad"
                  className="w-full h-2 rounded-full accent-rose-500 bg-ink-100 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-ink-400 mt-1 font-mono">
                  <span>0%</span><span>40%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-ink-100">
              <p className="text-[11.5px] text-ink-500 leading-relaxed">
                Modelo conservador: <strong className="text-ink-700">0,4 h/unidad ahorradas</strong> al mes, <strong className="text-ink-700">₲ 55.000/h</strong> valor de administración y reducción <strong className="text-ink-700">70%</strong> sobre morosidad actual.
              </p>
            </div>
          </div>

          {/* Resultado */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-3xl bg-grad-brand text-white p-8 shadow-brand" data-testid="roi-output">
            <div className="absolute inset-0 bg-grid-neon opacity-20 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-cyan-300/25 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="dot-live" />
                <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-100">
                  Retorno estimado mensual
                </p>
              </div>
              <p className="mt-3 text-5xl md:text-6xl font-extrabold leading-none" data-testid="roi-ahorro">
                {currency(ahorroTotal)}
              </p>
              <p className="mt-2 text-blue-100 text-[14px]">
                ahorro neto tras costo de plataforma · <span className="font-mono font-semibold text-white">ROI {roiPct}%</span>
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { l: "Horas ahorradas", v: `${horasAhorradas}h`, sub: currency(valorHoras), tone: "text-emerald-200" },
                  { l: "Morosidad recuperada", v: currency(morosidadRecuperada), sub: "70% menos", tone: "text-cyan-200" },
                  { l: "Cuotas emitidas / mes", v: currency(units * avgFee), sub: `${units} unidades`, tone: "text-white" },
                  { l: "Costo ComuniPy", v: currency(costoPlataforma), sub: "Plan Profesional", tone: "text-rose-200" },
                ].map((m) => (
                  <div key={m.l} className="rounded-xl bg-white/10 backdrop-blur border border-white/15 p-4">
                    <p className="text-[10.5px] uppercase tracking-widest text-blue-100 font-semibold">{m.l}</p>
                    <p className={`text-lg font-extrabold mt-1 ${m.tone}`}>{m.v}</p>
                    <p className="text-[11px] text-blue-100/80 mt-0.5">{m.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onCta}
                  data-testid="roi-cta-btn"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-700 text-[14px] font-semibold hover:bg-blue-50 transition-colors"
                >
                  Solicitar demo con este cálculo →
                </button>
                <a
                  href="mailto:contacto@comunipy.com?subject=ROI%20ComuniPy"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/40 text-white text-[14px] font-semibold hover:bg-white/10 transition-colors"
                >
                  Recibir informe por email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

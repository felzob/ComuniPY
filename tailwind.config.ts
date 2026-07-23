import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#0b1220",
        },
      },
      boxShadow: {
        "soft": "0 6px 20px -8px rgba(15,23,42,0.10), 0 2px 6px rgba(15,23,42,0.04)",
        "brand": "0 12px 30px -12px rgba(37,99,235,0.45)",
      },
      backgroundImage: {
        "grad-brand": "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #0ea5e9 100%)",
        "grad-brand-soft": "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 50%, #ecfeff 100%)",
      },
    },
  },
  plugins: [],
};
export default config;

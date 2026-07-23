import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ComuniPy - Administración de Comunidades",
  description: "Plataforma de administración de edificios y cobro automático para Paraguay",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

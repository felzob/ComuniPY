# ComuniPy — PRD

## Contexto
ComuniPy es un mock funcional (Next.js 14 + TS + Tailwind) de una plataforma SaaS para administración de edificios/condominios en Paraguay. Este ciclo se enfocó en **rediseño visual premium** sin alterar la lógica ni los datos.

## Alcance del rediseño (2026-01)
- **Sistema de diseño**: fuentes premium (Plus Jakarta Sans + Manrope + JetBrains Mono), tokens de color (`ink`, `primary`), utilidades (glass, mesh, grid, neon shadows, animaciones fade-up/scale-in).
- **LandingPage**: header glass fijo, hero con gradientes, mockup de dashboard preview, secciones Perfiles/Módulos/Cómo funciona/Beneficios/CTA/Footer con animaciones.
- **LoginScreen**: glass-morphism, perfiles con avatares gradiente y estado en vivo.
- **HamburgerMenu**: drawer con logo grande, avatar del usuario, badges, scroll interno, logout fijo abajo, soporte `variant="dark"`.
- **ResidenteDashboard (7 tabs)**: hero card de gasto común con gradiente brand, desglose visual, votaciones, reclamos, historial, documentos, perfil.
- **TrabajadorDashboard (5 tabs)**: perfil con avatar gradiente ambar, KPIs, turnos, liquidaciones detalladas, contrato con beneficios, solicitudes.
- **SuperAdminDashboard (6 tabs)**: tema oscuro `slate-900` + neones cyan/blue/emerald, glassmorphism, KPIs y tablas.
- **EdificioView**: info general, espacios con barras de progreso, tablas con coeficiente calculado en vivo, formulario inline unidad con preview del coeficiente.
- **AdminDashboard (15 tabs)**: mejoras quirúrgicas globales (search_replace bulk) manteniendo toda la lógica intacta.

## Compilación
`npm run build` compila sin errores. `next dev` corre en :3000.

## Backlog / Futuro
- Toasts globales con librería Motion para animaciones más ricas.
- Modo oscuro global (no solo SuperAdmin).
- Extraer subcomponentes del AdminDashboard (1300 líneas) en archivos separados.
- Persistencia real (hoy es 100% mock).

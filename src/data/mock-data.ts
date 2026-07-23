// ============ USUARIOS Y ROLES ============
export type UserRole = "superadmin" | "admin" | "residente" | "trabajador";

export interface User {
  id: string;
  nombre: string;
  email: string;
  role: UserRole;
  avatar: string;
  edificioId?: string;
  unidadId?: string;
}

export const users: User[] = [
  { id: "u1", nombre: "Carlos Méndez", email: "carlos@comunipy.com", role: "superadmin", avatar: "CM" },
  { id: "u2", nombre: "María González", email: "maria@adminpro.com.py", role: "admin", avatar: "MG", edificioId: "e1" },
  { id: "u3", nombre: "Roberto Díaz", email: "roberto.diaz@gmail.com", role: "residente", avatar: "RD", edificioId: "e1", unidadId: "un1" },
  { id: "u4", nombre: "Ana Benítez", email: "ana.benitez@hotmail.com", role: "residente", avatar: "AB", edificioId: "e1", unidadId: "un2" },
  { id: "u5", nombre: "Jorge Villalba", email: "jvillalba@empresa.com.py", role: "residente", avatar: "JV", edificioId: "e1", unidadId: "un3" },
  { id: "u6", nombre: "Miguel Paredes", email: "miguel.paredes@gmail.com", role: "trabajador", avatar: "MP", edificioId: "e1" },
];

// ============ EDIFICIOS ============
export interface Edificio {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  ruc: string;
  unidades: number;
  pisos: number;
  administradorId: string;
  cuentaBancaria: string;
  banco: string;
}

export const edificios: Edificio[] = [
  {
    id: "e1",
    nombre: "Torre Ñandutí",
    direccion: "Av. España 1245, Villa Morra",
    ciudad: "Asunción",
    ruc: "80012345-6",
    unidades: 48,
    pisos: 16,
    administradorId: "u2",
    cuentaBancaria: "001-234567-001",
    banco: "Banco Itaú Paraguay",
  },
  {
    id: "e2",
    nombre: "Residencial Cerro Corá",
    direccion: "Calle Palma 890, Centro",
    ciudad: "Asunción",
    ruc: "80067890-1",
    unidades: 32,
    pisos: 12,
    administradorId: "u2",
    cuentaBancaria: "002-876543-002",
    banco: "Banco Continental",
  },
  {
    id: "e3",
    nombre: "Condominio Las Palmas",
    direccion: "Av. Mcal. López 3456",
    ciudad: "Asunción",
    ruc: "80011223-4",
    unidades: 64,
    pisos: 20,
    administradorId: "u2",
    cuentaBancaria: "003-112233-003",
    banco: "Banco Nacional de Fomento",
  },
];

// ============ UNIDADES ============
export interface Unidad {
  id: string;
  edificioId: string;
  numero: string;
  piso: number;
  tipo: "departamento" | "cochera" | "bodega";
  metrosCuadrados: number;
  coeficiente: number;
  propietario: string;
  residente: string;
  email: string;
  telefono: string;
}

export const unidades: Unidad[] = [
  { id: "un1", edificioId: "e1", numero: "4A", piso: 4, tipo: "departamento", metrosCuadrados: 85, coeficiente: 2.8, propietario: "Roberto Díaz", residente: "Roberto Díaz", email: "roberto.diaz@gmail.com", telefono: "+595 981 234567" },
  { id: "un2", edificioId: "e1", numero: "4B", piso: 4, tipo: "departamento", metrosCuadrados: 72, coeficiente: 2.4, propietario: "Ana Benítez", residente: "Ana Benítez", email: "ana.benitez@hotmail.com", telefono: "+595 982 345678" },
  { id: "un3", edificioId: "e1", numero: "5A", piso: 5, tipo: "departamento", metrosCuadrados: 85, coeficiente: 2.8, propietario: "Jorge Villalba", residente: "Jorge Villalba", email: "jvillalba@empresa.com.py", telefono: "+595 983 456789" },
  { id: "un4", edificioId: "e1", numero: "5B", piso: 5, tipo: "departamento", metrosCuadrados: 72, coeficiente: 2.4, propietario: "Susana Ortiz", residente: "Marcos Peña (arrendatario)", email: "marcos.pena@gmail.com", telefono: "+595 984 567890" },
  { id: "un5", edificioId: "e1", numero: "6A", piso: 6, tipo: "departamento", metrosCuadrados: 95, coeficiente: 3.1, propietario: "Fernando Acosta", residente: "Fernando Acosta", email: "facosta@gmail.com", telefono: "+595 985 678901" },
  { id: "un6", edificioId: "e1", numero: "6B", piso: 6, tipo: "departamento", metrosCuadrados: 72, coeficiente: 2.4, propietario: "Claudia Ramírez", residente: "Claudia Ramírez", email: "claudia.r@hotmail.com", telefono: "+595 986 789012" },
  { id: "un7", edificioId: "e1", numero: "7A", piso: 7, tipo: "departamento", metrosCuadrados: 85, coeficiente: 2.8, propietario: "Luis Giménez", residente: "Luis Giménez", email: "lgimenez@gmail.com", telefono: "+595 987 890123" },
  { id: "un8", edificioId: "e1", numero: "7B", piso: 7, tipo: "departamento", metrosCuadrados: 110, coeficiente: 3.6, propietario: "Patricia Cardozo", residente: "Patricia Cardozo", email: "pcardozo@empresa.com.py", telefono: "+595 988 901234" },
  { id: "un9", edificioId: "e1", numero: "C-01", piso: -1, tipo: "cochera", metrosCuadrados: 15, coeficiente: 0.5, propietario: "Roberto Díaz", residente: "Roberto Díaz", email: "roberto.diaz@gmail.com", telefono: "+595 981 234567" },
  { id: "un10", edificioId: "e1", numero: "B-01", piso: -2, tipo: "bodega", metrosCuadrados: 8, coeficiente: 0.3, propietario: "Ana Benítez", residente: "Ana Benítez", email: "ana.benitez@hotmail.com", telefono: "+595 982 345678" },
];

// ============ GASTOS COMUNES (PRESUPUESTO) ============
export interface CategoriaGasto {
  id: string;
  nombre: string;
  presupuestoMensual: number;
}

export const categoriasGasto: CategoriaGasto[] = [
  { id: "cg1", nombre: "Seguridad (guardia 24h)", presupuestoMensual: 8500000 },
  { id: "cg2", nombre: "Limpieza áreas comunes", presupuestoMensual: 4200000 },
  { id: "cg3", nombre: "Energía eléctrica áreas comunes", presupuestoMensual: 3800000 },
  { id: "cg4", nombre: "Agua áreas comunes", presupuestoMensual: 1200000 },
  { id: "cg5", nombre: "Mantenimiento ascensores", presupuestoMensual: 2500000 },
  { id: "cg6", nombre: "Mantenimiento jardines", presupuestoMensual: 1800000 },
  { id: "cg7", nombre: "Fondo de reserva", presupuestoMensual: 3000000 },
  { id: "cg8", nombre: "Administración", presupuestoMensual: 2000000 },
  { id: "cg9", nombre: "Seguros del edificio", presupuestoMensual: 1500000 },
  { id: "cg10", nombre: "Varios / imprevistos", presupuestoMensual: 500000 },
];

export const totalPresupuestoMensual = categoriasGasto.reduce((sum, c) => sum + c.presupuestoMensual, 0);
// Total: ₲29,000,000

// ============ COBROS ============
export type EstadoCobro = "pendiente" | "pagado" | "vencido" | "mora";
export type CanalPago = "SPI" | "Tigo Money" | "Personal Pay" | "Transferencia Manual" | "";

export interface Cobro {
  id: string;
  unidadId: string;
  unidadNumero: string;
  residente: string;
  periodo: string;
  monto: number;
  vencimiento: string;
  estado: EstadoCobro;
  fechaPago?: string;
  canalPago?: CanalPago;
  referencia: string;
}

export const cobros: Cobro[] = [
  { id: "co1", unidadId: "un1", unidadNumero: "4A", residente: "Roberto Díaz", periodo: "Julio 2026", monto: 812000, vencimiento: "2026-07-10", estado: "pagado", fechaPago: "2026-07-08", canalPago: "SPI", referencia: "GC-NAN-4A-202607" },
  { id: "co2", unidadId: "un2", unidadNumero: "4B", residente: "Ana Benítez", periodo: "Julio 2026", monto: 696000, vencimiento: "2026-07-10", estado: "pagado", fechaPago: "2026-07-10", canalPago: "Tigo Money", referencia: "GC-NAN-4B-202607" },
  { id: "co3", unidadId: "un3", unidadNumero: "5A", residente: "Jorge Villalba", periodo: "Julio 2026", monto: 812000, vencimiento: "2026-07-10", estado: "vencido", referencia: "GC-NAN-5A-202607" },
  { id: "co4", unidadId: "un4", unidadNumero: "5B", residente: "Marcos Peña", periodo: "Julio 2026", monto: 696000, vencimiento: "2026-07-10", estado: "pagado", fechaPago: "2026-07-05", canalPago: "Personal Pay", referencia: "GC-NAN-5B-202607" },
  { id: "co5", unidadId: "un5", unidadNumero: "6A", residente: "Fernando Acosta", periodo: "Julio 2026", monto: 899000, vencimiento: "2026-07-10", estado: "mora", referencia: "GC-NAN-6A-202607" },
  { id: "co6", unidadId: "un6", unidadNumero: "6B", residente: "Claudia Ramírez", periodo: "Julio 2026", monto: 696000, vencimiento: "2026-07-10", estado: "pagado", fechaPago: "2026-07-09", canalPago: "SPI", referencia: "GC-NAN-6B-202607" },
  { id: "co7", unidadId: "un7", unidadNumero: "7A", residente: "Luis Giménez", periodo: "Julio 2026", monto: 812000, vencimiento: "2026-07-10", estado: "pendiente", referencia: "GC-NAN-7A-202607" },
  { id: "co8", unidadId: "un8", unidadNumero: "7B", residente: "Patricia Cardozo", periodo: "Julio 2026", monto: 1044000, vencimiento: "2026-07-10", estado: "pagado", fechaPago: "2026-07-03", canalPago: "Transferencia Manual", referencia: "GC-NAN-7B-202607" },
];

// ============ MOVIMIENTOS BANCARIOS ============
export interface MovimientoBancario {
  id: string;
  fecha: string;
  tipo: "ingreso" | "egreso";
  concepto: string;
  monto: number;
  referencia: string;
  conciliado: boolean;
}

export const movimientosBancarios: MovimientoBancario[] = [
  { id: "mb1", fecha: "2026-07-03", tipo: "ingreso", concepto: "Pago GC 7B - Patricia Cardozo", monto: 1044000, referencia: "GC-NAN-7B-202607", conciliado: true },
  { id: "mb2", fecha: "2026-07-05", tipo: "ingreso", concepto: "Pago GC 5B - Personal Pay", monto: 696000, referencia: "GC-NAN-5B-202607", conciliado: true },
  { id: "mb3", fecha: "2026-07-08", tipo: "ingreso", concepto: "Pago GC 4A - SPI Transfer", monto: 812000, referencia: "GC-NAN-4A-202607", conciliado: true },
  { id: "mb4", fecha: "2026-07-09", tipo: "ingreso", concepto: "Pago GC 6B - SPI Transfer", monto: 696000, referencia: "GC-NAN-6B-202607", conciliado: true },
  { id: "mb5", fecha: "2026-07-10", tipo: "ingreso", concepto: "Pago GC 4B - Tigo Money", monto: 696000, referencia: "GC-NAN-4B-202607", conciliado: true },
  { id: "mb6", fecha: "2026-07-01", tipo: "egreso", concepto: "Pago Seguridad - Guardia SRL", monto: 8500000, referencia: "FAC-2026-0045", conciliado: true },
  { id: "mb7", fecha: "2026-07-01", tipo: "egreso", concepto: "Pago Limpieza - CleanPro", monto: 4200000, referencia: "FAC-2026-0046", conciliado: true },
  { id: "mb8", fecha: "2026-07-05", tipo: "egreso", concepto: "ANDE - Electricidad áreas comunes", monto: 3650000, referencia: "ANDE-07-2026", conciliado: true },
  { id: "mb9", fecha: "2026-07-05", tipo: "egreso", concepto: "ESSAP - Agua áreas comunes", monto: 1150000, referencia: "ESSAP-07-2026", conciliado: true },
  { id: "mb10", fecha: "2026-07-15", tipo: "egreso", concepto: "Mantenimiento ascensor - ThyssenKrupp", monto: 2500000, referencia: "FAC-2026-0048", conciliado: true },
];

// ============ RECLAMOS ============
export type EstadoReclamo = "abierto" | "en_proceso" | "resuelto";

export interface Reclamo {
  id: string;
  edificioId: string;
  unidadId: string;
  residente: string;
  categoria: string;
  titulo: string;
  descripcion: string;
  estado: EstadoReclamo;
  fechaCreacion: string;
  fechaResolucion?: string;
}

export const reclamos: Reclamo[] = [
  { id: "r1", edificioId: "e1", unidadId: "un1", residente: "Roberto Díaz", categoria: "Mantención", titulo: "Filtración en techo del estacionamiento", descripcion: "Hay una filtración de agua visible en el techo del subsuelo, sector cochera C-01.", estado: "en_proceso", fechaCreacion: "2026-07-02" },
  { id: "r2", edificioId: "e1", unidadId: "un3", residente: "Jorge Villalba", categoria: "Ruido", titulo: "Ruido excesivo depto 6A en horario nocturno", descripcion: "Música fuerte después de las 23:00 de forma recurrente los fines de semana.", estado: "abierto", fechaCreacion: "2026-07-12" },
  { id: "r3", edificioId: "e1", unidadId: "un6", residente: "Claudia Ramírez", categoria: "Limpieza", titulo: "Pasillo piso 6 sin limpiar hace 3 días", descripcion: "El personal de limpieza no ha pasado por el piso 6 en los últimos 3 días.", estado: "resuelto", fechaCreacion: "2026-07-05", fechaResolucion: "2026-07-06" },
  { id: "r4", edificioId: "e1", unidadId: "un8", residente: "Patricia Cardozo", categoria: "Seguridad", titulo: "Puerta de emergencia piso 7 no cierra", descripcion: "La puerta de emergencia del piso 7 no cierra correctamente, queda entreabierta.", estado: "en_proceso", fechaCreacion: "2026-07-10" },
];

// ============ MANTENCIONES ============
export interface Mantencion {
  id: string;
  edificioId: string;
  equipo: string;
  proveedor: string;
  frecuencia: string;
  ultimaMantencion: string;
  proximaMantencion: string;
  estado: "al_dia" | "proxima" | "vencida";
}

export const mantenciones: Mantencion[] = [
  { id: "m1", edificioId: "e1", equipo: "Ascensor 1 - ThyssenKrupp", proveedor: "ThyssenKrupp Paraguay", frecuencia: "Mensual", ultimaMantencion: "2026-06-15", proximaMantencion: "2026-07-15", estado: "al_dia" },
  { id: "m2", edificioId: "e1", equipo: "Ascensor 2 - ThyssenKrupp", proveedor: "ThyssenKrupp Paraguay", frecuencia: "Mensual", ultimaMantencion: "2026-06-15", proximaMantencion: "2026-07-15", estado: "al_dia" },
  { id: "m3", edificioId: "e1", equipo: "Bomba de agua principal", proveedor: "HidroServ SRL", frecuencia: "Trimestral", ultimaMantencion: "2026-04-20", proximaMantencion: "2026-07-20", estado: "proxima" },
  { id: "m4", edificioId: "e1", equipo: "Sistema contra incendios", proveedor: "FireSafe Paraguay", frecuencia: "Semestral", ultimaMantencion: "2026-01-10", proximaMantencion: "2026-07-10", estado: "vencida" },
  { id: "m5", edificioId: "e1", equipo: "Generador eléctrico", proveedor: "ElectroGen SA", frecuencia: "Trimestral", ultimaMantencion: "2026-05-30", proximaMantencion: "2026-08-30", estado: "al_dia" },
  { id: "m6", edificioId: "e1", equipo: "Portón eléctrico cocheras", proveedor: "AutoGate PY", frecuencia: "Semestral", ultimaMantencion: "2026-03-01", proximaMantencion: "2026-09-01", estado: "al_dia" },
];

// ============ DATOS HISTÓRICOS PARA GRÁFICOS ============
export const recaudacionMensual = [
  { mes: "Ene", recaudado: 26500000, emitido: 29000000 },
  { mes: "Feb", recaudado: 27200000, emitido: 29000000 },
  { mes: "Mar", recaudado: 25800000, emitido: 29000000 },
  { mes: "Abr", recaudado: 28100000, emitido: 29000000 },
  { mes: "May", recaudado: 27900000, emitido: 29000000 },
  { mes: "Jun", recaudado: 28500000, emitido: 29000000 },
  { mes: "Jul", recaudado: 22140000, emitido: 29000000 },
];

export const morosidadMensual = [
  { mes: "Ene", porcentaje: 8.6 },
  { mes: "Feb", porcentaje: 6.2 },
  { mes: "Mar", porcentaje: 11.0 },
  { mes: "Abr", porcentaje: 3.1 },
  { mes: "May", porcentaje: 3.8 },
  { mes: "Jun", porcentaje: 1.7 },
  { mes: "Jul", porcentaje: 12.5 },
];

export const pagosPorCanal = [
  { canal: "SPI", cantidad: 18, monto: 14580000 },
  { canal: "Tigo Money", cantidad: 12, monto: 8820000 },
  { canal: "Personal Pay", cantidad: 8, monto: 5920000 },
  { canal: "Transferencia", cantidad: 5, monto: 4200000 },
];

// ============ PROVEEDORES ============
export interface Proveedor {
  id: string;
  nombre: string;
  ruc: string;
  servicio: string;
  contacto: string;
  telefono: string;
  email: string;
}

export const proveedores: Proveedor[] = [
  { id: "p1", nombre: "Guardia SRL", ruc: "80045678-2", servicio: "Seguridad 24h", contacto: "Miguel Torres", telefono: "+595 21 234567", email: "contratos@guardia.com.py" },
  { id: "p2", nombre: "CleanPro Servicios", ruc: "80056789-3", servicio: "Limpieza", contacto: "Lorena Duarte", telefono: "+595 21 345678", email: "admin@cleanpro.com.py" },
  { id: "p3", nombre: "ThyssenKrupp Paraguay", ruc: "80034567-1", servicio: "Mantención ascensores", contacto: "Carlos Ruiz", telefono: "+595 21 456789", email: "servicio@tk-py.com" },
  { id: "p4", nombre: "HidroServ SRL", ruc: "80078901-5", servicio: "Mantención bombas de agua", contacto: "Pedro Gómez", telefono: "+595 21 567890", email: "info@hidroserv.com.py" },
  { id: "p5", nombre: "FireSafe Paraguay", ruc: "80089012-6", servicio: "Sistema contra incendios", contacto: "Ricardo Martínez", telefono: "+595 21 678901", email: "ventas@firesafe.com.py" },
];

// ============ ASAMBLEAS ============
export type EstadoAsamblea = "programada" | "en_curso" | "finalizada" | "cancelada";

export interface Asamblea {
  id: string;
  edificioId: string;
  tipo: "ordinaria" | "extraordinaria" | "virtual";
  titulo: string;
  fecha: string;
  hora: string;
  lugar: string;
  agenda: string[];
  estado: EstadoAsamblea;
  quorumRequerido: number;
  asistentes: number;
  totalVotantes: number;
  actaUrl?: string;
}

export const asambleas: Asamblea[] = [
  {
    id: "as1",
    edificioId: "e1",
    tipo: "ordinaria",
    titulo: "Asamblea Ordinaria — Aprobación presupuesto 2do semestre 2026",
    fecha: "2026-07-25",
    hora: "19:00",
    lugar: "Salón de usos múltiples (SUM) — Piso 1",
    agenda: [
      "Lectura y aprobación del acta anterior",
      "Rendición de cuentas 1er semestre 2026",
      "Presentación presupuesto 2do semestre 2026",
      "Votación: Aprobación presupuesto propuesto",
      "Votación: Renovación contrato seguridad (Guardia SRL)",
      "Reclamos y sugerencias de residentes",
      "Cierre"
    ],
    estado: "programada",
    quorumRequerido: 50,
    asistentes: 0,
    totalVotantes: 48,
  },
  {
    id: "as2",
    edificioId: "e1",
    tipo: "ordinaria",
    titulo: "Asamblea Ordinaria — Rendición de cuentas 2025",
    fecha: "2026-03-20",
    hora: "19:00",
    lugar: "Salón de usos múltiples (SUM) — Piso 1",
    agenda: [
      "Rendición de cuentas año 2025",
      "Aprobación presupuesto 1er semestre 2026",
      "Elección de delegados",
      "Varios"
    ],
    estado: "finalizada",
    quorumRequerido: 50,
    asistentes: 31,
    totalVotantes: 48,
    actaUrl: "/docs/acta-asamblea-marzo-2026.pdf",
  },
];

// ============ VOTACIONES ============
export type EstadoVotacion = "activa" | "cerrada" | "desierta" | "borrador";
export type TipoVotacion = "si_no" | "opcion_multiple" | "aprobacion_gasto" | "eleccion";

export interface OpcionVotacion {
  id: string;
  texto: string;
  votos: number;
}

export interface Votacion {
  id: string;
  edificioId: string;
  titulo: string;
  descripcion: string;
  tipo: TipoVotacion;
  opciones: OpcionVotacion[];
  estado: EstadoVotacion;
  quorumRequerido: number;
  mayoriaRequerida: "simple" | "dos_tercios" | "unanimidad";
  fechaInicio: string;
  fechaCierre: string;
  totalVotantes: number;
  votosEmitidos: number;
  resultado?: string;
  montoAsociado?: number;
  creadaPor: string;
}

export const votaciones: Votacion[] = [
  {
    id: "v1",
    edificioId: "e1",
    titulo: "Pintura del lobby y pasillos",
    descripcion: "Se propone repintar el lobby de planta baja y los pasillos de todos los pisos. Se adjunta presupuesto de 3 proveedores.",
    tipo: "aprobacion_gasto",
    opciones: [
      { id: "v1-o1", texto: "Aprobar (Proveedor A — ₲ 18.500.000)", votos: 12 },
      { id: "v1-o2", texto: "Aprobar (Proveedor B — ₲ 22.000.000)", votos: 3 },
      { id: "v1-o3", texto: "Rechazar / postergar", votos: 5 },
    ],
    estado: "activa",
    quorumRequerido: 50,
    mayoriaRequerida: "simple",
    fechaInicio: "2026-07-10",
    fechaCierre: "2026-07-17",
    totalVotantes: 48,
    votosEmitidos: 20,
    montoAsociado: 18500000,
    creadaPor: "u2",
  },
  {
    id: "v2",
    edificioId: "e1",
    titulo: "Horario de uso de la piscina",
    descripcion: "Definir el horario de uso de la piscina para la temporada de verano 2026-2027.",
    tipo: "opcion_multiple",
    opciones: [
      { id: "v2-o1", texto: "7:00 a 21:00 (actual)", votos: 15 },
      { id: "v2-o2", texto: "6:00 a 22:00 (extendido)", votos: 22 },
      { id: "v2-o3", texto: "8:00 a 20:00 (reducido)", votos: 2 },
    ],
    estado: "cerrada",
    quorumRequerido: 30,
    mayoriaRequerida: "simple",
    fechaInicio: "2026-06-01",
    fechaCierre: "2026-06-08",
    totalVotantes: 48,
    votosEmitidos: 39,
    resultado: "Aprobado: Horario extendido 6:00 a 22:00",
    creadaPor: "u2",
  },
  {
    id: "v3",
    edificioId: "e1",
    titulo: "Instalación de cámaras adicionales en estacionamiento",
    descripcion: "Instalar 4 cámaras de seguridad adicionales en el subsuelo. Presupuesto: ₲ 8.200.000 del fondo de reserva.",
    tipo: "aprobacion_gasto",
    opciones: [
      { id: "v3-o1", texto: "Aprobar uso del fondo de reserva", votos: 28 },
      { id: "v3-o2", texto: "Rechazar", votos: 4 },
    ],
    estado: "cerrada",
    quorumRequerido: 50,
    mayoriaRequerida: "dos_tercios",
    fechaInicio: "2026-05-15",
    fechaCierre: "2026-05-22",
    totalVotantes: 48,
    votosEmitidos: 32,
    resultado: "Aprobado (87.5% a favor)",
    montoAsociado: 8200000,
    creadaPor: "u2",
  },
];

// ============ AUDITORÍA ============
export interface LogAuditoria {
  id: string;
  timestamp: string;
  usuario: string;
  rol: string;
  accion: string;
  modulo: string;
  detalle: string;
  ip: string;
  edificioId?: string;
}

export const logsAuditoria: LogAuditoria[] = [
  { id: "log1", timestamp: "2026-07-14 09:32:15", usuario: "María González", rol: "admin", accion: "Gasto ratificado", modulo: "Gastos OCR", detalle: "Ratificó gasto go3 (jardinería) — ₲ 1.800.000", ip: "190.52.34.120", edificioId: "e1" },
  { id: "log2", timestamp: "2026-07-14 09:15:03", usuario: "María González", rol: "admin", accion: "Pago registrado manual", modulo: "Cobros", detalle: "Registró pago manual de unidad 7A — ₲ 812.000 (transferencia)", ip: "190.52.34.120", edificioId: "e1" },
  { id: "log3", timestamp: "2026-07-13 18:45:22", usuario: "Roberto Díaz", rol: "residente", accion: "Reclamo creado", modulo: "Reclamos", detalle: "Nuevo reclamo: Filtración en techo estacionamiento", ip: "181.120.45.67", edificioId: "e1" },
  { id: "log4", timestamp: "2026-07-13 14:20:11", usuario: "María González", rol: "admin", accion: "Comunicación enviada", modulo: "Comunicaciones", detalle: "Aviso: Mantención ascensor 1 programada para 15/07. Canales: email + WhatsApp", ip: "190.52.34.120", edificioId: "e1" },
  { id: "log5", timestamp: "2026-07-12 10:05:44", usuario: "María González", rol: "admin", accion: "Votación creada", modulo: "Votaciones", detalle: "Creó votación: Pintura del lobby y pasillos", ip: "190.52.34.120", edificioId: "e1" },
  { id: "log6", timestamp: "2026-07-10 16:30:00", usuario: "Ana Benítez", rol: "residente", accion: "Voto emitido", modulo: "Votaciones", detalle: "Votó en: Pintura del lobby y pasillos", ip: "200.10.22.89", edificioId: "e1" },
  { id: "log7", timestamp: "2026-07-10 08:00:01", usuario: "Sistema", rol: "sistema", accion: "Cobros emitidos", modulo: "Cobros", detalle: "Liquidación Julio 2026 emitida — 8 cobros generados por ₲ 5.467.000 total", ip: "—", edificioId: "e1" },
  { id: "log8", timestamp: "2026-07-09 22:15:33", usuario: "Carlos Méndez", rol: "superadmin", accion: "Login", modulo: "Auth", detalle: "Login exitoso desde nuevo dispositivo", ip: "45.230.12.100" },
  { id: "log9", timestamp: "2026-07-08 11:45:00", usuario: "María González", rol: "admin", accion: "Conciliación bancaria", modulo: "Banco", detalle: "Importó extracto bancario: 5 ingresos conciliados automáticamente", ip: "190.52.34.120", edificioId: "e1" },
  { id: "log10", timestamp: "2026-07-05 09:00:12", usuario: "María González", rol: "admin", accion: "Gasto subido", modulo: "Gastos OCR", detalle: "Subió factura: factura-ande-julio-2026.pdf — OCR procesó exitosamente", ip: "190.52.34.120", edificioId: "e1" },
];

export function getEstadoVotacionColor(estado: EstadoVotacion): string {
  switch (estado) {
    case "activa": return "bg-green-100 text-green-800";
    case "cerrada": return "bg-gray-100 text-gray-800";
    case "desierta": return "bg-red-100 text-red-800";
    case "borrador": return "bg-blue-100 text-blue-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export function getEstadoAsambleaColor(estado: EstadoAsamblea): string {
  switch (estado) {
    case "programada": return "bg-blue-100 text-blue-800";
    case "en_curso": return "bg-green-100 text-green-800";
    case "finalizada": return "bg-gray-100 text-gray-800";
    case "cancelada": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

// ============ CENTROS DE COSTO ============
export interface CentroCosto {
  id: string;
  nombre: string;
  padre?: string;
  presupuestoMensual: number;
  activo: boolean;
  prorrateable: boolean;
}

export const centrosCosto: CentroCosto[] = [
  { id: "cc1", nombre: "Gastos Básicos", presupuestoMensual: 5000000, activo: true, prorrateable: true },
  { id: "cc1-1", nombre: "Electricidad áreas comunes", padre: "cc1", presupuestoMensual: 3800000, activo: true, prorrateable: true },
  { id: "cc1-2", nombre: "Agua áreas comunes", padre: "cc1", presupuestoMensual: 1200000, activo: true, prorrateable: true },
  { id: "cc2", nombre: "Remuneraciones", presupuestoMensual: 8500000, activo: true, prorrateable: true },
  { id: "cc2-1", nombre: "Sueldos personal", padre: "cc2", presupuestoMensual: 7500000, activo: true, prorrateable: true },
  { id: "cc2-2", nombre: "Aportes patronales (IPS)", padre: "cc2", presupuestoMensual: 1000000, activo: true, prorrateable: true },
  { id: "cc3", nombre: "Servicios contratados", presupuestoMensual: 14500000, activo: true, prorrateable: true },
  { id: "cc3-1", nombre: "Seguridad (empresa externa)", padre: "cc3", presupuestoMensual: 8500000, activo: true, prorrateable: true },
  { id: "cc3-2", nombre: "Limpieza (empresa externa)", padre: "cc3", presupuestoMensual: 4200000, activo: true, prorrateable: true },
  { id: "cc3-3", nombre: "Jardinería / paisajismo", padre: "cc3", presupuestoMensual: 1800000, activo: true, prorrateable: true },
  { id: "cc4", nombre: "Mantención y reparaciones", presupuestoMensual: 2500000, activo: true, prorrateable: true },
  { id: "cc4-1", nombre: "Ascensores", padre: "cc4", presupuestoMensual: 2500000, activo: true, prorrateable: true },
  { id: "cc5", nombre: "Seguros", presupuestoMensual: 1500000, activo: true, prorrateable: true },
  { id: "cc6", nombre: "Administración", presupuestoMensual: 2000000, activo: true, prorrateable: false },
  { id: "cc7", nombre: "Fondo de reserva", presupuestoMensual: 3000000, activo: true, prorrateable: true },
  { id: "cc8", nombre: "Extraordinarios", presupuestoMensual: 0, activo: true, prorrateable: true },
];

// ============ GASTOS CON OCR ============
export type EstadoGasto = "procesando" | "draft" | "ratificado" | "rechazado";
export type ConfianzaOCR = "alta" | "media" | "baja";

export interface GastoOCR {
  id: string;
  edificioId: string;
  archivoNombre: string;
  archivoUrl: string;
  fechaSubida: string;
  estado: EstadoGasto;
  // Datos extraídos por OCR
  proveedorDetectado: string;
  proveedorConfianza: ConfianzaOCR;
  montoDetectado: number;
  montoConfianza: ConfianzaOCR;
  fechaDocumento: string;
  fechaConfianza: ConfianzaOCR;
  numeroFactura: string;
  facturaConfianza: ConfianzaOCR;
  // Clasificación ML
  centroCostoSugerido: string;
  centroCostoConfianza: ConfianzaOCR;
  // Datos ratificados por admin (post-revisión)
  proveedorFinal?: string;
  montoFinal?: number;
  centroCostoFinal?: string;
  descripcion?: string;
  periodo?: string;
  fechaRatificacion?: string;
  ratificadoPor?: string;
}

export const gastosOCR: GastoOCR[] = [
  {
    id: "go1",
    edificioId: "e1",
    archivoNombre: "factura-ande-julio-2026.pdf",
    archivoUrl: "/docs/factura-ande-julio-2026.pdf",
    fechaSubida: "2026-07-05",
    estado: "ratificado",
    proveedorDetectado: "ANDE - Administración Nacional de Electricidad",
    proveedorConfianza: "alta",
    montoDetectado: 3650000,
    montoConfianza: "alta",
    fechaDocumento: "2026-07-01",
    fechaConfianza: "alta",
    numeroFactura: "001-001-0045678",
    facturaConfianza: "alta",
    centroCostoSugerido: "cc1-1",
    centroCostoConfianza: "alta",
    proveedorFinal: "ANDE",
    montoFinal: 3650000,
    centroCostoFinal: "cc1-1",
    descripcion: "Consumo eléctrico áreas comunes - Julio 2026",
    periodo: "Julio 2026",
    fechaRatificacion: "2026-07-05",
    ratificadoPor: "u2",
  },
  {
    id: "go2",
    edificioId: "e1",
    archivoNombre: "factura-essap-julio-2026.pdf",
    archivoUrl: "/docs/factura-essap-julio-2026.pdf",
    fechaSubida: "2026-07-05",
    estado: "ratificado",
    proveedorDetectado: "ESSAP - Empresa de Servicios Sanitarios",
    proveedorConfianza: "alta",
    montoDetectado: 1150000,
    montoConfianza: "alta",
    fechaDocumento: "2026-07-01",
    fechaConfianza: "alta",
    numeroFactura: "002-001-0089123",
    facturaConfianza: "alta",
    centroCostoSugerido: "cc1-2",
    centroCostoConfianza: "alta",
    proveedorFinal: "ESSAP",
    montoFinal: 1150000,
    centroCostoFinal: "cc1-2",
    descripcion: "Consumo agua áreas comunes - Julio 2026",
    periodo: "Julio 2026",
    fechaRatificacion: "2026-07-05",
    ratificadoPor: "u2",
  },
  {
    id: "go3",
    edificioId: "e1",
    archivoNombre: "boleta-jardineria-julio.jpg",
    archivoUrl: "/docs/boleta-jardineria-julio.jpg",
    fechaSubida: "2026-07-12",
    estado: "draft",
    proveedorDetectado: "Verde & Jardín SRL",
    proveedorConfianza: "media",
    montoDetectado: 1800000,
    montoConfianza: "alta",
    fechaDocumento: "2026-07-10",
    fechaConfianza: "media",
    numeroFactura: "003-001-0001234",
    facturaConfianza: "baja",
    centroCostoSugerido: "cc3-3",
    centroCostoConfianza: "media",
  },
  {
    id: "go4",
    edificioId: "e1",
    archivoNombre: "recibo-reparacion-portero.jpg",
    archivoUrl: "/docs/recibo-reparacion-portero.jpg",
    fechaSubida: "2026-07-14",
    estado: "draft",
    proveedorDetectado: "No identificado",
    proveedorConfianza: "baja",
    montoDetectado: 450000,
    montoConfianza: "media",
    fechaDocumento: "2026-07-13",
    fechaConfianza: "media",
    numeroFactura: "",
    facturaConfianza: "baja",
    centroCostoSugerido: "cc4",
    centroCostoConfianza: "baja",
  },
  {
    id: "go5",
    edificioId: "e1",
    archivoNombre: "factura-guardia-srl-julio.pdf",
    archivoUrl: "/docs/factura-guardia-srl-julio.pdf",
    fechaSubida: "2026-07-01",
    estado: "ratificado",
    proveedorDetectado: "Guardia SRL",
    proveedorConfianza: "alta",
    montoDetectado: 8500000,
    montoConfianza: "alta",
    fechaDocumento: "2026-07-01",
    fechaConfianza: "alta",
    numeroFactura: "005-001-0007890",
    facturaConfianza: "alta",
    centroCostoSugerido: "cc3-1",
    centroCostoConfianza: "alta",
    proveedorFinal: "Guardia SRL",
    montoFinal: 8500000,
    centroCostoFinal: "cc3-1",
    descripcion: "Servicio de seguridad 24h - Julio 2026",
    periodo: "Julio 2026",
    fechaRatificacion: "2026-07-01",
    ratificadoPor: "u2",
  },
  {
    id: "go6",
    edificioId: "e1",
    archivoNombre: "factura-cleanpro-julio.pdf",
    archivoUrl: "/docs/factura-cleanpro-julio.pdf",
    fechaSubida: "2026-07-02",
    estado: "procesando",
    proveedorDetectado: "",
    proveedorConfianza: "baja",
    montoDetectado: 0,
    montoConfianza: "baja",
    fechaDocumento: "",
    fechaConfianza: "baja",
    numeroFactura: "",
    facturaConfianza: "baja",
    centroCostoSugerido: "",
    centroCostoConfianza: "baja",
  },
];

export function getConfianzaColor(confianza: ConfianzaOCR): string {
  switch (confianza) {
    case "alta": return "text-green-600";
    case "media": return "text-yellow-600";
    case "baja": return "text-red-600";
    default: return "text-gray-500";
  }
}

export function getEstadoGastoColor(estado: EstadoGasto): string {
  switch (estado) {
    case "procesando": return "bg-blue-100 text-blue-800";
    case "draft": return "bg-yellow-100 text-yellow-800";
    case "ratificado": return "bg-green-100 text-green-800";
    case "rechazado": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export function getEstadoGastoLabel(estado: EstadoGasto): string {
  switch (estado) {
    case "procesando": return "Procesando OCR";
    case "draft": return "Borrador";
    case "ratificado": return "Ratificado";
    case "rechazado": return "Rechazado";
    default: return estado;
  }
}

export function getCentroCostoNombre(id: string): string {
  const cc = centrosCosto.find(c => c.id === id);
  return cc ? cc.nombre : "Sin clasificar";
}

// ============ HELPERS ============
export function formatGuaranies(monto: number): string {
  return "₲ " + monto.toLocaleString("es-PY");
}

export function getEstadoColor(estado: EstadoCobro): string {
  switch (estado) {
    case "pagado": return "bg-green-100 text-green-800";
    case "pendiente": return "bg-yellow-100 text-yellow-800";
    case "vencido": return "bg-orange-100 text-orange-800";
    case "mora": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export function getEstadoReclamoColor(estado: EstadoReclamo): string {
  switch (estado) {
    case "abierto": return "bg-red-100 text-red-800";
    case "en_proceso": return "bg-yellow-100 text-yellow-800";
    case "resuelto": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export function getMantencionColor(estado: string): string {
  switch (estado) {
    case "al_dia": return "bg-green-100 text-green-800";
    case "proxima": return "bg-yellow-100 text-yellow-800";
    case "vencida": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

// ============ TRABAJADORES ============
export interface Trabajador {
  id: string;
  nombre: string;
  cargo: string;
  cedula: string;
  fechaIngreso: string;
  salario: number;
  ips: boolean;
  tipoContrato: "indefinido" | "plazo_fijo" | "temporal";
  horario: string;
  edificioId: string;
  telefono: string;
  email: string;
  contactoEmergencia: string;
}

export const trabajadores: Trabajador[] = [
  { id: "t1", nombre: "Miguel Paredes", cargo: "Conserje", cedula: "3.456.789", fechaIngreso: "2024-03-15", salario: 2800000, ips: true, tipoContrato: "indefinido", horario: "06:00 - 14:00", edificioId: "e1", telefono: "+595 981 111222", email: "miguel.paredes@gmail.com", contactoEmergencia: "Rosa Paredes +595 982 333444" },
  { id: "t2", nombre: "Juan Ramón Bogado", cargo: "Guardia nocturno", cedula: "4.567.890", fechaIngreso: "2024-06-01", salario: 2650000, ips: true, tipoContrato: "indefinido", horario: "22:00 - 06:00", edificioId: "e1", telefono: "+595 983 222333", email: "jrbogado@gmail.com", contactoEmergencia: "María Bogado +595 984 555666" },
  { id: "t3", nombre: "Liz Martínez", cargo: "Limpieza", cedula: "5.678.901", fechaIngreso: "2025-01-10", salario: 2550000, ips: true, tipoContrato: "plazo_fijo", horario: "07:00 - 15:00", edificioId: "e1", telefono: "+595 985 444555", email: "liz.martinez@hotmail.com", contactoEmergencia: "Carlos Martínez +595 986 777888" },
];

// ============ TURNOS ============
export interface Turno {
  id: string;
  trabajadorId: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  tipo: "regular" | "extra" | "feriado";
  estado: "cumplido" | "programado" | "ausente";
  notas?: string;
}

export const turnos: Turno[] = [
  { id: "tu1", trabajadorId: "t1", fecha: "2026-07-14", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "cumplido" },
  { id: "tu2", trabajadorId: "t1", fecha: "2026-07-15", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "cumplido" },
  { id: "tu3", trabajadorId: "t1", fecha: "2026-07-16", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "cumplido" },
  { id: "tu4", trabajadorId: "t1", fecha: "2026-07-17", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "cumplido" },
  { id: "tu5", trabajadorId: "t1", fecha: "2026-07-18", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "cumplido" },
  { id: "tu6", trabajadorId: "t1", fecha: "2026-07-19", horaInicio: "06:00", horaFin: "18:00", tipo: "extra", estado: "cumplido", notas: "Cobertura por ausencia guardia" },
  { id: "tu7", trabajadorId: "t1", fecha: "2026-07-20", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "programado" },
  { id: "tu8", trabajadorId: "t1", fecha: "2026-07-21", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "programado" },
  { id: "tu9", trabajadorId: "t1", fecha: "2026-07-22", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "programado" },
  { id: "tu10", trabajadorId: "t1", fecha: "2026-07-23", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "programado" },
  { id: "tu11", trabajadorId: "t1", fecha: "2026-07-24", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "programado" },
  { id: "tu12", trabajadorId: "t1", fecha: "2026-07-25", horaInicio: "06:00", horaFin: "14:00", tipo: "regular", estado: "programado" },
];

// ============ LIQUIDACIONES DE SUELDO ============
export interface LiquidacionSueldo {
  id: string;
  trabajadorId: string;
  periodo: string;
  salarioBase: number;
  horasExtra: number;
  montoHorasExtra: number;
  bonificacion: number;
  descuentoIps: number;
  otrosDescuentos: number;
  netoAPagar: number;
  fechaPago: string;
  estado: "pagado" | "pendiente";
}

export const liquidacionesSueldo: LiquidacionSueldo[] = [
  { id: "ls1", trabajadorId: "t1", periodo: "Julio 2026", salarioBase: 2800000, horasExtra: 12, montoHorasExtra: 280000, bonificacion: 0, descuentoIps: 277200, otrosDescuentos: 0, netoAPagar: 2802800, fechaPago: "2026-07-31", estado: "pendiente" },
  { id: "ls2", trabajadorId: "t1", periodo: "Junio 2026", salarioBase: 2800000, horasExtra: 4, montoHorasExtra: 93333, bonificacion: 0, descuentoIps: 260700, otrosDescuentos: 0, netoAPagar: 2632633, fechaPago: "2026-06-30", estado: "pagado" },
  { id: "ls3", trabajadorId: "t1", periodo: "Mayo 2026", salarioBase: 2800000, horasExtra: 0, montoHorasExtra: 0, bonificacion: 0, descuentoIps: 252000, otrosDescuentos: 0, netoAPagar: 2548000, fechaPago: "2026-05-31", estado: "pagado" },
  { id: "ls4", trabajadorId: "t1", periodo: "Abril 2026", salarioBase: 2800000, horasExtra: 8, montoHorasExtra: 186667, bonificacion: 200000, descuentoIps: 287400, otrosDescuentos: 0, netoAPagar: 2899267, fechaPago: "2026-04-30", estado: "pagado" },
  { id: "ls5", trabajadorId: "t1", periodo: "Marzo 2026", salarioBase: 2800000, horasExtra: 0, montoHorasExtra: 0, bonificacion: 0, descuentoIps: 252000, otrosDescuentos: 150000, netoAPagar: 2398000, fechaPago: "2026-03-31", estado: "pagado" },
];

// ============ CONTRATO INFO ============
export interface ContratoInfo {
  trabajadorId: string;
  tipoContrato: string;
  fechaInicio: string;
  fechaFin: string | null;
  cargo: string;
  salarioBase: number;
  jornadaSemanal: string;
  diasDescanso: string;
  vacacionesDias: number;
  vacacionesUsadas: number;
  aguinaldoProporcional: number;
  clausulasEspeciales: string[];
}

export const contratos: ContratoInfo[] = [
  {
    trabajadorId: "t1",
    tipoContrato: "Contrato de trabajo por tiempo indefinido",
    fechaInicio: "2024-03-15",
    fechaFin: null,
    cargo: "Conserje / Portero",
    salarioBase: 2800000,
    jornadaSemanal: "Lunes a Sábado, 06:00 a 14:00 (48 hrs/semana)",
    diasDescanso: "Domingos y feriados",
    vacacionesDias: 12,
    vacacionesUsadas: 5,
    aguinaldoProporcional: 2800000,
    clausulasEspeciales: [
      "Uso obligatorio de uniforme proporcionado por el empleador",
      "Prohibición de abandonar el puesto sin autorización del administrador",
      "Obligación de registrar ingreso y salida en bitácora",
      "Período de prueba: 60 días (ya cumplido)",
    ],
  },
];

export function getTurnoColor(estado: string): string {
  switch (estado) {
    case "cumplido": return "bg-green-100 text-green-800";
    case "programado": return "bg-blue-100 text-blue-800";
    case "ausente": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export function getTurnoTipoColor(tipo: string): string {
  switch (tipo) {
    case "regular": return "text-gray-500";
    case "extra": return "text-orange-600 font-medium";
    case "feriado": return "text-purple-600 font-medium";
    default: return "text-gray-500";
  }
}

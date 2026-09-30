// Demostración académica: en un sistema real la autenticación va en el servidor.
export const USUARIOS = {
  admin: { clave: "1234", rol: "administrador", nombre: "Administrador" },
  recepcion: { clave: "1234", rol: "recepcionista", nombre: "Recepción" },
  medico: { clave: "1234", rol: "medico", nombre: "Médico" },
}

export const PERMISOS = {
  admitir: ["recepcionista"],
  eliminarPaciente: ["recepcionista"],
  atender: ["recepcionista", "medico"],
  cambiarGuardia: ["medico"],
  gestionarMedicos: ["administrador"],
  calculadora: ["administrador"],
}

export const ITEMS_MENU = [
  { to: "/", etiqueta: "Inicio", icono: "house" },
  { to: "/sala-espera", etiqueta: "Sala de espera", icono: "kanban" },
  { to: "/equipo", etiqueta: "Equipo médico", icono: "people" },
  { to: "/retribuciones", etiqueta: "Retribuciones", icono: "calculator", permiso: "calculadora" },
]

export const PRIORIDAD = { Rojo: 0, Amarillo: 1, Verde: 2 }

export const TRIAGE_UI = {
  Rojo: { variante: "danger", icono: "🔴", etiqueta: "Emergencia" },
  Amarillo: { variante: "warning", icono: "🟡", etiqueta: "Urgencia intermedia" },
  Verde: { variante: "success", icono: "🟢", etiqueta: "Consulta leve" },
}

export const ESTADO_UI = { "En Espera": "warning", "En Atención": "info", Atendido: "success" }
export const VARIANTES_TEXTO_OSCURO = ["warning", "info"]

export const PERFILES = [
  { valor: "Facultativo", etiqueta: "Facultativo / Especialista", valorHora: 28.5 },
  { valor: "MIR", etiqueta: "Médico residente (MIR)", valorHora: 18 },
  { valor: "Enfermeria", etiqueta: "Enfermería / Técnico", valorHora: 22 },
]

export const DURACIONES = [
  { valor: 24, etiqueta: "Guardia completa (24 h)" },
  { valor: 12, etiqueta: "Media guardia (12 h)" },
]

export const SUELDO_BASE = 2500

const horaDeHoy = (h, m) => new Date().setHours(h, m, 0, 0)

export const pacientesIniciales = () => [
  { id: 1, dni: "38123456", nombre: "María Thompson", motivo: "Dolor precordial con disnea", triage: "Rojo", estado: "En Espera", ingreso: horaDeHoy(9, 15), inicio: null, fin: null },
  { id: 2, dni: "40987654", nombre: "Juan Pérez", motivo: "Fiebre alta y cefalea persistente", triage: "Amarillo", estado: "En Atención", ingreso: horaDeHoy(9, 30), inicio: horaDeHoy(9, 42), fin: null },
  { id: 3, dni: "42111222", nombre: "Lucas Benítez", motivo: "Traumatismo leve en tobillo derecho", triage: "Verde", estado: "En Espera", ingreso: horaDeHoy(9, 45), inicio: null, fin: null },
]

export const medicosIniciales = () => [
  { id: 1, nombre: "Dr. Carlos Mendoza", especialidad: "Cardiología", matricula: "45211", activo: true },
  { id: 2, nombre: "Dra. Valeria Ríos", especialidad: "Clínica Médica", matricula: "58920", activo: false },
]

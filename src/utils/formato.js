const moneda = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" })

export const formatoMoneda = (numero) => moneda.format(numero)

export const formatoHora = (marca) =>
  new Date(marca).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })

export const esHoy = (marca) => Boolean(marca) && new Date(marca).toDateString() === new Date().toDateString()

export function turnoActual() {
  const hora = new Date().getHours()
  if (hora >= 6 && hora < 14) return "mañana"
  if (hora >= 14 && hora < 22) return "tarde"
  return "noche"
}
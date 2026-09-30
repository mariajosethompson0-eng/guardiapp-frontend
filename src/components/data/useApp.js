import { useContext } from "react"
import { AuthContext, GuardiaContext } from "../context/contexts.js"

function usarContexto(contexto, nombre) {
  const valor = useContext(contexto)
  if (!valor) throw new Error(`${nombre} debe usarse dentro de su Provider`)
  return valor
}

export const useAuth = () => usarContexto(AuthContext, "useAuth")
export const useGuardia = () => usarContexto(GuardiaContext, "useGuardia")

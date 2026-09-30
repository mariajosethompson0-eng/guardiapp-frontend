import { useMemo, useState } from "react"
import { AuthContext } from "./contexts.js"
import { PERMISOS, USUARIOS } from "../data/constantes.js"

const CLAVE_SESION = "guardiasapp.sesion"

function leerSesion() {
  try {
    const clave = sessionStorage.getItem(CLAVE_SESION)
    return USUARIOS[clave] ? { usuario: clave, ...USUARIOS[clave] } : null
  } catch {
    return null
  }
}

export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion)

  const value = useMemo(() => {
    // Devuelve la sesión si las credenciales son válidas, o null si no lo son.
    const login = (nombreUsuario, clave) => {
      const id = nombreUsuario.trim().toLowerCase()
      const cuenta = USUARIOS[id]
      if (!cuenta || cuenta.clave !== clave) return null
      const sesion = { usuario: id, ...cuenta }
      setUsuario(sesion)
      try { sessionStorage.setItem(CLAVE_SESION, id) } catch { /* la sesión dura hasta recargar */ }
      return sesion
    }

    const logout = () => {
      setUsuario(null)
      try { sessionStorage.removeItem(CLAVE_SESION) } catch { /* sin sesión guardada */ }
    }

    const puede = (accion) => Boolean(usuario) && PERMISOS[accion].includes(usuario.rol)

    return { usuario, login, logout, puede }
  }, [usuario])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

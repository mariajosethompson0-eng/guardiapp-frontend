import { useMemo, useState } from "react"
import { GuardiaContext } from "./contexts.js"
import useLocalStorage from "../hooks/useLocalStorage.js"
import { PRIORIDAD, medicosIniciales, pacientesIniciales } from "../data/constantes.js"
import { esHoy } from "../utils/formato.js"

export default function GuardiaProvider({ children }) {
  const [pacientes, setPacientes] = useLocalStorage("guardiasapp.pacientes", pacientesIniciales)
  const [medicos, setMedicos] = useLocalStorage("guardiasapp.medicos", medicosIniciales)
  const [aviso, setAviso] = useState(null)

  const value = useMemo(() => {
    const avisar = (mensaje, tipo = "success") => setAviso({ id: Date.now(), mensaje, tipo })

    const activos = pacientes
      .filter((p) => p.estado !== "Atendido")
      .sort((a, b) => PRIORIDAD[a.triage] - PRIORIDAD[b.triage] || a.ingreso - b.ingreso)
    const atendidos = pacientes.filter((p) => p.estado === "Atendido").sort((a, b) => b.fin - a.fin)

    const enEspera = pacientes.filter((p) => p.estado === "En Espera")
    const esperas = pacientes.filter((p) => p.inicio && esHoy(p.ingreso)).map((p) => p.inicio - p.ingreso)

    const indicadores = {
      criticos: enEspera.filter((p) => p.triage === "Rojo").length,
      enEspera: enEspera.length,
      activos: activos.length,
      atendidosHoy: atendidos.filter((p) => esHoy(p.fin)).length,
      esperaMedia: esperas.length ? Math.round(esperas.reduce((a, b) => a + b, 0) / esperas.length / 60000) : null,
      medicosActivos: medicos.filter((m) => m.activo).length,
    }

    const registrarPaciente = (datos) => {
      if (pacientes.some((p) => p.dni === datos.dni && p.estado !== "Atendido")) {
        return { ok: false, error: "Ese DNI ya está en la sala de espera." }
      }
      const ahora = Date.now()
      setPacientes((prev) => [...prev, { ...datos, id: ahora, estado: "En Espera", ingreso: ahora, inicio: null, fin: null }])
      avisar(`${datos.nombre} registrado con triage ${datos.triage}.`)
      return { ok: true }
    }

    const cambiarEstado = (id, estado) => {
      const ahora = Date.now()
      const paciente = pacientes.find((p) => p.id === id)
      if (!paciente) return
      setPacientes((prev) => prev.map((p) => (p.id !== id ? p : {
        ...p,
        estado,
        inicio: estado === "En Atención" ? ahora : p.inicio,
        fin: estado === "Atendido" ? ahora : p.fin,
      })))
      avisar(`${paciente.nombre}: ${estado.toLowerCase()}.`)
    }

    const eliminarPaciente = (id) => {
      setPacientes((prev) => prev.filter((p) => p.id !== id))
      avisar("Paciente eliminado de la lista.")
    }

    const agregarMedico = (datos) => {
      if (medicos.some((m) => m.matricula === datos.matricula)) {
        return { ok: false, error: "Ya existe un profesional con esa matrícula." }
      }
      setMedicos((prev) => [...prev, { ...datos, id: Date.now(), activo: true }])
      avisar(`${datos.nombre} se incorporó al equipo.`)
      return { ok: true }
    }

    const alternarMedico = (id) => {
      const medico = medicos.find((m) => m.id === id)
      if (!medico) return
      setMedicos((prev) => prev.map((m) => (m.id === id ? { ...m, activo: !m.activo } : m)))
      avisar(`${medico.nombre} está ${medico.activo ? "en descanso" : "en guardia activa"}.`)
    }

    const eliminarMedico = (id) => {
      const medico = medicos.find((m) => m.id === id)
      setMedicos((prev) => prev.filter((m) => m.id !== id))
      if (medico) avisar(`${medico.nombre} fue dado de baja.`)
    }

    return {
      pacientesOrdenados: [...activos, ...atendidos],
      medicos,
      indicadores,
      aviso,
      avisar,
      cerrarAviso: () => setAviso(null),
      registrarPaciente,
      cambiarEstado,
      eliminarPaciente,
      agregarMedico,
      alternarMedico,
      eliminarMedico,
    }
  }, [pacientes, medicos, aviso, setPacientes, setMedicos])

  return <GuardiaContext.Provider value={value}>{children}</GuardiaContext.Provider>
}
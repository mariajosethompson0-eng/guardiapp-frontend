import { Badge, Button } from "react-bootstrap"
import TriageBadge from "../components/Pages/TriageBadge.jsx"
import { ESTADO_UI, VARIANTES_TEXTO_OSCURO } from "../data/constantes.js"
import { formatoHora } from "../utils/formato.js"

export default function PacienteRow({ paciente, sesionActiva, puedeAtender, puedeEliminar, onCambiarEstado, onEliminar }) {
  const { id, nombre, dni, motivo, triage, estado, ingreso } = paciente
  const variante = ESTADO_UI[estado]

  return (
    <tr>
      <td className="text-secondary fw-semibold">{formatoHora(ingreso)}</td>
      <td>
        <div className="fw-semibold">{nombre}</div>
        <small className="text-secondary d-block">DNI {dni}</small>
        <small className="text-secondary">{motivo}</small>
      </td>
      <td><TriageBadge triage={triage} /></td>
      <td><Badge bg={variante} text={VARIANTES_TEXTO_OSCURO.includes(variante) ? "dark" : undefined}>{estado}</Badge></td>
      <td className="text-end text-nowrap">
        {!sesionActiva && <small className="text-secondary">Iniciá sesión</small>}
        {sesionActiva && !puedeAtender && <small className="text-secondary">Solo lectura</small>}
        {puedeAtender && estado === "En Espera" && (
          <Button size="sm" variant="outline-info" onClick={() => onCambiarEstado(id, "En Atención")}>
            <i className="bi bi-play-fill me-1" aria-hidden="true" />Atender
          </Button>
        )}
        {puedeAtender && estado === "En Atención" && (
          <Button size="sm" variant="outline-success" onClick={() => onCambiarEstado(id, "Atendido")}>
            <i className="bi bi-check2-all me-1" aria-hidden="true" />Finalizar
          </Button>
        )}
        {puedeAtender && estado === "Atendido" && (
          <small className="text-success"><i className="bi bi-check-circle-fill me-1" aria-hidden="true" />Atendido</small>
        )}
        {puedeEliminar && (
          <Button size="sm" variant="outline-danger" className="ms-2" onClick={() => onEliminar(paciente)} aria-label={`Eliminar a ${nombre}`}>
            <i className="bi bi-trash-fill" aria-hidden="true" />
          </Button>
        )}
      </td>
    </tr>
  )
}

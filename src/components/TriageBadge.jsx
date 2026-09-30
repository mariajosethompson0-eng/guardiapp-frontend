import { Badge } from "react-bootstrap"
import { TRIAGE_UI, VARIANTES_TEXTO_OSCURO } from "../data/constantes.js"

export default function TriageBadge({ triage }) {
  const { variante, icono } = TRIAGE_UI[triage]
  return (
    <Badge pill bg={variante} text={VARIANTES_TEXTO_OSCURO.includes(variante) ? "dark" : undefined}>
      {icono} {triage}
    </Badge>
  )
}

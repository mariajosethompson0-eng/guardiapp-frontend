import { Badge, Button, Card } from "react-bootstrap"

// accion (opcional): { texto, variante, onClick }
export default function MedicoCard({ medico, accion }) {
  const { nombre, especialidad, matricula, activo } = medico
  return (
    <Card as="article" className={`h-100 bg-body-tertiary rounded-4 border-start border-4 ${activo ? "border-success" : "border-warning"}`}>
      <Card.Body>
        <div className="d-flex align-items-center gap-3 mb-3">
          <span className="bg-primary-subtle text-primary-emphasis rounded-circle p-3 lh-1">
            <i className="bi bi-person-fill fs-3" aria-hidden="true" />
          </span>
          <div>
            <Card.Title as="h3" className="h6 fw-bold mb-0">{nombre}</Card.Title>
            <small className="text-secondary">{especialidad} · Mat. {matricula}</small>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Badge bg={activo ? "success" : "warning"} text={activo ? undefined : "dark"}>
            {activo ? "En guardia activa" : "En descanso"}
          </Badge>
          {accion && <Button size="sm" variant={accion.variante} className="rounded-pill" onClick={accion.onClick}>{accion.texto}</Button>}
        </div>
      </Card.Body>
    </Card>
  )
}

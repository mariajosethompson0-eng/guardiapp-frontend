import { Badge, Button, Card, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import Seo from "../components/Seo.jsx"
import StatCard from "../components/StatCard.jsx"
import { useGuardia } from "../../hooks/useApp.js"
import { turnoActual } from "../utils/formato.js"

export default function Inicio() {
  const { indicadores } = useGuardia()
  const estadisticas = [
    { etiqueta: "Atendidos hoy", valor: indicadores.atendidosHoy },
    { etiqueta: "Espera media", valor: indicadores.esperaMedia === null ? "—" : `${indicadores.esperaMedia} min`, variante: "primary" },
  ]

  return (
    <>
      <Seo titulo="GuardiasApp | Recepción, Triage y Sala de Espera en Tiempo Real" descripcion="GuardiasApp digitaliza la guardia médica: registra pacientes, ordena la sala de espera por triage y gestiona al equipo de guardia." />
      <Row as="section" className="align-items-center g-4 py-3">
        <Col lg={7}>
          <h1 className="display-5 fw-bold mb-3">Cada paciente en su lugar, cada guardia bajo control</h1>
          <p className="lead text-secondary mb-4">Registrá la llegada, ordená la sala de espera según el triage y seguí quién está de guardia, todo desde una sola pantalla.</p>
          <Button as={Link} to="/sala-espera" size="lg" className="rounded-pill px-4 fw-semibold">
            <i className="bi bi-hospital me-2" aria-hidden="true" />Ver sala de espera
          </Button>
        </Col>
        <Col lg={5}>
          <Card className="bg-body-tertiary border-primary-subtle rounded-4 shadow">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h6 fw-bold mb-0 text-primary-emphasis"><i className="bi bi-activity me-2" aria-hidden="true" />Estado del servicio</h2>
                <Badge bg="success">Operativo</Badge>
              </div>
              <Row className="g-2 mb-3">
                {estadisticas.map((e) => <Col xs={6} key={e.etiqueta}><StatCard {...e} /></Col>)}
              </Row>
              <p className="small text-secondary border-top pt-3 mb-0">
                Turno <strong className="text-primary-emphasis">{turnoActual()}</strong> · {indicadores.activos} pacientes activos
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

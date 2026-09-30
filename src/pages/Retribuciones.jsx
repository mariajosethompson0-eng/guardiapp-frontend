import { Card } from "react-bootstrap"
import Seo from "../components/Seo.jsx"
import CalculadoraRetribucion from "../components/CalculadoraRetribucion.jsx"

export default function Retribuciones() {
  return (
    <>
      <Seo titulo="Retribución de guardias" descripcion="Calculadora interna para estimar la retribución mensual según perfil, cantidad y duración de las guardias." noIndex />
      <Card as="section" className="bg-body-tertiary rounded-4 shadow">
        <Card.Body className="p-4">
          <h1 className="h4 fw-bold mb-4"><i className="bi bi-cash-coin me-2 text-primary" aria-hidden="true" />Retribución de guardias</h1>
          <CalculadoraRetribucion />
        </Card.Body>
      </Card>
    </>
  )
}

import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Seo from "../components/Seo.jsx"

export default function NoEncontrada() {
  return (
    <section className="text-center py-5">
      <Seo titulo="Página no encontrada" descripcion="La página que buscás no existe en GuardiasApp." noIndex />
      <p className="display-1 fw-bold text-primary mb-0">404</p>
      <h1 className="h4 mb-3">No encontramos esa página</h1>
      <Button as={Link} to="/" className="rounded-pill px-4">Volver al inicio</Button>
    </section>
  )
}

import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"

export default function NavBar({ items, indicadores, usuario, onLogin, onLogout }) {
  const chips = [
    { clave: "criticos", bg: "danger", icono: "exclamation-triangle-fill", texto: "críticos", valor: indicadores.criticos },
    { clave: "espera", bg: "warning", icono: "hourglass-split", texto: "en espera", valor: indicadores.enEspera, oscuro: true },
    { clave: "medicos", bg: "success", icono: "person-badge-fill", texto: "médicos", valor: indicadores.medicosActivos },
  ]

  return (
    <header className="sticky-top pt-3 z-2">
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary bg-opacity-75 border rounded-4 shadow px-3 py-2 nav-cristal" aria-label="Navegación principal">
          <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-heart-pulse-fill text-primary fs-4" aria-hidden="true" />
            GuardiasApp
          </Navbar.Brand>

          <div className="d-none d-md-flex gap-2 me-auto ms-3">
            {chips.map((c) => (
              <Badge key={c.clave} pill bg={c.bg} text={c.oscuro ? "dark" : undefined}>
                <i className={`bi bi-${c.icono} me-1`} aria-hidden="true" />
                {c.valor} {c.texto}
              </Badge>
            ))}
          </div>

          <Navbar.Toggle aria-controls="menu-principal" className="border-0 shadow-none" />
          <Navbar.Collapse id="menu-principal">
            <Nav className="ms-auto align-items-lg-center gap-lg-1">
              {items.map((item) => (
                <Nav.Link key={item.to} as={NavLink} to={item.to} end={item.to === "/"} className="px-3 rounded-pill">
                  <i className={`bi bi-${item.icono} me-1`} aria-hidden="true" />
                  {item.etiqueta}
                </Nav.Link>
              ))}
              <div className="ms-lg-2 d-flex align-items-center gap-2">
                {usuario ? (
                  <>
                    <Badge bg="secondary">{usuario.nombre}</Badge>
                    <Button size="sm" variant="outline-secondary" className="rounded-pill" onClick={onLogout}>
                      Cerrar sesión
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="rounded-pill px-3 fw-semibold" onClick={onLogin}>
                    Ingresar
                  </Button>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  )
}

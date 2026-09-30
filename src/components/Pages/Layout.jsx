import { useState } from "react"
import { Container, Toast, ToastContainer } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import NavBar from "./NavBar.jsx"
import Footer from "./Footer.jsx"
import LoginModal from "./LoginModal.jsx"
import { ITEMS_MENU } from "../data/constantes.js"
import { useAuth, useGuardia } from "../hooks/useApp.js"

export default function Layout() {
  const { usuario, login, logout, puede } = useAuth()
  const { indicadores, aviso, avisar, cerrarAviso } = useGuardia()
  const [verLogin, setVerLogin] = useState(false)

  const items = ITEMS_MENU.filter((item) => !item.permiso || puede(item.permiso))

  const iniciarSesion = (nombre, clave) => {
    const sesion = login(nombre, clave)
    if (!sesion) return false
    setVerLogin(false)
    avisar(`Sesión iniciada como ${sesion.nombre}.`)
    return true
  }

  const cerrarSesion = () => {
    logout()
    avisar("Sesión cerrada.", "secondary")
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <a className="visually-hidden-focusable position-absolute p-2 bg-body z-3" href="#contenido">Saltar al contenido</a>
      <NavBar items={items} indicadores={indicadores} usuario={usuario} onLogin={() => setVerLogin(true)} onLogout={cerrarSesion} />
      <Container as="main" id="contenido" className="my-4 flex-grow-1">
        <Outlet />
      </Container>
      <Footer />

      <LoginModal show={verLogin} onHide={() => setVerLogin(false)} onLogin={iniciarSesion} />

      <ToastContainer position="bottom-end" className="p-3">
        <Toast key={aviso?.id} show={Boolean(aviso)} onClose={cerrarAviso} delay={3500} autohide className={aviso ? `text-bg-${aviso.tipo}` : ""}>
          <Toast.Body>{aviso?.mensaje}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  )
}

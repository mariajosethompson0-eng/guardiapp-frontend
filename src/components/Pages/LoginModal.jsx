import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

export default function LoginModal({ show, onHide, onLogin }) {
  const [usuario, setUsuario] = useState("")
  const [clave, setClave] = useState("")
  const [error, setError] = useState(false)

  const reiniciar = () => { setUsuario(""); setClave(""); setError(false) }

  const enviar = (evento) => {
    evento.preventDefault()
    if (!onLogin(usuario, clave)) setError(true)
  }

  return (
    <Modal show={show} onHide={onHide} onExited={reiniciar} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title as="h2" className="h5 fw-bold">
          <i className="bi bi-shield-lock me-2 text-primary" aria-hidden="true" />
          Acceso del personal
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={enviar}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="loginUser">
            <Form.Label className="small fw-semibold">Usuario</Form.Label>
            <Form.Control value={usuario} onChange={(e) => { setUsuario(e.target.value); setError(false) }} autoComplete="username" required />
          </Form.Group>
          <Form.Group className="mb-2" controlId="loginPass">
            <Form.Label className="small fw-semibold">Contraseña</Form.Label>
            <Form.Control type="password" value={clave} onChange={(e) => { setClave(e.target.value); setError(false) }} isInvalid={error} autoComplete="current-password" required />
            <Form.Control.Feedback type="invalid">Usuario o contraseña incorrectos.</Form.Control.Feedback>
          </Form.Group>
          <Form.Text>Cuentas de prueba: <code>admin</code>, <code>recepcion</code> o <code>medico</code> (clave <code>1234</code>).</Form.Text>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button type="submit" className="w-100 rounded-pill fw-semibold">Iniciar sesión</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

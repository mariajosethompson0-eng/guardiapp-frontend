import { useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"

const CAMPOS = [
  { name: "nombre", etiqueta: "Nombre completo", props: { minLength: 3 }, error: "Ingresá el nombre." },
  { name: "especialidad", etiqueta: "Especialidad", props: {}, error: "Ingresá la especialidad." },
  { name: "matricula", etiqueta: "Matrícula", props: { inputMode: "numeric", pattern: "\\d{3,8}" }, error: "Solo números (3 a 8 dígitos)." },
]
const VALORES_INICIALES = { nombre: "", especialidad: "", matricula: "" }

// onGuardar(datos) debe devolver { ok, error }
export default function MedicoFormModal({ show, onHide, onGuardar }) {
  const [valores, setValores] = useState(VALORES_INICIALES)
  const [validado, setValidado] = useState(false)
  const [error, setError] = useState("")

  const reiniciar = () => { setValores(VALORES_INICIALES); setValidado(false); setError("") }

  const enviar = (evento) => {
    evento.preventDefault()
    setValidado(true)
    if (!evento.currentTarget.checkValidity()) return
    const resultado = onGuardar({ nombre: valores.nombre.trim(), especialidad: valores.especialidad.trim(), matricula: valores.matricula.trim() })
    if (!resultado.ok) setError(resultado.error)
  }

  return (
    <Modal show={show} onHide={onHide} onExited={reiniciar} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title as="h2" className="h5 fw-bold">Añadir profesional</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validado} onSubmit={enviar}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {CAMPOS.map(({ name, etiqueta, props, error: mensaje }) => (
            <Form.Group key={name} className="mb-3" controlId={`med-${name}`}>
              <Form.Label className="small fw-semibold">{etiqueta}</Form.Label>
              <Form.Control name={name} value={valores[name]} onChange={(e) => { setValores({ ...valores, [name]: e.target.value }); setError("") }} required {...props} />
              <Form.Control.Feedback type="invalid">{mensaje}</Form.Control.Feedback>
            </Form.Group>
          ))}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" className="rounded-pill" onClick={onHide}>Cancelar</Button>
          <Button type="submit" className="rounded-pill px-4 fw-semibold">Guardar profesional</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

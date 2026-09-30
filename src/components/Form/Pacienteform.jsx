import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { TRIAGE_UI } from "../data/constantes.js"

const VALORES_INICIALES = { dni: "", nombre: "", triage: "Amarillo", motivo: "" }

// onSubmit(datos) debe devolver { ok, error }
export default function PacienteForm({ onSubmit }) {
  const [valores, setValores] = useState(VALORES_INICIALES)
  const [validado, setValidado] = useState(false)
  const [errorDni, setErrorDni] = useState("")

  const cambiar = (evento) => {
    const { name, value } = evento.target
    setValores((prev) => ({ ...prev, [name]: value }))
    if (name === "dni") setErrorDni("")
  }

  const enviar = (evento) => {
    evento.preventDefault()
    setValidado(true)
    if (!evento.currentTarget.checkValidity()) return
    const resultado = onSubmit({ ...valores, dni: valores.dni.trim(), nombre: valores.nombre.trim(), motivo: valores.motivo.trim() })
    if (resultado.ok) {
      setValores(VALORES_INICIALES)
      setValidado(false)
    } else {
      setErrorDni(resultado.error)
    }
  }

  return (
    <Form noValidate validated={validado} onSubmit={enviar}>
      <Form.Group className="mb-3" controlId="dni">
        <Form.Label className="small fw-semibold">DNI</Form.Label>
        <Form.Control name="dni" value={valores.dni} onChange={cambiar} inputMode="numeric" pattern="\d{7,8}" maxLength={8} placeholder="Ej: 38123456" isInvalid={Boolean(errorDni)} required />
        <Form.Control.Feedback type="invalid">{errorDni || "Ingresá 7 u 8 dígitos, sin puntos."}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label className="small fw-semibold">Nombre completo</Form.Label>
        <Form.Control name="nombre" value={valores.nombre} onChange={cambiar} minLength={3} maxLength={60} placeholder="Nombre y apellido" required />
        <Form.Control.Feedback type="invalid">Escribí al menos 3 caracteres.</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="triage">
        <Form.Label className="small fw-semibold">Nivel de urgencia</Form.Label>
        <Form.Select name="triage" value={valores.triage} onChange={cambiar}>
          {Object.entries(TRIAGE_UI).map(([clave, { icono, etiqueta }]) => (
            <option key={clave} value={clave}>{icono} {clave} · {etiqueta}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-4" controlId="motivo">
        <Form.Label className="small fw-semibold">Motivo de consulta</Form.Label>
        <Form.Control as="textarea" rows={3} name="motivo" value={valores.motivo} onChange={cambiar} minLength={5} maxLength={200} placeholder="Síntomas descritos al llegar" required />
        <Form.Control.Feedback type="invalid">Describí el motivo (mínimo 5 caracteres).</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="w-100 rounded-pill fw-semibold py-2">
        <i className="bi bi-plus-circle me-2" aria-hidden="true" />Registrar en sala de espera
      </Button>
    </Form>
  )
}
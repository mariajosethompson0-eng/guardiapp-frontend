import { useState } from "react"
import { Card, Col, Form, InputGroup, Row } from "react-bootstrap"
import { DURACIONES, PERFILES, SUELDO_BASE } from "../data/constantes.js"
import { formatoMoneda } from "../utils/formato.js"

export default function CalculadoraRetribucion() {
  const [perfil, setPerfil] = useState(PERFILES[0].valor)
  const [guardias, setGuardias] = useState(4)
  const [duracion, setDuracion] = useState(DURACIONES[0].valor)
  const [valorHora, setValorHora] = useState(PERFILES[0].valorHora)

  // Valores derivados: se calculan en cada render, sin useEffect.
  const horas = guardias * duracion
  const complemento = horas * Math.max(Number(valorHora) || 0, 0)

  const resumen = [
    { etiqueta: "Horas de guardia", valor: `${horas} h` },
    { etiqueta: "Sueldo base", valor: formatoMoneda(SUELDO_BASE) },
    { etiqueta: "Complemento por guardias", valor: formatoMoneda(complemento), clase: "text-primary" },
  ]

  const cambiarPerfil = (evento) => {
    setPerfil(evento.target.value)
    setValorHora(PERFILES.find((p) => p.valor === evento.target.value).valorHora)
  }

  return (
    <Row className="g-4">
      <Col lg={5}>
        <h3 className="h6 fw-bold mb-3"><i className="bi bi-sliders me-2 text-primary" aria-hidden="true" />Parámetros de guardia</h3>
        <Form>
          <Form.Group className="mb-3" controlId="perfil">
            <Form.Label className="small fw-semibold">Perfil profesional</Form.Label>
            <Form.Select value={perfil} onChange={cambiarPerfil}>
              {PERFILES.map((p) => <option key={p.valor} value={p.valor}>{p.etiqueta}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="guardias">
            <Form.Label className="small fw-semibold">Guardias en el mes: <output className="text-primary fw-bold">{guardias}</output></Form.Label>
            <Form.Range min={1} max={10} value={guardias} onChange={(e) => setGuardias(Number(e.target.value))} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="duracion">
            <Form.Label className="small fw-semibold">Duración de cada guardia</Form.Label>
            <Form.Select value={duracion} onChange={(e) => setDuracion(Number(e.target.value))}>
              {DURACIONES.map((d) => <option key={d.valor} value={d.valor}>{d.etiqueta}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="valorHora">
            <Form.Label className="small fw-semibold">Valor por hora</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="number" min={0} step={0.5} value={valorHora} onChange={(e) => setValorHora(e.target.value)} />
            </InputGroup>
          </Form.Group>
        </Form>
      </Col>
      <Col lg={7} className="d-flex align-items-center">
        <Card className="w-100 bg-body-secondary rounded-4">
          <Card.Body className="p-4">
            <h3 className="h6 fw-bold text-secondary mb-3">Resumen estimado</h3>
            {resumen.map(({ etiqueta, valor, clase }) => (
              <div key={etiqueta} className="d-flex justify-content-between mb-2">
                <span>{etiqueta}</span>
                <strong className={clase}>{valor}</strong>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fs-5 fw-bold">
              <span>Total bruto</span>
              <span className="text-success">{formatoMoneda(SUELDO_BASE + complemento)}</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
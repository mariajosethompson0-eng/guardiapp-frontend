import { useState } from "react"
import { Button, Col, Row } from "react-bootstrap"
import Seo from "../components/Seo.jsx"
import MedicoCard from "../components/MedicoCard.jsx"
import MedicoFormModal from "../components/MedicoFormModal.jsx"
import ConfirmModal from "../components/ConfirmModal.jsx"
import { useAuth, useGuardia } from "../hooks/useApp.js"

export default function Equipo() {
  const { puede } = useAuth()
  const { medicos, agregarMedico, alternarMedico, eliminarMedico } = useGuardia()
  const [verFormulario, setVerFormulario] = useState(false)
  const [aBaja, setABaja] = useState(null)

  const accionDe = (medico) => {
    if (puede("cambiarGuardia")) return { texto: "Cambiar estado", variante: "outline-secondary", onClick: () => alternarMedico(medico.id) }
    if (puede("gestionarMedicos")) return { texto: "Dar de baja", variante: "outline-danger", onClick: () => setABaja(medico) }
    return null
  }

  const guardar = (datos) => {
    const resultado = agregarMedico(datos)
    if (resultado.ok) setVerFormulario(false)
    return resultado
  }

  const confirmarBaja = () => {
    eliminarMedico(aBaja.id)
    setABaja(null)
  }

  return (
    <>
      <Seo titulo="Equipo médico de guardia" descripcion="Consultá qué profesionales están en guardia activa y cuáles descansan, con su especialidad y matrícula." />
      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h1 className="h4 fw-bold mb-0"><i className="bi bi-person-badge me-2 text-primary" aria-hidden="true" />Equipo de guardia</h1>
            <small className="text-secondary">Quién está activo y quién descansa</small>
          </div>
          {puede("gestionarMedicos") && (
            <Button variant="outline-primary" size="sm" className="rounded-pill px-3" onClick={() => setVerFormulario(true)}>
              <i className="bi bi-person-plus-fill me-1" aria-hidden="true" />Añadir profesional
            </Button>
          )}
        </div>
        <Row className="g-3">
          {medicos.map((medico) => (
            <Col key={medico.id} md={6} lg={4}><MedicoCard medico={medico} accion={accionDe(medico)} /></Col>
          ))}
        </Row>
      </section>
      <MedicoFormModal show={verFormulario} onHide={() => setVerFormulario(false)} onGuardar={guardar} />
      <ConfirmModal show={Boolean(aBaja)} texto={`¿Dar de baja a ${aBaja?.nombre}?`} onConfirmar={confirmarBaja} onCancelar={() => setABaja(null)} />
    </>
  )
}

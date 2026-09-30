import { useState } from "react"
import { Badge, Card, Col, Row } from "react-bootstrap"
import Seo from "../components/Seo.jsx"
import PacienteForm from "../components/PacienteForm.jsx"
import PacientesTable from "../components/PacientesTable.jsx"
import ConfirmModal from "../components/ConfirmModal.jsx"
import { useAuth, useGuardia } from "../hooks/useApp.js"

export default function SalaEspera() {
  const { usuario, puede } = useAuth()
  const { pacientesOrdenados, indicadores, registrarPaciente, cambiarEstado, eliminarPaciente } = useGuardia()
  const [aEliminar, setAEliminar] = useState(null)

  const confirmarBaja = () => {
    eliminarPaciente(aEliminar.id)
    setAEliminar(null)
  }

  return (
    <>
      <Seo titulo="Sala de espera y triage" descripcion="Registrá pacientes y seguí la sala de espera de la guardia, ordenada por nivel de urgencia y hora de llegada." />
      <Card as="section" className="bg-body-tertiary rounded-4 shadow">
        <Card.Body className="p-4">
          <h1 className="h4 fw-bold mb-4">Turnos y sala de espera</h1>
          <Row className="g-4">
            {puede("admitir") && (
              <Col lg={4}>
                <h2 className="h6 fw-bold mb-3"><i className="bi bi-person-plus-fill me-2 text-primary" aria-hidden="true" />Admisión del paciente</h2>
                <PacienteForm onSubmit={registrarPaciente} />
              </Col>
            )}
            <Col lg>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h2 className="h6 fw-bold mb-0"><i className="bi bi-list-task me-2 text-primary" aria-hidden="true" />Pacientes de la guardia</h2>
                  <small className="text-secondary">Ordenados por urgencia y hora de llegada</small>
                </div>
                <Badge bg="secondary" aria-live="polite">{indicadores.activos} {indicadores.activos === 1 ? "activo" : "activos"}</Badge>
              </div>
              <PacientesTable
                pacientes={pacientesOrdenados}
                sesionActiva={Boolean(usuario)}
                puedeAtender={puede("atender")}
                puedeEliminar={puede("eliminarPaciente")}
                onCambiarEstado={cambiarEstado}
                onEliminar={setAEliminar}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <ConfirmModal show={Boolean(aEliminar)} texto={`¿Eliminar a ${aEliminar?.nombre} de la lista?`} onConfirmar={confirmarBaja} onCancelar={() => setAEliminar(null)} />
    </>
  )
}

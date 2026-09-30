import { Button, Modal } from "react-bootstrap"

export default function ConfirmModal({ show, titulo = "Confirmar acción", texto, onConfirmar, onCancelar }) {
  return (
    <Modal show={show} onHide={onCancelar} centered size="sm">
      <Modal.Body className="p-4 text-center">
        <i className="bi bi-question-circle text-warning fs-1" aria-hidden="true" />
        <Modal.Title as="h2" className="h6 fw-bold mt-2">{titulo}</Modal.Title>
        <p className="text-secondary mb-4">{texto}</p>
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="outline-secondary" className="rounded-pill px-3" onClick={onCancelar}>Cancelar</Button>
          <Button variant="danger" className="rounded-pill px-3" onClick={onConfirmar}>Confirmar</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

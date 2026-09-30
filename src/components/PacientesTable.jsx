import { Table } from "react-bootstrap"
import PacienteRow from "../components/PacienteRow.jsx"

export default function PacientesTable({ pacientes, ...propsFila }) {
  return (
    <div className="table-responsive">
      <Table hover className="align-middle mb-0">
        <caption className="visually-hidden">Pacientes con hora, triage, estado y acciones</caption>
        <thead>
          <tr className="small text-secondary">
            <th scope="col">Hora</th>
            <th scope="col">Paciente</th>
            <th scope="col">Triage</th>
            <th scope="col">Estado</th>
            <th scope="col" className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-secondary py-4">
                <i className="bi bi-inbox fs-3 d-block mb-1" aria-hidden="true" />No hay pacientes en la sala.
              </td>
            </tr>
          ) : (
            pacientes.map((paciente) => <PacienteRow key={paciente.id} paciente={paciente} {...propsFila} />)
          )}
        </tbody>
      </Table>
    </div>
  )
}

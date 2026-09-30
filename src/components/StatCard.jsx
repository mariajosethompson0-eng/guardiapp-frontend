export default function StatCard({ valor, etiqueta, variante }) {
  return (
    <div className="bg-body-secondary rounded-3 p-3 text-center h-100">
      <p className={`h2 fw-bold mb-0 ${variante ? `text-${variante}` : ""}`}>{valor}</p>
      <small className="text-secondary">{etiqueta}</small>
    </div>
  )
}

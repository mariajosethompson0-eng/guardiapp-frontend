import { Alert } from "react-bootstrap"
import Seo from "./Seo.jsx"
import { useAuth } from "../hooks/useApp.js"

export default function RutaProtegida({ permiso, children }) {
  const { usuario, puede } = useAuth()
  if (puede(permiso)) return children

  return (
    <>
      <Seo titulo="Acceso restringido" descripcion="Sección disponible solo para personal autorizado de GuardiasApp." noIndex />
      <Alert variant="warning">
        {usuario ? "Tu rol no tiene permiso para ver esta sección." : "Iniciá sesión con una cuenta autorizada para ver esta sección."}
      </Alert>
    </>
  )
}
